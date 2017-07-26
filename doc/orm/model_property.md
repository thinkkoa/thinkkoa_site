## 属性的定义

创建一个模型类，我们需要定义以下几个主要的属性：

```js

// 是否开启迁移(migrate方法可用)

//this.safe = false;

// 数据表字段信息

this.fields = {};

// 数据验证

this.validations = {};

// 关联关系

this.relation = {};

```
### safe：

定义是否开启迁移，默认为true。修改为false，可以通过下面代码进行数据结构迁移：

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


thinkorm.migrage();

```


如果您使用ThinkKoa框架，可以使用命令行工具ThinkKoa_cli进行快速结构迁移:

```bash
//bash
think migrate

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
    primaryKey: true
}

```
属性 | 描述 | 描述
------------- | ------------- | -------------
type | 数据字段类型 | 见下表
size | 数据字段长度 | 值为整数
defaultsTo | 数据字段默认值 | 根据字段类型取值，json默认值为{}或[]，array默认值为[]
required | 数据字段是否必须有值 | true或false
unique | 数据字段值唯一 | true或false
index | 是否索引 | true或false
primaryKey | 是否主键 | true或false

#### type:字段数据类型的值

属性值 | 描述
------------- | -------------
string | 字符型
text | 文本型
integer | 整型
float | 浮点型
json | json格式
array | 数组格式


json、array类型的字段，在mysql等不支持此类格式存储的数据库中，在写入及读取时ThinkORM会自动转换成为JSON对象或字符串。



### validations:

validations属性定义了模型类的验证规则。验证规则在调用模型类的新增方法add、addAll以及更新方法update的时候可以使用verify(true)手工开启验证，如果验证返回错误，会中断新增及更新操作。定义格式：

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

valid定义规则，支持多个规则匹配，msg则定义了不满足规则时的错误提示。具体支持的规则详见文件：node_modules/thinkorm/lib/Util/valid.js





