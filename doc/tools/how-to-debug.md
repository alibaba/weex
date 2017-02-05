###How to Debug
####1.add dependency(iOS skip this step)
build.gradle

```` gradle
compile project(':weex_debug')
````  
setting.gradle

```` gradle
include ":weex_debug"  
project(":weex_debug").projectDir=new File("../weex_debug")
````

#####2.start server

Tip: if your local weex tool version<0.0.31 you shoud update your weex tool

````shell
npm install -g weex-toolkit
````  
Next: you can start local server

````shell
weex --debugger
````  

#####3.start debug
If you start server success you can find the address which like this:  
 ![IP](//gw.alicdn.com/mt/TB107u8JVXXXXcaXVXXXXXXXXXX-718-110.png)  
copy "http://30.10.217.78:4000/" to your browser。The browser will show a QR Code.  
Use your 'playgroud' to scan the code QR in your browser.you can find this content:  
![server](//gw.alicdn.com/mt/TB1EgO_JVXXXXa9XVXXXXXXXXXX-1698-648.png)

#####Device Log Level

The sort of Level Log is as follows：
Error > Warn > Info > Debug > Verbose > ALL.  

You select a different Debug Level, the device will send a log above this Level. 
For example, you select "Debug", the device will send "error", "Info","Warn" level log

Blue button is used to filter the log Level。  
For example, you select the "error", you can only see the "error" level log
![](//gw.alicdn.com/mt/TB1RtTmJVXXXXbfXpXXXXXXXXXX-1460-488.png)
