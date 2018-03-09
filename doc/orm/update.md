## 升级指南

    ThinkORM从2.x向3.x升级，请遵循以下步骤：

### 父类继承变更

修改继承为 `model`:

```js
const {model, helper} = require('thinkorm');

class extends model{
    ...
}
```

关联模型修改为继承 `relModel`:

```js
const {relModel, helper} = require('thinkorm');

class extends relModel{
    ...
}
```

### 属性变更

模型属性变更：

ThinkORM 2.x | ThinkORM 3.x | 备注
------------- | ------------- | -------------
safe | - | 3.x废弃此属性
relation | relations |

模型字段属性变更：

ThinkORM 2.x | ThinkORM 3.x | 备注
------------- | ------------- | -------------
defaultsTo | default | 字段默认值
primaryKey | pk | 主键

### 方法变更

1、ThinkORM 3.x 关联模型支持`关联查询`，暂时不支持 `关联新增` 及 `关联编辑`, 如果在模型类中使用过，请自行拆分逻辑。

2、前置后置入参值变化:

方法 | ThinkORM 2.x | ThinkORM 3.x | 备注
------------- | ------------- | -------------
_beforeAdd(data, options) | options为解析后结果 | options同入参相等 | 
_afterAdd(data, options) | options为解析后结果 | options同入参相等 | 
_beforeDelete(data, options) | options为解析后结果 | options同入参相等 | 
_afterDelete(data, options) | options为解析后结果 | options同入参相等 | 
_beforeUpdate(data, options) | options为解析后结果 | options同入参相等 | 
_afterUpdate(data, options) | options为解析后结果 | options同入参相等 | 
_afterFind(data, options) | options为解析后结果 | options同入参相等 | 
_afterSelect(data, options) | options为解析后结果 | options同入参相等 | 

如果在上述前后置方法中使用了options的值，修改方案:

```js
//举例，其他类似用法请参考修改

//2.x版本
_beforeAdd(data, options){
    let id = options.where.id;
}

//3.x兼容修改 const {model, helper} = require('thinkorm'); 
_beforeAdd(data, options){
    let parsedOptions = helper.parseOptions(this, options);
    let id = parsedOptions.where.id;
}

```