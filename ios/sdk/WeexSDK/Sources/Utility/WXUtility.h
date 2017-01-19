/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "WXDefine.h"
#import "WXType.h"
#import "WXLog.h"

// The default screen width which helps us to caculate the real size or scale in different devices.
static const CGFloat WXDefaultScreenWidth = 750.0;

#define WX_ENUMBER_CASE(_invoke, idx, code, obj, _type, op, _flist) \
case code:{\
    _type *_tmp = malloc(sizeof(_type));\
    memset(_tmp, 0, sizeof(_type));\
    *_tmp = [obj op];\
    [_invoke setArgument:_tmp atIndex:(idx) + 2];\
    *(_flist + idx) = _tmp;\
    break;\
}
#define WX_EPCHAR_CASE(_invoke, idx, code, obj, _type, op, _flist) \
case code:{\
    _type *_tmp = (_type  *)[obj op];\
    [_invoke setArgument:&_tmp atIndex:(idx) + 2];\
    *(_flist + idx) = 0;\
    break;\
}\

#define WX_ALLOC_FLIST(_ppFree, _count) \
do {\
    _ppFree = (void *)malloc(sizeof(void *) * (_count));\
    memset(_ppFree, 0, sizeof(void *) * (_count));\
} while(0)

#define WX_FREE_FLIST(_ppFree, _count) \
do {\
    for(int i = 0; i < _count; i++){\
        if(*(_ppFree + i ) != 0) {\
            free(*(_ppFree + i));\
        }\
    }\
    free(_ppFree);\
}while(0)

#define WX_ARGUMENTS_SET(_invocation, _sig, idx, _obj, _ppFree) \
do {\
    const char *encode = [_sig getArgumentTypeAtIndex:(idx) + 2];\
    switch(encode[0]){\
        WX_EPCHAR_CASE(_invocation, idx, _C_CHARPTR, _obj, char *, UTF8String, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_INT, _obj, int, intValue, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_SHT, _obj, short, shortValue, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_LNG, _obj, long, longValue, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_LNG_LNG, _obj, long long, longLongValue, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_UCHR, _obj, unsigned char, unsignedCharValue, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_UINT, _obj, unsigned int, unsignedIntValue, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_USHT, _obj, unsigned short, unsignedShortValue, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_ULNG, _obj, unsigned long, unsignedLongValue, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_ULNG_LNG, _obj,unsigned long long, unsignedLongLongValue, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_FLT, _obj, float, floatValue, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_DBL, _obj, double, doubleValue, _ppFree)\
        WX_ENUMBER_CASE(_invocation, idx, _C_BOOL, _obj, bool, boolValue, _ppFree)\
        default: { [_invocation setArgument:&_obj atIndex:(idx) + 2]; *(_ppFree + idx) = 0; break;}\
    }\
}while(0)

/**
 * @abstract execute asynchronous action block on the main thread.
 *
 */
extern void WXPerformBlockOnMainThread( void (^ _Nonnull block)());

/**
 * @abstract execute synchronous action block on the main thread.
 *
 */
extern void WXPerformBlockSyncOnMainThread( void (^ _Nonnull block)());

/**
 * @abstract execute action block on the specific thread.
 *
 */
extern void WXPerformBlockOnThread(void (^ _Nonnull block)(), NSThread *_Nonnull thread);

/**
 * @abstract swizzling methods.
 *
 */
extern void WXSwizzleInstanceMethod(_Nonnull Class class, _Nonnull SEL original, _Nonnull SEL replaced);

extern void WXSwizzleInstanceMethodWithBlock(_Nonnull Class class, _Nonnull SEL original, _Nonnull id block, _Nonnull SEL replaced);

extern _Nonnull SEL WXSwizzledSelectorForSelector(_Nonnull SEL selector);

@interface WXUtility : NSObject

+ (void)performBlock:(void (^_Nonnull)())block onThread:(NSThread *_Nonnull)thread;

+ (void)setNotStat:(BOOL)notStat;
+ (BOOL)notStat;
/**
 * @abstract Returns the environment of current application, you can get some nessary properties such as appVersion、sdkVersion、appName etc.
 *
 * @return A dictionary object which contains these properties.
 *
 */
+ (NSDictionary *_Nonnull)getEnvironment;

+ (NSDictionary *_Nonnull)getDebugEnvironment;

/**
 * @abstract UserAgent Generation
 *
 * @return A ua string by splicing (deviceName、appVersion、sdkVersion、externalField、screenSize)
 *
 */
+ (NSString *_Nonnull)userAgent;

/**
 * @abstract JSON Decode Mehthod
 *
 * @param JSON String.
 *
 * @return A json object by decoding json string.
 *
 */
+ (id _Nullable)objectFromJSON:(NSString * _Nonnull)json;

#define WXDecodeJson(json)  [WXUtility objectFromJSON:json]

/**
 * @abstract JSON Encode Mehthod
 *
 * @param JSON Object.
 *
 * @return A json string by encoding json object.
 *
 */
+ (NSString * _Nullable)JSONString:(id _Nonnull)object;

#define WXEncodeJson(obj)  [WXUtility JSONString:obj]

/**
 * @abstract Returns a Foundation object from given JSON data. A Foundation object from the JSON data in data, or nil if an error occurs.
 *
 * @param data A data object containing JSON data.
 * @param error If an error occurs, upon return contains an NSError object that describes the problem.
 *
 * @return A Foundation object from the JSON data in data, or nil if an error occurs.
 *
 */
+ (id _Nullable)JSONObject:(NSData * _Nonnull)data error:(NSError * __nullable * __nullable)error;

#define WXJSONObjectFromData(data) [WXUtility JSONObject:data error:nil]
/**
 * @abstract JSON Object Copy Mehthod
 *
 * @param JSON Object.
 *
 * @return A json object by copying.
 *
 */
+ (id _Nullable)copyJSONObject:(id _Nonnull)object;

#define WXCopyJson(obj)     [WXUtility copyJSONObject:obj]

/**
 *
 *  Checks if a String is whitespace, empty ("") or nil
 *  @code
 *    [WXUtility isBlankString: nil]       = true
 *    [WXUtility isBlankString: ""]        = true
 *    [WXUtility isBlankString: " "]       = true
 *    [WXUtility isBlankString: "bob"]     = false
 *    [WXUtility isBlankString: "  bob  "] = false
 *  @endcode
 *  @param string the String to check, may be null
 *
 *  @return true if the String is null, empty or whitespace
 */
+ (BOOL)isBlankString:(NSString * _Nullable)string ;

/**
 * @abstract Returns a standard error object
 *
 * @param error code.
 *
 * @param error message.
 *
 * @return A error object type of NSError.
 *
 */
+ (NSError * _Nonnull)errorWithCode:(NSInteger)code message:(NSString * _Nullable)message;

/**
 * @abstract Returns a Font Object by setting some properties such as size、weight、style and fontFamily.
 *
 * @param textSize.
 *
 * @param textWeight.
 *
 * @param textStyle. The type of WXTextStyle (Normal or Italic).
 *
 * @param fontFamily.
 *
 * @return A font object according to the above params.
 *
 */
+ (UIFont *_Nonnull)fontWithSize:(CGFloat)size textWeight:(CGFloat)textWeight textStyle:(WXTextStyle)textStyle fontFamily:(NSString *_Nullable)fontFamily scaleFactor:(CGFloat)scaleFactor;

/**
 * @abstract download remote font from specified url
 * @param url for remote font
 *
 */
+ (void)getIconfont:(NSURL * _Nonnull)fontURL completion:( void(^ _Nullable )(NSURL * _Nonnull url, NSError * _Nullable error)) completionBlock;

/**
 * @abstract Returns the main screen's size when the device is in portrait mode,.
 */
+ (CGSize)portraitScreenSize;

/**
 * @abstract Returns the default pixel scale factor
 * @discussion If orientation is equal to landscape, the value is caculated as follows: WXScreenSize().height / WXDefaultScreenWidth, otherwise, WXScreenSize().width / WXDefaultScreenWidth.
 */
+ (CGFloat)defaultPixelScaleFactor;

/**
 * @abstract Returns the scale of the main screen.
 *
 */
CGFloat WXScreenScale();

/**
 * @abstract Returns a Round float coordinates to the main screen pixel.
 *
 */
CGFloat WXRoundPixelValue(CGFloat value);

/**
 * @abstract Returns a Floor float coordinates to the main screen pixel.
 *
 */
CGFloat WXFloorPixelValue(CGFloat value);

/**
 * @abstract Returns a Ceil float coordinates to the main screen pixel.
 *
 */
CGFloat WXCeilPixelValue(CGFloat value);

/**
 *  @abstract check whether the file is exist
 *
 */

+ (BOOL)isFileExist:(NSString * _Nonnull)filePath;
/**
 *  @abstract Returns the document directory path.
 *
 */
+ (NSString *_Nonnull)documentDirectory;

#define WXDocumentPath     [WXUtility documentDirectory]

/**
 *  @abstract Returns the system cache directory path.
 *
 */
+ (NSString *_Nonnull)cacheDirectory;

#define WXCachePath     [WXUtility cacheDirectory]

/**
 *  @abstract Returns the system library directory path.
 *
 */
+ (NSString *_Nonnull)libraryDirectory;

#define WXLibararyPath  [WXUtility libraryDirectory]

/**
 *  @abstract Returns the global cache whose size is 5M.
 *
 */
+ (NSCache *_Nonnull)globalCache;

#define WXGlobalCache   [WXUtility globalCache]

+ (NSURL *_Nonnull)urlByDeletingParameters:(NSURL *_Nonnull)url;

/**
 *  @abstract Returns the contents of file.
 *
 */
+ (NSString *_Nullable)stringWithContentsOfFile:(NSString *_Nonnull)filePath;

/**
 *  @abstract Returns md5 string.
 *
 */
+ (NSString *_Nullable)md5:(NSString *_Nullable)string;

/**
 *  @abstract Returns Creates a Universally Unique Identifier (UUID) string.
 *
 */
+ (NSString *_Nullable)uuidString;

/**
 *  @abstract convert date string with formatter yyyy-MM-dd to date.
 *
 */
+ (NSDate *_Nullable)dateStringToDate:(NSString *_Nullable)dateString;

/**
 *  @abstract convert time string with formatter HH:mm to date.
 *
 */
+ (NSDate *_Nullable)timeStringToDate:(NSString *_Nullable)timeString;

/**
 *  @abstract convert date to date string with formatter yyyy-MM-dd .
 *
 */
+ (NSString *_Nullable)dateToString:(NSDate *_Nullable)date;

/**
 *  @abstract convert date to time string with formatter HH:mm .
 *
 */
+ (NSString *_Nullable)timeToString:(NSDate *_Nullable)date;

/**
 *  @abstract get the repeat  subtring number of string.
 *
 */
+ (NSUInteger)getSubStringNumber:(NSString *_Nullable)string subString:(NSString *_Nullable)subString;

/**
 *  @abstract Returns a resized pixel which is caculated according to the WXScreenResizeRadio.
 *
 */
CGFloat WXPixelScale(CGFloat value, CGFloat scaleFactor);

CGFloat WXScreenResizeRadio(void) DEPRECATED_MSG_ATTRIBUTE("Use [WXUtility defaultPixelScaleFactor] instead");
CGFloat WXPixelResize(CGFloat value) DEPRECATED_MSG_ATTRIBUTE("Use WXPixelScale Instead");
CGRect WXPixelFrameResize(CGRect value) DEPRECATED_MSG_ATTRIBUTE("Use WXPixelScale Instead");
CGPoint WXPixelPointResize(CGPoint value) DEPRECATED_MSG_ATTRIBUTE("Use WXPixelScale Instead");
+ (UIFont  * _Nullable )fontWithSize:(CGFloat)size textWeight:(CGFloat)textWeight textStyle:(WXTextStyle)textStyle fontFamily:(NSString * _Nullable)fontFamily DEPRECATED_MSG_ATTRIBUTE("Use +[WXUtility fontWithSize:textWeight:textStyle:fontFamily:scaleFactor:]");

@end
