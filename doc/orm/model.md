## 模型

### 创建模型


创建 user.js文件，模板代码如下：


```js
const thinkorm = require('thinkorm');

module.exports = class extends thinkorm {
    // 构造方法
    init(name, config){
        super.init(name, config);
        // 模型名称
        this.modelName = 'user';
        // 数据表名 可不用设置,默认为表前缀+模型名(小写,单词以下划线分隔)
        //this.tableName = 'think_user';
        // 是否开启迁移(migrate方法可用)
        //this.safe = false;
        // 数据表字段信息
        this.fields = {};
        // 数据验证
        this.validations = {};
        // 关联关系
        this.relation = {};
    }
}

```

ThinkKoa框架可使用命令行工具创建模型： 

```bash
//全局安装thinkkoa_cli，注意mac或linux上可能需要sudo
npm i -g thinkkoa_cli@2.x

//创建模型类user
think model user
```



### 模型实例化

实例化模型：

```js

const thinkorm = require('thinkorm');

//数据源配置
let config = {
    db_type: '', // 数据库类型,支持mysql,mongo,postgressql
    db_host: '', // 服务器地址
    db_port: 3306, // 端口
    db_name: '', // 数据库名
    db_user: '', // 用户名
    db_pwd: '', // 密码
    db_prefix: 'think_', // 数据库表前缀
    db_charset: '', // 数据库编码默认采用utf8
    db_nums_per_page: 20, //查询分页每页显示的条数
    db_ext_config: { //数据库连接时候额外的参数
        db_log_sql: true, //打印sql
        read_write: false, //读写分离(mysql, postgresql)
        db_pool_size: 10, //连接池大小
        db_replicaset: '', //mongodb replicaset
        db_conn_url: '', //数据链接
    }
};

// 加载模型类到thinkorm
let user = thinkorm.require(require.resolve('./user.js'));
thinkorm.setCollection(user, config);

//实例化
let userModel = new user(config);
```


### 对象关系映射ORM



**1、ThinkORM的单个模型类对应着数据库中的一个表。**



例如：user.js对应数据库中的think\_user表（ThinkORM默认的表前缀为think\_,可通过配置文件修改）


**2、模型类中的fields属性包含的每一个子对象都对应数据库表中的一个字段**



例如 user 中的fields属性为：



```js

this.fields = {
    title: {
        type: 'string',
        index: true,
        size: 100,
        defaultsTo: ''
    }
}

```

表示think\_user表中包含一个名为title的字段，字段类型为string（根据数据库数据类型定义的差异，在不同的数据库中表示不同的字段类型，例如在mysql中代表varchar，在mongo中代表string），index值为true表示需要索引，size代表字段的长度为100, defaultsTo表示字段默认值



**3、数据库的操作CURD（增删改查）全部使用 对象:属性 的模式**


例如：

```js
//useModel为实例化后的模型
useModel.where({name: 'aa'}).find(); //查询think_user表name值为aa的数据

```



**4、支持表的一对一、一对多、多对多关联关系**


例如user.js类中申明的关联关系：


```js
// 关联关系
this.relation = {
    Profile : {
        type: 'hasone',//关联方式
        field: ['test', 'id'],//关联表字段
        fkey: 'profile', //主表外键 (子表主键)
        rkey: 'id' //子表主键
    },
    Pet: {
        type: 'hasmany',
        field: ['types','user', 'id'],
        fkey: 'pet',//hasmany关联此值无用
        rkey: 'user'//子表外键 (主表主键)
    },
    Group: {
        type: 'manytomany',
        field: ['name', 'type', 'id'],
        fkey: 'userid',//map外键(主表主键)
        rkey: 'groupid'//map外键(子表主键)
    }
};

```
上述定义表示：

主表think\_user同think\_profile是一对一的关系

主表think\_user同think\_pet是一对多的关系

主表think\_user同think\_group是多地多关联关系