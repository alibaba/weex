# WXDevtool
Remote debug for your native iOS app using Chrome Developer Tools

## weex-devtool launch：

0. install and run weex-devtool

		$:npm install -g weex-devtool

		$:weex-devtool  

	it will launch chrome browser, showing wss ip address in chrome address bar.
	
	For more detailed instructions, redirect to [weex-toolkit](https://github.com/weexteam/weex-toolkit#weex-debug-command)
		
		
## playground install WXDevtool

1. Install dependencies.
   
       $:pod install

### Usage 

1. AppDelegate.m header file

		#import "WXDevTool.h"
		
2. Initialize inspector when the APP launched
	
	  **Note: The inspector API must be called before weex is initialized**
		
	   + (void)setDebug:(BOOL)isDebug;
			
	  isDebug default is NO, now you open inspect model. opposite is YES, if you set isDebug to YES, then open debug model and inspect model.
			
		 + (void)launchDevToolDebugWithUrl:(NSString *)url;		
	  wssip was the wss address showing in the chrome address bar.

	* open debug model and inspector model
	
	 	  eg：- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
			{
			  [WXDevTool setDebug:YES];
			  [WXDevTool launchDevToolDebugWithUrl:@"ws://wssip/debugProxy/native"];
			}
			
	* open inspect model, remove the @selector(setDebug:) or add [WXDevTool setDebug:NO]
	
	      eg：- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
			{
			  [WXDevTool launchDevToolDebugWithUrl:@"ws://wssip/debugProxy/native"];
			}

	 
3. Build and running APP, this time chrome will display your device with App name, select inspector to open the inspector tab.
4. Log print support for different levels of print.
	
       eg: #import "WXDevTool.h"
		   PDLogE()/PDLogW()
	
### WXDevtool Dependencies

Your app must be linked against the following frameworks/dylibs

* libicucore.dylib
* CFNetwork.framework
* CoreData.framework
* Security.framework
* Foundation.framework



￼