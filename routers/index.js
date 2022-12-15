const { Router } = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const authMidlleweare = require("../midllewares/auth-midlleweare");
const jsonToDb = require("../service/jsonToDb");


const router = new Router()

router.post('/registration',
body('email').isEmail(),
body('password').isLength({max:15, min: 5}),
 userController.registration)

router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users',authMidlleweare ,userController.getUsers)
router.get('/menu', jsonToDb)
//router.get('/menu' ,userController.getMenu)

module.exports = router