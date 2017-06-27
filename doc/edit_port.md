## 修改服务监听端口

### 修改配置

编辑 src/config/config.js ：

```js
/**
 * Config
 * @return
 */

module.exports = {
    app_port: 3000,  //将3000修改为需要绑定的目标端口
    ......

};

```

### 编译重启服务

编译：
```bash
npm run compile
```

重新启动：

```bash
npm start
```
