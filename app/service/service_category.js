'use strict';

module.exports = app => {
  class ServiceCategoryService extends app.Service {
    
    /**
     * Get the Object list
     * @param {Number} page 
     * @param {Number} pageSize 
     * @param {Object} filter 
     * @param {Array|String} order 
     */
    * list(page = 1, pageSize = 15, filter = {}, order) {
      (!filter['deleteTime']) && (filter['deleteTime'] = { $is: null });
      const where = this.ctx.helper.sql.processWhere(filter);
      const orders = this.ctx.helper.sql.processOrders(order);
      const results = yield app.mysql.select('service_category', {
        where, orders,
        limit: pageSize,
        offset: (--page) * pageSize
      });
      const camelResults = this.ctx.helper.sql.processResultList(results);
      return camelResults;
    }

    /**
     * Count Objects according to the filters
     * @param {Object} filter 
     */
    * count(filter = {}) {
      (!filter['deleteTime']) && (filter['deleteTime'] = { $is: null });
      const where = this.ctx.helper.sql.processWhere(filter);
      const count = yield app.mysql.select('service_category', where);
      return count;
    }

    /**
     * Get single Object by id
     * @param {Number} id 
     * @param {Boolean} allowDeleted
     */
    * getById(id, allowDeleted) {
      const filter = { id };
      (!allowDeleted) && Object.assign(filter, { deleteTime: { $is: null } });
      const where = this.ctx.helper.sql.processWhere(filter);
      const result = yield app.mysql.get('service_category', where);
      const camelResult = this.ctx.helper.sql.processResult(result);
      return camelResult;
    }

    /**
     * Create new Object
     * @param {Object} body 
     */
    * create(body) {
      Object.assign(body, { createTime: app.mysql.literals.now, updateTime: app.mysql.literals.now });
      const newData = this.ctx.helper.sql.processBody(body);
      const result = yield app.mysql.insert('service_category', newData);
      return result.insertId;
    }

    /**
     * Update an existing Object
     * @param {Object} body Object with id
     */
    * updateById(id, body) {
      // prepare new data
      delete body.id;
      Object.assign(body, { updateTime: app.mysql.literals.now });
      const newData = this.ctx.helper.sql.processBody(body);
      // prepare where
      const filter = { id };
      Object.assign(filter, { deleteTime: { $is: null } })
      const where = this.ctx.helper.sql.processWhere(filter);
      // update
      let result = yield app.mysql.update('service_category', newData, { where });
      return id;
    }

    /**
     * Soft delete an existing Object
     * @param {Number} id 
     */
    * removeById(id) {
      const body = { id, deleteTime: app.mysql.literals.now };
      const newData = this.ctx.helper.sql.processBody(body);
      let result = yield app.mysql.update('service_category', newData);
      return id;
    }

    /**
     * Hard delete an existing Object
     * @param {Number} id 
     */
    * destroyById(id) {
      let result = yield app.mysql.delete('service_category', { id });
      return id;
    }
  }

  return ServiceCategoryService;
};