---
title: How it works  
type: guide
order: 4.1
has_chapter_content: false
chapter_title: Intro
version: 2.1
---

# How it works

## Overall Structure

Weex is a client-side technology on the surface, but in fact it connects the whole way from the local development environment to the cloud deployment and distribution.

Developers can first write an app page just like writing a web page, and then compile the app page into a piece of JavaScript which is called Weex JS bundle.

In the cloud, developers can deploy the generated JS bundle. And then it can be requested or pre-fetched from a mobile app with WeexSDK.

The WeexSDK would prepare a JavaScript engine to run corresponding JS bundle when user opens a Weex page anytime. Usually the JS bundle will make some calls to native-side through Weex JS bridge. They let native-side render the user interface or handle user interactions, storage data, make network communications, call device powers and so on.

Even if a user does not install the App, he can still open a same web page in the browser, using the same source code.

![How it works](../images/flow.png)

## Local Development Environment

The design of local development environment of Weex is based on the web development experience. It help web developers writing mobile app UI with their familiar HTML / CSS / JavaScript. At the same time Weex also do the official support to [Vue.js](https://vuejs.org/), a very great front-end framework.

In addition, the management of a Weex project is also very familiar with a web project. First, web developers can use npm packages to manage dependencies. Second, web developers can refer to all best practices from every process of a web project such as scaffolding, development, preview, debugging, test etc.

Also same as the best practice of web development, each Weex page will be built into a JS bundle. In the browser, we put JS bundle into the web page as a `<script>` tag. In the client, we put JS bundle into the local, and execute it in WeexSDK.

**Links**

* [Platform differences between Weex and web](../../references/platform-difference.html)
* [Differences of using Vue between Weex with web](../../references/vue/difference-with-web.html)
* [Get Started](../index.html)
* [Using Devtools](./devtools.html)

## Cloud Deployment & Distribution

Weex JS bundle can be deployed and distributed as a static resource. Almost all current web development system and best practice can be applied to Weex directly such as generating JS bundle through CMS system or deploying JS bundle to static CDN, monitoring JS bundle traffic through server log, caching or pre-fetching JS bundle to reduce networking cost etc.

## Client-side JavaScript Engine

Both iOS and Android client-side of Weex run a JavaScript engine to execute JS bundles and send well defined instructions to the native render layers. We choose JavaScriptCore in iOS and v8 in Android which provide strong performance and stability.

In order to make the mobile resources better utilized, we just run only one instance of JavaScript for all Weex pages. That is, all JS bundles share the same JavaScript instance, but each JS bundle context also isolated well by default in the runtime. We also put Vue 2.0 as a built-in JS Framework, developers do not have to pack it in each JS bundle, which save the size and time of networking.

## Client Rendering Layer

Weex offers both iOS and Android native rendering layers. Each of them are based on the Native DOM model and exposed to JavaScript APIs. At the same time we provide a set of native components and modules to use. Also Weex has high performance especially on first-screen loading time, memory cost and re-reuse of long list, etc.

Although Weex has provided a group of most commonly used components and modules officially. But we definitely know they couldn't satisfy everyone. So we design our native render as extendable as possible. You can extend more components and modules on your own. We can build and share an Weex eco-system together.

**Links**

* [Differences between Weex and web standard](../../references/web-standards.html)
* [Using Weex in iOS](../../references/ios-apis.html)
* [Using Weex in Android](../../references/android-apis.html)
* [Extend to iOS](../../references/advanced/extend-to-ios.html)
* [Extend to Android](../../references/advanced/extend-to-android.html)

## In the Browser

Besides iOS and Android client, Weex also has a web version based on Vue 2.0. Developers can just use Vue 2.0 to build the same page in browsers.

**Links**

* [Using Weex in HTML5](../../references/html5-apis.html)
* [Extend to HTML5](../../references/advanced/extend-to-html5.html)
