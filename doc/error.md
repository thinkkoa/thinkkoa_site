## 错误处理

系统在处理用户请求时，会遇到各种各样的错误情况。如：系统内部错误，url 不存在，没有权限，服务不可用等，这些情况下都需要进行错误输出。

### 控制器错误处理

在控制器中，错误的输出分为三种情况：

* API接口错误输出，格式为JSON

```js

this.fail(errmsg, data, code, options);
or
this.error(errmsg, data, code, options);

errmsg： 错误提示信息
data： 输出数据项
code： 错误码，未传入默认500
options：定义错误输出的JSON对象key值
```

* 给用户显示错误页面

```js
//传入参数为错误模板物理路径
this.assign('errmsg', '没有权限');
this.render(process.env.APP_PATH + '/view/default/error.html');
```

* 抛出http错误状态

```js
//抛出404错误
this.ctx.throw(404, '未找到页面');
```
使用此方式抛出错误，框架会自动拦截，并显示默认的404或500等错误页面。对于用户来讲，并不是很好的体验，建议使用前两种方式做错误处理。

### 中间件错误处理

中间件中的错误处理直接操作ctx上下文即可：

```js
//使用此方式抛出错误，框架会自动拦截，并显示默认的404或500等错误页面
ctx.throw(500, '发生错误');
return; //直接返回，不再执行下一个中间件
```

`推荐的处理方式`：

```js
//使用自定义的错误页面
ctx.body = await ctx.compile(templateFile, data);
return;

//或者返回JSON
ctx.body = {"err_code": 500, "err_msg": "发生错误"};
return
```

### 服务类或其他文件内处理错误
服务类或其他文件，可以使用Promise.reject()或者 throw Error的方式来抛出错误:

```js
return Promise.reject('错误');
//或者
throw Error('发生错误');
```
需要注意的是，服务类等功能性的模块，并不会直接提供给http访问，http访问只会经过中间件和控制器。中间件或控制器在调用服务类或其他外部模块的时候，需要对这些外部模块抛出的错误进行拦截和处理，如果没有拦截处理，ThinkKoa框架会自动拦截，并返回统一的http 500 错误页。

### PREVENT\_NEXT\_PROCESS错误

我们在开发的时候，如果使用promise的写法，例如:

```js
let testService = new test();
return testService.getUserInfo().then(info => {
    return this.ok('获取用户信息成功', info);
}).catch(e => {
    return this.fail('获取用户信息失败' + e.message);
});

```
往往会出现一个奇怪的错误：
```js
Error: PREVENT_NEXT_PROCESS
...
```
这是因为在调用控制器 this.ok、this.fail、this.json、this.jsonp、this.render、this.display等方法时，
框架在输出response之后，会自动抛出一个Promise.reject("PREVENT\_NEXT\_PROCESS")来中断后续代码执行。
这个reject异常被上述代码的catch拦截后，就会出现这个错误。

处理方法：

1、使用 async/await:

```js
let testService = new test();
let info = await testService.getUserInfo().catch(e => {
    return this.fail('获取用户信息失败' + e.message);
});
return this.ok('获取用户信息成功', info);
```

2、调换 then和 catch的顺序：

```js
let testService = new test();
return testService.getUserInfo().catch(e => {
    return this.fail('获取用户信息失败' + e.message);
}).then(info => {
    return this.ok('获取用户信息成功', info);
});
```