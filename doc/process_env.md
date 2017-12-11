## process.env

process.env 用来读取或者设置系统环境变量, 在项目中可以类似全局变量一样直接使用。

### process.env.ROOT_PATH

项目根目录

```js
/    //项目根目录
/app
/node_modules
/static
...
```

### process.env.APP_PATH

项目app目录(项目程序执行目录)

```js
/    //项目根目录
/app //项目app目录(项目程序执行目录)
/static
...
```

### process.env.THINK_PATH

ThinkKoa框架目录

```js
/    //项目根目录
/app
/node_modules/thinkkoa //ThinkKoa框架目录
/static
...
```

### process.env.APP_DEBUG

项目运行模式，为`true`时即开发模式，为`false`时即生产模式

### process.env.NODE_ENV

项目运行模式，为`development`时即开发模式，为`production`时即生产模式

### process.env.LOGS

是否存储日志，为`true`时即开启存储，为`false`时即关闭日志存储

### process.env.LOGS_PATH

储日志文件目录，物理路径

### process.env.LOGS_LEVEL

日志存储级别, 包括['info', 'warn', 'error', 'success'] 或者其他自定义类型

