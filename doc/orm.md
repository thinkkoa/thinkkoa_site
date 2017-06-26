## ORM
ThinkKoa框架本身不包含ORM，用户可以自行决定使用第三方ORM。

为方便用户开发，团队开发了独立ORM `ThinkORM`，可以通过中间件 `think_model`进行使用。

### 安装

```bash
npm i think_model --save
```

### 引入中间件

1、项目中增加中间件 middleware/model.js

```js
module.exports = require('think_model');
```

2、项目中间件配置 config/middleware.js:

```js
list: [...,'model'], //加载的中间件列表
config: { //中间件配置
    ...,
    model: {
        db_type: '', // 数据库类型,支持mysql,mongo,postgressql
        db_host: '', // 服务器地址
        db_port: 3306, // 端口
        db_name: '', // 数据库名
        db_user: '', // 用户名
        db_pwd: '', // 密码
        db_prefix: '', // 数据库表前缀
        db_charset: '', // 数据库编码默认采用utf8
        db_nums_per_page: 20, //查询分页每页显示的条数
        db_ext_config: { //数据库连接时候额外的参数
            db_log_sql: true, //打印sql
            read_write: false, //读写分离(mysql, postgresql)
            db_pool_size: 10, //连接池大小
            db_replicaset: '', //mongodb replicaset
            db_conn_url: '', //数据链接
        } 
    }
}
```

### 使用


#### 创建模型类
使用命令行工具thinkkoa_cli输入命令：

```bash
//单模块模式
think model user

//多模块方式
think model admin/user
```
模型类模板代码：

```js
/**
 * Model
 * @return
 */
const thinkorm = require('thinkorm');

export default class extends thinkorm {
    init(name, config){
        super.init(name, config);
        // 是否开启迁移(migrate方法可用)
        this.safe = false;
        // 数据表字段信息
        this.fields = {};
        // 数据验证
        this.validations = {};
        // 关联关系
        this.relation = {};

    }
}

```
#### 实例化模型
ThinkKoa提供了 `think.model` 函数来调用操作ORM。

```js
think.model('模型名称', {配置})
```
例如:

```js
think.model('user', {});
```
*注意：*

*1、实例化模型时不传入配置或者传递undefined，仅仅返回模型类自身而非实例*

*2、实例化模型配置传入{}，框架会自动遵循`model `中间件配置*


#### 模型查询

```js
let info = await think.model('user', {}).find();
```
更多的操作语法请查看ThinkORM文档。

### ThinkORM文档
在线文档地址：[ThinkORM](https://www.gitbook.com/book/richenlin/thinkorm-doc/)