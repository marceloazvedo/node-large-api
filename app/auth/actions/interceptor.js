const UserDAO = require('../../../config/modules/create-dao')(require('../../user/user-model'), [])
const ResponseUtils = require('../../../config/modules/response')
const ErrorHandler = require('../../../config/modules/error-handler')

module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Expose-Headers", "Authorization")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, X-XSRF-TOKEN, Authorization, Content-Type, Accept")

    if ('OPTIONS' === req.method) {
        res.sendStatus(200)
    } else {
        const urlsDefault = ['/api/autenticar']
        const authorization = req.get('Authorization')
        if (urlsDefault.indexOf(req.originalUrl) >= 0) {
            res.status(401).end();
        } else {
            UserDAO.findOne({token: authorization}).then(user => {
                if(!user) req.status(401)
                else if(new Date() > user.expiration) req.status(401)
                else next()
            })
        }
    }
}