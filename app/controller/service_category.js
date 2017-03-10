'use strict';

/**
 * Validation Rules
 */
const rule = {
  create: {
    name: 'string'
  }
};

/**
 * Create new object
 */
exports.create = function* () {
  this.validate(rule.create);
  const id = yield this.service.serviceCategory.create(this.request.body);
  this.body = {
    service_category_id: id,
  };
  this.status = 201;
};

/**
 * Get list
 */
exports.index = function* () {
  const count = yield this.service.serviceCategory.count({ create_time: {$is : null} });
  const result = yield this.service.serviceCategory.list();
  this.body = result;
  this.status = 200;
}

/**
 * Get single object
 */
exports.show = function* () {
  const id = this.request.params.id;
  const result = yield this.service.serviceCategory.show(id);
  this.body = result;
  this.status = 200;
}

/**
 * Modify single object
 */
exports.edit = function* () {
  const id = this.request.params.id;
  const body = this.request.body;
  const result = yield this.service.serviceCategory.updateById(id, body);
  this.body = result;
  this.status = 200;
}

/**
 * Remove single object (soft)
 */
exports.destory = function* () {
  const id = this.request.params.id;
  const result = yield this.service.serviceCategory.removeById(id);
  this.body = result;
  this.status = 200;
}
