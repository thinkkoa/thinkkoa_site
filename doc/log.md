## 日志处理

通过`think_logger`中间件，框架提供了常见的日志处理场景，包括日志打印，日志记录。

### 中间件配置

修复项目中间件配置文件 src/config/middleware.js:

```js
config: { //中间件配置
    ...,
    logger: {
        log: true, //是否存储日志
        log_path: think.root_path + '/logs', //存储日志文件目录
        log_level: ['warn', 'error'], //日志存储级别, 'info', 'warn', 'error', 'success'
    }
}
```
注意，其中日志存储级别`log_level`如果包含 warn,error,info，使用`console.info`，`console.warn`，`console.error`都会被自动拦截处理：

```js
console.error('错误'); //控制台输出 [2017-07-12 20:38:33]  [ERROR]  错误
//如果开启存储日志，会同时写入日志文件内
```

### think.logger(type, css, ...args)

`think_logger中间件`

自定义控制台输出。

* type 控制台输出类型,例如 THINK, HTTP等
* css 控制台输出字符颜色,例如 white,grey,black,blue,cyan,green,magenta,red,yellow等
* ...args 其余可变参数。不限制参数个数

```js
think.logger('custom', 'blue', '测试内容');
think.logger('custom', 'green', '测试：', '测试内容');
think.logger('custom', 'blue', {"测试": "测试内容"});
think.logger('custom', 'blue', ['测试：', '测试内容']);
think.logger('custom', 'red', new Error('测试内容'));
```

### think.logger.info(...args)

`think_logger中间件`

自定义控制台输出info类型信息。

* ...args 可变参数。不限制参数个数

```js
think.logger.info('测试内容');
think.logger.info('测试：', '测试内容');
think.logger.info({"测试": "测试内容"});
think.logger.info(['测试：', '测试内容']);
think.logger.info(new Error('测试内容'));
```
### think.logger.success(...args)

`think_logger中间件`

自定义控制台输出success类型信息。

* ...args 可变参数。不限制参数个数

```js
think.logger.success('测试内容');
think.logger.success('测试：', '测试内容');
think.logger.success({"测试": "测试内容"});
think.logger.success(['测试：', '测试内容']);
think.logger.success(new Error('测试内容'));
```
### think.logger.warn(...args)

`think_logger中间件`

自定义控制台输出warn类型信息。

* ...args 可变参数。不限制参数个数

```js
think.logger.warn('测试内容');
think.logger.warn('测试：', '测试内容');
think.logger.warn({"测试": "测试内容"});
think.logger.warn(['测试：', '测试内容']);
think.logger.warn(new Error('测试内容'));
```
### think.logger.error(...args)

`think_logger中间件`

自定义控制台输出error类型信息。

* ...args 可变参数。不限制参数个数

```js
think.logger.error('测试内容');
think.logger.error('测试：', '测试内容');
think.logger.error({"测试": "测试内容"});
think.logger.error(['测试：', '测试内容']);
think.logger.error(new Error('测试内容'));
```

### think.addLogs(name, msgs)

`think_logger中间件`

自定义信息写入日志文件。日志文件默认存在在 项目目录/logs。可修改 `think_logger`中间件配置。

如果日志超过指定大小，会自动按照日期切割。

* name 日志文件名
* msgs 接收 Error、对象、字符串等类型数据

```js

//写入日志 logs/custom/test.log
await think.addLogs('test', {aa: 11});
```