## think.model

ThinkKoa框架并没有提供ORM，用户可以自行引入第三方的ORM。推荐使用ThinkKoa团队开发的(ThinkORM)[https://github.com/thinkkoa/thinkorm]

ThinkKoa定义了以下规范：

* 第三方ORM基类挂载到 `think.model.base`
* ORM的构造方法第一个形参为数据源配置项。
        如果第三方ORM无法满足此条件，则不能使用`think.model()`函数来实例化模型类，需要自行使用`new`关键字实例化


### think.model.base
模型类基类。项目中所有的模型类均继承此基类以实现数据库操作。

```js
export default class extends think.model.base {
    ...
}
```

### think.model(name, config)

获取或者实例化一个模型类。

* name 模型类名
        如果传入的是类文件路径，则自动加载该类文件
        如果name值为false，返回 think.model.base
* config 数据源配置项
        如果config值为undefined,则返回该类而非实例

数据源配置项config: 

```js
{
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
```

实例化模型：

```js
let info = await think.model('user', {});
```

模型继承： 

```js
const user = think.model('user');
export default class extends user {

}

```