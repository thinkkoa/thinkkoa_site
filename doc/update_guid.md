## 升级指南

ThinkKoa 2.x 版本相对于 1.x版本变化较大，升级具体修改需要仔细参考API文档进行

### 工具函数

弃用全局变量 `think` , 原有的工具类函数放到 `thinkkoa.helper`

```js
// 2.x
const {helper} = require('thinkkoa');

helper.isString('xx'); //true
```
对照表

ThinkKoa 1.x | ThinkKoa 2.x
------------- | -------------
think.sep | helper.sep
think.eq | helper.eq
think.gt | helper.gt
think.gte | helper.gte
think.lt | helper.lt
think.lte | helper.lte
think.isArray | helper.isArray,
think.isBoolean | helper.isBoolean,
think.isBuffer | helper.isBuffer,
think.isDate | helper.isDate,
think.isEqual | helper.isEqual,
think.isError | helper.isError,
think.isFunction | helper.isFunction,
think.isIP | helper.isIP,
think.isMap | helper.isMap,
think.isNull | helper.isNull,
think.isNaN | helper.isNaN,
think.isUndefined | helper.isUndefined,
think.isNumber | helper.isNumber,
think.isObject | helper.isObject,
think.isRegExp | helper.isRegExp,
think.isRegexp | helper.isRegExp,
think.isSet | helper.isSet,
think.isString | helper.isString,
think.isSymbol | helper.isSymbol,
think.isNumberString | helper.isNumberString,
think.isJSONObj | helper.isJSONObj,
think.isJSONStr | helper.isJSONStr,
think.isEmpty | helper.isEmpty,
think.isTrueEmpty | helper.isTrueEmpty,
think.toString | helper.toString,
think.toInt | helper.toInteger,
think.toNumber | helper.toNumber,
think.toArray | helper.toArray,
think.escapeHtml | helper.escapeHtml,
think.escapeSpecial | helper.escapeSpecial,
think.ucFirst | helper.ucFirst,
think.md5 | helper.md5,
think.rand | helper.rand,
think.encryption | helper.encryption,
think.decryption | helper.decryption,
think.datetime | helper.datetime,
think.inArray | helper.inArray,
think.arrUnique | helper.arrUnique,
think.arrRemove | helper.arrRemove,
think.isFile | helper.isFile,
think.isDir | helper.isDir,
think.isWritable | helper.isWritable,
think.chmod | helper.chmod,
think.readFile | helper.readFile,
think.writeFile | helper.writeFile,
think.reFile | helper.reFile,
think.rmFile | helper.rmFile,
think.mkDir | helper.mkDir,
think.readDir | helper.readDir,
think.rmDir | helper.rmDir,
think.hasOwn | helper.hasOwn,
think.isPromise | helper.isPromise,
think.promisify | helper.promisify,
think.isGenerator | helper.isGenerator,
think.generatorToPromise | helper.generatorToPromise,
think.defer | helper.getDefer,
think.getDefer | helper.getDefer,
think.require | helper.thinkrequire,
think.clone | helper.clone,
think.extend | helper.extend,
think.hasOwn | helper.hasOwn,
think.define | helper.define,
think.toFastProperties | helper.toFastProperties

### 其他扩展的函数及属性

ThinkKoa 1.x | ThinkKoa 2.x
------------- | -------------
think.cache | app.cache
think.i18n | app.i18n
think.config | app.config
think.service | 弃用,require加载后使用new实例化
think.controller | 弃用,require加载后使用new实例化
think.model | 弃用,require加载后使用new实例化
think.action | 弃用
think.root\_path | process.env.ROOT\_PATH 或 app.root\_path
think.app\_path | process.env.APP\_PATH 或 app.app\_path
think.think\_path | process.env.THINK\_PATH 或 app.think\_path

注意在控制器中需要使用this.app, 中间件内可以直接使用app

### 控制器

1、控制器继承基类也有所变化

```js
// 2.x
const {controller, helper} = require('thinkkoa');

module.exports = class extends controller {

}
```


ThinkKoa 1.x | ThinkKoa 2.x
------------- | -------------
think.controller.base | controller
think.controller.restful | controller.restful


2、修改控制器构造方法, 增加app入参:

```js

init(ctx, app) {
    ...
}

```


### 中间件

中间件的写法发生变化,增加了 `app` 入参

```js
module.exports = function (options, app) {
    ...
    return function (ctx, next) {
        ...
    }
}

```

### 服务类

服务类基础的父类写法更改:

```js
const {base, helper} = require('thinkkoa');

module.exports = class extends base {
    ...
}

```

### 模型类

模型类增加定义modelName属性:

```js
// app/model/user.js
init(config) {
    this.modelName = 'user';
}
```

### 项目入口文件

修改项目根目录下的入口文件:

```js
const path = require('path');
const thinkkoa = require('thinkkoa');

//thinkkoa instantiation
const app = new thinkkoa({
    root_path: __dirname,
    app_path: __dirname + path.sep + 'app',
    app_debug: true //线上环境切记要将debug模式关闭，即：app_debug:false
});

//... app = new koa()

//app server
app.listen();

```

### 项目package.json

如果项目中使用了官方提供的中间件，需要升级为对应的2.x版本

ThinkKoa 1.x | ThinkKoa 2.x | 备注
------------- | ------------- | -------------
think\_cache: 1.x.x | think\_cache: 2.x.x |
think\_lib: 1.x.x | think\_lib: 2.x.x |
think\_store: 1.x.x | think\_store: 2.x.x | 
think\_session: 1.x.x | think\_session: 2.x.x | 
think\_upload: 1.x.x | think\_upload: 2.x.x | 
think\_loader: 1.x.x | think\_loader: 2.x.x | 
think\_logger: 1.x.x | think\_logger: 2.x.x | 
think\_model: 1.x.x | think\_model: 2.x.x | 
think\_view: 1.x.x | think\_view: 2.x.x | 
think\_csrf: 1.x.x | think\_csrf: 2.x.x | 
think\_i18n: 1.x.x | think\_i18n: 2.x.x | 
think\_trace: 1.x.x | think\_trace: 2.x.x | 此模块如果在package.json未定义,则无需升级。框架自动依赖
think\_static: 1.x.x | think\_static: 2.x.x | 此模块如果在package.json未定义,则无需升级。框架自动依赖
think\_payload: 1.x.x | think\_payload: 2.x.x | 此模块如果在package.json未定义,则无需升级。框架自动依赖
think\_cookie: 1.x.x | think\_cookie: 2.x.x | 此模块如果在package.json未定义,则无需升级。框架自动依赖
think\_router: 1.x.x | think\_router: 2.x.x | 此模块如果在package.json未定义,则无需升级。框架自动依赖
think\_controller: 1.x.x | think\_controller: 2.x.x | 此模块如果在package.json未定义,则无需升级。框架自动依赖