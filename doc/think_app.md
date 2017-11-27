## app

thinkkoa类是继承自koa的: 

```js
class ThinkKoa extends koa {
    ...
}

```
因此thinkkoa的实例是koa实例的扩展。我们可以像使用koa一样来使用thinkkoa:

```
const thinkkoa = require('thinkkoa');

const app = new thinkkoa({
    rout_path:  ...
    app_path:  ...
});

app.use(function(ctx, next)) {
    ...
});

app.listen();

```

### 扩展属性和方法

app是koa实例的扩展，除了拥有原生的koa实例属性和方法外，ThinkKoa还扩展或者重载了以下属性：

### root_path

项目根目录

```js
/    //项目根目录
/app
/node_modules
/static
...
```

### app_path

项目app目录(项目程序执行目录)

```js
/    //项目根目录
/app //项目app目录(项目程序执行目录)
/static
...
```

### think_path

ThinkKoa框架目录

```js
/    //项目根目录
/app
/node_modules/thinkkoa //ThinkKoa框架目录
/static
...
```

### app_debug 

项目运行模式，为`true`时即开发模式，为`false`时即生产模式

### init(options)
初始化框架参数。

### use(fn)

运行koa中间件

### useExp(fn)

运行express中间件

### prevent()
返回一个prevent类型的错误，用于中断后续执行。该错误不会被框架作为错误处理，仅仅中断执行。

```js
return app.prevent();
```

### isPrevent(err)
判断err是否为一个prevent类型的错误。

```js
app.isPrevent(new Errror()); // false
```

### config([name, type = 'config'])

读取配置项。
* name 配置项 key
* type 配置类型，默认为项目配置。分为 config,middleware ...

```js
app.config('aa');

app.config('aa.bb'); // aa: {bb: 1}

app.config('config.cache', 'middleware');
```

### captureError()

框架错误拦截监听处理

### listen()

自动加载框架及应用文件，并启动一个HTTP服务，并监听指定的端口。

### cache()

`think_cache中间件`

缓存操作函数。支持 file、redis、memcache形式的存储。

[详细说明](/doc/cache.jhtml)

