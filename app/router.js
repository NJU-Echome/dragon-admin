'use strict';

module.exports = app => {
  const prefix = '/api/v1';
  app.resources('ServiceCategory', `${prefix}/serviceCategory`, 'serviceCategory');
};