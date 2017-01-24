---
title: iOS 扩展
type: advanced
order: 10
has_chapter_content: true
version: 0.10
---

## iOS 扩展

### Module 扩展

[swift](https://github.com/weexteam/article/issues/55) 扩展 module 

Weex SDK 只提供渲染，而不是其他的能力，如果你需要 像网络，图片，URL跳转这些特性，需要自己动手实现他们
例如，如果你想实现一个url地址跳转函数，你可以按照如下步骤实现一个 Module
1. **自定义module的步骤**
   1. 自定义的module类 必须实现 `WXModuleProtocol`
   2. 必须添加宏`WX_EXPORT_METHOD`, 它可以被weex识别，它的参数是 JavaScript调用 module指定方法的参数
   3. 添加`@synthesized weexInstance`，每个moudle对象被绑定到一个指定的实例上
   4. Module 方法会在UI线程中被调用，所以不要做太多耗时的任务在这里，如果要在其他线程执行整个module 方法，需要实现`WXModuleProtocol`中`- (NSThread *)targetExecuteThread`的方法，这样，分发到这个module的任务会在指定的线程中运行
   5. Weex 的参数可以是 String 或者Map
   6. Module 支持返回值给 JavaScript中的回调，回调的类型是`WXModuleCallback`,回调的参数可以是String或者Map
      
      ```object-c
      @implementation WXEventModule
      @synthesize weexInstance;
         WX_EXPORT_METHOD(@selector(openURL:callback))
      - (void)openURL:(NSString *)url callback:(WXModuleCallback)callback
      {
          NSString *newURL = url;
          if ([url hasPrefix:@"//"]) {
              newURL = [NSString stringWithFormat:@"http:%@", url];
          } else if (![url hasPrefix:@"http"]) {
             newURL = [NSURL URLWithString:url relativeToURL:weexInstance.scriptURL].absoluteString;
          }
      
          UIViewController *controller = [[WXDemoViewController alloc] init];
          ((WXDemoViewController *)controller).url = [NSURL URLWithString:newURL];
      
          [[weexInstance.viewController navigationController] pushViewController:controller animated:YES];
          callback(@{@"result":@"success"});
      }
      
      @end
      ```
2. **Register the module**
   通过调用 WXSDKEngine 中的 `registerModule:withClass`方法来注册自己的module
   
   ```object-c
   WXSDKEngine.h
   /**
   *  @abstract Registers a module for a given name
   *  @param name The module name to register
   *  @param clazz  The module class to register
   **/
   + (void)registerModule:(NSString *)name withClass:(Class)clazz;
   [WXSDKEngine registerModule:@"event" withClass:[WXEventModule class]];
   ```
3. **使用自己的module**
    这里的  require 里面的event 就是在 上一步调用`registerModule:` 注册module 时候的name
   
   ```javascript
    var eventModule = require('@weex-module/event'); 
    eventModule.openURL('url',function(ret) {   
        nativeLog(ret);
    });
   ```
   
   Weex SDK没有 图片下载，navigation 操作的能力，请大家自己实现这些 protocol

4. **WXImgLoaderProtocol**  

   weexSDK 没有图片下载的能力，需要实现 WXImgLoaderProtocol,参考下面的例子
   
   ```object-c
   WXImageLoaderProtocol.h
   @protocol WXImgLoaderProtocol <WXModuleProtocol>
   /**
    * @abstract Creates a image download handler with a given URL
    * @param imageUrl The URL of the image to download
    * @param imageFrame  The frame of the image you want to set
    * @param options : The options to be used for this download
    * @param completedBlock : A block called once the download is completed.
      image : the image which has been download to local.
      error : the error which has happened in download.
      finished : a Boolean value indicating whether download action has finished.
   */
   -(id<WXImageOperationProtocol>)downloadImageWithURL:(NSString *)url imageFrame:(CGRect)imageFrame userInfo:(NSDictionary *)options completed:(void(^)(UIImage *image,  NSError *error, BOOL finished))completedBlock;
   @end
   ```
   
   实现上述协议  
   
   ```object-c
   @implementation WXImgLoaderDefaultImpl
   #pragma mark -
   #pragma mark WXImgLoaderProtocol
   
   - (id<WXImageOperationProtocol>)downloadImageWithURL:(NSString *)url imageFrame:(CGRect)imageFrame userInfo:(NSDictionary *)userInfo completed:(void(^)(UIImage *image,  NSError *error, BOOL finished))completedBlock
   {
       if ([url hasPrefix:@"//"]) {
           url = [@"http:" stringByAppendingString:url];
       }
       return (id<WXImageOperationProtocol>)[[SDWebImageManager sharedManager] downloadImageWithURL:[NSURL URLWithString:url] options:0 progress:^(NSInteger receivedSize, NSInteger expectedSize) {     
       } completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType, BOOL finished, NSURL *imageURL) {
       if (completedBlock) {
           completedBlock(image, error, finished);
       }
       }];
   }
   @end
   ```

5. **handler注册** 
 
   你可以通过WXSDKEngine 中的 `registerHandler:withProtocol`注册handler
   
   ```object-c
   WXSDKEngine.h
   /**
   * @abstract Registers a handler for a given handler instance and specific protocol
   * @param handler The handler instance to register
   * @param protocol The protocol to confirm
   */
   + (void)registerHandler:(id)handler withProtocol:(Protocol *)protocol;
   
   [WXSDKEngine registerHandler:[WXImgLoaderDefaultImpl new] withProtocol:@protocol(WXImgLoaderProtocol)]
   ```
