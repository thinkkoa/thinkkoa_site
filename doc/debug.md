## 开发时自动重启

为方便快速开发，ThinkKoa使用 supervisor 进行监听自动重启。

### 开启debug模式


项目的index.js入口文件修改为debug模式： 

```js
/**
 * @license    
 * @version    
 */
const path = require('path');
const thinkkoa = require('thinkkoa');

//thinknode instantiation
const app = new thinkkoa({
    root_path: __dirname,
    app_path: __dirname + path.sep + 'app',
    app_debug: true //线上环境切记要将debug模式关闭，即：app_debug:false
});

//... app = new koa()


//app run
app.listen();
```

debug模式下，控制台会打印调试日志，方便进行错误跟踪和查看。在生产环境下请关闭debug模式

### 启动项目

```bash

npm start
```

当源代码目录`app`中文件发生修改，`supervisor `会自动重新启动项目。