## 数据结构迁移

ThinkORM支持将项目中定义的模型类迁移到目标数据库，支持自动创建表、字段、字段数据类型、索引。

**注意：** 数据迁移有风险，请在使用前做好数据备份。



### 迁移方法

```js
// createTableIfNotExists
userModel.migrate();

```