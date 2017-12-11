## loader

`loader`是`thinkkoa`框架封装的一个自动文件加载库。引用于独立模块`think_loader`，可以独立在项目中使用。

### loader(loadPath, options, skip)

自动加载指定目录含子目录下的所有文件，返回一个对象（包含文件名称、路径等）

* loadPath 参数名,如果值为undefined则返回所有querystring参数
* options 参数值
    suffix = 文件后缀名，默认为'.js'
    filter 文件过滤
    skip 是否跳过当前目录文件，如果未传递，默认值取函数第三个参数值
* skip 是否跳过当前目录文件（不加载loadPath目录下的文件，仅加载该目录下子目录内的所有文件）

```js
// 加载指定目录下所有的js文件
loader('/wwwroot/app/', {'suffix': '.js'});
```