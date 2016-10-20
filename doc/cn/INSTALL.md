# Weex Document Site Build Process

## Get Latest Document Source
we maintain latest weex document in [doc branch](https://github.com/alibaba/weex/tree/doc) , please checkout this branch & pull latest content.      

```shell
$git checkout doc
$git pull origin doc
```

## Install Gitbook
we use [gitbook](https://github.com/GitbookIO/gitbook) for document site building,so you need install gitbook first

- Install [Node.js](http://nodejs.org/) 4.0+
- Install gitbook-cli
    
```shell
$npm install -g gitbook-cli
```

- check gitbook template version in book.json(“gitbook” attribute)
- install gitbook template

```
$gitbook fetch [GITBOOK_TEMPLATE_VERSION_IN_book.json];
$gitbook install;
```

## Build Document Site
```
$gitbook build
```
build result will be exist in `_book` directory.

## Preview
```
$gitbook serve
```
