## 控制器

ThinkKoa 基于 模块/控制器/操作 的设计原则：

* 模块： 一个应用下有多个模块，每一个模块都是很独立的功能集合。比如：前台模块、用户模块、管理员模块
* 控制器： 一个分组下有多个控制器，一个控制器是多个操作的集合。如：商品的增删改查
* 方法： 一个控制器有多个方法，每个方法都是最小的执行单元。如：添加一个商品

*注意： 默认的单模块模式下，没有模块的区分*

### 创建控制器

使用thinkkoa_cli命令行工具：

单模块模式：

```bash
think controller index
```

会自动创建 app/controller/index.js文件。

多模块模式：


```bash
think controller admin/index
```

会自动创建 app/controller/admin/index.js文件。


控制器模板代码如下：

```js
const {controller, helper} = require('thinkkoa');

module.exports = class extends controller {
    //构造方法
    init(ctx) {
        //调用父类构造方法
        super.init(ctx);
    }
    //所有该控制器(含子类)方法前置方法
    __before() {
        console.log('__before');
    }
    //URI定位到该控制器,如果该控制器不存在某个方法时自动调用
    __empty() {
        return this.json('can\'t find action');
    }
    //indexAction前置方法
    _before_index() {
        console.log('_before_index');
    }
    //控制器默认方法
    indexAction() {
        return this.ok('success');
    }
};
```

### 继承

控制器类必须继承于 thinkkoa.controller. 或 thinkkoa.controller 的子类。

### 构造方法

ThinkKoa 使用`init()` 方法来替代`construct()` 构造方法(construct在使用super时有限制)。

如果控制器里重载 `init` 方法，那么必须调用父类的 `init` 方法，如：

```js
//构造方法
init(ctx){
    //调用父类构造方法
    super.init(ctx);
    ....
}
```

### 前置操作

ThinkKoa支持两种控制器前置操作,分别是公共前置方法以及独有前置方法

**公共前置方法：**

```js
//所有该控制器(含子类)方法前置方法
__before(){
    console.log('__before');
}
```

公共前置方法会在接收到HTTP请求后，在执行路由规则匹配的`action`之前执行。

```js
__before(){
    console.log('__before');
}

indexAction(){
    console.log('indexAction');
}
//控制台打印
__before
indexAction
```

**独有前置方法：**

独有的前置方法会在执行具体方法之前执行。

**注意：init构造方法和被访问限制的方法(不带Action后缀)不支持前置操作**


```js
__before(){
    console.log('__before');
}

_before_index(){
    console.log('_before_index');
}

indexAction(){
    console.log('indexAction');
}

//控制台打印
__before
_before_index
indexAction

```

执行顺序为(indexAction举例)： 公共前置方法(\_\_before) --> 独有前置方法(\_before\_index) --> indexAction

### 空操作

空操作是指系统在找不到请求的操作方法的时候，会定位到空操作方法执行，利用这个机制，可以实现错误页面和一些 url 的优化。
默认空操作对应的方法名为 ，可以通过下面的配置修改：

项目中间件配置 config/middleware.js:

```js
config: { //中间件配置
    ...,
    controller: {
        empty_action: '__empty', //空方法,如果访问控制器中不存在的方法,默认调用
    }
}
```

空操作对应的方法:

```js
//URI定位到该控制器,如果该控制器不存在某个方法时自动调用
__empty(){
    return this.json('can\'t find action');
}
```
如果控制器下没有空操作对应的方法，那么访问一个不存在的 url 时则会报错。


### 访问控制
ThinkKoa默认仅暴露带 `Action`后缀的控制器方法给URL访问，如果控制器内方法名不包含此后缀，该方法无法被URL直接访问。

```js
const {controller, helper}
module.exports = class extends controller {

    init(ctx) {
        super.init(ctx);
    }

    test() { //不包含后缀，无法被URL直接访问
        ...
    }
}
```
该后缀在中间件配置中可以自行修改：

项目中间件配置 config/middleware.js:

```js
config: { //中间件配置
    ...,
    controller: {
        action_suffix: 'Action', //方法后缀,带后缀的方法为公共方法
    }
}
```

`Action`后缀可以自定义修改，具体请参考`think_controller`中间件配置。

### 属性及方法
见文档章节[API/controller](/doc/think_controller.jhtml)