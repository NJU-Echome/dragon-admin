'use strict';

module.exports = app => {
  class ServiceCategoryService extends app.Service {
    * list(page = 1) {
      const results = yield app.mysql.select('service_category');
      return results;
    }
  }
  return ServiceCategoryService;
};