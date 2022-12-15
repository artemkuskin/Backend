const User = require("../models/User");
const bcrypt = require('bcrypt');
const uuid  = require("uuid");
//const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiErrors = require("../controllers/errors/api-errors");

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({email})
    if (candidate) {
      throw ApiErrors.BadRequest(`Пользователь с таким  адресом ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const user = await User.create({email, password: hashPassword, activationLink})
    user.isActivated = true
    //await mailService.sendActivationMail(email, activationLink)
       // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDt0 = new UserDto(user)
    const tokens = tokenService.generateToken({...userDt0})
    await tokenService.saveToken(userDt0.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDt0
    }
  }

  async login (email, password) {
    const user = await User.findOne({email})
    if (!user) {
      throw  ApiErrors.BadRequest(`Пользователь с таким  адресом ${email} не найден`)
    
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiErrors.BadRequest(`Неверный пароль`)
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }



  async logout (refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh (refreshToken) {
    if (!refreshToken) {
      throw ApiErrors.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiErrors.UnauthorizedError()
    }
    const user = await User.findById(userData.id)
    console.log(111111111111111111111111111);
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }

  async getAllUsers() {
    const users = await User.find()
    return users
  }
}



module.exports = new UserService();
