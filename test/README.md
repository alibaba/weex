# Weex Cross-platform Test

## Setup

## [Setup Macaca](https://macacajs.github.io/zh/environment-setup)

## Run 

### Test Build-in Cases
0. Go root folder of weex Project
0. execute `npm install` to install all dependencies
0. execute `./test/serve.sh` to build and serve test bundles.
0. execute `./test/run.sh [platform]` to perform weex sdk tests, `platform` could be `all`(default),`android`,`ios`,`h5`.

### Test Separate Project **todo##
execute '`bash run.sh [platform] [path]`' will run test against `[path]` folder as long as it has same structure as SDK's 'test' folder.

## Develop

These tests target covering all build-in common components' and modules' functions. Including common UI patterns used by real-world application. Such as a list-based page, a form with all kind of input, etc.


### Folders

* `scripts`:    
    Test scripts. Test command will execute each script under this folder.
* `pages`:    
    Weex page scripts. These pages will be builded before running test cases. Actually,all the tests is running in these pages.