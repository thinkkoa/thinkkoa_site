## Session

Session中间件 `think_session` 依赖 `think_cache`，因此在使用Session中间件之前，需要先在项目引入 `think_cache`中间件并做好挂载和配置,Session中间件存储介质由 `think_cache`中间件决定，也支持存储 file、memcache、redis。

### 安装

```
npm i think_session --save
```

### 引入中间件

1、项目中增加中间件 middleware/session.js
```
module.exports = require('think_session');
```

2、项目中间件配置 config/middleware.js:
```
list: [..., 'cache', 'session'], //加载的中间件列表
config: { //中间件配置
    ...,
    cache: {
        ...
    },
    session: {
        session_path: '', //file类型下文件存储位置
        session_name: 'thinkkoa', //session对应的cookie名称
        session_key_prefix: 'Session:', //session名称前缀
        session_options: {}, //session对应的cookie选项
        session_sign: '', //session对应的cookie使用签名
        session_timeout: 24 * 3600, //服务器上session失效时间，单位：秒
    }
}
```
### 使用

引入 `think_session `中间件后，`ctx` 对象上会自动扩展一个session方法：

```js
ctx.session(key, value, timeout);
```

读取session：

```js
//控制器中
this.session(key);

//中间件中
ctx.session(key);
```

写入session：

```js
//timeout单位秒，此处缓存超时时间为30s
//控制器中
this.session('name', 'test', 30);

//中间件中
ctx.session('name', 'test', 30);
```
