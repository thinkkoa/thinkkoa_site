## 开发中间件插件
ThinkKoa团队欢迎用户贡献自己开发的中间件。具体的开发规范和流程。

### 创建中间件插件工程
#### 目录结构

* `lib/` 存放编译后文件
* `src/` 存放源代码，使用 ES6/7 特性开发
* `test/` 单元测试目录
* `.eslintrc` eslint 检查配置文件
* `.gitignore` git忽略的文件
* `.npmignore` npm 发布时忽略的文件
* `.travis.yml`  travis 持续集成配置文件
* `package.json` npm 配置文件
* `README.md` 说明文件

*注意：*

*1、package.json中配置包入口文件为 lib/index.js*

*2、`.npmignore` npm发布时忽略的文件 包含 src目录；`.gitignore` git忽略的文件包括 lib目录*

### 开发

中间件代码模板格式： 

```js
//引入依赖包
const xxx = require('xxx'); 

module.exports = function(options) {
	return  function (ctx, next) {
		......
	}
}
```

中间件包含异步，使用async/await:

```js
//引入依赖包
const xxx = require('xxx'); 

module.exports = function(options) {
	return  async function (ctx, next) {
		......
		await ......
	}
}
```

### 单元测试
在 test/index.js 文件书写相关的单元测试，测试框架使用 mocha， 需要配置下面的命令进行单元测试并输出结果：

```bash
npm run test-cov
```

### 说明文档

代码开发和单元测试完成后，需要在`README.md` 里书写详细的说明文档。

### 发布
代码版本库托管到github.com， 并且使用 `npm publish` 发布到 npm仓库（如果之前没发布过，会提示创建帐号和密码）。

发布完成后，请给我们发邮件或者 [issuse](https://github.com/thinkkoa/thinkkoa_awesome/issues)，经确认后，即可体检到官方插件列表中。会有奖励哦。
