## 中间件

ThinkKoa框架默认加载了logger、error、payload、router、http、static、controller等常用的中间件，能够满足大部分的Web应用场景。用户也可以自行增加中间件进行扩展。

### 创建中间件

使用命令行工具thinkkoa_cli，在命令行执行命令:

```bash
//custom 为自定义中间件名
think middleware custom
```
会自动在项目目录生成文件 src/middleware/custom.js

中间件也可以进行多模块模式划分(非必须)：

```bash
think middleware admin/user
```
会自动在项目目录生成文件 src/middleware/admin/user.js

生成的中间件代码模板: 

```js

/**
 * Middleware
 * @return
 */

module.exports = function (options) {
    return function (ctx, next) {
        return next();
    }
};
```
其中ctx为koa的上下文句柄，next为下一中间件。

### 配置中间件
写好自定义的中间件以后，开始定义配置并挂载运行：

修改项目中间件配置 src/config/middleware.js

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
中间件的执行机制为只要挂载运行，每次request请求都会执行该中间件。在项目开发中，如果自定义的中间件中的功能仅需要运行一次，并不需要每次都执行。那么我们可以按照下面方式注入到启动事件队列内运行：

src/middleware/custom.js

```js
/**
 * Middleware
 * @return
 */

module.exports = function (options) {
    think.app.once('appReady', () => {
        //仅需要单次执行的代码
    });
    return function (ctx, next) {
        return next();
    }
};

```

### 使用koa中间件

ThinkKoa支持使用koa的中间件（包括koa1.x及2.x的中间件）：

src/middleware/passport.js

```js
module.exports = require('koa-passport');

```
挂载并配置使用： 

src/config/middleware.js

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

src/middleware/passport.js

```js
const passport =  require('express-passport');
module.exports = function (options) {
    return think.parseExpMiddleware(passport);
};

```
*注意：*

*express中间件数量众多，无法一一覆盖测试。而且大部分在koa内有对应的中间件。因此建议自行修改实现，尽量不要直接引用。*

### ctx上下文
见文档章节[API/ctx](/doc/index/doc/ctx.jhtml)
