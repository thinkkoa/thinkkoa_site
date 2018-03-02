/**
 * Controller
 * @return
 */
const base = require('./base');

module.exports = class extends base {

    //控制器默认方法
    indexAction () {
        this.assign('currentNav', 'index');
        return this.render();
    }
};