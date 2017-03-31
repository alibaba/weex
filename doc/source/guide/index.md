---
title: Get Started  
type: guide
order: 1
version: 2.1
has_chapter_content: true
---

# Get Started

Weex is a framework for building Mobile cross-platform high performance UI. Developers can write `*.vue` files to build native pages or an App. This page will help you write a Weex page in 2 minutes.

## What is Vue?

[Vue.js](https://vuejs.org/) is an excellent progressive JavaScript framework written by [Evan You](https://twitter.com/youyuxi) which is very ease and flexible to use. Developers can write `*.vue` files with friendly `<template>`, `<style>`, `<script>` tags to build componentized web app. Now Weex and Vue has supported each other officially. Weex put Vue 2.x as its built-in JS Framework, and Vue has already been able to develop native mobile app.

## Hello world

The easiest way to try Weex is to use the [Playground App](../playground.html) and write a Hello World example at [dotWe](https://dotwe.org). You don't need to consider installing the development environment or writing native code, just do the following two things:

- Install the [Playground App](../playground.html) for your phone.
- Open [the Hello World example](http://dotwe.org/vue/4d5a0471ece3daabd4681bc6d703c4c1) in a new tab, click run, and then use the Playground App to scan the QR code.

Nailed it!

![mobile_preview](https://img.alicdn.com/tps/TB1Ymw3OpXXXXcvXpXXXXXXXXXX-500-1013.jpg)

It's too easy，right? Let's focus on the syntax, obviously this is vue.

You can try to modify the Hello World, then generate a new QR code to scan.

## Set up development environment 

You will need Node.js and the Weex CLi.

You can installing Node using [nvm](https://github.com/creationix/nvm) (Simple bash script to manage multiple active node.js versions). Run the following commands in a Terminal after installing nvm:

```bash
$ nvm install 6.10.0
$ nvm use 6.10.0
```

Node.js comes with npm, which lets you install the Weex Cli.

Run the following command in a Terminal:

```bash
$ npm install -g weex-toolkit@beta
```

**NOTE: ** If you get an error like "permission error",  try installing with `sudo`.


Then you can use the weex command to verify that the installation is successful:

![](https://img.alicdn.com/tps/TB1kHFrOFXXXXaYXXXXXXXXXXXX-615-308.jpg)

### Generate a new Weex project

You can use CLi to generate a Weex project called "awesome-project". Run the following command in a Terminal:

```bash
$ weex init awesome-project
```

Then we enter the awesome-project folder, the CLi has been for us to generate a standard project structure.

### Usage

We enter the awesome-project folder and install dependencies with the following commands:

```bash
npm install
```

Then we run `npm run dev` and `npm run serve` to start watch mode and static server.

Finally, we can see the Weex page in `http://localhost:8080/index.html`.

If you're curious to learn more about technical details, continue on to the next. And don't forget to write code at [dotWe](https://dotwe.org) and preview at anytime.
