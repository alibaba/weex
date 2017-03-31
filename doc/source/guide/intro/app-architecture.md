---
title: Mobile App Architecture
type: guide
order: 4.5
version: 2.1
---

# Mobile App Architecture

## Today's Mobile App

Let's talk about what we think a mobile app should be.

### Mobile App Needs Parallel Development

Nowadays, all mobile app teams requires the ability to develop in parallel. When a mobile app keeps growing, supporting large-scale parallel development must become a very important key thing. Otherwise it's really easy to become a bottleneck.

### Mobile App Needs to be Dynamic

Today the development of mobile apps is very heavy. And it's really slow in iteration, release, distribution and online bugfix. The size of the package of an app is growing fast too. All of this is not suitable for this mobile internet age. Mobile app needs to be dynaimic which is out of the cumbersome process of version deployment and distribution.

### Mobile App Needs Open Interconnection

Today in your phone, things are hard to connect and share between different apps. They needs some container with common standard and specs to be shared with each other.

## Our Thinking of Mobile App

We think a dynamic, parallel development supported, standardized mobile app should be like this:

```
|------|------|------|------| |-----|
| page | page | page | page | | api |
|------|------|------|------| | api |
| page | page | page | page | | api |
|------|------|------|------| | api |
| page | page | page | page | | api |
|---------------------------| | api |
|           router          | | api |
|---------------------------| |-----|
```

* Pages: A whole mobile app should be divided into several mobile pages. Each mobile page has its own "URL".
* Router: All the mobile pages above will be connected with router. And navigators or tab bars are just doing this job.
* Features: All kinds of APIs or services provided from the device. Every mobile page could use these features as they like.

So before you build your mobile app, make sure how many mobile pages your mobile app has and what are they. How do they connect each other. Give each mobile page a URL. And sort out all the APIs and services your mobile app needs.

Then create the pages and develop, debug and deploy them using Weex.

**Links**

* [Mobile page architecture](./page-architecture.html)

If you have built a complete mobile app already and just want to using Weex to rebuild part of these pages, that's absolutely no problem. Because Weex is just a SDK to build mobile pages which can coexist very well with other native views or hybrid pages.

If the feature of WeexSDK is limited to your mobile app. You can extend your own components and modules. It requires some native development knowledge. But with our efforts on delivering more and more features, we believe this part of job will be getting smaller and smaller.

**Links**

* [Extend to iOS](../../references/advanced/extend-to-ios.html)
* [Extend to Android](../../references/advanced/extend-to-android.html)
