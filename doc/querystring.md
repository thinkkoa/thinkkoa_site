## 获取get、post参数

在WEB开发中，最为常见的就是获取querystring、form等传递的参数。koa提供了query、body等相关的功能来获取，但面对multi-form等场景，往往需要引入第三方中间件才能处理。ThinkKoa在此基础上封装了几个函数，使用非常方便。

### 控制器中获取参数

控制器中提供了 `this.get`、`this.post`、`this.param`、`this.file`来获取各种参数数据：

#### get([name, value])

* name 参数名,如果值为undefined则返回所有querystring参数
* value 参数值

获取或构造querystring参数。

```js
//获取参数
let test = this.get('test') || '';

//构造参数
this.get('test', {aa: 1});
```

#### post([name, value])

* name 参数名,如果值为undefined则返回所有post参数
* value 参数值

获取或构造post参数。

```js
//获取参数
let test = this.post('test') || '';

//构造参数
this.post('test', {aa: 1});
```

#### param([name])
* name 参数名,如果值为undefined则返回所有querystring以及post参数
        querystring中同名key会被post值覆盖
获取参数，先从post参数中查找，如果不存在则从querstring中查找。

```js
let all = this.param();

let info = this.param('info') || {};

```
#### file([name, value])

* name 文件名,如果值为undefined则返回所有file对象
* value 参数值

获取或构造上传的file对象。

```js
//获取参数
let test = this.file('filename') || {};

//构造参数
this.file('test.txt', {...});
```

### 中间件或其他类中获取参数

在中间件中，ThinkKoa在ctx对象上面扩展了 `ctx.querys`、`ctx.post`、`ctx.param`、`ctx.file`，配合ctx原生的`ctx.query`、`ctx.body`可以非常方便的获取参数。

#### ctx.querys([name, value])

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
#### ctx.post([name, value])

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
#### ctx.param([name])

`ThinkKoa扩展` `think_payload中间件`

获取querystring或者post传递的值，其中同名的键post会覆盖querystring中的值。

```js
//获取所有querystring和post传递的值
ctx.param();

//获取某个post传递的值,如果post中不存在,则查找querystring
ctx.param('username');
``` 
#### ctx.file([name])

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

### 特别注意

* ctx.get为获取header内容，并非获取querystring参数

* ctx.querys 和 ctx.query的区别：

```js
//一个是函数，一个是属性。但值相等
ctx.querys() == ctx.query

ctx.querys() // thinkkoa扩展函数
ctx.query //koa原生属性

```