#!/usr/bin/env node
var fs = require("fs")
var _ = require("underscore")
var html = require("html")

var HP = "html/"

var partialDic = {}
var partials = fs.readdirSync(HP)
partials = _.filter(partials, function(f){return   f.endsWith(".tpl")})
for (var i=0 ;i< partials.length ; i++){
    var key = partials[i]
    var value  = fs.readFileSync(  HP+key , {encoding :'utf8'}  )
    key = key.split(".")[0]
    partialDic[key] = value
}

var templates = fs.readdirSync(HP)
templates = _.filter(templates,function(f){return f.endsWith(".html")})
for (var i=0; i< templates.length ; i++){
    var key = templates[i]
    var templateContent  = fs.readFileSync(  HP+key , {encoding :'utf-8'}  )
    var res = _.template(templateContent)(partialDic)
    res = html.prettyPrint(res)
    fs.writeFileSync(key,res)
}


