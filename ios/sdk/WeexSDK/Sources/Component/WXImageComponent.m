/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXImageComponent.h"
#import "WXHandlerFactory.h"
#import "WXComponent_internal.h"
#import "WXImgLoaderProtocol.h"
#import "WXLayer.h"
#import "WXType.h"
#import "WXConvert.h"

@interface WXImageView : UIImageView

@end

@implementation WXImageView

+ (Class)layerClass
{
    return [WXLayer class];
}

@end

static dispatch_queue_t WXImageUpdateQueue;

@interface WXImageComponent ()

@property (nonatomic, strong) NSString *imageSrc;
@property (nonatomic, strong) NSString *placeholdSrc;
@property (nonatomic, assign) UIViewContentMode resizeMode;
@property (nonatomic, assign) WXImageQuality imageQuality;
@property (nonatomic, assign) WXImageSharp imageSharp;
@property (nonatomic, strong) UIImage *image;
@property (nonatomic, strong) id<WXImageOperationProtocol> imageOperation;
@property (nonatomic, strong) id<WXImageOperationProtocol> placeholderOperation;
@property (nonatomic) BOOL imageLoadEvent;

@end

@implementation WXImageComponent

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        _async = YES;
        if (!WXImageUpdateQueue) {
            WXImageUpdateQueue = dispatch_queue_create("com.taobao.weex.ImageUpdateQueue", DISPATCH_QUEUE_SERIAL);
        }
        if (attributes[@"src"]) {
            _imageSrc = [WXConvert NSString:attributes[@"src"]];
        } else {
            WXLogWarning(@"image src is nil");
        }
        if (attributes[@"placeHolder"]) {
            _placeholdSrc = [WXConvert NSString:attributes[@"placeHolder"]];
        }
        _resizeMode = [WXConvert UIViewContentMode:attributes[@"resize"]];
        _imageQuality = [WXConvert WXImageQuality:styles[@"quality"]];
        _imageSharp = [WXConvert WXImageSharp:styles[@"sharpen"]];
        _imageLoadEvent = NO;
    }
    
    return self;
}

- (UIView *)loadView
{
    return [[WXImageView alloc] init];
}

- (void)addEvent:(NSString *)eventName {
    if ([eventName isEqualToString:@"load"]) {
        _imageLoadEvent = YES;
    }
}

- (void)removeEvent:(NSString *)eventName {
    if ([eventName isEqualToString:@"load"]) {
        _imageLoadEvent = NO;
    }
}

- (void)updateStyles:(NSDictionary *)styles
{
    if (styles[@"quality"]) {
        _imageQuality = [WXConvert WXImageQuality:styles[@"quality"]];
        [self updateImage];
    }
    
    if (styles[@"sharpen"]) {
        _imageSharp = [WXConvert WXImageSharp:styles[@"sharpen"]];
        [self updateImage];
    }
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"src"]) {
        _imageSrc = [WXConvert NSString:attributes[@"src"]];
        [self updateImage];
    }
    if (attributes[@"placeHolder"]) {
        _placeholdSrc = [WXConvert NSString:attributes[@"placeHolder"]];
    }
    
    if (attributes[@"resize"]) {
        _resizeMode = [WXConvert UIViewContentMode:attributes[@"resize"]];
        self.view.contentMode = _resizeMode;
    }
}

- (void)viewDidLoad
{
    UIImageView *imageView = (UIImageView *)self.view;
    imageView.contentMode = _resizeMode;
    imageView.userInteractionEnabled = YES;
    imageView.clipsToBounds = YES;
    imageView.exclusiveTouch = YES;
    
    [self updateImage];
    
}

- (WXDisplayBlock)displayBlock
{
    if ([self isViewLoaded]) {
        // if has a image view, image is setted by image view, displayBlock is not needed
        return nil;
    }
    
    __weak typeof(self) weakSelf = self;
    return ^UIImage *(CGRect bounds, BOOL(^isCancelled)(void)) {
        if (isCancelled()) {
            return nil;
        }
        
        if (!weakSelf.image) {
            [weakSelf updateImage];
            return nil;
        }
        
        if (isCancelled && isCancelled()) {
            return nil;
        }
        
        UIGraphicsBeginImageContextWithOptions(bounds.size, self.layer.opaque, 1.0);
        
        [weakSelf.image drawInRect:bounds];
        
        UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
        
        UIGraphicsEndImageContext();
        
        return image;
    };
}

- (void)viewWillUnload
{
    [super viewWillUnload];
    [self cancelImage];
    _image = nil;
}

- (void)setImageSrc:(NSString*)src
{
    if (![src isEqualToString:_imageSrc]) {
        _imageSrc = src;
        [self updateImage];
    }
}

- (void)updateImage
{
    __weak typeof(self) weakSelf = self;
    dispatch_async(WXImageUpdateQueue, ^{
        [self cancelImage];
        
        if (CGRectEqualToRect(self.calculatedFrame, CGRectZero)) {
            return;
        }
        
        void(^downloadFailed)(NSString *, NSError *) = ^void(NSString *url, NSError *error){
            WXLogError(@"Error downloading image:%@, detail:%@", url, [error localizedDescription]);
        };
        
        NSString *imageSrc = weakSelf.imageSrc;
        NSString *placeholderSrc = weakSelf.placeholdSrc;
        
        if (weakSelf.placeholdSrc) {
            WXLogDebug(@"Updating image, component:%@, placeholder:%@ ", self.ref, placeholderSrc);
            weakSelf.placeholderOperation = [[weakSelf imageLoader] downloadImageWithURL:placeholderSrc imageFrame:weakSelf.calculatedFrame userInfo:nil completed:^(UIImage *image, NSError *error, BOOL finished) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    __strong typeof(self) strongSelf = weakSelf;
                    UIImage *viewImage = ((UIImageView *)strongSelf.view).image;
                    if (error) {
                        downloadFailed(placeholderSrc,error);
                        if ([strongSelf isViewLoaded] && !viewImage) {
                            ((UIImageView *)(strongSelf.view)).image = nil;
                        }
                        return;
                    }
                    if (![placeholderSrc isEqualToString:strongSelf.placeholdSrc]) {
                        return;
                    }
                   
                    if ([strongSelf isViewLoaded] && !viewImage) {
                        ((UIImageView *)strongSelf.view).image = image;
                    }
                });
            }];
        }
        if (weakSelf.imageSrc) {
            NSDictionary *userInfo = @{@"imageQuality":@(weakSelf.imageQuality), @"imageSharp":@(weakSelf.imageSharp)};
            
            dispatch_async(dispatch_get_main_queue(), ^{
                weakSelf.imageOperation = [[weakSelf imageLoader] downloadImageWithURL:imageSrc imageFrame:weakSelf.calculatedFrame userInfo:userInfo completed:^(UIImage *image, NSError *error, BOOL finished) {
                    dispatch_async(dispatch_get_main_queue(), ^{
                        __strong typeof(self) strongSelf = weakSelf;
                        
                        if (weakSelf.imageLoadEvent) {
                            [strongSelf fireEvent:@"load" params:@{ @"success": error? @"false" : @"true"}];
                        }
                        if (error) {
                            downloadFailed(imageSrc, error);
                            return ;
                        }
                        
                        if (![imageSrc isEqualToString:strongSelf.imageSrc]) {
                            return ;
                        }
                        
                        if ([strongSelf isViewLoaded]) {
                            ((UIImageView *)strongSelf.view).image = image;
                        }
                    });
                }];
            });
        }
        if (!weakSelf.imageSrc && !weakSelf.placeholdSrc) {
            dispatch_async(dispatch_get_main_queue(), ^{
                self.layer.contents = nil;
            });
        }
    });
}

- (void)cancelImage
{
    [_imageOperation cancel];
    _imageOperation = nil;
    [_placeholderOperation cancel];
    _placeholderOperation = nil;
}

- (id<WXImgLoaderProtocol>)imageLoader
{
    static id<WXImgLoaderProtocol> imageLoader;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        imageLoader = [WXHandlerFactory handlerForProtocol:@protocol(WXImgLoaderProtocol)];
    });
    return imageLoader;
}

- (BOOL)_needsDrawBorder
{
    return NO;
}

#ifdef UITEST
- (NSString *)description
{
    NSString *superDescription = super.description;
    NSRange semicolonRange = [superDescription rangeOfString:@";"];
    NSString *replacement = [NSString stringWithFormat:@"; imageSrc: %@; imageQuality: %@; imageSharp: %@; ",_imageSrc,_imageQuality,_imageSharp];
    return [superDescription stringByReplacingCharactersInRange:semicolonRange withString:replacement];
}
#endif

@end
