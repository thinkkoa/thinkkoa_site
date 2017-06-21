## 项目结构说明

创建项目后，会生成如下的目录结构：

```js
├── app　　　　　　　　　　　　　   //应用编译文件目录

├── logs　　　　　　　　　　　　　  //日志文件目录

├── node_modules　　　　　　　    //node模块目录

├── src　　　　　　　　　　　　     //应用源文件目录

    └──config                       //应用配置目录

        └──config.js                      //应用配置文件

        └──middleware.js                  //应用中间件配置文件

    └──controller　　　　            //应用控制器目录

    └──model　　　　　　　            //应用模型目录

    └──service　　　　　　　          //应用服务类目录

    └──view　　　　　　　             //应用模板目录

├── static　　　　　　            //应用静态资源目录css、js、img等

    └──css　　　　　　　              //应用静态资源目录css

    └──images　　　　　　　           //应用静态资源目录images

    └──js　　　　　　　               //应用静态资源目录js

├── index.js　　　　　　          //应用入口文件
```

## 文件说明

下面对几个重要的文件进行简单的说明。

### 应用入口文件

index.js

```js
const path = require('path');
const thinkkoa = require('thinkkoa');

//thinknode instantiation
const instance = new thinkkoa({
    root_path: __dirname,
    app_path: __dirname + path.sep + 'app',
    app_debug: true //线上环境切记要将debug模式关闭，即：APP_DEBUG:false
});

//app run
instance.run();
```

默认开启 debug 模式，该模式下文件修改后立即生效（运行了编译监听的情况下 npm run watch-compile），不必重启 node 服务。

**线上环境切记要将 debug 模式关闭，即：app_debug: false**

### 应用配置文件

src/config/config.js

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

此文件为应用配置。可以在配置文件中修改默认的配置值，如：将 http 监听的端口号由默认的 3000 改为 1234，那么这里加上 "app_port": 1234，重启服务后就生效了 (ps: 要把 url 中的端口号改为 1234 才能正常访问哦)。

**配置操作请见配置章节**

### 应用中间件配置文件

src/config/middleware.js

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

此文件为中间件配置。