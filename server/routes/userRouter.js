const Router = require('express')
const userControllers = require('../controllers/userController')
const router = new Router()
const AuthMiddleWare = require('../middleware/AuthMiddleWare')

router.post('/registration', userControllers.registration)
router.post('/login', userControllers.login)
router.get('/auth', AuthMiddleWare, userControllers.checkAuth)


module.exports = router