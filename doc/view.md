## View

视图中间件`think_view`目前支持 ejs、pug 模板引擎，后续会不断扩展支持其他模板引擎。也欢迎用户自行扩展，然后给我们发pull。

### 安装

```
npm i think_view --save
```

### 引入中间件

1、项目中增加中间件 middleware/view.js
```
module.exports = require('think_view');
```

2、项目中间件配置 config/middleware.js:

```js
list: [...,'view'], //加载的中间件列表
config: { //中间件配置
    ...,
    view: {
        view_path: think.app_path + '/view', //模板目录
        engine_type: 'ejs', //模版引擎名称 ejs, pug
        engine_config: { cache: true }, //模版引擎配置
        content_type: 'text/html', //模版输出类型
        file_suffix: '.html', //模版文件名后缀
        file_depr: '_', //controller和action之间的分隔符
        default_theme: 'default', //默认模板主题
    }
}
```

### 使用

模板赋值：

```js
//控制器中
this.set(name, value);
or
this.assign(name, value)
```

获取模板引擎解析的内容：

```js
//控制器中
this.fatch(templateFile, data);

//中间件中
ctx.fatch(templateFile, data);
```

输出模板：

```js
//控制器中
this.render(templateFile, charset, contentType);
or 
this.display(templateFile, charset, contentType)

//中间件中
ctx.render(templateFile, data, charset, contentType);
```
