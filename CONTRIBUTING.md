# Weex Contributing Guide

Welcome to create [Pull Requests](https://github.com/alibaba/weex/compare) or open [Issues](https://github.com/alibaba/weex/issues/new) for bugfix, doc, example, suggestion and anything.

## Branch Management

```
master
 ↑
dev         <--- PR(hotfix/typo/3rd-PR)
 ↑ PR
{domain}-feature-{date}
```  
Weex Branches

0. `master` branch
    0. `master` is the latest (pre-)release branch.
0. `dev` branch
    0. `dev` is the stable developing branch. [Github Release](https://help.github.com/articles/creating-releases/) is used to publish a (pre-)release version to `master` branch.
    0. ***It's RECOMMENDED to commit hotfix (like typo) or feature PR to `dev`***.
0. `{domain}-feature-{date}` branch
    0. The branch for a developing iteration, e.g. `android-feature-20160607` is an android developing iteration which is done at 2016.06.07. `{domain}` consists of `android`, `ios`, `jsfm` and `html5`. 
    0. **DO NOT commit any PR to such a branch**.

### Branch Name 

```
{module}-{action}-{shortName}
```

* `{module}`, see [commit log module](#commit-log)
* `{action}`
    * `feature`: checkout from `{module}` and merge to `{module}` later. If `{module}` not exists, merge to `dev`
    * `bugfix`: like `feature`, for bugfix only
    * `hotfix`: checkout from `master` or release `tag`, merge to `master` and `{module}` later. If `{module}` not exists, merge to `dev`

for example:

* `android-bugfix-memory`
* `jsfm-feature-communication`
* `android-hotfix-compute-layout`

## Commit Log

```
{action} [{module}] {description}
```

* `{action}`
    * `+` add
    * `*` update or bugfix
    * `-` remove
* `{module}`
    * Including: android, ios, jsfm, html5, component, doc, website, example, test, all 
* `{description}`
    * It's ***RECOMMENDED*** to close issue with syntax `close #123` or `fix #123`, see [the doc](https://help.github.com/articles/closing-issues-via-commit-messages/) for more detail. It's useful for responding issues and [release flow](https://github.com/alibaba/weex/releases/tag/v0.5.0).

for example:

* `+ [android] close #123, add refreshing for WebView`
* `* [doc] fix #123, update video auto-play property`
* `- [example] remove abc`


## Pull Request

[Create Pull Requests](https://github.com/alibaba/weex/compare).

## Contributor License Agreement
In order to contribute code to Weex, you (or the legal entity you represent) must sign the Contributor License Agreement (CLA).

You can read and sign the [Alibaba CLA](https://cla-assistant.io/alibaba/weex) online.

For CLA assistant service works properly, please make sure you have added email address that your commits linked to GitHub account.

Please read [How to setting your Email address in Git](https://help.github.com/articles/setting-your-email-in-git/) and [How to adding an email address to your GitHub Account](https://help.github.com/articles/adding-an-email-address-to-your-github-account/).

## Code Style Guide

### Objective-C

* Tabs for indentation(not spaces)
* `*` operator goes with the variable name (e.g. Type *variable;)
* Function definitions: place each brace on its own line.
* Other braces: place the open brace on the line preceding the code block; place the close brace on its own line.
* Use `#pragma marks` to categorize methods into functional groupings and protocol implementations
* Follow other guidelines on [GitHub Objective-C Style Guide](https://github.com/github/objective-c-style-guide)

### Java & Android 

* Use [Google Java Style](https://google.github.io/styleguide/javaguide.html) as basic guidelines of java code.
* Follow [AOSP Code Style](https://source.android.com/source/code-style.html) for rest of android related code style.
