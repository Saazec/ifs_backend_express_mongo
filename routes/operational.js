const controller = require('../controllers/operationalController');
const validateToken = require('../utils').validateToken;

module.exports = router => {
    router.route('/operational')
        .get(validateToken, controller.getAll)
        .post(validateToken, controller.add)
        .patch(validateToken, controller.patch)
        .delete(validateToken, controller.remove)
}