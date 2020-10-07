const   express     = require('express'),
        router      = express.Router()
        Transaction = require('../models/Transaction')


router.get('/transactions' , function(req, res) {
    Transaction.find({}).then(t => res.send(t))
})

router.post('/transaction', async function(req, res) {
    const transaction = new Transaction(req.body)
    await transaction.save()
    res.send(transaction)
})

router.delete('/transaction/:transactionId', async function(req, res) {
    const { transactionId } = req.params
    const transaction = await Transaction.findByIdAndDelete(transactionId)
    res.send(transaction)
})

module.exports = router