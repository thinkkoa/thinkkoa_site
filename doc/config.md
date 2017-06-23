## 配置

ThinkKoa提供了丰富的配置项。配置分为：

1、应用配置

2、中间件配置

### 应用配置

使用thinkkoa_cli脚手架工具创建新项目后，默认生成的应用配置如下

/src/config/config.js

```js
module.exports = {
    /*app config*/
    app_port: 3000, 
    encoding: 'utf-8', //输出数据的编码
    language: 'zh-cn', //默认语言设置 zh-cn en

    /*auto-load config*/
    loader: {
        'controllers': {
            root: 'controller', //建议不要修改
            prefix: '', //设置为/支持子目录
        },
        'middlewares': {
            root: 'middleware', //建议不要修改
            prefix: '', //设置为/支持子目录
        },
        'models': {
            root: 'model', //建议不要修改
            prefix: '', //设置为/支持子目录
        },
        'services': {
            root: 'service', //建议不要修改
            prefix: '', //设置为/支持子目录
        }
    }
};
```

### 中间件配置

默认生成的中间件配置如下

/src/config/middleware.js

```js
module.exports = { 
    list: [], //加载的中间件列表
    config: { //中间件配置 
        // logger: {
        //     log: true, //是否存储日志
        //     level: ['warn', 'error'], //日志存储级别, info, warn, error, console类型日志有效
        // }
    }
};
```

### 读取配置

使用全局函数think.config可以在应用任何地方方便地读取配置值

```js
THINK.config('key');
```

读取配置支持子对象方式:

配置项:

```js
key : {
    aa : 'bb'
}
```

读取：

```js
THINK.config('key.aa');
```