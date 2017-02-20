---
title: 官方扩展组件
type: references
order: 3
has_chapter_content: true
version: 0.10
---

# 官方扩展组件

Weex 官方扩展组件指的是以 `wxc-` 开头的组件，这些组件不属于内建组件的一部分，而是 Weex 团队基于内建组件扩展的一些常用组件。这些组件依赖 `weex-components`，需要安装依赖后才可使用。

使用方式如下：

1. 安装依赖

  需要在工程目录下执行以下命令：

  ```bash
  npm install weex-components
  ```

2. 使用

  需要在 `<script>` 中引入依赖。

  ```html
  <template>
    <div style="flex-direction: column;">
      <wxc-tabbar tab-items = {{tabItems}}></wxc-tabbar>
    </div>
  </template>

  <script>
    require('weex-components');

    module.exports = {
      data: {},
      methods: {
        // more
      }
    }
  </script>
  ```