module.exports = class ApiErrors extends Error {
  status
  errors

  constructor(status, messege, errors=[]) {
    super(messege) 
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiErrors(401, 'Пользователь не авторизован')
  }

  static BadRequest (messege, errors= [])  {
    return new ApiErrors(400, messege, errors)
  }
}