## Cache

缓存中间件 `think_cache` 支持存储 file、memcache、redis。

### 安装

```
npm i think_cache --save
```

### 引入中间件

1、项目中增加中间件 middleware/cache.js
```
module.exports = require('think_cache');
```

2、项目中间件配置 config/middleware.js:

```js
list: [...,'cache'], //加载的中间件列表
config: { //中间件配置
    ...
    cache: {
        cache_type: 'file', //数据缓存类型 file,redis,memcache
        cache_key_prefix: 'ThinkKoa:', //缓存key前置
        cache_timeout: 6 * 3600, //数据缓存有效期，单位: 秒

        //cache_type=file
        file_suffix: '.json', //File缓存方式下文件后缀名
        file_path: __dirname

        //cache_type=redis
        //redis_host: '127.0.0.1',
        //redis_port: 6379,
        //redis_password: '',
        //redis_db: '0',
        //redis_timeout: 10, //try connection timeout

        //cache_type=memcache
        //memcache_host: '127.0.0.1',
        //memcache_port: 11211,
        //memcache_poolsize: 10, //memcache pool size
        //memcache_timeout: 10, //try connection timeout,
    }
}

```
### 使用

引入 `think_cache`中间件后，`app` 对象上会自动扩展一个缓存方法：

```js
//在控制器中
this.cache(key, value, timeout);

//在中间件或服务类中获取缓存需要使用控制器的this.app对象
app.cache(key, value, timeout)
```

读取缓存：

```js
this.cache(key);
```

写入缓存：

```js
//timeout单位秒，此处缓存超时时间为30s
this.cache('name', 'test', 30);
```

删除缓存：

```js
this.cache('name', null);
```