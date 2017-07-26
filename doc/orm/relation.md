## 关联模型

### 关联模型的定义

ThinkORM支持表的一对一、一对多、多对多关联关系,标准的关联关系定义格式：

例如user.js类中申明的关联关系：

```js
// 关联关系

this.relation = {
    profile : {
        type: 'hasone',//关联方式
        field: ['test', 'id'],//关联表字段
        fkey: 'profile', //主表外键 (子表主键)
        rkey: 'id' //子表主键
    },
    pet: {
        type: 'hasmany',
        field: ['types','user', 'id'],
        fkey: 'pet',//hasmany关联此值无用
        rkey: 'user'//子表外键 (主表主键)
    },
    group: {
        type: 'manytomany',
        field: ['name', 'type', 'id'],
        fkey: 'userid',//map外键(主表主键)
        rkey: 'groupid'//map外键(子表主键)
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


### 关联模型的实例化
关联模型在查询或修改等操作前，必须要将关联定义所有模型类都加载到orm：

```js
const path = require('path');
const thinkorm = require('thinkorm');

//数据源配置
let config = {
...
};


// 加载模型类到thinkorm
let user = thinkorm.require(path.resolve('./user.js'));
let profile = thinkorm.require(path.resolve('./profile.js'));
let pet = thinkorm.require(path.resolve('./pet.js'));
let group = thinkorm.require(path.resolve('./group.js'));

thinkorm.setCollection(user, config);
thinkorm.setCollection(profile, config);
thinkorm.setCollection(pet, config);
thinkorm.setCollection(group, config);

...




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

### 关联模型的新增

关联模型可以在新增时直接同步新增关联表数据：

```js
//hasone关联新增
UserModel.rel(true).add({
    title: 'test',
    profile: {
        test: 'aa'
    }
});

//hasmany关联新增
UserModel.rel(true).add({
    title: 'test',
    pet: [
        {types: 'dog'}
    ]
});

//manytomany关联新增
UserModel.rel(true).add({
    title: 'test',
    group: [
        {name: 'bb', type: 4}
    ]
});
```

### 关联模型的更新

关联模型可以在更新中直接同步更新关联表数据:

```js
//hasone关联更新
UserModel.rel(true).where({id: 1}).update({
    title: '1111',
    profile: {
        test: 'vv'
    }
});

//hasmany关联更新
UserModel.rel(true).where({id: 1}).update({
    title: '1111',
    pet: [
        {
            id: 7, //存在关联表主键值,表示更新关联表数据,如果子表id=7这条数据和主表不存在关联，则无效;如果不存在关联表主键值,则更新所有关联数据
            types: 'dog'
        }
    ]
});

//manytomany关联更新
UserModel.rel(true).where({id: 1}).update({
    title: '1111',
    group: [
        {
            id: 8, //存在关联表主键值,表示更新关联表数据,如果子表id=7这条数据和主表不存在关联，则无效;如果不存在关联表主键值,则更新所有关联数据
            name: 'dsf'
        }
    ]
});

UserModel.rel(true).where({id: 1}).update({
    title: '1111',
    group: [
        {
            {userid: 1, groupid: 15} //存在关联定义的fkey及rkey，表示更新map表,如果map表数据不存在才会新增
        }
]});
```


