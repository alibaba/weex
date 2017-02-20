---
title: Web Dev Experience
type: guide
order: 4.2
version: 2.1
---

# Web Dev Experience

## What is Web Dev Experience?

Weex dev experience is very close to web dev experience. It describes the UI structure and content with HTML or HTML-based template, describes the UI style with CSS, and describes user behavior and business logic with JavaScript. And it has completed project mechanism.

## Why We Choose Web Dev Experience?

1. There are a huge number of web developers in the community today. Weex can give more web developers abilities to build high-performance and great-experienced mobile apps.
2. Web development itself has very high efficiency and flexibility. And Weex is committed to solve the dynamic requirement of mobile apps. They just match each other.
3. Web standards and web dev experience is built by a lot of outstanding technology companies together. It has very high quality assurance.
4. Standard itself is a force. Base on standards, respect for standards, close to the standard means that there are more possibilities.
5. The eco-system and community of web today are very prosperous. There are many mature tools, libraries, systems, best practices to be used.

## How Does Weex Support Web Standard?

We have the following aspects to sort out:

* HTML tags: Weex currently supports basic container (div), text, image, video and other components. And almost all of HTML block-level tags can be simulated through the custom container components. Inline-level tags can be simulated  through the custom text components. And Weex also supports some form components such as input / textarea.
* CSS: Weex supports some commonly used CSS properties, values and units. We will continue to support more based on user feedback and the usage frequency in web.
* JavaScript: Weex currently offers a simplified version of the DOM APIs for operating the native UI. And Weex will continue to support more W3C Device APIs.
* About frameworks, Weex officially build Vue 2.0 in. and support its related libs such as vuex, vue-router, etc. At the same time developers can directly use all kinds of third-party JavaScript libs.
* About engineering, we recommend using npm to pack and manage deps. And we recommend webpack for the JS bundle package. Also we provide weex-devtool, which make developers debug native app just like in Chrome devtools. Weex also is friendly to current mainstream web page publishing system, caching mechanism and other best practices.

**Links**

* [Differences between Weex and web standard](../../references/web-standards.html)
* [Using Vue.js](./using-vue.html)
* [Using Devtools](./devtools.html)
