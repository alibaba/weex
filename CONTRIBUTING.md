> **NOTICE: This document is outdated and will be rewritten. (WIP)**

# Contributing to Weex

Weex community respects all kinds of contributing, including but not limited to code, documentation, mailing list.

## Table of Content
* [Code of Conduct](#code-of-conduct)
* [Mailing List](#mailing-list)
* [Ask or Answer Questions](#mailing-list)
* [Development Process](#development-process)
* [Contribute Code or document](#contribute-code-or-document)
    * [Contribute Documentation](contribute-documentation)
    * [Contribute Code](#contribute-code)
* [Members and Governance Model](#members-and-governance-model)

# Code of Conduct
To make an open and friendly community, Weex community adopt [Contributor Covenant](./CODE_OF_CONDUCT.md) as the code of conduct.

# Mailing List
> If it didn't happen on a mailing list, it didn't happen.

In Weex community, feature requests, discussions and decisions happen on the mailing list, which is open to the whole world. Ref our [website](https://weex.apache.org/guide/contribute/how-to-contribute.html#mailing-list) to see more.

# Ask or Answer Questions
Weex Community [Github Issue](https://github.com/apache/incubator-weex/issues) to report and track bugs 。The more information provided in a Github issue, the sooner it get solved.

*Tip*:
> * Avoid duplicated: Always search on Github before you fire a new one.
> * Always run with the latest version before you fire a bug
> * Only report one bug in one Github Issue.

## Format of Github issue
Please use the [Bug Report](https://github.com/apache/incubator-weex/issues/new/choose) template when firing a bug. All the information needed to solve a bug is listed in the Bug report template , please fill it out as much as you can. **The more information provided in a Github issue, the sooner it get solved.**

*Tip*:
> Report bug with fact and expected behavior, not complaint or emotional words.

## Be patient
Compared to the amount of issues, Weex community may not response to your issues in time, please be patient.

*Tip*:
> If your Github issue doesn't get any response over a week, you can ask developers through [weex mailing list](https://weex.apache.org/guide/contribute/how-to-contribute.html#mailing-list).

# Development Process
Most of the development process is described in [confluence](https://cwiki.apache.org/confluence/x/eJBTBw), which services the contributors of Weex and is transparent to all users.

* [Release Plan](https://github.com/apache/incubator-weex/milestones): All feature, bugfix, issue-solved are associated with a certain milestone since Weex 0.27. As every Weex release needs approval from PPMC and IPMC, the due date of milestone is just an estimation of release date, not accuracy schedule.
* [Release Procedure](https://cwiki.apache.org/confluence/x/_I5TBw)
* [Major feature](https://github.com/apache/incubator-weex/projects)
* [System Design](https://cwiki.apache.org/confluence/x/XYxTBw)
* [Road Map](https://cwiki.apache.org/confluence/x/fJBTBw)

# Contribute Code or document
In Weex community, **Documentation is as important as code**, and Weex community respects all the contribution of documentation or code.

*Tip*:
> Weex adopts [Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/) as its open source license. Make sure your contribution obeys the requirement of Apache License 2.0.

## Contribute documentation
Documentation with good quality is a great help to developers. If there is a powerful API that is not easy to use, it becomes useless. So, we welcome contributions to help documentation of Weex become precise and easy to read.

You can contribute to a document through the following ways:
* Click **Edit this page** on the bottom of website, and you will be navigated to a new Github PR.

## Contribute code
### Before Coding
#### Use master branch
The development of Weex is on master branch, you should write your code based on master branch.

#### Check License
Weex adopts [Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/) as its open source license. Make sure your potential contribution obeys the requirement of Apache License 2.0.

#### Bug or Feature ?
* If you are going to fix a bug of Weex, check whether it already exists in [Github Issue](https://github.com/apache/incubator-weex/issues). If it exists, make sure to write down the link of the corresponding Github issue in the PR you are going to create.
* If you are going to add a feature for weex, reference the following recommend procedure:
    1. Writing a email to [mailing list](https://weex.apache.org/guide/contribute/how-to-contribute.html#mailing-list) to talk about what you'd like to do.
    1. Write the corresponding [document](#contribute-documentation)

### Coding
1. [Fork](https://help.github.com/articles/fork-a-repo/) the Github repository at [https://github.com/apache/incubator-weex](https://github.com/apache/incubator-weex).
1. Clone the forked repository and create a new branch from `master` to push your commits to.
1. Develop your feature or bug fix in your new branch. Make sure your code meets the [style guidelines](#code-style-guidelines).
1. Add the **License** below to the top of any new file(s) you've added.

        /*
        * Licensed to the Apache Software Foundation (ASF) under one
        * or more contributor license agreements.  See the NOTICE file
        * distributed with this work for additional information
        * regarding copyright ownership.  The ASF licenses this file
        * to you under the Apache License, Version 2.0 (the
        * "License"); you may not use this file except in compliance
        * with the License.  You may obtain a copy of the License at
        *
        *   http://www.apache.org/licenses/LICENSE-2.0
        *
        * Unless required by applicable law or agreed to in writing,
        * software distributed under the License is distributed on an
        * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
        * KIND, either express or implied.  See the License for the
        * specific language governing permissions and limitations
        * under the License.
        */

1. Commit all the changes to your branch.

*Tip*:
> If you are writing Java or C++ with Android Studio, **License** will be added to the head of the file automatically.

#### Code Style Guidelines

##### Objective-C

* Tabs should be used for indentation. Please do not use spaces.
* `*` operator goes with the variable name (e.g. Type *variable;)
* For function definitions, place each brace on its own line.
* For all the other braces, place the open brace on the line preceding the code block and place the close brace on its own line.
* Use `#pragma marks` to categorize methods into functional groupings and protocol implementations
* Follow other guidelines on [GitHub Objective-C Style Guide](https://github.com/github/objective-c-style-guide)

##### Java & Android
* Use [Google Java Style](https://google.github.io/styleguide/javaguide.html) as basic guidelines of java code.
* Follow [AOSP Code Style](https://source.android.com/source/code-style.html) for rest of android related code style.

##### C & C++
* Use [Google C++ Style ](https://google.github.io/styleguide/cppguide.html)  as basic guidelines of C++ code
* Weex defines [a subset of the Google C++ development specification](https://github.com/jianhan-he/C-Style-Guide/blob/master/C%2B%2B_Style_Guide_en.md) that covers some of the major C++ scenario usage specifications.

### Publish your Change
[Open a pull request](https://help.github.com/articles/using-pull-requests/) against the `master` branch of `apache/incubator-weex`. Make sure following guidelines are considered when creating a pull request.

1. One PR should solve only one problem.
1. The PR title should be the form of `[COMPONENT] Summary`:
    * `COMPONENT` is one of the mentioned PR categories (android, iOS, JsFm, web, test, etc..).
    * `Summary` should be a brief description of your change within one sentence.
1. Content description of PR
    * If the PR is about fixing a bug *excluding crash*, a [demo](http://editor.weex.io/) is necessary in code's description.
    * If the PR is about adding a new feature, another [PR for documentation](#contribute-documentation) is necessary in codes' PR description.
    * *Optional* If the PR fixes an existing Github issue, you may add the link to the corresponding issue in the PR.

There will be a static check program when you submit a PR,and the following rules will be checked:
1. Check if your PR is submitted to master branch, if not, you will failed.
1. Check if your PR is bounded with a milestone, if not, you will receive a warning message.
1. Check if your PR description contains keywords `Documentation` and it's corresponding http links. if not, you will receive a warning message.
1. Check if your PR description contains keywords `Demo` and it's corresponding http links. if not, you will receive a warning message.
1. Check if your PR modify the changelog.md, if not,you will receive a warning message.

*Tip*:
> Reviewing PR may take a great deal of time, please be patient. If your PR doesn't get response over 96 hours, you might send an email to [mailing list](https://weex.apache.org/guide/contribute/how-to-contribute.html#mailing-list) to ask the progress.

# Members and Governance Model
You can find committers, PPMCs and governance model of Weex from [confluence](https://cwiki.apache.org/confluence/x/bFoyBw).
