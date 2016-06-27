# WXDevtool
Remote debug for your native iOS app using Chrome Developer Tools

## weex-debug启动：

0. 启动weex-debug

	0. $:npm install -g weex-debugger

	0. $:weex-debug   

		执行完会显示native需要链接的ws地址,之后自动打开chrome 。

## native 调用 
0. inspect调试
	* 程序启动时调用 +(void)launchInspectorWithSocketUrl:(NSURL *)url，url为terminal显示的ws地址。

	 eg：- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    //launch inspector
    [WXDebugTool launchInspectorWithSocketUrl:[NSURL URLWithString:@"ws://30.30.29.242:8088/debugProxy/native"]];
}
	 
	* 启动app，此时chrome页会显示你的设备与app name，选择启动inspector开启调试模式
	* 日志实时打印支持不同级别打印。eg：PDLogE()/PDLogW等

0. debugger调试
	* 程序启动时调用+ (void)launchDebugWithSocketUrl:(NSString *)url;
	 
	 eg：-(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    //launch debug
    [WXDebugTool launchDebugWithSocketUrl:@"ws://30.30.29.242:8088/debugProxy/native"];
}

	* 启动app，此时chrome页会显示你的设备与app name，选择启动debugger开启调试模式




￼