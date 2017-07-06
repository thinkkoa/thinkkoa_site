## 输出文件或图片

项目中有时候要输出图片等类型的数据，可以通过下面的方式进行：

控制器内输出图片:

```js
const file = think.root_path + '/static/upload/test.png';
const filename = path.relative(path.dirname(file), file);

this.header('Content-disposition', 'attachment; filename=' + filename);
return this.echo(fs.createReadStream(file));
```
或者这样写：

```js
this.ctx.set('Content-disposition', 'attachment; filename=' + filename);
this.ctx.body = fs.createReadStream(file);

```