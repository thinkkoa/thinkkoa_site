## ctx

Koa处理请求的过程：当请求到来的时候，会通过req和res来创建一个context (ctx)，然后执行中间件。Koa并没有改变req和res，而是通过req和res封装了一个ctx (context)对象，进行后面的逻辑处理。ThinkKoa在koa的基础上，给ctx对象扩展了一些实用的特性。

### ctx.startTime

`ThinkKoa扩展` `think_trace中间件`

request处理开始时间，用于输出和记录处理时长

### ctx.version

`ThinkKoa扩展` `think_trace中间件`

http协议版本

### ctx.originalPath

`ThinkKoa扩展` `think_trace中间件`

因为ctx.path在中间件处理的时候可能发生变化，originalPath属性保存原始请求path。

### <del>ctx.isGet()</del> [Deprecated on 1.9.0]

`ThinkKoa扩展` `think_context中间件`

判断当前request是否GET请求。

### <del>ctx.isPost()</del> [Deprecated on 1.9.0]

`ThinkKoa扩展` `think_context中间件`

判断当前request是否POST请求。

### <del>ctx.isAjax()</del> [Deprecated on 1.9.0]

`ThinkKoa扩展` `think_context中间件`

判断当前request是否Ajax请求。

### <del>ctx.isPjax()</del> [Deprecated on 1.9.0]

`ThinkKoa扩展` `think_context中间件`

判断当前request是否Pjax请求。

### <del>ctx.isJsonp()</del> [Deprecated on 1.9.0]

`ThinkKoa扩展` `think_context中间件`

判断当前request是否JsonP请求。

### <del>ctx.referer([host])</del> [Deprecated on 1.9.0]

`ThinkKoa扩展` `think_context中间件`

获取传入host的hostname作为referer；如果未传递参数，则当前request的headers.referer。

### <del>ctx.types([contentType, encoding])</del> [Deprecated on 1.9.0]

`ThinkKoa扩展` `think_context中间件`

获取或设置ctx.headers.content-type属性；如果传入encoding，自动设置字符集。

### <del>ctx.sendTime([name])</del> [Deprecated on 1.9.0]

`ThinkKoa扩展` `think_context中间件`

设置ctx.headers的 `X-name || X-EXEC-TIME` 值。一般用于发送处理时间。

### <del>ctx.expires([time = 30])</del> [Deprecated on 1.9.0]

`ThinkKoa扩展` `think_context中间件`

设置ctx.headers的 `Cache-Control: max-age` 值以及 `Expires`。一般用于输出缓存控制。

### ctx.cookie(name[, value, options = {}])

`ThinkKoa扩展` `think_cookie中间件`

获取或者设置cookie值。options包括项

* signed sign cookie 值
* domain: '',  // cookie所在的域名
* path: '/',       // cookie所在的路径
* maxAge: 86400, // cookie有效时长
* httpOnly: true,  // 是否只用于http请求中获取
* overwrite: false,  // 是否允许重写
* expires: new Date('2017-02-15')  // cookie失效时间

如果options未传递，默认遵循http中间件的配置。可在项目中间件配置文件中进行定义：

```js

/**
 * Middleware config
 * @return
 */
module.exports = {
    list: [], //加载的中间件列表
    config: { //中间件配置 
        http: {
        	cookie: {
		        domain: '',
		        path: '/',
		        ...
			}
        }
    }
};
```

### <del>ctx.write(content[, contentType, encoding])</del> [Deprecated on 1.9.0]

`ThinkKoa扩展` `think_context中间件`

对ctx.body赋值进行功能封装。注意ctx.write输出内容后，并不会中断程序执行。

* content 输出的内容
* contentType 输出文档类型，默认 `text/plain`
* encoding 输出文档编码，默认 `utf-8`，在项目配置文件 src/config/config.js内可修改

### ctx.querys([name, value])

`ThinkKoa扩展` `think_payload中间件`

获取或构造querystring的值。

```js
//获取所有querystring值
ctx.querys();

//获取某个querystring值
ctx.querys('username');

//构造querystring 值
ctx.querys('username', 'lin');
ctx.querys({
    username: 'lin',
    age: 22
})

``` 
### ctx.post([name, value])

`ThinkKoa扩展` `think_payload中间件`

获取或构造post传递的值。

```js
//获取所有post传递的值
ctx.post();

//获取某个post传递的值
ctx.post('username');

//构造post传递的值
ctx.post('username', 'lin');
ctx.post({
    username: 'lin',
    age: 22
})

``` 
### ctx.param([name])

`ThinkKoa扩展` `think_payload中间件`

获取querystring或者post传递的值，其中同名的键post会覆盖querystring中的值。

```js
//获取所有querystring和post传递的值
ctx.param();

//获取某个post传递的值,如果post中不存在,则查找querystring
ctx.param('username');
``` 
### ctx.file([name])

`ThinkKoa扩展` `think_payload中间件`

获取或构造form-data传递的文件。

```js
//获取所有传递的文件
ctx.file();

//获取某个传递的文件
ctx.file('filename');

//构造传递的文件
ctx.file('filename', fileObject);
``` 

### ctx.group

`ThinkKoa扩展` `think_router中间件`

根据路由规则解析生成的模块名(单模块模式下为'')。

### ctx.controller

`ThinkKoa扩展` `think_router中间件`

根据路由规则解析生成的控制器名。

### ctx.action

`ThinkKoa扩展` `think_router中间件`

根据路由规则解析生成的方法名。

### ctx.routers

`ThinkKoa扩展` `think_router中间件`

项目路由规则集合。

### ctx.session(name[, value, timeout])

`ThinkKoa扩展` `think_session中间件`

获取或设置session。

```js
//获取session
ctx.session('user');

//写入session
ctx.session('user', {'username': 'test'});

//写入session，30s过期
ctx.session('user', {'username': 'test'}, 30);
```

### ctx.compile(templateFile, data)

`ThinkKoa扩展` `think_view中间件`

调用模板解析引擎解析模板，返回解析后的内容。

* templateFile 模板物理路径
* data 模板变量`Object`

```js
ctx.compile(think.app_path + '/view/default/test.html', {data: 'hello world'});
```

### ctx.render(templateFile, data[, charset, contentType])

`ThinkKoa扩展` `think_view中间件`

调用模板解析引擎解析模板，将解析后的内容response输出(赋值给ctx.body)。

* templateFile 模板物理路径
* data 模板变量`Object`
* charset 输出模板字符集
* contentType 输出模板文档类型

```js
ctx.render(think.app_path + '/view/default/test.html', {data: 'hello world'});
```

### ctx.req

`koa原生`

Node 的 request 对象.

### ctx.res

`koa原生`

Node 的 response 对象.

绕开 Koa 的 response 处理 是 不支持的. 避免使用如下 node 属性:

* res.statusCode
* res.writeHead()
* res.write()
* res.end()

### ctx.get(name)

`koa原生`

获取名为 name 的 header值:

```js
ctx.get('user-agent');
```

### ctx.set(name, value)

`koa原生`

设置 header值:

```js
ctx.set('Cache-Control', `max-age=3000`);
```

### ctx.type

`koa原生`

获取或设置response header中的content-type值:

```js
console.log(ctx.type);

ctx.type = 'text/plain';
```
### ctx.query

`koa原生`

获取querystring值:

```js
console.log(ctx.query);
```

### ctx.body

`koa原生`

设置返回的response：

```js
ctx.body = 'hello world';
```
### ctx.path

`koa原生`

request的pathname(ThinkKoa中的路由中间件会根据路由规则解析覆盖path值)。

### ctx.cookies.get(name, [options])

`koa原生`

获取名为 name 带有 options 的 cookie:

signed 请求的 cookie 应该是被 signed
koa 使用 cookies 模块, options 被直接传递过去.

### ctx.cookies.set(name, value, [options])

`koa原生`

设置 cookie name 为 value 带有 options:

* signed sign cookie 值
* domain: '',  // cookie所在的域名
* path: '/',       // cookie所在的路径
* maxAge: 86400, // cookie有效时长
* httpOnly: true,  // 是否只用于http请求中获取
* overwrite: false,  // 是否允许重写
* expires: new Date('2017-02-15')  // cookie失效时间

koa 使用 cookies 模块, options 被直接传递过去.

### ctx.throw([msg], [status], [properties])

`koa原生`

Helper 方法, 抛出包含 `.status` 属性的错误, 默认为 500. 该方法让 Koa 能够合适的响应. 并且支持如下组合:

```js
this.throw(403);
this.throw('name required', 400);
this.throw(400, 'name required');
this.throw('something exploded');
```

例如 this.throw('name required', 400) 等价于:

```js
var err = new Error('name required');
err.status = 400;
throw err;
```

注意这些是 user-level 的错误, 被标记为 `err.expose`, 即这些消息可以用于 client 响应, 而不是 error message 的情况, 因为你不想泄露失败细节.

你可以传递一个 properties 对象, 该对象会被合并到 error 中, 这在修改传递给上游中间件的机器友好错误时非常有用

```js
this.throw(401, 'access_denied', { user: user });
this.throw('access_denied', { user: user });
```

koa 使用 `http-errors` 创建错误对象.

### ctx.assert(value, [msg], [status], [properties])

`koa原生`

抛出错误的 Helper 方法, 跟 .throw() 相似 当 !value. 跟 node 的 assert() 方法相似.

```js
this.assert(this.user, 401, 'User not found. Please login!');
```

koa 使用 `http-assert` 实现断言.

### Request 别名

`koa原生`

如下访问器和别名同 Request 等价:

* ctx.header
* ctx.headers
* ctx.method
* ctx.url
* ctx.originalUrl
* ctx.path
* ctx.query
* ctx.querystring
* ctx.host
* ctx.hostname
* ctx.fresh
* ctx.stale
* ctx.socket
* ctx.protocol
* ctx.secure
* ctx.ip
* ctx.ips
* ctx.subdomains
* ctx.is()
* ctx.accepts()
* ctx.acceptsEncodings()
* ctx.acceptsCharsets()
* ctx.acceptsLanguages()
* ctx.get()

### Response 别名

`koa原生`

如下访问器和别名同 Response 等价:

* ctx.body
* ctx.status
* ctx.message
* ctx.length
* ctx.type
* ctx.etag
* ctx.lastModified
* ctx.headerSent
* ctx.redirect()
* ctx.attachment()
* ctx.set()
* ctx.remove()
