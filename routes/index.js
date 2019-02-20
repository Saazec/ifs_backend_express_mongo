const users = require('./users');
const operational = require('./operational');
const ifs = require('./ifs');

module.exports = (router) => {
  users(router);
  operational(router);
  ifs(router);
  
  return router;
};