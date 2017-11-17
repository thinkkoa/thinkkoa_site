## ES6/7开发项目
从ES6正式成为标准发布以后，几家欢乐几家愁。有的人认为javascript丢失了自己的特点，但是我相信大部分人是乐见其成的。ES6新增了大量的新特性，使得javascript更加工程化，更加适应企业级大工程化研发，这是大势所趋。

需要注意的是，当前Node.js 8 并没有对 es6的 module 进行支持，因此我们要避免使用 import/export

### let  和 const
在ES6之前，相信javascript程序员都遇到过全局变量提升的坑。`let` 和 `const` 限制为块级作用域。简单来说就是  `{代码块}` 花括号包起来的部分。在 `if / else` 和 `try / catch / finally` 及函数中经常出现。跟 `var` 还有一个区别是，`let` 和 `const` 不能重复声明，也不存在变量提升。


```js

let bb = '111';
try {
	let aa = 'test';
} catch (e) {
	console.log(aa); // undefined
	console.log(bb); // 111
}

```

```js
let bb = 1;

let bb = '111'; //Error

```

总结： 在编程中使用`const`声明常量；使用`let`声明变量。如非必要，尽量不使用`var`；


### 箭头函数
javascript的this作用域也是难点之一，有很多奇怪的用法。特别是在回调风格的代码内，this作用域往往容易使人犯错。由此诞生了一堆的关于this作用域相关的操作，例如 `call`  /  `bind` 等等。箭头函数的作用是绑定上文this作用域，向函数内传递，保持函数内this作用域和外部一致。

```js
//以前我们要这样写：
let self = this;
array.forEach(function(item){
	self.xxx
})

//箭头函数
array.forEach(item => {
	this.xxx
})
```

### Class 和 extends

    从本质上说，ES6的classes主要是给创建老式构造函数提供了一种更加方便的语法，并不是什么新魔法 

                                            —— Axel Rauschmayer，Exploring ES6作者

从功能上来讲，class声明就是一个语法糖，它只是比我们之前一直使用的基于原型的行为委托功能更强大一点。

```js

class blackCat extends cat {
	constructor() {
		super.test();
	}
}
```

### 静态方法
静态方法是构造方法自己的方法，不能被类的实例化对象调用。我们使用static关键字定义静态方法。

```js

class Food {
	constructor() {
		this.name    = name;
	    	this.protein = protein;
	    	this.carbs   = carbs;
	    	this.fat     = fat;
	}
	
	static count () {
		console.log(111);
	}
}

//等同于ES5的写法
//Food.count = function(){
//	console.log(111);
//};

const dummy = new Food();

dummy.count(); //Error
Food.count(); // 111
```

### 模板字符串

模板字符串 解决了三个痛点，允许你做如下操作:

* 定义在字符串内部的表达式，称为 字符串插值。
* 写多行字符串无须用换行符 (n) 拼接。
* 使用“raw”字符串 – 在反斜杠内的字符串不会被转义，视为常量。

```js
let aa = 'test';
let  str = `1111111${aa}2222222`;

console.log(str); // 1111111test2222222

```

### async/await

`async/await` 在ES6并没有成为标准发布，但是作为解决回调问题的下一代方案，一直被大家所关注。目前`Node.js 4`、`Node.js 6` 均未能支持，需要依赖于babel的编译。在最新发布的 `Node.js 8` 中，已经获得官方支持，可预见不久后将大行其道。

```js
async function  getFile() {
	let content = await fs.readFile('./test.txt', 'utf-8').catch(e => '');
}

```

