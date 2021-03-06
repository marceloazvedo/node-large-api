const UserDAO = require('../../../config/modules/create-dao')(require('../user-model'), [])
const ResponseUtils = require('../../../config/modules/response')

module.exports = (req, res) => {
    UserDAO.create(req.body)
        .then(ResponseUtils(res))
        .catch(err => ResponseUtils(res, err))
}