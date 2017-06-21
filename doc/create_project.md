## Node.js环境

ThinkKoa 需要 Node.js 的版本 >=6.0.0，可以通过 node -v 命令查看当前 node 的版本。如果未安装 node 或者版本过低，请到 [Node.js](https://nodejs.org/) 官网进行安装或升级。
使用 ThinkKoa 时，假设你已经有了 Node.js 开发相关的经验。

## 安装脚手架thinkkoa_cli

为了方便开发，ThinkKoa专门开发了脚手架工具，使用工具可以很方便的在命令行快速创建项目或应用文件。

```js
sudo npm install -g thinkkoa_cli
```

如果安装失败，可能是 npm 服务异常或者是被墙了，可以使用国内的 [cnpm](http://npm.taobao.org/) 服务进行安装。如：

```js
sudo npm install -g thinkkoa_cli --registry=http://r.cnpmjs.org
```

## 创建项目

使用脚手架工具在合适的位置创建新项目，project_name为项目名称，脚手架工具会自动创建项目目录及必须的文件

```js
think new project_name
```

进入这个目录

```js
cd project_name
```

安装项目依赖

```js
npm install
```

## 启动服务

新开一个命令行窗口，执行命令

```js
npm start
```

或者

```js
node www/index.js
```

某些系统下用 apt-get 来安装 Node.js 的话，命令名可能为 nodejs

```
nodejs www/index.js
```

## 开始访问

打开浏览器，输入url [http://localhost:3000](http://localhost:3000) 默认监听3000端口，可通过配置文件修改

## 项目编译

项目根目录下的src目录是使用es6/7来写的项目源码,而程序运行的代码则在app目录，开启编译监听后会自动编译成为兼容代码到app目录

```
npm run watch-compile
```