## 输出文件或图片

项目中有时候要输出图片等类型的数据，可以通过下面的方式进行：

控制器内输出图片:

```js
 //图片 buffer 数据，读取本地文件或者从远程获取
 let imageBuffer = new Buffer();
 this.echo(imageBuffer, 'image/png');

```

输出其他类型文件方法类似，修改传入的contentType即可。