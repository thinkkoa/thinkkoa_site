## 链式操作
ThinkORM的模型使用了方便而直观的链式操作，例如:

```js
userModel.where({id:1}).field('username').find();
```
链式操作需要注意的两点：

**1、query原生查询方法不支持链式操作**

```js
userModel.query('select * from think_user').find(); //错误
```

**2、非中断式方法\(field、where、order等\)后可以跟随链式，而中断式方法必须放在链式操作的结尾\(find、update等\)**

例如：

```js
userModel.where({id:1}).field('username').order('id desc').find(); //正确

userModel.where({id:1}).field('username').find().order('id desc'); //错误
```

## 常用的模型类方法

### getTableName\(\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 获取模型类对应的数据库表名

### getPk\(\)

方法说明：

类型 | 作用
------------- | -------------
中断方法 | 获取模型类对应的数据库表主键

```js
userModel.getPk();
```

### alias(alias)
类型 | 作用
------------- | -------------
非中断方法 | 配合find、select等查询方法可以自定义表的查询别名

参数说明：

参数 | 说明
------------- | -------------
alias | 接受字符串


### limit(skip, limit)

方法说明：

类型 | 作用
------------- | -------------
非中断方法 | 配合find、select等查询方法可以获取指定区间的数据记录

```js
userModel.limit(1).find();
userModel.limit(10, 20).find();
userModel.limit([10, 10]).find();
```

参数 | 说明
------------- | -------------
skip | 起跳记录数（int）
limit | 需要获取的记录数 \(int\)

### order\(order\)

方法说明：

类型 | 作用
------------- | -------------
非中断方法 | 配合find、select等查询方法可以根据规则将数据记录排序

参数说明：

参数 | 说明
------------- | -------------
order | 接受对象{id: 'desc'}

```js
userModel.order({'name': 'asc', 'id': 'desc'})
```

### rel\(rels = true\{, options})
方法说明：


类型 | 作用
------------- | -------------
非中断方法 | 配合find、select等查询开启表关联查询;配合add方法开启关联新增；配合update方法开启关联更新
参数说明：

参数 | 说明
------------- | -------------
rels | 可传入布尔值 true或false 表示开启或关闭关联查询如果传入的是模型名，则仅关联查询传入的模型（模型类关联多个子表的情况下）
options | 指定关联表的查询选项

例子：

```js
userModel.rel(true, {Profile: {field: ['name'], where: {name: {'<>': ''}}}})

or

userModel.rel(['Profile'],{Profile: {field: ['name'], where: {name: {'<>': ''}}}})
```

### field\([fields]\)

方法说明：

类型 | 作用
------------- | -------------
非中断方法 | 配合find、select等查询方法使用，筛选输出查询结果字段
参数说明：

参数 | 说明
------------- | -------------
fields | 可接受数组

```js
field(['username', 'phone'])
```

### where\(where\)

方法说明：

类型 | 作用
------------- | -------------
非中断方法 | 定义查询或操作条件
参数说明：

参数 | 说明
------------- | -------------
where | 接受对象（请参考查询语言章节）

```js
//or:  
where({or: [{...}, {...}]})
//not: 
where({not: {name: '', id: 1}})
//notin: 
where({notin: {'id': [1,2,3]}})
// in: 
where({id: [1,2,3]})
// and: 
where({id: 1, name: 'a'},)
// operator: 
where({id: {'<>': 1}})
// operator: 
where({id: {'<>': 1, '>=': 0, '<': 100, '<=': 10}})
// like: 
where({name: {'like': '%a'}})
```

### join(joinArray)
方法说明：

类型 | 作用
------------- | -------------
非中断方法 | join查询。支持left、right、inner三种join。mongodb暂时不支持
参数说明：

参数 | 说明
------------- | -------------
joinArray | 接受一个数组，数组的每一个元素都代表一次join操作


例子：

```js
UserModel.join([{from: 'test', on: {aaa: bbb, ccc: ddd}, field: ['id', 'name'], type: 'inner'}]).find()
//mysql
select User.*, Test.id as Test_id, Test.name as Test_name join test as Test on User.aaa = Test.bbb and User.ccc = Test.ddd limit 1
```

### group(group)
方法说明：

类型 | 作用
------------- | -------------
非中断方法 | group查询
参数说明：


参数 | 说明
------------- | -------------
group | group可以接收一个字符串或一个数组


例子：

```js
.group('name').find()

.group(['id', 'name']).find()
```

### add\(data\[, options\]\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 操作数据库新增一条传入的数据对象
参数说明：


参数 | 说明
------------- | -------------
data | 传入需要新增的对象
options | 可选参数。扩展项

例子：

```js
add({username: 'test', phone: '13333333333'})
```
options 可选参数

```js
add({xxx}, {verify: true})等同于verify(true).add({xxxx})
```
### thenAdd\(data\[, options\]\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 需要配合where传入条件。根据条件查询数据库是否存在记录，不存在则新增
参数说明：

参数 | 说明
------------- | -------------
data | 传入需要新增的对象
options | 可选参数。扩展项

例子：

```js
where({id: 1}).thenAdd({username: 'test', phone: '13333333333'})
```
options 可选参数，用于扩展。

```js
thenAdd({username: 'test', phone: '13333333333'},{where: {id: 1}})
等同于
where({id: 1}).thenAdd({username: 'test', phone: '13333333333'})
```
作用：根据条件查询数据库是否存在记录，不存在则新增。
### delete\(\[options\]\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 需要配合where传入条件。删除数据库记录。注意不允许无条件操作
参数说明：

参数 | 说明
------------- | -------------
options | 可选参数。扩展项


例子：

```js
where({id:1}).delete()
```
options 可选参数，用于扩展。

```js
delete({where: {id: 1}}) 等同于 where({id: 1}).delete()
```
### update\(data\[, options\]\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 需要配合where传入条件。更新数据库记录。注意不允许无条件操作
参数说明：

参数 | 说明
------------- | -------------
options | 可选参数。扩展项


例子：

```js
where({id:1}).update({username: 'aaa'})
```
options 可选参数，用于扩展。

```js
update({username: 'test', phone: '13333333333'},{where: {id: 1}})
等同于
where({id: 1}).update({username: 'test', phone: '13333333333'})
```
### increment\(field\[, setp, options\]\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 数据字段自增
参数说明：

参数 | 说明
------------- | -------------
field | 需要自增的字段名
setp | 步长,默认值为1
options | 可选参数，用于扩展

### decrement\(field\[, setp, options\]\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 数据字段自减
参数说明：

参数 | 说明
------------- | -------------
field | 需要自减的字段名
setp | 步长,默认值为1
options | 可选参数，用于扩展

### find\(\[options\]\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 查询一条数据库记录
参数说明：

参数 | 说明
------------- | -------------
options | 可选参数，用于扩展

例子：

```js
where({id:1}).find()
```

### count\(\[field, options\]\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 统计数据库记录数
参数说明：

参数 | 说明
------------- | -------------
field | 计数的字段,如果此参数未传入，默认为主键
options | 可选参数，用于扩展

例子：

```js
where({id:1}).count()
```

### sum\(field\[, options\]\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 统计数据库记录求传入字段的和
参数说明：

参数 | 说明
------------- | -------------
field | 计数的字段,如果此参数未传入，默认为主键
options | 可选参数，用于扩展

例子：

```js
where({id:1}).sum('score')
```

### select\(\[options\]\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 查询多条数据库记录
参数说明：

参数 | 说明
------------- | -------------
options | 可选参数，用于扩展

### countSelect\(\[options, pageFlag\]\)
方法说明：

类型 | 作用
------------- | -------------
中断方法 | 分页查询多条数据库记录，并按照分页格式返回
参数说明：

参数 | 说明
------------- | -------------
options | 可选参数，用于扩展
pageFlag | 可选参数，当页面不合法时的处理方式，true为获取第一页，false为获取最后一页，undefined获取为空



## 前置及后置方法

ThinkNode内置了丰富的魔术方法，方便进行模型操作的前置及后置处理。

```js
//新增前置魔术方法 _beforeAdd (data, options)
//新增后置魔术方法 _afterAdd(data, options)
//删除前置魔术方法 _beforeDelete(options)
//删除后置魔术方法 _afterDelete(options）
//更新前置魔术方法 _beforeUpdate(data, options)
//更新后置魔术方法 _afterUpdate(data, options)
//单条查询后置魔术方法 _afterFind(result, options)
//多条查询后置魔术方法 _afterSelect(result, options)
```
例如我们删除一个用户，同时想删除资料表中用户上传的资料，我们就可以使用删除后置方法

```js
//删除后置魔术方法
async _afterDelete(options) {
    await userModel.where({userid:options.where.userid}).delete();
    return getPromise(options);
}
```