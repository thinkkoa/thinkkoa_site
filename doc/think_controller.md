## think.controller

think.controller 是ThinkKoa中非常重要的一个对象。但是在项目开发中，我们一般不需要直接使用。最常用的是它的属性 `think.controller.base`

### think.controller.base
ThinkKoa框架中控制器的基类。所有的控制器都必须继承它。

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