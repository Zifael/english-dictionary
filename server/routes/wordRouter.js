const Router = require('express')
const wordController = require('../controllers/wordController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleWare')

router.post('/' ,wordController.create)
router.get('/', wordController.getAll)
router.get('/:id', wordController.getOne)
router.delete('/:id', wordController.deletWord)

module.exports = router 