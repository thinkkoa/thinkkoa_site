## 并行处理

使用 `async/await` 来处理异步时，是串行执行的。但很多场景下我们需要并行处理，这样可以大大提高执行效率，此时可以结合 `Promise.all` 来处理。

```js
const {controller} = require('thinkkoa');

module.exports = class extends controller {
    async indexAction() {
        let d1 = this.getData1();
        let d2 = this.getData2();
        let [d1Data, d2Data] = await Promise.all([d1, d2]);
    }
}

```