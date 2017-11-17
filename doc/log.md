## 日志处理

框架提供了常见的日志处理场景，包括日志打印，日志记录。

### 日志配置

修复项目中间件配置文件 app/config/config.js:

```js
config: {
    log: true, //是否存储日志
    log_path: process.env.ROOT_PATH + '/logs', //存储日志文件目录
    log_level: ['warn', 'error'], //日志存储级别, 'info', 'warn', 'error', 'success'
}
```

## logger

在项目中，可以引入 logger 来进行日志处理

```js
const {helper} = require('thinkkoa');

logger.info('test'); // 打印 test

```

### logger(type, option, ...args)

自定义控制台输出。

* type 控制台输出类型,例如 THINK, HTTP等
* option { print: true, css: 'blue', record: true, path: path } 
    print 是否在控制台打印日志
    css 控制台输出字符颜色,例如 white,grey,black,blue,cyan,green,magenta,red,yellow等
    record 是否保存为日志文件
    path 日志文件保存路径
* ...args 其余可变参数。不限制参数个数。类型为数组

```js
logger('custom', {css:'blue'}, ['测试内容']);
logger('custom', {css:'green'}, ['测试：', '测试内容']);
logger('custom', {css:'blue'}, [{"测试": "测试内容"}]);
logger('custom', {css:'blue'}, ['测试：', '测试内容']);
logger('custom', {css:'red'}, [new Error('测试内容')]);
```

### logger.info(...args)

自定义控制台输出info类型信息。

* ...args 可变参数。不限制参数个数

```js
logger.info('测试内容');
logger.info('测试：', '测试内容');
logger.info({"测试": "测试内容"});
logger.info(['测试：', '测试内容']);
logger.info(new Error('测试内容'));
```
### logger.success(...args)

自定义控制台输出success类型信息。

* ...args 可变参数。不限制参数个数

```js
logger.success('测试内容');
logger.success('测试：', '测试内容');
logger.success({"测试": "测试内容"});
logger.success(['测试：', '测试内容']);
logger.success(new Error('测试内容'));
```
### logger.warn(...args)

自定义控制台输出warn类型信息。

* ...args 可变参数。不限制参数个数

```js
logger.warn('测试内容');
logger.warn('测试：', '测试内容');
logger.warn({"测试": "测试内容"});
logger.warn(['测试：', '测试内容']);
logger.warn(new Error('测试内容'));
```
### logger.error(...args)

自定义控制台输出error类型信息。

* ...args 可变参数。不限制参数个数

```js
logger.error('测试内容');
logger.error('测试：', '测试内容');
logger.error({"测试": "测试内容"});
logger.error(['测试：', '测试内容']);
logger.error(new Error('测试内容'));
```

### logger.write(path, name, msgs)

自定义信息写入日志文件。日志会自动按照日期切割。
* path 日志文件保存物理路径
* name 日志文件名
* msgs 接收字符串类型数据

```js

//写入日志 logs/test_yyyy_mm_dd.log
await logger.write(process.env.ROOT_PATH + '/logs', 'test', JSON.stringify({aa: 11}));
```