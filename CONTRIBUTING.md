# Weex Contributing Guide

Welcome to create [Pull Requests](https://github.com/alibaba/weex/compare) or open [Issues](https://github.com/alibaba/weex/issues/new) for bugfix, doc, example, suggestion and anything.

## Branch Management

```
master
 ↑
dev         <--- PR(hotfix/typo)
 ↑ PR
daily       <--- CI
 ↑ merge/PR
{domain}    <--- PR(feature/bugfix)
 ↑ merge/PR
{domain}-feature-{date}
```  
Weex Branches

0. `dev`, `master` branch
    0. `dev` is the stable developing branch，`master` is the latest (pre-)release branch.
    0. [Github Release](https://help.github.com/articles/creating-releases/) is used to publish a (pre-)release version to `master` branch.
    0. A hotfix or typo PR can be committed to `dev`.
0. `daily` branch
    0. `domain` branches are merged to `daily` every day.
    0. Weex CI is built to guarantee the stability of `daily`.
0. `{domain}` branch
    0. `{domain}` is the stable developing branch for the specific domain including `android`, `ios`, `jsfm` and `html5`.
    0. ***It's RECOMMENDED to commit feature or bugfix PR to `domain`***.
0. `{domain}-feature-{date}` branch
    0. The branch for a developing iteration, e.g. `android-feature-20160607` is an android developing iteration which is done at 2016.06.07. 
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
