## 配置

ThinkKoa提供了丰富的配置项。配置分为：

1、框架默认项目配置

2、框架默认中间件配置

3、应用项目配置

4、应用中间件配置

**配置项优先级：**

**应用配置 &gt; 框架默认配置**

**优先级高的配置会自动覆盖优先级低的同类配置**

### 框架默认配置

#### 框架默认项目配置
/node\_modules/thinkkoa/lib/config/config.js

```js
module.exports = {
  /*app config*/
  app_port: 3000,
  encoding: 'utf-8', //输出数据的编码
};
```
#### 框架默认中间件配置
/node\_modules/thinkkoa/lib/config/middleware.js

```js
module.exports = {
    list: [], //加载的中间件列表
    config: {//中间件配置 {logger: {log: true}}

    }
};
```
ThinkKoa 框架默认开启的中间件： 

```js
['trace', 'cookie', 'static', 'payload', 'router','controller']

trace： 错误拦截及日志记录
cookie：cookie处理
static：静态资源服务
payload：url querystring 及body paser
router：路由解析
controller：定位并执行控制器
```


### 应用配置
应用配置（包括应用项目配置及应用中间件配置）会继承并重载框架同名配置。

#### 应用项目配置

开发中可以根据具体应用需求参照框架配置项修改定制。例如我们修改项目监听端口号为8080：

/src/config/config.js

```js
module.exports = {
	app_port: 8080
}

```

#### 应用中间件配置

应用的中间件配置定义了项目中挂载的中间件以及具体中间件的配置：

/src/config/middleware.js

```js
list: [], //加载的中间件列表
config: { //中间件配置 
    
}
```

挂载自定义中间件:

```js
//注意此处的中间件名称，同文件名一致，例如 src/middleware/user.js
list: ['user'],
config: { //中间件配置 
        user: {
        	//user中间件具体配置项
        }
}
```

关闭框架默认中间件

/src/config/middleware.js

```js
//关闭框架默认的static中间件
list: [], //加载的中间件列表
config: { //中间件配置 
    static: false
}
```
*注意：*

*请确保您对框架中间件作用完全了解，否则请勿随意禁用，可能导致异常*

### 读取配置

使用全局函数think.config可以在应用任何地方方便的读取配置值

```
//读取项目配置
think.config('key');

//读取中间件配置
think.config('config.middleware_name', 'middleware'); 

//注意中间件配置包含list及config两个部分
{
    list: [], //加载的中间件列表
    config: { //中间件配置
        cache: {
            xxx: 1
        }
    }
}

//如果需要获取cache中间件xxx项的值,需要使用
think.config('config.cache', 'middleware').xxx; 

```

读取配置支持子对象方式:

配置项:

```
key1 : {aa : 'bb'}
```

读取：

```
think.config('key1.aa');
```

### 扩展配置

除项目配置和中间件配置以外，在开发中可自行扩展其他的配置文件。仅需要将扩展配置文件放入src/config/目录，框架会自动加载。

例如将项目某个功能的配置独立成为文件 src/config/custom.js

```js
module.exports = {
	//扩展配置内容
    key1: 1
}
```
读取扩展配置项:

```js
think.config('key1', 'custom');
```