'use strict';

const _ = require('lodash');

module.exports = {
  _sql: null,
  get sql() {
    if(!this._sql) {
      this._sql = {
        processWhere: function(obj) {
          const where = {};
          for (let k in obj) {
            where[_.snakeCase(k)] = obj[k];
          }
          return where;
        }.bind(this),
        processOrders: function(obj) {
          const orders = obj ? obj.map((order) => {
            return [ _.snakeCase(obj.key), obj.method || 'ASC' ]
          }) : undefined;
          return orders;
        }.bind(this),
        processBody: function(obj) {
          const data = {};
          for (let k in obj) {
            data[_.snakeCase(k)] = obj[k];
          }
          return data;
        }.bind(this),
        processResult: function(obj) {
          if(!obj) return null;
          const data = {};
          for (let k in obj) {
            data[_.camelCase(k)] = obj[k];
          }
          return data;
        }.bind(this),
        processResultList: function(list) {
          if(!list) return [];
          const data = list.map((obj) => {
            let item = {};
            for (let k in obj) {
              item[_.camelCase(k)] = obj[k];
            }
            return item;
          });
          return data;
        }.bind(this)
      }
    }
    return this._sql;
  }
};