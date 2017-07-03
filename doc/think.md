## think
think 是一个全局对象，该对象里包含了大量有用的属性和方法。这些方法在应用的任何地方都可以直接使用

### think.root_path
项目根目录

```js
/    //项目根目录
/src
/app
/node_modules
/static
...
```

### think.app_path
项目app目录(项目程序执行目录)

```js
/    //项目根目录
/src //项目app目录(项目程序执行目录)
/app
/static
...
```

### think.think_path
ThinkKoa框架目录

```js
/    //项目根目录
/src
/app
/node_modules/thinkkoa //ThinkKoa框架目录
/static
...
```

### think.app_debug 
项目运行模式，为`true`时即开发模式，为`false`时即生产模式

### think.version
ThinkKoa框架版本

### think.app
Koa实例对象

### think.server
http.Server实例对象

### think.loader
loader类，框架自动加载类。

### think.use(fn)
运行koa中间件。等同于 `new koa().use(fn)`;

```js
const passport = require('koa-passport');
think.use(passport());
```
### think.useExp(fn)
运行express中间件。

```js
const passport = require('express-passport');
think.useExp(passport());
```

### think.logs(msg[, type, showTime, debug])
控制台输出封装。

* msg 输出信息。可以是string或 Error对象，如果为 Error对象，type参数值为 ERROR
* type 输出信息类型。分为 INFO,ERROR,WARING,THINK，其中 ERROR,WARING类型默认会自动写入日志文件
* showTime 输出执行时间
* debug 为false时控制台不打印信息

### think.parseExpMiddleware(fn)
转换express的middleware为koa使用

### think.config([name, type = 'config'])
读取配置项。
* name 配置项 key
* type 配置类型，默认为项目配置。分为 config,middleware ...

```js
think.config('aa');

think.config('aa.bb'); // aa: {bb: 1}

think.config('cache', 'middleware');
```

### think.define(obj, property[, value, setter = false])

`think_lib`

通过Object.defineProperty来定义某个对象的属性。

```js
//定义getter属性
think.define(obj, 'getInfo', function(){});

//定义getter and setter属性
think.define(obj, 'getInfo', function(){}, 1);
```

### think.sep()

`think_lib`

返回path.sep，根据OS不同返回文件分隔符。

```js
//windows
console.log(think.sep()); // \\
//mac
console.log(think.sep()); // /
```

### think.eq(value, other)

`think_lib`

返回lodash.eq。比较value 和 other

### think.gt(value, other)

`think_lib`

返回lodash.gt。判断value 大于 other

### think.gte(value, other)

`think_lib`

返回lodash.gte。判断value 大于或等于 other

### think.lt(value, other)

`think_lib`

返回lodash.lt。判断value 小于 other

### think.lte(value, other)

`think_lib`

返回lodash.lte。判断value 小于或等于 other

### think.isArray(value)

`think_lib`

返回lodash.isArray。判断value 类型是否为 `Array`

### think.isBoolean(value)

`think_lib`

返回lodash.isBoolean。判断value 类型是否为 `Boolean`

### think.isBuffer(value)

`think_lib`

返回lodash.isBuffer。判断value 类型是否为 `Buffer`

### think.isDate(value)

`think_lib`

返回lodash.isDate。判断value 类型是否为 `Date`

### think.isEqual(value, other)

`think_lib`

返回lodash.isEqual。判断value 是否和 other相等

### think.isError(value)

`think_lib`

返回lodash.isError。判断value 是否为 `Error` 对象

### think.isFunction(value)

`think_lib`

返回lodash.isFunction。判断value 是否为 `Function` 对象

### think.isIP(value)

`think_lib`

返回lodash.isIP。判断value 是否为 `IP`

### think.isMap(value)

`think_lib`

返回lodash.isMap。判断value 类型是否为 `Map`

### think.isNull(value)

`think_lib`

返回lodash.isNull。判断value 类型是否为 `Null`

### think.isNaN(value)

`think_lib`

返回lodash.isNaN。判断value 类型是否为 `NaN`

### think.isUndefined(value)

`think_lib`

返回lodash.isUndefined。判断value 类型是否为 `Undefined`

### think.isNumber(value)

`think_lib`

返回lodash.isNumber。判断value 类型是否为 `Number`

### think.isObject(value)

`think_lib`

返回lodash.isPlainObject。判断value 类型是否为 `Object`。仅包含标准的对象(不含Array、Function等)

### think.isRegexp(value)

`think_lib`

返回lodash.isRegexp。判断value 类型是否为 `Regexp`

### think.isSet(value)

`think_lib`

返回lodash.isSet。判断value 类型是否为 `Set`

### think.isString(value)

`think_lib`

返回lodash.isString。判断value 类型是否为 `String`

### think.isSymbol(value)

`think_lib`

返回lodash.isSymbol。判断value 类型是否为 `Symbol`

### think.isNumberString(value)

`think_lib`

判断value 类型是否是仅包含数字的字符串

### think.isJSONObj(value)

`think_lib`

判断value 类型是否是标准JSON对象，必须是对象或数组

### think.isJSONStr(value)

`think_lib`

判断value 类型是否是标准的JSON字符串.必须是字符串，且可以被反解为对象或数组

### think.isTrueEmpty(value)

`think_lib`

判断value 检查对象是否为空. value === (undefined || null || '' || NaN)

### think.isEmpty(value)

`think_lib`

判断value 是否为空.undefined,null,'',NaN,[],{}和任何空白字符，包括空格、制表符、换页符等等，均返回true

### think.toString(value)

`think_lib`

强制转换为字符串.跟.toString不同的是可以转换undefined和null为''

### think.toInt(value)

`think_lib`

强制转换为整型

### think.toFloat(value)

`think_lib`

强制转换为浮点型

### think.toNumber(value)

`think_lib`

强制转换为数值

### think.toBoolean(value)

`think_lib`

强制转换为布尔值

### think.toArray(value)

`think_lib`

返回lodash.toArray.强制转换为数组

### think.toObject(value)

`think_lib`

返回lodash.toPlainObject.强制转换为对象

### think.escapeHtml(value)

`think_lib`

字符转义实体.将value中的 <、>、"、' 转义为实体字符.

### think.escapeSpecial(value)

`think_lib`

字符转义实体.将value中的实体字符反转义.

### think.ucFirst(value)

`think_lib`

字符转义实体.将value首字符大写.

### think.md5(value)

`think_lib`

将value生成 md5 散列.

### think.hash(value)

`think_lib`

将value生成 hash 散列(非标准hash).

### think.rand(min, max)

`think_lib`

从 min 到 max 范围取随机数(伪随机).

### think.encryption(data, key)

`think_lib`

AES字符串加密.

* data 需要加密的字符串
* key 密钥 (必须为16位字符串)

### think.decryption(data, key)

`think_lib`

AES字符串解密.

* data 需要解密的字符串
* key 密钥 (必须为16位字符串)

### think.datetime(date[, format = 'yyyy-mm-dd hh:mi:ss'])

`think_lib`

日期时间戳及格式化.

* date 时间戳或日期字符串
* format 时间字符串格式

```js
//返回当前时间戳 如13233233344
think.datetime(); 

//转换时间字符串为时间戳
think.datetime('2017-01-01');

//返回当前时间格式字符串
think.datetime(null, '');

//返回指定时间戳的格式字符串
think.datetime(13233233344, 'yyyy');

//返回指定时间的格式字符串
think.datetime('2017-01-01', 'yyyy');
```

### think.inArray(value, arr)

`think_lib`

判断 value 是否为 arr数组的元素(存在隐式类型转换).

### think.arrUnique(arr)

`think_lib`

将 arr 数组去除重复元素.

### think.arrRemove(arr, indexs)

`think_lib`

将 arr 数组删除指定元素.
* arr 数组
* indexs 需要删除的下标数组[0, 1, 2]

### think.isFile(p)

`think_lib`

判断 p 是否为文件.

### think.isDir(p)

`think_lib`

判断 p 是否为文件夹.

### think.isWritable(p)

`think_lib`

判断文件或者目录 p 是否可写.

### think.chmod(p[, mode = '0777'])

`think_lib`

修改目录或者文件权限.同步模式

### think.readFile(filename[, enc = 'utf8'])

`think_lib`

读取文件.返回Promise

* filename 文件物理路径
* 为空返回Buffer类型,'utf8'返回String类型

### think.writeFile(filename, data)

`think_lib`

写入文件.返回Promise

### think.reFile(filename, nfilename)

`think_lib`

修改文件名，如果改变了文件路径，则移动文件。返回Promise

### think.rmFile(p)

`think_lib`

删除文件。同步模式

### think.mkDir(p[, mode = '0777'])

`think_lib`

递归创建目录.同步模式

### think.readDir(p[, filter, files, prefix])

`think_lib`

递归读取目录.同步模式

* p 文件夹物理路径
* filter 过滤函数
* files 追加文件数组
* prefix 文件名后缀

### think.rmDir(p[, reserve])

`think_lib`

递归的删除目录.返回Promise

### think.isPromise(value)

`think_lib`

判断value 类型是否为 `Promise`

### think.promisify(fn, receiver)

`think_lib`

将callback风格的函数转换为Promise.

### think.isGenerator(value)

`think_lib`

判断value 类型是否为 `Generator` 函数

### think.generatorToPromise(instance, method)

`think_lib`

将generator函数通过co转换为promise

### think.getDefer()

`think_lib`

生成一个defer对象

### think.require(file)

`think_lib`

自定义的加载模块。支持Babel编译后的ES6模块加载

### think.clone(source, deep)

`think_lib`

浅克隆或深度克隆对象。使用locdash库的clone和 cloneDeep.

### think.extend(source, target, deep)

`think_lib`

浅继承或深度继承对象。使用locdash库实现.深度继承生成的对象发生改变，不影响 source对象。

### think.cache(name, value, timeout)

`think_cache中间件`

缓存操作函数。支持 file、redis、memcache形式的存储。

* name 缓存key
* value 缓存value
* timeout 缓存失效时间，单位s

```js
//读取缓存
await think.cache('test');

//写入缓存
await think.cache('test', {aa: 11});
await think.cache('test', {aa: 11}, 30);
```

### think.addLogs(name, msgs)

`think_logger中间件`

自定义信息写入日志文件。日志文件默认存在在 logs/custom。可修改 `think_logger`中间件配置。

如果日志超过指定大小，会自动按照日期切割。

* name 缓存key,日志文件名
* msgs 缓存value

```js

//写入日志 logs/custom/test.log
await think.addLogs('test', {aa: 11});
```