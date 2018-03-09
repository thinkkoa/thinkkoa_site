## 关联模型

### 关联模型的定义

ThinkORM支持表的一对一、一对多、多对多关联关系,标准的关联关系定义格式：

例如user.js类中申明的关联关系：

```js
const {relModel, helper} = require('../index.js');
const Profile = require('./.Profile.js');
const Pet = require('./.Pet.js');
const Group = require('./.Group.js');
const UserGroup = require('./.UserGroup.js');

module.exports = class extends relModel {
    init(){
        // 模型名称
        this.modelName = 'User';
        // 是否开启迁移(migrate方法可用)
        this.safe = false;
        // 数据表字段信息
        this.fields = {
            id: {
                type: 'integer',
                pk: true
            },
            name: {
                type: 'string',
                index: true,
                default: ''
            },
            profile: {
                type: 'integer',
                index: true,
                default: 0
            },
            num: {
                type: 'integer',
                index: true,
                default: 0
            },
            memo: {
                type: 'text',
                default: ''
            },
            create_time: {
                type: 'integer',
                default: 0
            }
        };
        // 数据验证
        this.validations = {
            name: {
                method: 'ALL', //ADD 新增时检查, UPDATE 更新时检查, ALL 新增和更新都检查,如果属性不存在则不检查
                valid: ['required', 'length'],
                length_args: 10,
                msg: {
                    required: '姓名必填',
                    length: '姓名长度必须大于10'
                }
            }
        };
        // 关联关系
        this.relations = {
            Profile: {
                type: 'hasone', //关联方式
                model: Profile, //子表模型
                //field: ['test', 'id'],//关联表字段
                fkey: 'profile', //主表外键 (子表主键)
                rkey: 'id' //子表主键
            },
            Pet: {
                type: 'hasmany',
                model: Pet, //子表模型
                //field: ['types','user', 'id'],
                fkey: '', //hasmany关联此值没用
                rkey: 'user'//子表外键 (主表主键)
            },
            Group: {
                type: 'manytomany',
                model: Group, //子表模型
                //field: ['name', 'type', 'id'],
                fkey: 'userid', //map外键(主表主键)
                rkey: 'groupid', //map外键(子表主键)
                map: UserGroup//map模型
            }
        };
    }
};

```
relation属性是一个对象，对象的每一个key都代表着一个关联关系。key对应一个模型类。key的定义必须是准确的模型名。

#### type

关联关系类型，支持hasone,hasmany,manytomany

**type的值不区分大小写，可以是hasone或者HASONE,还可以简写成1，hasmany简写为2，manytomany简写为3**

#### field

field申明了关联模型在查询的时候筛选的字段，例如上述的Profile中field的值为['test','id'],表示关联查询Profile的时候仅返回 test及id两个字段。如果该属性不存在,在关联查询的时候默认返回关联表所有字段

#### fkey/rkey

fkey/rkey主要定义了关联模型中的主键及外键名，具体含义见上述注释


```
### 关联模型的查询

为提高执行效率，ThinkORM默认不会进行关联查询，即使模型类中已经定义了关联关系，如果需要进行关联查询，则通过Model类的rel方法来打开。

#### rel\(table = false\[, fields])

类型：非中断方法

参数：

table 可传入布尔值 true或false 表示开启或关闭关联查询如果传入的是模型名，则仅关联查询传入的模型（模型类关联多个子表的情况下）


fields: 指定关联查询关联表的筛选字段

```

.rel(true,{profile: ['name'], pet: ['types']})

```

作用：配合查询方法使用，是否开启表关联查询，默认为关闭。


在本章的开头，定义了UserModel类的关联关系，User模型有2个关联，分别是一对一关联Profile，一对多关联Pet。如果我们在查询中仅需要Profile的关联结果，那么可以在rel方法中传入Profile
```
UserModel.rel('Profile').find();//注意这里的Profile为模型名，同关联定义的key一致
```

#### hasone关联查询
```
UserModel.rel('profile').find();
//{"id":1,"title":"test","profile":{"test": "profile", "id": 1}}
```
#### hasmany关联查询
```
UserModel.rel('ppet').find();
//{"id":1,"title":"test","pet":[{"types": "cat", "user": 1, "id": 1}]}
```
#### manytomany关联查询
```
UserModel.rel('group').find();
//{"id":1,"title":"test","group":[{"name": "aa", "type": 1, "id": 1}]}
```