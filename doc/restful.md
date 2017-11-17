## restful

thinkkoa_cli提供了创建restful风格API的命令：

```
think controller -r test
```

命令会自动创建控制器文件 app/controller/test.js :

```js

const {controller, helper} = require('thinkkoa');

module.exports = class extends controller.restful {
    //构造方法
    init(ctx){
        //调用父类构造方法
        super.init(ctx);
    }
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