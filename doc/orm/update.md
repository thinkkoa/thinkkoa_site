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

1、模型属性变更：

ThinkORM 2.x | ThinkORM 3.x | 备注
------------- | ------------- | -------------
safe | - | 3.x废弃此属性
relation | relations |

2、模型字段属性变更：

ThinkORM 2.x | ThinkORM 3.x | 备注
------------- | ------------- | -------------
defaultsTo | defaults | 字段默认值
primaryKey | pk | 主键

```js
class extend model{
    //字段
    this.fields = {
        id: {
            type: 'integer',
            pk: true //primaryKey改为pk
        },
        name: {
            type: 'string',
            defaults: '' //defaultsTo改为defaults
        }
    }
}

```

3、关联模型属性变更：

ThinkORM 2.x | ThinkORM 3.x | 备注
------------- | ------------- | -------------
model值为模型名称 | model值为模型类 | 关联模型
map值为模型名称 | map值为模型类 | manytomany关联的MAP模型

```js
const {relModel, helper} = require('thinkorm');
const Profile = require('../model/profile.js');
const UserGroup = require('../model/usergroup.js');

class User extend relModel{
    ...

    // 关联关系
    this.relations = {
        Profile: {
            type: 'hasone', 
        --> model: Profile, //更改为关联模型类
            //field: ['test', 'id'],
            fkey: 'profile',
            rkey: 'id' 
        },
        Group: {
            type: 'manytomany',
        --> model: Group, //更改为关联模型类
            //field: ['name', 'type', 'id'],
            fkey: 'userid', 
            rkey: 'groupid', 
        --> map: UserGroup //更改为关联模型MAP类
        }
    }
    ...
}

```

### 方法变更

1、ThinkORM 3.x 关联模型支持`关联查询`，暂时不支持 `关联新增` 及 `关联编辑`, 如果在模型类中使用过，请自行拆分逻辑。

2、前置后置方法入参值变化:

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

### 数据变更

thinkorm 2.x 版本在使用mysql作为数据源的时候，会自动将特殊类型字段 `json`、`array`做转换。写入数据的时候自动转为String，查询结果自动转换为JSON。
3.x版本基于性能优化的考虑废弃了这一功能。

修改方案：

搜索使用`json`、`array`类型的模型字段。

在该模型的新增和编辑前置方法内进行手工转换：

```js
_beforeAdd(data, options){
    //转换为string
    data.info = JSON.stringify(data.info);
    ...
}

_beforeUpdate(data, options){
    if(data.info !== undefined){
        //转换为string
        data.info = JSON.stringify(data.info);
    }
    ...
}
```

在该模型查询的后置方法内转换为JSON：

```js
_afterFind(result, options) {
    if(data.info !== undefined){
        //转换为JSON
        data.info = JSON.parse(data.info);
    }
    ...
}

_afterSelect(result, options) {
    result.map(item => {
        if(item.info !== undefined){
            //转换为JSON
            item.info = JSON.parse(item.info);
        }
    });
    ...
}

```