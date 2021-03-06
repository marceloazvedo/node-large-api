const ErrorHandler = require('../../config/modules/error-handler')

const errorsAndCodes = require('./errors-codes')
const getErrors = (req, err) => ({ errors: ErrorHandler(req, err) })
const getResponse = (req, code, obj = {}) => Object.assign({}, obj, {code}, { message: req.i18n.__(`messages.${code}`) })

const STATUS_CODE_SUCSESS = 200
const STATUS_CODE_INTERNAL_SERVERAL_ERRO = 500

const processResponse = (req, res, response, status = 200, code = '000') => {
    if (response && response.name === 'ValidationError')
        res.status(status).json(getResponse(req, errorsAndCodes.VALIDATION_ERRO, getErrors(req, response)))
    else
        res.status(status).json(getResponse(req, code, response))
}

const processResponseWithError = (req, res, err) => {
    if (err && err.name === 'ValidationError')
        res.status(STATUS_CODE_SUCSESS).json(getResponse(req, errorsAndCodes.VALIDATION_ERRO, getErrors(req, err)))
    else
        res.status(STATUS_CODE_SUCSESS).json(getResponse(req, err))
}

module.exports = Object.assign({}, { processResponse }, { processResponseWithError }, { errors: Object.assign({}, errorsAndCodes) })