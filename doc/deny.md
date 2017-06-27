## 禁止访问功能

ThinkKoa提供了颗粒度比较细的访问控制，不管是中间件、控制器、方法等都可以限制功能被URL访问。

### 禁止访问模块

中间件配置  src/config/middleware.js

```js

/**
 * Middleware config
 * @return
 */
module.exports = {
    list: [], //加载的中间件列表
    config: { //中间件配置 
        router: {
            multi_modules: true, //开启多模块支持
            deny_modules: ['common'], //禁止访问的模块(多模块模式)
        }
    }
};
```
通过上述配置，url访问  http://hostname:port/common/... 这样的地址时，均返回403


### 禁止访问控制器

中间件配置  src/config/middleware.js

```js

/**
 * Middleware config
 * @return
 */
module.exports = {
    list: ['cache', 'view'], //加载的中间件列表
    config: { //中间件配置 
        router: {
            deny_controller: ['api'], //禁止访问的控制器
        }
    }
};
```
通过上述配置，在单模块模式下，url访问  http://hostname:port/api/... 这样的地址时，均返回403。多模块模式配置项的值为 `['模块名/控制器名']`即可。

### 禁止访问控制器方法

ThinkKoa框架定义： 控制器中方法名不包含指定后缀(默认配置为Action)的方法，都无法被url直接访问。

```js
module.exports = class extends think.controller.base {

	init() {
		...
	}
	
	__before() {
	
	}
	
	__empty(){
	
	}
	
	_before_index() {
	
	}
}

```

在控制器方法内返回禁止访问：

```js

indexAction (){
	return this.deny(); //输出403禁止访问
}
```

### 中间件返回禁止访问

中间件中操作ctx上下文可以直接输出403状态。

```js
ctx.status = 403;
或者
ctx.throw(403, '禁止访问');

```
