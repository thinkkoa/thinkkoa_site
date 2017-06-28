## 创建项目

ThinkKoa需要 Node.js 的版本 &gt;=6.0.0，可以通过 node -v 命令查看当前 node 的版本。如果未安装 node 或者版本过低，请到 [Node.js](http://nodejs.org/) 官网进行安装或升级。

使用 ThinkKoa 时，假设你已经有了 Node.js 开发相关的经验。

### 安装命令行工具 thinkkoa_cli  
[![npm version](https://badge.fury.io/js/thinkkoa_cli.svg)](https://badge.fury.io/js/thinkkoa_cli)

为了方便开发，ThinkKoa团队开发了命令行工具，可以很方便的在命令行快速创建项目和文件。

```sh
sudo npm install -g thinkkoa_cli
```
如
果安装失败，可能是 npm 服务异常或者是被墙了，可以使用国内的 [cnpm](http://npm.taobao.org/) 服务进行安装。如：

```sh
sudo npm install -g thinkkoa_cli --registry=http://r.cnpmjs.org
```

### 创建项目

使用命令行工具在合适的位置创建新项目, project_name为项目名称，脚手架工具会自动创建项目目录及必须的文件

```sh
think new project_name
```

进入这个目录

```sh
cd project_name
```

### 安装项目依赖

```sh
npm install
```

### 启动服务

在命令行执行命令： 

```sh
npm run start
```

### 开始访问

打开浏览器，输入url [http://localhost:3000](http://localhost:3000)
默认监听3000端口，可通过配置文件修改

### 项目编译

项目根目录下的src目录是使用es6/7来写的项目源码,而程序运行的代码则在app目录，

在开发环境，开启编译监听后会自动编译成为兼容代码到app目录

```sh
npm run watch-compile
```
开启编译监听后再启动项目，如果src目录代码发生修改，app目录会自动编译同步，并且服务自动重启：

```sh
npm start
```

生产环境部署的时候，不需要开启编译监听，仅编译一次后运行：

```js
//npm start
npm run compile && node index.js

```
