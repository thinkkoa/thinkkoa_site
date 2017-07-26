## 数据结构迁移

ThinkORM支持将项目中定义的模型类迁移到目标数据库，支持自动创建表、字段、字段数据类型、索引。

**注意：** 数据迁移有风险，会自动覆盖数据库中已经存在的同名表，请在使用前做好数据备份。



### 迁移方法

#### 保证处于开发模式下
为数据安全考虑，迁移仅在开发模式下生效，请确保启动node项目使用:

```bash
node --debug index.js
```

#### 修改需要迁移的模型类属性：

```js
module.exports = class extends thinkorm {

    init(config) {
        ...
        this.safe = false;
    }
}

```
#### 迁移脚本

```js
const path = require('path');
const thinkorm = require('thinkorm');

//数据源配置
let config = {
...
};


// 加载模型类到thinkorm
let user = thinkorm.require(path.resolve('./user.js'));
thinkorm.setCollection(user, config);
...
//加载其他需要迁移的模型
...


thinkorm.migrage();

```


如果您使用ThinkKoa框架，可以使用命令行工具ThinkKoa_cli进行快速结构迁移:

```bash
//bash
think migrate

```