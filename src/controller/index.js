/**
 * Controller
 * @return
 */
import base from './base';

export default class extends base {
    //构造方法
    init(http){
        //调用父类构造方法
        super.init(http);
    }
    //控制器默认方法
    indexAction () {
        this.set('currentNav', 'index');
        return this.render();
    }
}