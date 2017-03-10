'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const sleep = require('../util/sleep');

describe('controller - service_category', () => {
  let app;
  before(() => {
    app = mock.app();
    return app.ready();
  });

  let id, obj, updatedId, updatedObj, deletedId, nullObj, deletedObj, destroyedId, destroyedObj
  it('should create service_category', function* () {
    const ctx = app.mockContext();
    id = yield ctx.service.serviceCategory.create({ name: '1' });
    obj = yield ctx.service.serviceCategory.getById(id);
    assert(obj);
    assert(obj.id == id);
    assert(obj.name == '1');
    assert(obj.createTime);
    assert(obj.updateTime);
    assert(!obj.deleteTime);
  });

  it('should sleep 1 seconds', function* () {
    yield sleep(1000);
  });

  it('should update service_category', function* () {
    const ctx = app.mockContext();
    sleep
    updatedId = yield ctx.service.serviceCategory.updateById(id, {name: '2'});
    assert(id == updatedId);
    updatedObj = yield ctx.service.serviceCategory.getById(id);
    assert(updatedObj.name == '2');
    assert(updatedObj.createTime.getTime() == obj.createTime.getTime());
    assert(updatedObj.updateTime.getTime() > updatedObj.createTime.getTime());
    assert(!updatedObj.deleteTime);
  });

  it('should remove service_category', function* () {
    const ctx = app.mockContext();
    deletedId = yield ctx.service.serviceCategory.removeById(id);
    assert(id == deletedId);
    nullObj = yield ctx.service.serviceCategory.getById(id);
    assert(!nullObj);
    deletedObj = yield ctx.service.serviceCategory.getById(id, true);
    assert(deletedObj.name == '2');
    assert(deletedObj.createTime.getTime() == obj.createTime.getTime());
    assert(deletedObj.updateTime.getTime() == updatedObj.updateTime.getTime());
    assert(deletedObj.deleteTime);
  });

  it('should destroy service_category', function* () {
    const ctx = app.mockContext();
    destroyedId = yield ctx.service.serviceCategory.destroyById(id);
    assert(id == destroyedId);
    destroyedObj = yield ctx.service.serviceCategory.getById(id, true);
    assert(!destroyedObj);
  });

});