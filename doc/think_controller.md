## think.controller

think.controller 是ThinkKoa中非常重要的一个对象。

### think.controller.base
ThinkKoa控制器基类。所有的控制器都必须继承 `think.controller.base`或它的子类

```js
export default class extends think.controller.base {
    /**
    * init method
    * @return {} []
    */
    init(http){
        super.init(http);
    }
}

```

### 控制器属性和方法

#### ctx
ctx对象。

```js
this.ctx
```
#### http
ctx对象别名。

```js
this.http
```

#### __empty()
空方法。执行当前控制器不存在的方法，自动调用。

```js
//src/controller/index.js控制器
 ...
 __empty(){
     return this.write('action not found');
 }

 indexAction(){
     return this.write('hello world');
 }
 ...

 //当访问 /index/index页面输出  'hello world'

 //当访问 /index/aaa 页面输出  'action not found'
```

#### isGet()

判断当前request是否GET请求。

```js
if (this.isGet()) {
    //当前请求为GET请求
}
```

#### isPost()

判断当前request是否POST请求。

```js
if (this.isPost()) {
    //当前请求为POST请求
}
```

#### isMethod(method)

* method 请求类型 get/post等

判断当前请求是否是传入的特定请求。

```js
if (this.isMethod('get')) {
    //当前请求为GET请求
}
```

#### isAjax()

判断当前request是否Ajax请求。

```js
if (this.isAjax()) {
    //当前请求为Ajax请求
}
```

#### isPjax()

判断当前request是否Pjax请求。

```js
if (this.isPjax()) {
    //当前请求为Pjax请求
}
```

#### isJsonp(name)

* name jsonP callback 函数名

判断当前request是否Jsonp请求。

```js
if (this.isJsonp('callback')) {
    //当前请求为Jsonp请求
}
```

#### set(name, value)

设置header内容。

* name 键
* value 值

```js
this.set('Content-Type', 'text/plian'); //等同于 ctx.set
```

#### get(name)

获取header内容
* name 键

```js
this.get('Content-Type'); //等同于 ctx.get
```


#### querys([name, value])

* name 参数名,如果值为undefined则返回所有querystring参数
* value 参数值

获取或构造querystring参数。

```js
//获取参数
let test = this.querys('test') || '';

//构造参数
this.querys('test', {aa: 1});
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

#### types(contentType[, encoding])

* contentType 文档类型
* encoding 编码格式,默认值为'utf-8'
content-type 操作。

```js
this.types('text/plian', 'utf-8');
```

#### referer([host])

* host url，如果传入值，返回 hostname

获取request referrer。

```js
let ref = this.referer();

ref = this.referer('http://baidu.com');
```

#### redirect(urls[, alt])

* urls 需要跳转的url
* alt 定义Referrer
                               
页面跳转。

```js
this.redirect('/index');

this.redirect('http://baidu.com');
```

#### deny([code = 403])
返回403禁止访问。

```js
return this.deny();
```

#### cookie(name[, value, option])

获取或者设置cookie值。options包括项

* signed sign cookie 值
* expires cookie 过期 Date
* path cookie 路径, 默认 /'
* domain cookie 域名
* secure secure cookie
* httpOnly server 才能访问 cookie, 默认 true

```js
//获取cookie
this.cookie('site');

//设置cookie
this.cookie('site', 'www.baidu.com');
```

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
		        timeout: 0
			}
        }
    }
};
```

#### session(name[, value, timeout])

获取或设置session。

```js
//获取session
this.session('user');

//写入session
this.session('user', {'username': 'test'});

//写入session，30s过期
this.session('user', {'username': 'test'}, 30);
```

#### write(data[, contentType, encoding])
对ctx.body赋值进行功能封装。 

* content 输出的内容
* contentType 输出文档类型，默认 `text/plain`
* encoding 输出文档编码，默认 `utf-8`，在项目配置文件 src/config/config.js内可修改

```js
return this.write('content', 'text/plain'); //页面输出 content
```

#### json(data)

* data 输出的数据

response返回json格式数据。常用于API接口。

```js
return this.json({aa: 111, bb: 222}); //页面输出   {"aa": 111, "bb":222}
```

#### jsonp(data)

* data 输出的数据

response返回jsonp格式数据。用于回调前端函数。在jsonp返回值之前，request请求的时候需要传递callback函数名作为参数（http://host/index?callback=fun_name）

```js
//http://host/index?callback=fun_name
return this.jsonp({dddddd: 1}); //页面输出 fun_name({"dddddd": 1})
```

#### success(errmsg[, data, code = 200, options = {}])

* errmsg 输出的信息
* data 输出的数据
* code 错误码
* options 选项

在控制器逻辑执行成功时,response返回统一格式化json数据。常用于API接口。

```js
return this.success('操作成功'); //页面输出 {"status":1,"errno":200,"errmsg":"操作成功","data":{}}
```

#### ok(errmsg[, data, code = 200, options = {}])

功能同success.

#### error(errmsg[, data, code = 500, options = {}])

* errmsg 输出的信息
* data 输出的数据
* code 错误码
* options 选项

在控制器逻辑执行失败时,response返回统一格式化json数据。常用于API接口。

```js
return this.error('操作失败'); //页面输出 {"status":0,"errno":500,"errmsg":"操作失败","data":{}}
```

#### fail(errmsg[, data, code = 500, options = {}])

功能同error.

#### assign(name, value)

* name 模板赋值key
* value 模板赋值value

在使用模板引擎渲染模板时候，向模板赋值，模板赋值数据对象保存在 `this.tVar`。

```js
this.assign('user', '张三');

//获取所有模板赋值变量
this.assign(); //返回 {"user": "张三"}
```

#### compile(templateFile, data)

`依赖中间件think_view`

* templateFile 模板路径
        传递文件物理路径,可以直接定位渲染模板
        传递空值，框架自动根据 /模板路径配置/模块/控制器 查找模板
        传递 /模块名/控制器名 也可以定位模板
* data 模板赋值数据对象

调用模板引擎，渲染模板返回渲染后的内容.

```js
let content = await this.compile('', {aa: 1});
```
#### render(templateFile, charset, contentType)

`依赖中间件think_view`

* templateFile 模板路径
        传递文件物理路径,可以直接定位渲染模板
        传递空值，框架自动根据 /模板路径配置/模块/控制器 查找模板
        传递 /模块名/控制器名 也可以定位模板
* charset 输出字符集
* contentType 输出文档类型

渲染模板并输出内容,依赖中间件think_view

```js
return this.render();
```

#### display(templateFile, charset, contentType)

功能与render相同。



### think.controller(name, http)

根据传入的name返回控制器类或该控制器的实例。

* name 控制器名。多模块模式下，`控制器名为 模块名/控制器名`。
        如果传入的是类文件路径，则自动加载该类文件
        如果name值为false，返回 think.controller.base
* http ctx对象的别名
        如果值为undefined,则返回该类而非实例

返回控制器类：
```js
//控制器继承(不推荐写法)
const admin = think.controller('admin');
export default class extends admin {
    /**
    * init method
    * @return {} []
    */
    init(http){
        super.init(http);
    }
}

//控制器继承(推荐写法)
import admin from './admin';
export default class extends admin {
    /**
    * init method
    * @return {} []
    */
    init(http){
        super.init(http);
    }
}
```
控制器实例化：
```js
const admin = think.controller('admin', ctx);

admin.indexAction();
```

### think.action(name, http)
执行传入的控制器中某个方法。

* name 格式 `控制器名/方法名`。多模块模式下格式为 `模块名/控制器名/方法名`
* http ctx对象别名

`注意`： 

1、在多模块模式下，think.action支持跨模型调用执行

2、think.action在执行控制器某个方法时，该控制器的 \_\_before 及 \_before\_方法名 并不会被执行
