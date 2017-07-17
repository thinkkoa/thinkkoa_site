## Cookie

koa对cookie提供了很好的支持，在此基础上ThinkKoa进行了进一步的封装和简化：

### 项目中cookie的全局配置

项目中间件配置 config/middleware.js:

```js
config: { //中间件配置
    ...,
    http: {
        cookie: {
            domain: '',
            path: '/',
            timeout: 0
        }
    }
}
```

### 控制器中使用

cookie(name[, value, option])

获取或者设置cookie值。options包括项

* signed sign cookie 值
* expires cookie 过期 Date
* path cookie 路径, 默认 /'
* domain cookie 域名
* secure secure cookie
* httpOnly server 才能访问 cookie, 默认 true

```js
//获取cookie
this.cookie('site');

//设置cookie
this.cookie('site', 'www.baidu.com');
```

如果options未传递，默认遵循项目中cookie的全局配置。

### 中间件及其他类中使用

ctx.cookie(name[, value, options = {}])

`ThinkKoa扩展` `think_http中间件`

获取或者设置cookie值。options包括项

* signed sign cookie 值
* expires cookie 过期 Date
* path cookie 路径, 默认 /'
* domain cookie 域名
* secure secure cookie
* httpOnly server 才能访问 cookie, 默认 true

如果options未传递，默认遵循项目中cookie的全局配置。

### koa原生用法

#### ctx.cookies.get(name, [options])

`koa原生`

获取名为 name 带有 options 的 cookie:

signed 请求的 cookie 应该是被 signed
koa 使用 cookies 模块, options 被直接传递过去.

#### ctx.cookies.set(name, value, [options])

`koa原生`

设置 cookie name 为 value 带有 options:

* signed sign cookie 值
* expires cookie 过期 Date
* path cookie 路径, 默认 /'
* domain cookie 域名
* secure secure cookie
* httpOnly server 才能访问 cookie, 默认 true

koa 使用 cookies 模块, options 被直接传递过去。注意原生写法，并不会自动传入项目配置，需要自行定义`options`