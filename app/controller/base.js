/**
 * Controller
 * @return
 */
const {controller, helper, version} = require('thinkkoa');

module.exports = class extends controller {

    //所有该控制器(含子类)方法前置方法
    __before() {
        this.assign({
            title: 'ThinkKoa - 轻量级可扩展的敏捷开发Node.js框架，支持ES6/7全新特性,支持Koa、Express中间件，基于koa2。',
            currentNav: '',
            version: version,
            helper: helper
        });
    }
};