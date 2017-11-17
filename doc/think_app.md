## app

thinkkoa类是继承自koa的: 

```js
class ThinkKoa extends koa {
    ...
}

```
因此thinkkoa的实例是koa实例的扩展。我们可以像使用koa一样来使用thinkkoa:

```
const thinkkoa = require('thinkkoa');

const app = new thinkkoa({
    rout_path:  ...
    app_path:  ...
});

app.use(function(ctx, next)) {
    ...
});

app.listen();

```

### 属性和方法

#### 