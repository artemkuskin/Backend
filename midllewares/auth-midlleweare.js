const ApiErrors = require("../controllers/errors/api-errors");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const auhorizationHeader = req.headers.authorization;
    if (!auhorizationHeader) {
      return next(ApiErrors.UnauthorizedError());
    }
    const accessToken = auhorizationHeader.split(" ")[1]
    console.log(accessToken);
    if (!accessToken) {
      return next(ApiErrors.UnauthorizedError())
    }
    const userData = tokenService.validateAccessToken(accessToken)
    console.log(userData);
    if (!userData) {
      return next(ApiErrors.UnauthorizedError());
    }
    req.user = userData
    next()
  } catch (e) {
    return next(ApiErrors.UnauthorizedError());
  }
};
