# How to debug With Weex-Toolkit ?

[Weex Toolkit](../tools/cli.md) is a multipurpose command line interface tool , it be designed to help you quickly  preview Weex `we file` and debug your  `we file`.

At present the only debug assist function of Weex toolkit is `Hot reload` , we will add more utility debug function soon.

After install weex toolkit， open your terminal and navigate to the directory where you save `we` file. then type

```
weex the_next_great_we_file.we
```

A browser window will open automatically to display render result of your `we` file. Trying to change some content of your `we` file and save the file .  your browser will immediately display these changes.


`Hot Reload` also work with Native Runtime in Weex Playground App , type

```
weex the_next_great_we_file.we  --qr
```

An QR code will be display in the terminal window, scan the QR using Weex Playground App ,your `we` file will be render in playground App. Update the file the render result will be update automaticly.












