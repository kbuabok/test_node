const {ApiResult} = require('../utils/ApiResult');
const {HttpResponse} = require('../utils/HttpResponse');

module.exports = (err, req, res, next) => {
    if (err.isJoi) {
        let apiResult = new ApiResult();
        apiResult.message = HttpResponse.BADREQUEST_MSG;
        apiResult.status = HttpResponse.BADREQUEST;
		return res.status(HttpResponse.BAD_REQUEST).json(apiResult)
	}
	return next(err)
}