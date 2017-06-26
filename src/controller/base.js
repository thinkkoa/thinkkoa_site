/**
 * Controller
 * @return
 */

export default class extends think.controller.base {
    //构造方法
    init(http) {
        //调用父类构造方法
        super.init(http);
    }
    //所有该控制器(含子类)方法前置方法
    __before() {
        this.set({
            title: 'ThinkKoa - A lightweight, scalable web framework, based on koa.',
            currentNav: ''
        });
    }
}