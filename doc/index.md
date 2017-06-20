## 介绍

ThinkKoa 是轻量级高性能敏捷开发Node.js框架,支持ES6/7全新特性,支持Koa、Express中间件。

ThinkKoa是对Koa2进行了薄封装,保持了ThinkNode相似的用法,仅需少许改动即可升级。相对于ThinkNode,它更加轻量级,扩展性和性能也更好。

使用 ES6/7 特性来开发项目可以大大提高开发效率，是趋势所在。并且新版的 Node.js 对 ES6 特性也有了较好的支持，即使有些特性还没有支持，也可以借助 [Babel](http://babeljs.io/) 编译来支持。


### 特性

#### 使用 ES6/7 特性来开发项目

借助 Babel 编译，可以在项目中大胆使用 ES6/7 所有的特性，无需担心哪些特性当前版本不支持。尤其是使用 `async/await` 或者 `*/yield` 来解决异步回调的问题。

```js
//user controller, controller/user.js
export default class extends think.controller.base {
  //login action
  async loginAction(self){
    //如果是get请求，直接显示登录页面
    if(this.isGet()){
      return this.display();
    }
    //这里可以通过post方法获取所有的数据，数据已经在logic里做了校验
    let data = this.post();
    //用户名去匹配数据库中对应的条目
    let result = await think.model('user', {}).where({name: data.name}).find();
    if(!result){
      return this.fail('login fail');
    }
    //获取到用户信息后，将用户信息写入session
    await this.session('userInfo', result);
    return this.success();
  }
}
```

上面的代码我们使用了 ES6 里的 `class`, `export`, `let` 以及 ES7 里的 `async/await` 等特性，虽然查询数据库和写入 `Session` 都是异步操作，但借助 `async/await`，代码都是同步书写的。最后使用 `Babel` 进行编译，就可以稳定运行在 Node.js 的环境中了。

#### 支持多种项目结构和多种项目环境



### ES6/7 参考文档

关于 ES6/7 特性可以参考下面的文档：

* [JavaScript Promise迷你书](http://liubin.github.io/promises-book/#ch2-promise-all)
* [learn-es2015](http://babeljs.io/docs/learn-es2015/)
* [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
* [给 JavaScript 初心者的 ES2015 实战](http://gank.io/post/564151c1f1df1210001c9161)
* [ECMAScript 6 Features](https://github.com/lukehoban/es6features)
* [ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/)
* [ECMAScript 7 Features](https://github.com/hemanth/es7-features)
* [ECMAScript 7 compatibility table](http://kangax.github.io/compat-table/es7/)
