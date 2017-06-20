/**
 * Controller
 * @return
 */

export default class extends think.controller.base {
    //构造方法
    init(http){
        //调用父类构造方法
        super.init(http);
    }
    
    //控制器默认方法
    indexAction () {
        return this.ok('success');
    }
}