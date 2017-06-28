## think.base

`think.base`是基类，在项目中除中间件外所有的类都需要继承该类，该类提供了一些基本的方法。

使用 ES6 语法继承该类：

```js
export default class extends think.base {
  /**
   * init method
   * @return {} []
   */
  init(){

  }
}
```

`注`： 使用 ES6 里的类时不要写 `constructor`，把初始化的一些操作放在 `init`方法里，该方法在类实例化时自动被调用，效果等同于 `constructor`。

### init(...args)

初始化方法，这里可以进行一些赋值等操作。

```js
class a extends think.base {
  init(name, value){
    this.name = name;
    this.value = value;
  }
}
```

### _filename()

获取当前类文件的名称，包含文件具体路径和扩展名。