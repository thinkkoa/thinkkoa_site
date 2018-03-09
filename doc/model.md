## ORM
ThinkKoa框架本身不包含ORM，用户可以自行决定使用第三方ORM。

为方便用户开发，团队开发了独立ORM `ThinkORM`以及轻量级的 `liteQ`供您选用。

### ThinkORM

#### 安装


```bash
npm i thinkorm --save
```

#### 创建模型

使用thinkkoa_cli命令行工具：

```js
think model user
```
命令会自动创建 app/model/user.js文件。文件代码如下:

```js
const {model, helper} = require('thinkorm');

module.exports = class extends model {
    // 构造方法
    init(){
        // 模型名称,映射实体表 user
        this.modelName = 'user';
        // 数据表字段信息
        this.fields = {
            id: {
                type: 'integer',
                pk: true
            },
            name: {
                type: 'string',
                size: 30,
                index: true,
                defaults: ''
            }
        };
    }
}
```

#### 数据库配置

创建数据库配置文件 app/config/db.js文件：

```js
// app/config/db.js
module.exports = {
    mysql: {
        db_type: 'mysql', // 数据库类型,支持mysql,postgressql,sqlite3
        db_host: '127.0.0.1', // 服务器地址
        db_port: 3306, // 端口
        db_name: 'test', // 数据库名
        db_user: 'root', // 用户名
        db_pwd: '', // 密码
    }
}


// 读取配置
this.app.config('mysql', 'db');

```

#### 实例化模型

```js
const user = require("./user.js");
//数据源配置
let config = this.app.config('mysql', 'db');

//实例化
let userModel = new user(config);
```

#### CURD

```js

// add
let result = await userModel.add({"name": "张三"});

// delete
result = await userModel.where({id: 1}).delete();

// update
result = await userModel.where({id: 2}).update({"name": "李四"});

// select 
result = await userModel.where({id: 3}).find(); //limit 1
result = await userModel.where({"name": {"<>": ""}}).select(); //query name is not null


```

更多的操作语法请查看ThinkORM文档：[ThinkORM](/orm/index.jhtml)