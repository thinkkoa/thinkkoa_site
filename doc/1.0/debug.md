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
const instance = new thinkkoa({
    root_path: __dirname,
    app_path: __dirname + path.sep + 'app',
    app_debug: true //线上环境切记要将debug模式关闭，即：app_debug:false
});

//... instance.app = koa


//app run
instance.run();


```

### 开启项目编译监听

```bash

npm run watch-compile
```


### 启动项目

```bash

npm start
```

当源代码目录`src`中文件发生修改，编译监听会自动通过babel编译到`app`目录，`supervisor `会自动重新启动项目。