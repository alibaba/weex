# FAQ

## Command errors in Windows

Please install [Git for Windows](https://git-scm.com/download/win) first, see [For Windows](https://github.com/alibaba/weex/tree/dev#for-windows) for more information.


## Gradle errors in Android Studio

Downloading `license-gradle-plugin.jar` may trigger errors, like `Connection reset` or `peer not authenticated`.
Maybe a network problem, try a proxy or VPN.

## Use local image   
Weex's native runtime support load image file from device's disk, all you have to do set the file url like `file:///sdcard/image_new0.png`. As to load image file in your project, Weex is not support yet.   
    
## Error（`The header content contains invalid characters`) in windows
This's is caused by weex-toolkit's dependency 'http-server', whose old version is not working well in chinese windows environment. We have fixed that, you should upgrade weex-toolkit before use that.

## Playground app display nothing (white screen) after scan    
Best way to find out what's happening is read debug log, you can follow [this document](https://github.com/alibaba/weex/blob/doc/doc/tools/how-to-debug.md) to firgure out how to do that.