## 介绍
A lightweight, scalable for agile development Node.js web framework, based on koa2.

ThinkKoa - 轻量级可扩展的敏捷开发Node.js框架,支持ES6/7全新特性,支持Koa、Express中间件,基于koa2。

### 特性

* 基于koa2

ThinkKoa基于著名的Node.js框架koa2进行了薄封装。既扩展了Koa的功能，能够迅速的进行Web开发；又保持了原有的API和风格。

* 支持Koa/Express中间件

通过简单的引入机制，ThinkKoa可以很好的支持Koa中间件(包括Koa1及Koa2)。还提供了think.useExp()来使用Express的中间件。大大提升了框架的扩展性及开源模块利用率。

* 为敏捷开发而生

ThinkKoa是在ThinkKoa团队3年的项目开发积累中酝酿诞生的，脱胎于ThinkNode，以提升团队开发效率、助力敏捷开发为目的。框架经过公司多个互联网产品上线、迭代以及大流量大并发的考验。

* 支持多种项目结构和多种项目环境

ThinkKoa默认支持单模块模式，适合简单快速的项目。业务复杂的项目，可以开启多模块支持，功能划分更加清晰。ThinkKoa支持Nginx代理以及pm2部署，适合对稳定性和效率有要求的生产环境。

* 支持灵活的自定义路由

ThinkKoa除默认的单模块模式(controller/action)及多模块模式(module/controller/action）路由规则以外，还支持用户定制路由。
在项目中增加路由文件配置即可灵活的支持Restful等各种自定义路由。


* 使用 ES6/7 特性来开发项目

借助 Babel 编译，可以在项目中使用 ES6/7 所有的特性，无需担心哪些特性当前版本不支持。尤其是使用 `async/await` 来解决异步回调的问题。

```js
//user controller, controller/user.js
export default class extends think.controller.base {
    //login action
    async loginAction(){
        //如果是get请求，直接显示登录页面
        if(this.isGet()){
          return this.render();// or this.ctx.render
        }
        //这里可以通过post方法获取数据
        let name = this.post('username');// or this.ctx.post
        //用户名去匹配数据库中对应的条目.think.model使用thinkorm模块以及think_model中间件
        let result = await think.model('user', {}).where({name: name, phonenum: {"not": ""}}).find();
        if(!result){
          //输出格式化的json数据 {"status":0,"errno":500,"errmsg":"login fail","data":{}}
          return this.fail('login fail'); 
          // 或者这样写
          //this.ctx.type = 'application/json';
          //this.ctx.body = {"status":0,"errno":500,"errmsg":"login fail","data":{}};
          //return;
        }
        //获取到用户信息后，将用户信息写入session
        await this.session('userInfo', result);
        //输出格式化的json数据 {"status":1,"errno":200,"errmsg":"login success","data":{}}
        return this.ok('login success'); 
        // 或者这样写
        //this.ctx.type = 'application/json';
        //this.ctx.body = {"status":1,"errno":200,"errmsg":"login success","data":{}};
        //return;
    }
}
```

上面的代码我们使用了 ES6 里的 `class`, `export`, `let` 以及 ES7 里的 `async/await` 等特性，虽然查询数据库和写入 `Session` 都是异步操作，但借助 `async/await`，代码都是同步书写的。最后使用 `Babel` 进行编译，就可以稳定运行在 Node.js 的环境中了。
关于 ES6/7 特性可以参考下面的文档：

* [JavaScript Promise迷你书](http://liubin.github.io/promises-book/#ch2-promise-all)
* [learn-es2015](http://babeljs.io/docs/learn-es2015/)
* [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
* [给 JavaScript 初心者的 ES2015 实战](http://gank.io/post/564151c1f1df1210001c9161)
* [ECMAScript 6 Features](https://github.com/lukehoban/es6features)
* [ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/)
* [ECMAScript 7 Features](https://github.com/hemanth/es7-features)
* [ECMAScript 7 compatibility table](http://kangax.github.io/compat-table/es7/)


### 性能测试

  框架  | 版本 |   Thread Stats Avg  | Thread Stats Max   |  Req/Sec Avg |  Req/Sec Max  |  Requests/sec  |  Transfer/sec  |  Total Rquests  |  timeout
------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
 koa | 2.2  |  15.37ms  | 83.36ms | 1.87k | 2.14k | 6357.21 | 1.18MB | 201976 | 0
 express | 4.15.2 |  17.48ms  | 123.20ms | 1.44k | 2.01k | 5742.44 | 1.16MB | 172397 | 0
 thinkkoa | 1.3.0 | 19.38ms |  105.21ms | 1.28k | 1.76k | 5166.33 | 1.17MB | 155311 | 0
 thinkjs | 2.2.18 | 43.06ms | 108.78ms | 583.31 | 0.87k | 2319.06 | 448.42KB | 69776 | 0
 sails | 0.12 | 83.24ms | 283.96ms | 306.42 | 505.00 | 1204.45 | 601.58KB | 36225 | 0
 laravel | 5.2.15 (php7) | 93.01ms | 472.31ms | 261.44 | 694.00 | 1198.23 | 335.75KB | 20987 | 4
 laravel | 5.2.15 (php5) | 390.06ms | 1.23s | 91.24 | 276.00 | 287.07 | 110.57KB | 7648 | 32
 ```
 注：
 1、表中测试koa、express均未加载中间件
 2、测试环境 Mac Pro，wrk -t4 -c100 -d30s http://127.0.0.1:3000
 3、取10次测试平均值
 ```

 从表中测试数据可以看到：
 
 1、ThinkKoa性能略次于Koa2以及Express，但差距很小。这是因为ThinkKoa默认加载了trace、context、static、cookie、payload、router、controller等常用的中间件，Express或者Koa在加载同等功能的中间件后，性能和ThinkKoa持平。
 
 2、ThinkKoa用很小的性能损失换来项目敏捷开发，并且结构和规范合理，适合开发大的项目。

 3、ThinkKoa的中间件都是经过在线互联网产品项目实战检验的，相对比其他的开源的中间件，安全和稳定性有保障。