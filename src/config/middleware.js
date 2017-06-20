/**
 * Middleware config
 * @return
 */
module.exports = {
    list: ['cache', 'view'], //加载的中间件列表
    config: { //中间件配置 
        static: {
            cache: false
        }
    }
};