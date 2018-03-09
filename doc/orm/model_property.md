## 属性的定义

创建一个模型类，我们需要定义以下几个主要的属性：

```js
// 模型名称
this.modelName = 'user';
// 主键
this.pk = 'id';
// 数据表名 可不用设置,默认为表前缀+模型名(小写,单词以下划线分隔)
this.tableName = 'think_user';
// 数据表字段信息
this.fields = {};
// 数据验证
this.validations = {};
// 关联关系(仅继承relModel有效)
this.relations = {};

```
### modelName 

定义模型名称，在关联模型描述中使用。

### tableName

定义数据库表名称。如果未设置（属性不存在），默认值为 表前缀+模型名(小写,单词以下划线分隔)：

```js
user => think_user

user_profile => think_user_profile

UserGroup => think_user_group

```

### fields:

定义数据字段，格式为：

```js

title: {
    type: 'string',
    index: true,
    size: 100,
    required: true,
    unique: true,
    pk: true
}

```
属性 | 描述 | 描述
------------- | ------------- | -------------
type | 数据字段类型 | 见下表
size | 数据字段长度 | 值为整数
default | 数据字段默认值 | 根据字段类型取值，json默认值为{}或[]，array默认值为[]
required | 数据字段是否必须有值 | true或false
unique | 数据字段值唯一 | true或false
index | 是否索引 | true或false
pk | 是否主键 | true或false

字段数据类型 | 描述
------------- | -------------
string | 字符型
text | 文本型
integer | 整型
float | 浮点型
json | json格式
array | 数组格式


### validations:

validations属性定义了模型类的验证规则。如果验证返回错误，会中断新增及更新操作。定义格式：

```js

this.validations = {
    type: {
        method: 'ADD', //仅在新增时验证
        valid: ['required'],
        msg: {
            required: '活动类别必填'
        }

    },
    phonenum: {
        method: 'UPDATE',//仅在更新时验证
        valid: ['required','mobile'],
        msg: {
            required: '手机号必填',
            mobile: '请输入正确的手机号'
        }
    }
}

```
属性 | 描述
------------- | -------------
method | 触发验证的操作。ALL新增和更新均验证，ADD新增时验证，UPDATE更新时验证。
valid | 验证规则，多个验证规则使用数组
msg | 当某个规则未通过时返回的错误提示。msg对象的key和规则名对应



使用方法:

```js

userModel.add(data);//自动验证规则定义的type字段,phonenum新增不会验证

userModel.where({id: 1}).update(data);//data如果包含phonenum则验证

```

valid定义规则，支持多个规则匹配，msg则定义了不满足规则时的错误提示。

详细说明见[数据验证](/orm/validations.jhtml)

### relations

定义了模型关联关系，仅当模型继承了relModel类才生效。详细用法请参照文档：[关联模型](/orm/relation.jhtml)
