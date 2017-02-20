---
title: Write once, Run Everywhere
type: guide
order: 4.4
version: 2.1
---

# Write Once, Run Everywhere

Weex is a "Write Once, Run Everywhere" solution.

* First, Weex is based on web dev experience, which including syntax and project management.
* Second, all components & modules in Weex is discussed by iOS, Android, web developers together to ensure it's common enough to satisfy every platforms.
* You only need write the same Weex code for each platforms.

We think about it in these aspects below:

1. Today for almost mobile apps, one app solves the same problem in different platforms. Weex hope to supply a lightweight way to describe your business logic which works well in all platforms you need.
2. For the differences of all mobile platforms, we are willing to fill the gap in 2 points:
    1. Design the same APIs for all platforms to ensure different platforms the same business logic description.
    2. Implement the APIs with different style or behaviors to ensure the implementation and user experience matching different platforms.
    3. If there are definitely some different features in different platforms. We also have some environment variables to help developers in certain detail situations.
3. We trust (web) standard is the best for all features in all platforms.
