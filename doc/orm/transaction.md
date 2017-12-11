## 事务

ThinkORM目前支持Mysql、postgreSQL的事务操作，代码示例：

```js

//实例化模型
let model = new user(config);

//开始事务
return model.transaction(async function (t) {
//同步模式
// for (var i = 1; i < 5; i++) {
// await model.add({name: 'rrrrrrrrrrrrr'});
// await model.add({name: 'rrrrrrr'});
// await model.add({name: 'rrrrrrrrrrrrr'});
// }

//Promise.all并行模式
//var ps = [];
//for (var i = 1; i < 5; i++) {
// ps.push(model.add({name: 'rrrrrrrrrrrrr'}));
// ps.push(model.add({name: 'rrrr'}));
// ps.push(model.add({name: 'rrrrrrrrrrrrr'}));
//}
//return Promise.all(ps);

    //跨模型执行
    await model.add({name: 'rrrrrrrrrrrrr'}); //主模型写入数据
    let profileModel = await THINK.model('Common/Profile', {}).initDB(t);//实例化profile模型
    return profileModel.add({test: ['rrrtest']});//profile模型写入数据
}).then(data => {
console.log(data);//事务commit后打印
});


```