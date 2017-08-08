## 修改默认中间件配置

ThinkKoa框架默认加载了一些常用的中间件:

```js
'trace', 'context', 'static', 'cookie', 'payload', 'controller'
```
这些中间件的配置在项目中未重新定义的时候，都会遵循各自的默认配置，我们可以根据项目的实际情况进行修改。

### 修改中间件配置
这里以静态资源中间件`static`举例： 

修改项目中间件配置  src/config/middleware.js

```js
/**
 * Middleware config
 * @return
 */
module.exports = {
    list: [], //加载的中间件列表
    config: {
        static: { //重新定义static中间件配置
            cache: false //关闭静态资源缓存
        }
    }
};

```

### 停止中间件
这里以缓存中间件`cache`举例： 

修改项目中间件配置  src/config/middleware.js

```js
/**
 * Middleware config
 * @return
 */
module.exports = {
    list: [], //加载的中间件列表
    config: {
        cache: false //直接将中间件配置改为false，该中间件在服务重启后跳过不再执行
    }
};

```

具体的中间件配置项请参考各个中间件说明，[ThinkKoa中间件列表](/doc/index/doc/plugin.jhtml)