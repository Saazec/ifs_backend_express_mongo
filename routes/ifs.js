const controller = require('../controllers/ifsController');
const validateToken = require('../utils').validateToken;

module.exports = router => {
    router.route('/ifs')
        .get(validateToken, controller.getAll)  // All routes are protected
        .post(validateToken, controller.add)
        .patch(validateToken, controller.update)
        .delete(validateToken, controller.remove)
}