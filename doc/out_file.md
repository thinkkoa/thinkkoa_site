## 输出文件或图片

项目中有时候要输出图片等类型的数据，可以通过下面的方式进行：

控制器内输出图片:

```js
const file = this.app.root_path + '/static/upload/test.png';
const filename = path.relative(path.dirname(file), file);

this.ctx.set('Content-disposition', 'attachment; filename=' + filename);
return this.write(fs.createReadStream(file));
```
或者中间件中这样写：

```js
ctx.set('Content-disposition', 'attachment; filename=' + filename);
ctx.body = fs.createReadStream(file);

```