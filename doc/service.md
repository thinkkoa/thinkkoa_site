## 服务类

服务类Service是对控制器中复杂业务逻辑、第三方接口调用等场景进行抽象和封装。

如果Service无返回值，或者单纯的是一个异步处理，可以很方便的实现切面编程。

### 创建服务类

使用thinkoa_cli命令行工具：

```bash
think service test
```

会自动创建src/service/test.js,生成的模板代码：

```js
const {base, helper} = require('thinkkoa');

module.exports = class extends base{
	init(params){
		this.params = params;
	}
}
```

除init构造方法以外，你可以自行添加其他方法实现业务逻辑。

### 服务类实例化

服务类的实例化：

```js
const test = require('../service/test.js');

let testService = new test(params);
```
params是服务类的构造方法入参。

### 服务类的调用

在ThinkKoa中，不管是控制器，还是中间件中，都可以很方便的调用服务类：

```js
//调用test服务类的customMethod方法
testService.customMethod(xxx); 

```

### 服务类的继承

```js
const test = require('../service/test.js');

class extends test {
	...
}
```