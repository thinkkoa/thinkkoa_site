/**
 * Controller
 * @return
 */
const fs = require('fs');
const child_process = require('child_process');
const highlight = require('highlight.js');
const marked = require('marked');
const markToc = require('marked-toc');
const base = require('./base');
const {helper} = require('thinkkoa');

module.exports = class extends base {
    //构造方法
    init(ctx) {
        //调用父类构造方法
        super.init(ctx);
    }
    //控制器默认方法
    async indexAction() {
        let doc = this.get('doc') || 'index';
        this.assign('currentNav', 'doc');
        if (doc === 'plugin') {
            this.assign('currentNav', 'plugin');
        }
        if (doc === 'changelog') {
            this.assign('currentNav', 'changelog');
        }
        await this.getSideBar();

        try {
            await this.getDoc(doc);
            return this.render();
        } catch (err) {
            return this.ctx.throw(404, err);
        }
    }


    /**
     * get sidebar json
     * @return {} []
   */
    async getSideBar() {
        let key = helper.md5('sidebar');
        let data = this.app.app_debug ? null : await this.app.cache(key);
        if (!data) {
            let filePath = `${this.app.root_path}/doc/sidebar.json`;
            helper.chmod(filePath, '755');
            let content = fs.readFileSync(filePath);
            data = JSON.parse(content);
            this.app.cache(key, data);
        }
        this.assign('sidebar', data);
    }

    /**
     * get doc content
     * @return {} []
  */
    async getDoc(doc) {
        let markedContent;
        let filePath = `${this.app.root_path}/doc/${doc}.md`;
        let htmlPath = filePath.replace('.md', '.html');

        if (helper.isFile(htmlPath)) {
            markedContent = fs.readFileSync(htmlPath, 'utf8');
        } else {
            if (!helper.isFile(filePath)) {
                return this.ctx.throw(404, `/doc/${doc}.html is not exist`);
            }
            markedContent = await this.getMarkedContent(filePath);
        }

        let titleReg = /<h2(?:[^<>]*)>([^<>]+)<\/h2>/;
        let match = markedContent.match(titleReg);
        if (match) {
            this.assign('title', `${match[1]} - ThinkKoa文档`);
        }
        this.assign('markedContent', markedContent);
        this.assign('doc', doc);
        return null;
    }

    /**
   * search action
   * @return {} []
   */
    async searchAction() {
        this.assign('currentNav', 'doc');
        await this.getSideBar();

        let keyword = this.get('keyword').trim();
        this.assign('keyword', keyword);
        if (!keyword) {
            return this.render();
        }

        let result = await this.getSearchResult(keyword);
        this.assign('searchResult', result);
        return this.render();
    }

    /**
     * get parsed markdown content
     * @param  {String} filePath []
     * @return {Promise}          []
   */
    async getMarkedContent(filePath) {
        let key = helper.md5(filePath);
        let markedContent = this.app.app_debug ? null : await this.app.cache(key);
        if (markedContent) {
            return markedContent;
        }
        markedContent = this.markdownToHtml(filePath);
        this.app.cache(key, markedContent);
        return markedContent;
    }

    /**
     * generate toc name
     * @param  {String} name []
     * @return {String}      []
    */
    generateTocName(name) {
        name = name.trim().replace(/\s+/g, '').replace(/\)/g, '').replace(/[\(\,]/g, '-').toLowerCase();
        if (/^[\w\-]+$/.test(name)) {
            return name;
        }
        return `toc-${helper.md5(name).slice(0, 3)}`;
    }

    /**
     * markdown to html
     * @return {} []
    */
    markdownToHtml(filePath) {
        helper.chmod(filePath, '755');
        let content = fs.readFileSync(filePath, 'utf8');

        let tocContent = marked(markToc(content)).replace(/<a\s+href="#([^\"]+)">([^<>]+)<\/a>/g, (a, b, c) => {
            return `<a href="#${this.generateTocName(c)}">${c}</a>`;
        });

        let markedContent = marked(content).replace(/<h(\d)[^<>]*>(.*?)<\/h\1>/g, (a, b, c) => {
            if (b == 2) {
                return `<h${b} id="${this.generateTocName(c)}">${c}</h${b}>`;
            }
            return `<h${b} id="${this.generateTocName(c)}"><a class="anchor" href="#${this.generateTocName(c)}"></a>${c}</h${b}>`;
        });
        markedContent = markedContent.replace(/<h(\d)[^<>]*>([^<>]+)<\/h\1>/, (a, b, c) => {
            return `${a}<div class="toc">${tocContent}</div>`;
        });

        let highlightContent = markedContent.replace(/<pre><code\s*(?:class="lang-(\w+)")?>([\s\S]+?)<\/code><\/pre>/mg, (a, language, text) => {
            text = text.replace(/&#39;/g, '\'').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\&quot;/g, '"').replace(/\&amp;/g, '&');
            var result = highlight.highlightAuto(text, language ? [language] : undefined);
            return `<pre><code class="hljs lang-${result.language}">${result.value}</code></pre>`;
        });

        return highlightContent;
    }

    /**
   * get search result
   * @param  {String} keyword []
   * @return {}         []
   */
    async getSearchResult(keyword) {
        let cmd = `grep '${keyword}' -ri *.md`;
        let fn = helper.promisify(child_process.exec, child_process);
        let options = {
            cwd: this.app.root_path + `/doc/`
        };
        //ignore command error
        let result = await fn(cmd, options).catch(err => '');

        let data = {};
        result = result.split('\n').filter(item => {
            return item;
        }).map(item => {
            let pos = item.indexOf(':');
            let filename = item.substr(0, pos);
            if (!(filename in data)) {
                data[filename] = { filename: filename, text: [] };
            }
            let text = item.substr(pos + 1);
            text = helper.escapeHtml(text).replace(new RegExp(keyword, 'ig'), a => {
                return `<span style="color:#c7254e">${a}</span>`;
            });
            data[filename].text.push(text);
        });
        data = Object.keys(data).map(item => {
            let itemData = data[item];
            let filePath = `${this.app.root_path}/doc/${itemData.filename}`;
            let content = fs.readFileSync(filePath, 'utf8').trim();
            content.replace(/#+([^\n]+)/, (a, c) => {
                itemData.title = c;
            });
            return itemData;
        }).sort((a, b) => {
            return a.text.length < b.text.length ? 1 : -1;
        });
        return data;
    }

};