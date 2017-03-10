'use strict';

module.exports = function(timeMillis) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeMillis);
  });
}