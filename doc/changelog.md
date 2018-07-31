## 版本发布策略

* 小版本，如：1.0.1 => 1.0.2（小功能增加，bug 修复等，向下兼容）

* 中版本，如：1.0.0 => 1.1.0（较大功能增加，部分模块重构等，主体向下兼容，可能存在少量特性不兼容）

* 大版本，如：1.0.0 => 2.0.0（框架整体设计、重构等，不向下兼容）

以上情况会因为一些特殊情况进行调整。

## 更新日志

### 2.4.0 （推荐）

* 调整默认中间件的加载及执行顺序
* 支持自定义默认中间件的顺序(包括think_static、think_payload、think_router)
* 升级koa到2.5.2

### 2.3.6 

* 修复控制器中一处在特定情况下触发的bug

### 2.3.5 

* 移除控制器ok和fail方法不必要的选项

### 2.3.4 

* 更新依赖的KOA版本

### 2.3.3 

* 修复node运行环境版本检查的bug
* 优化缓存变量

### 2.3.2

* 优化控制器基类，减少继承层级
* 优化缓存变量，防止内存泄露

### 2.3.0

* 关闭因不规则URL导致的400错误记录日志，这会导致线上环境日志迅速增加
* 升级依赖的KOA版本到2.5.0
* 增加app.parseExp方法，作用是转换express中间件为koa使用
* 修复文档内一处使用express中间件的错误

### 2.2.0 

* 控制器增加`config`、`cache`方法方便开发
* 移除`think_session`中间件对`think_cookie`中间件的依赖，配置独立
* 调整默认不再加载`think_cookie`中间件，因为koa自身支持cookie，如果需要方便配置cookie，请自行引入
* 修复unhandledRejection监听未释放导致的轻微内存泄漏问题

### 2.1.0

* 完善框架jsdoc注释，方便使用`// @ts-check`等进行类型编译检查
* 修复控制器`render`方法参数数量错误的bug
* 调整部分文件方法，为支持`typescript`做准备

### 2.0.8

* 框架路径变量设置为 `getter` 防止被重载
* `process.env` 增加 `APP_DEBUG`属性
* 优化控制器部分方法的错误提示信息

### 2.0.6

* 调整`loader`基类挂载属性机制,防止`app`属性被下游重载
* 更新`devDependencies`依赖包版本

### 2.0.5 

* 调整`base`基类位置,修改构造方法
* `controller`基类不再继承自`base`类

### 2.0.0 

[升级指南](/doc/update_guid)

* 移除全局变量`think`,遵循commonjs的模块规范
* 重写框架机制,框架直接继承并扩展自`koa`类,兼容性和扩展性更好
* 中间件增加`app`对象并向下传递,方便扩展
* 框架增加静态属性`helper`、`loader`等工具函数库,方便在项目中引用


### 1.10.2

* 将日志处理独立为模块`think_logger`,优化日志打印输出以及存储
* 优化错误拦截处理,需要升级中间件`think_trace`

### 1.10.1 
* 将model跟框架解耦,`think.model`函数移入中间件`think_model`,如果中间件未加载此函数无效,方便准确定位错误;并且可以方便扩展支持其他ORM,需要升级中间件`think_model`
* 优化框架日志输出及记录,需要升级中间件`think_trace`

### 1.10.0
* 移除全局函数`think.await`,此函数初衷为解决并发转队列问题,但存在bug,且此类问题可以使用第三方库co实现
* 调整`loader.js`、`server.js`位置
* 修复node.js > 8.5在特定场景下的一个偶发bug
* 经过实际项目检验`1.9.0`进入稳定版本,发布稳定版本`1.10.0`

### 1.9.0
* 移除控制器方法`set`、`get`，请使用`this.ctx.set`及`this.ctx.get`代替
* 新增控制器方法`header`,用于获取或设置header项
* 移除控制器方法`querys`,请使用`this.ctx.querys`或者`this.get`代替
* 移除`think_context`中间件,部分功能合并到`think.controller.base`,对`ctx`的侵入性更小
* 升级框架到此版本需要同时升级`think_trace`、`think_view`中间件.

### 1.8.0 
* 升级babel相关模块到`6.26.0`,需升级`thinkkoa_cli`命令行工具
* 优化中间件加载及错误处理逻辑,需升级`think_trace`中间件
* 优化修复多路由规则处理,需升级`think_router`中间件
* 完善功能注释

### 1.7.4
* 修复`uncaughtException`类型错误拦截处理的bug
* 增加`controller`中`cookie`方法依赖检查

### 1.7.3 
* 原`think_http`中间件优化更名为`think_context`
* 原`think_error`、`think_logger`合并为`think_trace`中间件
* cookie处理独立为中间件`think_cookie`
* loader新增加载控制器的方法`loadControllers`

### 1.6.2 
* 控制器的`write`,`json`,`jsonp`,`ok`,`fail`等方法返回`prevent`中断,防止在`await`异步`catch`处理内调用未中断程序的bug
* 模板输出`render`返回`prevent`中断。需要升级`think_view`

### 1.6.1
* 修复`think.service`错误提示语bug
* 将`think.action`函数移入`think_controller`中间件
* 增加`unhandledRejection`拦截处理中对于`prevent`错误的处理
* 增加队列执行`think.await`函数

### 1.6.0
* 增加restful类型控制器基类，编写restful接口更加简单
* 增加restful类型控制器命令行创建命令支持`think controller --rest user`。需要升级`thinkkoa_cli`
* 将模板赋值方法`assign`移入`think_view`中间件。需要升级`think_view`
* 增加`prevent`类型错误以及错误处理。需要升级`think_error`
* 修改获取模板引擎渲染后内容的方法名`fatch` => `compile`，语义更加贴切
* 修改控制器`deny`方法，返回`prevent`错误中断后续执行
* 修改控制器`redirect`方法，返回`prevent`错误中断后续执行
* 移除`ctx.deny`方法，中间件内实现同类功能直接返回`ctx.throw(403)`即可
* 修改`ctx.write`方法，返回`prevent`错误中断后续执行。需要升级`think_http`

### 1.5.2 
* 废除`controller`中的 `this.echo`方法，请使用 `this.write`
* 废除`controller`中的 `this.header`方法，跟 `ctx.header` 容易混淆。请使用 `this.set` 及 `this.get`代替
* 修改`controller`中的 `this.get`方法，跟 `ctx.get` 功能保持一致。功能变更为获取header内容。原有功能获取querystring参数请使用`this.querys`
* 修改`controller`中的 `this.set`方法，跟 `ctx.set` 功能保持一致。功能变更为设置header内容。原有功能模板变量赋值请使用`this.assign`
* 修复特定场景下`npm start` 时加载模块资源清理缓存报错的bug。https://github.com/thinkkoa/thinkkoa/issues/4

### 1.4.8 
* 增加FIGlet打印

```js
  ________    _       __   __
 /_  __/ /_  (_)___  / /__/ /______  ____ _
  / / / __ \/ / __ \/ //_/ //_/ __ \/ __ `/
 / / / / / / / / / / ,< / /,</ /_/ / /_/ /
/_/ /_/ /_/_/_/ /_/_/|_/_/ |_\____/\__,_/
                     http://thinkkoa.org/
```

### 1.4.7 
* 移除think.logs函数，跟中间件`think_logger`完全解耦
* 支持多彩的控制台输出，错误一目了然
* 完全重写`think_logger`中间件，新增了一系列日志处理函数：

```js
think.logger()
think.logger.info()
think.logger.success()
think.logger.warn()
think.logger.error()
think.addLogs()
```


### 1.4.6
* 为更好的兼容性，移除跟ctx原生属性命名冲突的扩展属性

```
移除扩展的ctx.header()函数，ctx.type和ctx.get及ctx.set完全可替代

ctx.echo修改为ctx.write

ctx.get修改为ctx.querys，因为原生ctx.get功能为获取header
```

* 框架默认启用的中间件之间解耦

### 1.4.5 
* 将框架内的http中间件独立为think_http中间件
* 修改框架标示语：为敏捷开发为主题

### 1.4.4 
* 升级核心koa到2.3.0
* 升级模块babel-preset-env到1.6.0
* 升级模块eslint到4.1.1

### 1.4.3
* 将http timeout移入`think_error`中间件，统一拦截控制更加合理
* 优化http中间件
* 修复控制器json及jsonp方法输出的格式错误

### 1.4.1
* 优化think类run方法代码
* 移除多余的控制台输出
* 服务启动输出框架版本号前增加`v`
* 去除多余的配置项language
* 调整think.controller.base赋值位置，优化内存占用

### 1.4.0 
* 调整router中间件执行顺序，置于自定义中间件之后。给自定义中间件更大的定制空间。
* 将框架加载功能移入loader类
* 将server相关功能移入server类，方便扩展。
* 调整think.controller.base到lib.js内赋值，避免某些情况下的赋值错误。
* 修复结构调整后的单元测试用例。

### 1.3.0
* 增加单元测试用例
* 修复ctx属性命名冲突导致的`Cannot set property type of #<Object> which has only a getter`错误
* 修复think.logs入参debug为false时赋值逻辑错误

### 1.2.10
* 分离框架的错误拦截、日志记录、路由、静态文件、参数解析、模板渲染等功能成为独立中间件
* 移除框架中间件配置文件中的默认中间件配置，默认中间件配置自行在中间件内定义
* 修复1.0.0版本的bug，整理优化代码结构

### 1.0.0
* ThinkKoa发布!!!
