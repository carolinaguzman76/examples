const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: String,
    amount: Number,
    budget: Number,
    economicNature: String,
    movements:[{type: Schema.Types.ObjectId, ref: 'Movement' }]
}, 
{
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category