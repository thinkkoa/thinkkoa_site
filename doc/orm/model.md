## 对象关系映射ORM



### 模型类对应实体表



例如：user.js对应数据库中的think\_user表（默认的表前缀为think\_,可通过配置文件修改）


### fields属性对应表字段

例如 user 中的fields属性为：

```js

this.fields = {
    title: {
        type: 'string',
        index: true,
        size: 100,
        defaults: ''
    }
}

```

表示think\_user表中包含一个名为title的字段，字段类型为string（根据数据库数据类型定义的差异，在不同的数据库中表示不同的字段类型，例如在mysql中代表varchar，在mongo中代表string），index值为true表示需要索引，size代表字段的长度为100, defaultsTo表示字段默认值



### CURD 链式操作


例如：

```js
//useModel为实例化后的模型
useModel.where({name: 'aa'}).find(); //查询think_user表name值为aa的数据

```



### 一对一、一对多、多对多关联查询


例如user.js类中申明的关联关系：

```js
// 关联关系
this.relation = {
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

```
上述定义表示：

主表think\_user同think\_profile是一对一的关系

主表think\_user同think\_pet是一对多的关系

主表think\_user同think\_group是多地多关联关系