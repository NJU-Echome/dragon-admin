'use strict';

module.exports = app => {
  class IndexController extends app.Controller {
    * index() {
      const list = yield this.ctx.service.category.list();
      yield this.ctx.render('index.tpl', { list });
    }
  }
  return IndexController;
};