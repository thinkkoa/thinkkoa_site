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
this.set('errmsg', '没有权限');
this.render(think.app_path + '/view/default/error.html');
```

* 代码块中抛出错误，交给框架拦截

```js
//抛出404错误
this.http.throw(404, '未找到页面');
or
this.ctx.throw(404, '未找到页面');
```

### 中间件错误处理

中间件中的错误处理直接操作ctx上下文即可：

```js

ctx.throw(500, '发生错误');
return; //直接返回，不再执行下一个中间件
```

### 服务类或其他文件内处理错误
服务类或其他文件，包括函数、类等，均使用throw Errow来抛出错误，框架会自动拦截处理。

```js
throw Error('发生错误');
```
