## think.service

think.service函数主要用来调用服务类。

### think.service(name, params)

获取或者实例化一个服务类。

* name 服务类名
        如果传入的是类文件路径，则自动加载该类文件
* params 服务类构造方法入参
        如果params值为undefined,则返回该类而非实例

实例化服务类：

```js
let sms = think.service('sms', {});

sms.setMethod(); //...
```

服务类继承: 

```js
let sms = think.service('sms');
module.exports = class extends sms {

}
```