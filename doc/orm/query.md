## 查询语言

ThinkORM的查询语法遵循 对象:属性 的模式：

```js
userModel.where({id:1}).find(); //查询一条ID为1的数据
```

### and

```js
userModel.where({ name: 'walter', state: 'new mexico' }).find();

userModel.where({ age: { '>=': 30 , '<=': 60}}).find();

```

### or

```js
// select * from think_user where (name = 'walter') or (occupation = 'teacher')
userModel.where({
    or : [
        { name: 'walter' },
        { occupation: 'teacher' }
    ]
}).find();

//select * from think_user where (id = 1 and name = walter) or (occupation ='teacher')
userModel.where({
    or : [
        { name: 'walter' , id: 1},
        { occupation: 'teacher' }
    ]
}).find();

```

### in

```js
userModel.where({
    name : ['Walter', 'Skyler']
}).find();
```

### not in

```js
userModel.where({
    name: { 'notin' : ['Walter', 'Skyler'] }
}).find();

userModel.where({
    notin: { 'name' : ['Walter', 'Skyler'] , 'id': [1, 3]}
}).find();
```



### less than

```js
userModel.where({ age: { '<': 30 }}).find();
```

### less than or equal

```js
userModel.where({ age: { '<=': 30 }}).find();
```

### greater than

```js
userModel.where({ age: { '>': 30 }}).find();
```

### greater than or equal

```js
userModel.where({ age: { '>=': 30 }}).find();
```

### not equal

```js
userModel.where({ age: { '<>': 30 }}).find();
```

### not

```js
userModel.where({ age: { 'not': 30 }}).find();

userModel.where({ not: { 'age': 30, 'name': 'aa' }}).find();

```

### like

```js
userModel.where({ name: { 'like': '%walter' }}).find();
userModel.where({ name: { 'like': 'walter%' }}).find();
userModel.where({ name: { 'like': '%walter%' }}).find();
```

## 高级查询

### 字段名为key合并表达式

```js
userModel.where({name: {'<>': '', not: 'aa', in: ['111', '222'], notin: ['aa', 'rrr'], like: '%a'}}).find()
```

### OR 组合及嵌套

```js
userModel.where({
    or : [
        { name: 'walter' , id: 1},
        { occupation: 'teacher' }
    ]
}).find();

userModel.where({
    or : [
        { name: 'walter' , id: 1},
        { occupation: 'teacher' },
        { or: [
                {...},
                {...}
            ]
        }
    ]
}).find();


```
### join查询

```js
//将join表字段写到field方法内，join表条件写入where
userModel
.field(['id','name','Demo.id','Demo.name'])
.join([{from: 'Demo', on: {demoid: 'id'}, type: 'inner'}])
.where({id: 1, 'Demo.name': 'test'})
.find()

//将join表字段声明在join方法的field属性内
userModel
.join([{from: 'Demo', alias: 'demo', on: {demoid: 'id'}, field: ['id', 'name'], type: 'inner'}])
.where({id: 1, 'demo.name': 'test'})
.find()
```
join方法传入的是一个数组，每一个数组元素均表示join一个表。

**from** : 需要的join的模型名

**alias** : 需要的join的模型查询别名

**on** : join的on条件

**field** : join表筛选的字段

**type** : join的类型，目前支持 inner,left,right三种

### group查询

group查询支持传入单个或多个字段名，多个字段名以数组的形式作为实参

```js
userModel.group('username').find()

userModel.group(['username', 'age']).find()
```
