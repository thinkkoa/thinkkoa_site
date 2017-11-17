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

会自动创建 src/controller/index.js文件。

多模块模式：


```bash
think controller admin/index
```

会自动创建 src/controller/admin/index.js文件。


控制器模板代码如下：

```js
exports.default = class extends think.controller.base {
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

控制器类必须继承于 think.controller.base 或 think.controller.base 的子类。

### 构造方法

ES6的构造方法在使用中有一些坑，比如父类方法的调用supper在配合babel编译的时候容易出现作用域问题，为避免问题，ThinkKoa 实现了一套自动调用的机制。自动调用的方法名为 init，用这个init 方法来替代construct 构造方法。

如果控制器里重写 init 方法，那么必须调用父类的 init 方法，如：

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

公共前置方法会在当前控制器内除init、内部方法(没有Action后缀)外的其他方法调用前执行，也就是说，除构造方法外，其他任何HTTP可访问方法执行的时候，会先执行此前置方法。

**独有前置方法：**

```js
//indexAction前置方法
_before_index(){
    console.log('_before_index');
}
```

独有的前置方法会在执行具体方法之前执行，例如上面的代码中，当indexAction方法执行时，会先执行此独有前置方法。
注意：当公共前置方法和独有前置方法并存的时候，执行顺序为(indexAction举例)： 公共前置方法 --> 独有前置方法 --> indexAction

**注意：init构造方法和内部方法(不带Action后缀)不支持前置操作**

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


### '私有'方法
ThinkKoa默认仅暴露带 `Action`后缀的控制器方法给URL访问，如果控制器内方法名不包含此后缀，该方法无法被URL直接访问。

```js
module.exports = class extends think.controller.base {

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

*注意：此处的'私有'跟面向对象编程中的'私有'概念不同，不能混为一谈。*


### 属性及方法
见文档章节[API/controller](/doc/think_controller.jhtml)