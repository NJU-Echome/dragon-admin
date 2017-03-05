'use strict';

exports.keys = 'f9emsx7g3f';

exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};

exports.mysql = {
  client: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'dragon',
  },
  app: true,
  agent: false,
};