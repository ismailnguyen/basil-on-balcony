const express = require('express')
const app = express()

const budgets = require('./routes/budgets')
const transactions = require('./routes/transactions')

app.use(budgets)
app.use(transactions)

module.exports = {
    path: '/api',
    handler: app
}
