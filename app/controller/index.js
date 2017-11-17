/**
 * Controller
 * @return
 */
const base = require('./base');

module.exports = class extends base {
    //构造方法
    init(ctx){
        //调用父类构造方法
        super.init(ctx);
    }
    //控制器默认方法
    indexAction () {
        this.assign('currentNav', 'index');
        return this.render();
    }
};