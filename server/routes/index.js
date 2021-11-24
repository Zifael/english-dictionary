const Router = require('express')
const router = new Router()
const wordRouter = require('./wordRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter),
router.use('/words', wordRouter),


module.exports = router