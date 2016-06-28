function registerModules(modules){
    nativeLog("modules:" + modules);
}

function registerComponents(components){
    nativeLog("components:" + components);
}

function createInstance(id, source, option, data){
    eval(source);
}

function callJS(instance, tasks){
    nativeLog("test");
}