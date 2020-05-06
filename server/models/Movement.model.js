const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movementSchema = new Schema({
    name: String,
    description: String,
    amount: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    date: Date,
    typePayment: { type: Schema.Types.ObjectId, ref: 'TypePayment' },
    imageUrl: String
}, {
    timestamps: true
})

const Movement = mongoose.model('Movement', movementSchema)
module.exports = Movement