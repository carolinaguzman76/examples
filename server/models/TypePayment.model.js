const mongoose = require('mongoose')
const Schema = mongoose.Schema

const typePaymentSchema = new Schema({
    name: String,
    amount: Number,
    budget: Number,
    movements:[{type: Schema.Types.ObjectId, ref: 'Movement' }]
}, {
    timestamps: true
})

const typePaymentModel = mongoose.model('TypePayment', typePaymentSchema)
module.exports = typePaymentModel