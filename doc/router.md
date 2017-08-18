## 路由
ThinkKoa通过内置中间件 `think_router `自行实现了一套路由，并没有沿用Express及koa原生的路由。因此在使用自定义路由的时候需要参考阅读本文档。

### 路由配置
路由中间件 `think_router ` 的默认配置：

```js
config: { //中间件配置
    ...,
    router: {
        multi_modules: false, //多模块支持
        deny_modules: ['common'], //禁止访问的模块(多模块模式)
        default_module: 'home', //默认的模块，自动补全适用
        deny_controller: [], //禁止访问的控制器
        default_controller: 'index', //默认控制器，自动补全适用
        default_action: 'index', //默认方法，自动补全适用
        prefix: [], // url prefix
        suffix: ['.jhtml'], // url suffix
        subdomain_offset: 2,
        subdomain: {}, //subdomain
    }
}
```

### 模块化
根据项目的规模不同，小型的项目往往只有几个控制器文件，而大型的项目则由十几个甚至几十个功能子模块(文件夹)构成。为了满足不同的项目需要，ThinkKoa既支持简单直接的单模块(sigle module)模式，又支持满足复杂项目需要的多模块(multi module)模式。

#### 单模块(sigle module)模式
ThinkKoa默认配置支持的就是单模块模式:

```js
config: { //中间件配置
    ...,
    router: {
        multi_modules: false, //单模块模式
        ...
    }
}
```
单模块模式下，项目src/controller目录下为controller文件，子目录中的controller文件无法被访问。路由规则仅匹配`控制器/方法`

#### 多模块(multi module)模式

修改中间件配置文件开启多模块模式支持: 

```js
config: { //中间件配置
    ...,
    router: {
        multi_modules: true, //开启多模块模式支持
        ...
    }
}
```
多模块模式下，项目src/controller目录按照项目功能划分为一个个子文件夹，每个子文件夹代表一个具体的功能子模块，每个子文件夹内存在一个或多个controller文件。

### URL规范

#### URL定义

单模块(sigle module)模式：

url   |   解析后的pathname  | querystring   |  备注
------------- | ------------- | ------------- | -------------
hostname:port/user/add/username/test/age/21 | /控制器名(user)/方法名(add) | username=test&age=21 | 
hostname:port/user/add?username=test&age=21 | /控制器名(user)/方法名(add) | username=test&age=21 | 

多模块(multi module)模式：

url   |   解析后的pathname  | querystring   |  备注
------------- | ------------- | ------------- | -------------
hostname:port/admin/user/add/username/test/age/21 | /模块名(admin)/控制器名(user)/方法名(add) | username=test&age=21 | 
hostname:port/admin/user/add?username=test&age=21 | /模块名(admin)/控制器名(user)/方法名(add) | username=test&age=21 | 

#### URL匹配规则

单模块(sigle module)模式：

url   |   定位到的控制器文件  | 定位到的方法名   |  备注
------------- | ------------- | ------------- | -------------
hostname:port/user/add/username/test/age/21 | /app/controller/user.js | add | 
hostname:port/user/add?username=test&age=21 | /app/controller/user.js | add | 

多模块(multi module)模式：

url   |   定位到的控制器文件  | 定位到的方法名   |  备注
------------- | ------------- | ------------- | -------------
hostname:port/admin/user/add/username/test/age/21 | /app/controller/admin/user.js | add | 
hostname:port/admin/user/add?username=test&age=21 | /app/controller/admin/user.js | add | 

*注意：*

*1、url匹配中的模块、控制器、方法名只能是数字、字母、下划线，不支持特殊字符。*

*2、因为框架代码规范定义文件名必须小写，因此url地址注意大小写。*

#### 自动补全
某些情况下，我们在定义url地址的时候，可以做一些简化，ThinkKoa在url匹配时会自动补全。

单模块(sigle module)模式：

url   |   解析后的pathname  | querystring   |  备注
------------- | ------------- | ------------- | -------------
hostname:port/ | /控制器名(默认index)/方法名(默认index) |  | 
hostname:port/user | /控制器名(user)/方法名(默认index) |  | 
hostname:port/user?age=21 | /控制器名(user)/方法名(默认index) | age=21 | 

多模块(multi module)模式：

url   |   解析后的pathname  | querystring   |  备注
------------- | ------------- | ------------- | -------------
hostname:port/ | /模块名(默认index)/控制器名(默认index)/方法名(默认index) |  | 
hostname:port/admin/ | /模块名(admin)/控制器名(默认index)/方法名(默认index) |  | 
hostname:port/admin/user | /模块名(admin)/控制器名(user)/方法名(默认index) |  | 
hostname:port/admin/user/add?age=21 | /模块名(admin)/控制器名(user)/方法名(add) | age=21 | 

### URL过滤
有时候为了搜索引擎友好或者其他原因时，pathname 值并不是直接 / 模块 / 控制器 / 操作 / 的方式，而是含有一些前缀后者后缀。

比如：url 后加 .jhtml 让其更加友好，这种情况下可以通过下面的配置使其在识别的时候去除。

```js
config: { //中间件配置
    ...,
    router: {
        prefix: [], // url prefix
        suffix: ['.jhtml'], // url suffix
    }

```
通过路由的前缀和后缀配置，可以非常灵活的定制url地址，中间件在识别匹配时会自动忽略前缀和后缀。

### 自定义路由

除默认的单模块模式(controller/action)及多模块模式(module/controller/action）默认识别匹配以外，还支持用户定制路由。 

在项目中增加路由文件 src/config/router.js:

```js
module.exports = {
    test: ['/product', {
        get: "/home/product/index"
    }],
    test1: ['/product/:id', {
        get: "/home/product/detail",
        post: "/home/product/add",
        put: "/home/product/update",
        delete: "/home/product/delete",
    }],
    test2: ['/product', "/home/product/index"]
}

```

按照实际项目需求进行修改即可。
