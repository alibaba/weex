# WXDevtool
Remote debug for your native iOS app using Chrome Developer Tools

## weex-devtool launch：

0. install and run weex-devtool

		$:npm install -g weex-devtool

		$:weex-devtool  

	it will launch chrome browser, showing wss ip address in chrome address bar.
		
		
## playground install WXDevtool

1. Install dependencies.
   
       $:pod install

### Usage
0. run inspect 
	* AppDelegate.m header file

			#import "WXDevTool.h"
		
	* Initialize inspector when the APP launched
	
	    **Note: The inspector API must be called before weex is initialized**
		
			  +(void)launchInspectorWithSocketUrl:(NSString *)url;		
	   wssip was the wss address showing in the chrome address bar.

	 		eg：- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
			{
			[WXDevTool launchInspectorWithSocketUrl:@"ws://wssip/debugProxy/native"];
			}

	 
	* Build and running APP, this time chrome will display your device with App name, select inspector to open the inspector tab.
	* Log print support for different levels of print.
	
			eg：PDLogE()/PDLogW()

0. run debugger
	* Initialize debugger API when the APP launched
	
	  **Note:The Debugger API must be called before weex is initialized**
	
		  +(void)launchDebugWithSocketUrl:(NSString *)url;

	   wssip was the wss address showing in the chrome address bar.
	 
	 	  eg：-(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
			{
    		[WXDevTool launchDebugWithSocketUrl:@"ws://wssip/debugProxy/native"];
			}

	* Build and running APP, this time chrome will display your device with name app, select debugger to open the debug tab.
	
### WXDevtool Dependencies

Your app must be linked against the following frameworks/dylibs

* libicucore.dylib
* CFNetwork.framework
* CoreData.framework
* Security.framework
* Foundation.framework

**Note: in current devtool version, inspector and debugger can only be used separately(build and run), in next version (very soon) they could be used at the same time **



￼