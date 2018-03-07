## 数据验证

为保证数据入库的准确性，避免例如undefined、null等类型错误，保持多种数据源的数据一致性，例如mongodb就是强类型。ThinkORM默认会强制进行数据类型检查，还可以支持自定义数据检查规则，并可扩展规则。

### 强制数据类型检查

模型类字段通过type属性来定义数据类型。如果未定义该属性，默认值为string。

```js
// 数据表字段信息
this.fields = {
    id: {
        type: 'integer',
        primaryKey: true
    },
    name: {
        type: 'string',
        index: true,
        defaultsTo: ''
    },
    profile: {
        type: 'integer',
        index: true,
        defaultsTo: 0
    }
};
```
支持的数据类型有：

属性值 | 描述
------------- | -------------
string | 字符型
text | 文本型
integer | 整型
float | 浮点型
json | json格式
array | 数组格式


如果定义的数据类型未包含在上述值内，默认为string。

**新增数据**

新增数据时，会根据模型类字段定义的数据类型检查除主键外的其他所有字段数据。
```
UserModel.add({name: 'aa'});//会自动检查name、profile的值是否符合类型。
```

**更新数据**

更新数据时，会根据模型类字段定义的数据类型检查需要更新的字段数据。
```
UserModel.where({id:1}).update({profile: 1});//仅自动检查profile的值
```

**defaultsTo属性的影响**

如果字段设置了defaultsTo属性，且该属性的值不为 undefined 和 null。那么在新增时，如果字段不存在(主键除外)，会自动匹配默认值。在更新时，如果字段的值为空（'',0,null,undefined,仅含空格、换行等占位符的字符串）,也会自动赋值默认值。

```js
//新增时
UserModel.add({name: 'aa'});
//insert into `think_user` (`name`, `profile`) values ('aa', 0);

//更新时
UserModel.where({id: 1}).update({profile: null});
//update `think_user` as `User` set `profile` = 0 where `User`.`id` = 1;

```

### 自定义验证

ThinkORM支持自定义的数据验证，例如姓名检查，密码长度检查，手机号码检查等等，通过模型类的validations属性进行配置：

```js
this.validations = {
    username: {
        method: 'ALL',//新增和更新时都验证,method属性不存在则规则无效
        valid: ['required'], //验证规则
        msg: {
            required: '姓名必填'//验证未通过时的错误提示
        }
    },
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
**默认的验证规则**

ThinkORM自身包含了一个验证库，涵盖了常用的一些数据验证规则:

```js
    length(value, min, max)//长度范围验证
    required(value)//必填
    regexp(value, reg)//自定义正则
    email(value)//email
    time(value)//时间戳
    cnname(value)//中文名
    idnumber(value)//身份证号码
    mobile(value)//手机号码
    zipcode(value)//邮编
    confirm(value, cvalue)//两次值是否一致
    url(value)//url
    int(value)//整数
    float(value)//浮点数
    range(value, min, max)//整数范围
    ip4(value)//ip4
    ip6(value)//ip6
    ip(value)//ip
    date(value)//日期
    in(value, arr)//在一个数组内
```
上述规则如果仅有一个入参，规则设置方法:

```js
username: {
    method: 'ALL',//新增和更新时都验证
    valid: ['required'], //验证规则
    msg: {
        required: '姓名必填'//验证未通过时的错误提示
    }
}
```
有多个入参的规则设置方法:

```js
username: {
    method: 'ALL',//新增和更新时都验证
    valid: ['length'],
    length_args: [6],//规则第二个入参
    msg: {
        length: '长度不能小于6'
    }
}
username: {
    method: 'ALL',//新增和更新时都验证
    valid: ['length'],
    length_args: [6, 10],//规则第二个、第三个入参
    msg: {
        length: '长度在6-10之间'
    }
}

```
**扩展自定义验证规则**

除了上述默认的验证规则外，我们可以通过函数的方式来自定义验证：

```js
username: {
    method: 'ALL',//新增和更新时都验证
    valid: [
        function(){
            ....
            if(true){
                return {status: 1, msg: ''}
            }else {
                return {status: 0, msg: '验证错误'}
            }
        }, 'required'
    ]
    msg: {
    required: '必填'
    }
}
```
需要注意的是，验证规则的函数必须是同步方法，并且返回格式固定：

成功要返回{status: 1, msg: ''}

失败时要返回{status: 0, msg: '验证错误信息'}

异步的验证请使用_beforeAdd或_beforeUpdate模型类方法来实现：

```js
//模型类新增前置方法
async _beforeAdd(data, options){
    let num = await this.where({username: data.username}).count();
    if(num > 0){
        return Promise.reject('该用户名已被使用');
    }
}

```
