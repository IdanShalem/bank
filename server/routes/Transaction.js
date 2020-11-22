const   express     = require('express'),
        router      = express.Router(),
        Transaction = require('../models/Transaction')


router.get('/allTransactions' , async function(req, res) {
    const allTransactions = await Transaction.find({}).sort('date')
    res.send(allTransactions) 
})

router.post('/expense', async function(req, res) {
    const transaction = new Transaction(req.body)
    await transaction.save()
    const allTransactions = await Transaction.find({}).sort('date')
    res.send(allTransactions) 
})

router.delete('/:transactionId', async function(req, res) {
    const { transactionId } = req.params
    await Transaction.findByIdAndDelete(transactionId)
    const allTransactions = await Transaction.find({}).sort('date')
    res.send(allTransactions) 
})

module.exports = router