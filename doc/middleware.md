## 中间件

ThinkKoa框架默认加载了static、payload、router、controller等常用的中间件，能够满足大部分的Web应用场景。用户也可以自行增加中间件进行扩展。

### 创建中间件

使用命令行工具thinkkoa_cli，在命令行执行命令:

```bash
//custom 为自定义中间件名
think middleware custom
```
会自动在项目目录生成文件 app/middleware/custom.js

中间件也可以进行多模块模式划分(非必须)：

```bash
think middleware admin/user
```
会自动在项目目录生成文件 app/middleware/admin/user.js

生成的中间件代码模板: 

```js

/**
 * Middleware
 * @return
 */

module.exports = function (options, app) {
    return function (ctx, next) {
        return next();
    }
};
```
* options 中间件配置，src/config/middleware.js内config项中间件名同名属性值
* app thinkkoa实例
* ctx koa ctx上下文对象
* next 下一中间件操作句柄


### 配置中间件
写好自定义的中间件以后，开始定义配置并挂载运行：

修改项目中间件配置 app/config/middleware.js

```js
list: ['custom'], //加载的中间件列表
config: { //中间件配置 
	custom: {
		//中间件配置项
	}
}

```
多模块模式中间件配置: 

```js
list: ['admin/user'], //加载的中间件列表
config: { //中间件配置 
	'admin/user': {
		//中间件配置项
	}
}

```

### 单次执行
中间件的执行机制为只要挂载运行，每次request/response都会执行该中间件。

在项目开发中，往往某个功能仅需要运行一次即可，并不需要每次都执行。例如功能拓展，初始化赋值等等。

那么我们可以按照下面方式注入到启动事件队列内运行：

app/middleware/custom.js

```js
/**
 * Middleware
 * @return
 */

module.exports = function (options, app) {
    app.once('appReady', () => {
        //仅需要单次执行的代码
    });
    return function (ctx, next) {
        return next();
    }
};

```

### 使用koa中间件

ThinkKoa支持使用koa的中间件（包括koa1.x及2.x的中间件）：

app/middleware/passport.js

```js
module.exports = require('koa-passport');

```
挂载并配置使用： 

app/config/middleware.js

```js
list: ['passport'], //加载的中间件列表
config: { //中间件配置 
	'passport': {
		//中间件配置项
	}
}
```

### 使用express中间件

ThinkKoa支持使用express的中间件：

app/middleware/passport.js

```js
const passport =  require('express-passport');
module.exports = function (options, app) {
    return app.useExp(passport);
};

```
*注意：*

*express中间件数量众多，无法一一覆盖测试。而且大部分在koa内有对应的中间件。因此建议自行修改实现，尽量不要直接引用。*

### ctx上下文
见文档章节[API/ctx](/doc/think_ctx.jhtml)
