## restful

thinkkoa_cli提供了创建restful风格API的命令：

```
think controller -r test
```

命令会自动创建控制器文件 app/controller/test.js :

```js

const {controller, helper} = require('thinkkoa');

module.exports = class extends controller.restful {
    //构造方法init代替constructor
    // init(ctx, app) {

    // }
    //可以在前置方法内做权限判断等操作
    __before(){
        
    }
}
```
并且在项目配置目录下创建路由文件 app/config/router.js

```js
module.exports = [

    ['/test/:id', {
        get: '/test/get',
        post: '/test/post',
        put: '/test/put',
        delete: '/test/delete',
    }]

];

```

无需做任何修改,就已经支持GET/POST/PUT/DELETE方式的HTTP请求。

当然我们也可以根据实际情况进行修改和定制。

### 控制器属性和方法

`controller.restful`控制器继承自`controller`，除拥有`controller`的所有属性和方法外，还有一些自身特殊的属性和方法：

### getAction()

处理GET类型HTTP请求

### postAction()

处理POST类型HTTP请求

### deleteAction()

处理DELETE类型HTTP请求

### putAction()

处理PUT类型HTTP请求