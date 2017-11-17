/**
 * Middleware config
 * @return
 */
module.exports = {
    list: ['cache', 'view'], //加载的中间件列表
    config: { //中间件配置 
        static: {
            cache: false
        },
        router: {
            deny_controller: ['base'], //禁止访问的控制器
        }
    }
};