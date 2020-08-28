const express = require('express')
const router = express.Router()
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')

router.use('/products', ProductRouter)
router.use('/order', OrderRouter)

module.exports = router