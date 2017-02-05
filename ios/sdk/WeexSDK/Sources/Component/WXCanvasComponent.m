/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXCanvasComponent.h"
#import "WXComponent_internal.h"
#import "WXUtility.h"
#import "WXConvert.h"
#import <Foundation/Foundation.h>
#import <OpenGLES/ES2/gl.h>
#import <OpenGLES/ES2/glext.h>


@interface WXCanvasComponent()
@property (nonatomic, strong) GLKView *glkview;
@property (nonatomic, strong) NSMutableDictionary *cacheMap;
@property (nonatomic, strong) NSMutableArray *drawActionList;
@property (nonatomic, strong) GLKBaseEffect *effect;
@property (nonatomic, strong) CADisplayLink *displayLink;
@property (nonatomic, assign) NSInteger fps;
@property (nonatomic, strong) WXCanvasModule *canvasModule;
@property (nonatomic, assign) GLKVector4 curFillColor;
@property (nonatomic, assign) GLKVector4 curStrokeColor;
@property (nonatomic, assign) GLfloat curLineWidth;
@property (nonatomic, assign) GLfloat curGlobalAlpha;
@end


@implementation WXCanvasComponent

- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString *)type
                     styles:(NSDictionary *)styles
                 attributes:(NSDictionary *)attributes
                     events:(NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        _fps = [WXConvert NSInteger:attributes[@"fps"]];
        if (!_fps) {
            _fps = 30;
        }
    }
    return self;
}


- (UIView *)loadView
{
    _glkview = [[GLKView alloc] init];
    EAGLContext *context = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
    _glkview.context = context;
    _glkview.delegate = self;
    _glkview.enableSetNeedsDisplay = NO;
    _cacheMap = [NSMutableDictionary new];
    return _glkview;
}

- (void) viewDidLoad
{
    [super viewDidLoad];
    _drawActionList = [[NSMutableArray alloc] init];
    _effect = [[GLKBaseEffect alloc] init];
    CGSize size = _glkview.frame.size;
    _effect.transform.projectionMatrix = GLKMatrix4MakeOrtho(0, size.width, 0, size.height, -1024, 1024);
    _effect.transform.modelviewMatrix = GLKMatrix4Multiply(GLKMatrix4MakeTranslation(0, size.height, 0), GLKMatrix4MakeScale(1, -1, 1));
    _curStrokeColor = GLKVector4Make(1, 1, 1, 1);
    _curFillColor = GLKVector4Make(1, 1, 1, 1);
    _curGlobalAlpha = 1;
    _curLineWidth = 1;
}

- (void) viewDidUnload
{
    [_displayLink invalidate];
    _displayLink = nil;
    [_drawActionList removeAllObjects];
    _drawActionList = nil;
    _effect = nil;
    _canvasModule = nil;
    [_cacheMap removeAllObjects];
    _cacheMap = nil;
    [super viewDidUnload];
}

- (void)glkView:(GLKView *)view drawInRect:(CGRect)rect
{
    NSInteger count = [_drawActionList count];
    for (NSInteger i = 0; i < count; i++) {
        NSArray *action = (NSArray *)_drawActionList[i];
        NSInteger paramsCount = [action count];
        SEL method;
        if (paramsCount == 1) {
            method = NSSelectorFromString(action[0]);
        } else {
            method = NSSelectorFromString([action[0] stringByAppendingString:@":"]);
        }
        if (![self respondsToSelector:method]) {
            continue;
        }

        id params = nil;
        if (paramsCount > 1) {
            params = action[1];
        }
        [self performSelectorOnMainThread:method withObject:params waitUntilDone:YES];
    }

    [_drawActionList removeAllObjects];
}

// [
//      [setFillStyle, ["black"]],
//      [fillRect, [0, 0, 750, 750]],
//      [drawImages, [imgURL, [[sx, sy, sw, sh, dx, dy, dw, dh], [sx, sy, sw, sh, dx, dy, dw, dh]]]],
// ]
- (void) addDrawActions:(NSArray *)actions canvasModule:(WXCanvasModule*)canvasModule
{
    [_drawActionList removeAllObjects];
    [_drawActionList addObjectsFromArray:actions];
    _canvasModule = canvasModule;
    [_glkview display];
}


-(GLKTextureInfo *) getTexture:(NSString *)imageURL
{
    NSString *key = [NSString stringWithFormat:@"texture~%@", imageURL];
    if ([_cacheMap objectForKey:key]) {
        return (GLKTextureInfo *)[_cacheMap objectForKey:key];
    }

    // Image can cache by weexModule, so use it to get the UIImage
    UIImage *image = [_canvasModule getImage:imageURL];
    NSError *error;
    NSDictionary *options = [NSDictionary dictionaryWithObject:[NSNumber numberWithBool:YES]
                                                        forKey:GLKTextureLoaderApplyPremultiplication];
    GLKTextureInfo *texture = [GLKTextureLoader textureWithCGImage:image.CGImage options:options error:&error];

    if (texture != nil) {
        [_cacheMap setObject:texture forKey:key];
    }

    return texture;
}

-(void) handleDisplayLink
{
    [self fireEvent:@"tick" params:nil];
}

- (void)addEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"tick"]) {
        _displayLink = [CADisplayLink displayLinkWithTarget:self selector:@selector(handleDisplayLink)];
        float i = 60.0 / _fps;
        _displayLink.frameInterval = i;
        [_displayLink addToRunLoop:[NSRunLoop currentRunLoop] forMode:NSDefaultRunLoopMode];
    }
}


// OpenGL ES methods map
#define WX_CANVAS_PIXEL(name, index) WXPixelType name = [WXConvert WXPixelType:params[index] scaleFactor:self.weexInstance.pixelScaleFactor];
#define WX_CANVAS_CGFLOAT(name, index) CGFloat name = [WXConvert CGFloat:params[index]];
#define WX_CANVAS_PARAMS_CHECK(num) if ([params count] < num) return;


// [imageURL, [[sx, sy, sw, sh, dx, dy, dw, dh], [sx, sy, sw, sh, dx, dy, dw, dh, m00, m01, m02, m10, m11, m12, m20, m21, m22]]]
- (void) drawImages:(NSArray *)params
{
    WX_CANVAS_PARAMS_CHECK(2);
    GLKTextureInfo *textureInfo = [self getTexture:[WXConvert NSString:params[0]]];
    CGFloat textureWidth = textureInfo.width;
    CGFloat textureHeight = textureInfo.height;

    NSArray *drawParams = (NSArray *)params[1];
    const GLint count = (GLint)[drawParams count] * 4;
    GLKVector3 geometrys[count];
    GLKVector3 textures[count];

    const GLint indexLen = (GLint)drawParams.count * 6;
    GLuint indices[indexLen];

    for (GLint i = 0; i < drawParams.count; i++) {
        NSArray *curParams = (NSArray *)drawParams[i];
        if (curParams.count < 8) {
            continue;
        }

        CGFloat sx = [WXConvert CGFloat:curParams[0]];
        CGFloat sy = [WXConvert CGFloat:curParams[1]];
        CGFloat sw = [WXConvert CGFloat:curParams[2]];
        CGFloat sh = [WXConvert CGFloat:curParams[3]];
        CGFloat dx = [WXConvert WXPixelType:curParams[4] scaleFactor:self.weexInstance.pixelScaleFactor];
        CGFloat dy = [WXConvert WXPixelType:curParams[5] scaleFactor:self.weexInstance.pixelScaleFactor];
        CGFloat dw = [WXConvert WXPixelType:curParams[6] scaleFactor:self.weexInstance.pixelScaleFactor];
        CGFloat dh = [WXConvert WXPixelType:curParams[7] scaleFactor:self.weexInstance.pixelScaleFactor];

        geometrys[i * 4] = GLKVector3Make(dx, dh + dy, 1);
        geometrys[i * 4 + 1] = GLKVector3Make(dw + dx, dh + dy, 1);
        geometrys[i * 4 + 2] = GLKVector3Make(dx, dy, 1);
        geometrys[i * 4 + 3] = GLKVector3Make(dw + dx, dy, 1);

        if (curParams.count == 17) {
            // If the length of curParams is 17, the tail of curParams is the transform matrix of this draw
            // m00, m01, m02, m10, m11, m12, m20, m21, m22
            GLKMatrix3 matrix = GLKMatrix3Make(
                                               [WXConvert CGFloat:curParams[8]],
                                               [WXConvert CGFloat:curParams[9]],
                                               [WXConvert CGFloat:curParams[10]],
                                               [WXConvert CGFloat:curParams[11]],
                                               [WXConvert CGFloat:curParams[12]],
                                               [WXConvert CGFloat:curParams[13]],
                                               [WXConvert CGFloat:curParams[14]],
                                               [WXConvert CGFloat:curParams[15]],
                                               [WXConvert CGFloat:curParams[16]]
            );
            // Because the params are base on 750, so we should make scale for the transform matrix
            matrix = GLKMatrix3Scale(matrix, 1, 1, self.weexInstance.pixelScaleFactor);
            geometrys[i * 4] = GLKMatrix3MultiplyVector3(matrix, geometrys[i * 4]);
            geometrys[i * 4 + 1] = GLKMatrix3MultiplyVector3(matrix, geometrys[i * 4 + 1]);
            geometrys[i * 4 + 2] = GLKMatrix3MultiplyVector3(matrix, geometrys[i * 4 + 2]);
            geometrys[i * 4 + 3] = GLKMatrix3MultiplyVector3(matrix, geometrys[i * 4 + 3]);
        }

        textures[i * 4] = GLKVector3Make(sx / textureWidth, (sy + sh) / textureHeight, 1);
        textures[i * 4 + 1] = GLKVector3Make((sx + sw) / textureWidth, (sy + sh) / textureHeight, 1);
        textures[i * 4 + 2] = GLKVector3Make(sx / textureWidth, sy / textureHeight, 1);
        textures[i * 4 + 3] = GLKVector3Make((sx + sw) / textureWidth, sy / textureHeight, 1);

        // two triangles 0,1,2 and 1,2,3 make a rectangle
        indices[i * 6] = i * 4;
        indices[i * 6 + 1] = i * 4 + 1;
        indices[i * 6 + 2] = i * 4 + 2;
        indices[i * 6 + 3] = i * 4 + 1;
        indices[i * 6 + 4] = i * 4 + 2;
        indices[i * 6 + 5] = i * 4 + 3;
    }

    glEnable(GL_BLEND);
    if (_curGlobalAlpha != 1) {
        glBlendColor(1, 1, 1, _curGlobalAlpha);
        glBlendFunc(GL_CONSTANT_ALPHA, GL_ONE);
    } else {
        glBlendFunc(GL_ONE, GL_ONE_MINUS_SRC_ALPHA);
    }

    _effect.useConstantColor = GL_FALSE;
    _effect.texture2d0.enabled = YES;
    _effect.texture2d0.name = textureInfo.name;
    [_effect prepareToDraw];

    glEnableVertexAttribArray(GLKVertexAttribPosition);
    glEnableVertexAttribArray(GLKVertexAttribTexCoord0);

    glVertexAttribPointer(GLKVertexAttribPosition, 3, GL_FLOAT, GL_FALSE, 0, &geometrys);
    glVertexAttribPointer(GLKVertexAttribTexCoord0, 3, GL_FLOAT, GL_FALSE, 0, &textures);

    glDrawElements(GL_TRIANGLES, indexLen, GL_UNSIGNED_INT, indices);
}

- (void) setGlobalAlpha:(NSArray *)params
{
    WX_CANVAS_PARAMS_CHECK(1);
    _curGlobalAlpha = [WXConvert CGFloat:params[0]];
}


// use rgba(0, 0, 0, 0) to fill the rect
- (void) clearRect:(NSArray *)params
{
    WX_CANVAS_PARAMS_CHECK(4);
    WX_CANVAS_PIXEL(x, 0)
    WX_CANVAS_PIXEL(y, 1)
    WX_CANVAS_PIXEL(w, 2)
    WX_CANVAS_PIXEL(h, 3)

    _effect.useConstantColor = GL_TRUE;
    _effect.constantColor = GLKVector4Make(0, 0, 0, 0);
    _effect.texture2d0.enabled = NO;
    [_effect prepareToDraw];
    glBlendFunc(GL_ONE, GL_ZERO);

    glEnableVertexAttribArray(GLKVertexAttribPosition);

    GLfloat points[] = {
        x, y,
        x, y + h,
        x + w, y,
        x + w, y + h
    };

    glVertexAttribPointer(GLKVertexAttribPosition, 2, GL_FLOAT, GL_FALSE, 0, &points);
    glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);
}

- (void) setStrokeStyle:(NSArray *)params
{
    WX_CANVAS_PARAMS_CHECK(1);
    UIColor *color = [WXConvert UIColor:params[0]];
    CGFloat red = 0.0, green = 0.0, blue = 0.0, alpha =0.0;
    [color getRed:&red green:&green blue:&blue alpha:&alpha];
    _curStrokeColor = GLKVector4Make(red, green, blue, alpha);
}

- (void) setLineWidth:(NSArray *)params
{
    WX_CANVAS_PARAMS_CHECK(1);
    _curLineWidth = [WXConvert WXPixelType:params[0] scaleFactor:self.weexInstance.pixelScaleFactor];
}

// ["M", 0, 0, "L", 100, 100, "L", 0, 100, "L", 0, 0] it made a triangle
- (void) strokeLines:(NSArray *)params
{
    WX_CANVAS_PARAMS_CHECK(1);
    const NSInteger pointsCount = floor([params count] / 3);
    GLKVector2 points[pointsCount];
    GLint indices[pointsCount * 2];
    GLint pointIndex = 0;
    GLint lineIndex = 0;
    BOOL isLastMove = YES;

    for (GLint i = 0; i < params.count; i += 3) {
        NSString *type = [WXConvert NSString:params[i]];
        points[pointIndex] = GLKVector2Make([WXConvert WXPixelType:params[i + 1] scaleFactor:self.weexInstance.pixelScaleFactor], [WXConvert WXPixelType:params[i + 2] scaleFactor:self.weexInstance.pixelScaleFactor]);

        if ([type isEqualToString:@"L"]) {
            if (isLastMove) {
                indices[lineIndex++] = pointIndex;
                if (lineIndex > 1) {
                    isLastMove = NO;
                }
            } else {
                indices[lineIndex] = indices[lineIndex - 1];
                lineIndex += 1;
                indices[lineIndex++] = pointIndex;
            }
        } else if (isLastMove && lineIndex > 0) {
            isLastMove = YES;
            indices[lineIndex - 1] = pointIndex;
        } else {
            isLastMove = YES;
            indices[lineIndex++] = pointIndex;
        }

        pointIndex += 1;
    }

    _effect.useConstantColor = GL_TRUE;
    _effect.constantColor = _curStrokeColor;
    _effect.texture2d0.enabled = NO;
    [_effect prepareToDraw];
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

    glEnableVertexAttribArray(GLKVertexAttribPosition);

    glLineWidth(_curLineWidth);

    glVertexAttribPointer(GLKVertexAttribPosition, 2, GL_FLOAT, GL_FALSE, 0, &points);
    glDrawElements(GL_LINES, lineIndex, GL_UNSIGNED_INT, indices);
}

- (void) strokeRect:(NSArray *)params
{
    WX_CANVAS_PARAMS_CHECK(4);
    WX_CANVAS_PIXEL(x, 0)
    WX_CANVAS_PIXEL(y, 1)
    WX_CANVAS_PIXEL(w, 2)
    WX_CANVAS_PIXEL(h, 3)

    _effect.useConstantColor = GL_TRUE;
    _effect.constantColor = _curStrokeColor;
    _effect.texture2d0.enabled = NO;
    [_effect prepareToDraw];
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

    glEnableVertexAttribArray(GLKVertexAttribPosition);

    GLfloat points[] = {
        x, y,
        x, y + h,
        x + w, y + h,
        x + w, y,
        x, y
    };
    glLineWidth(_curLineWidth);

    glVertexAttribPointer(GLKVertexAttribPosition, 2, GL_FLOAT, GL_FALSE, 0, &points);
    glDrawArrays(GL_LINE_STRIP, 0, 5);
}

// only support color, such as red, rgb(100, 100, 100), rgba(0, 0, 0, 1), #cccccc
-(void) setFillStyle:(NSArray *)params
{
    WX_CANVAS_PARAMS_CHECK(1);
    UIColor *color = [WXConvert UIColor:params[0]];
    CGFloat red = 0.0, green = 0.0, blue = 0.0, alpha =0.0;
    [color getRed:&red green:&green blue:&blue alpha:&alpha];
    _curFillColor = GLKVector4Make(red, green, blue, alpha);
}

- (void) fillRect:(NSArray *)params
{
    WX_CANVAS_PARAMS_CHECK(4);
    WX_CANVAS_PIXEL(x, 0)
    WX_CANVAS_PIXEL(y, 1)
    WX_CANVAS_PIXEL(w, 2)
    WX_CANVAS_PIXEL(h, 3)

    _effect.useConstantColor = GL_TRUE;
    _effect.constantColor = _curFillColor;
    _effect.texture2d0.enabled = NO;
    [_effect prepareToDraw];
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

    glEnableVertexAttribArray(GLKVertexAttribPosition);

    GLfloat points[] = {
        x, y,
        x, y + h,
        x + w, y,
        x + w, y + h
    };

    glVertexAttribPointer(GLKVertexAttribPosition, 2, GL_FLOAT, GL_FALSE, 0, &points);
    glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);
}

@end
