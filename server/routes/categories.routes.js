const express = require('express')
const router = express.Router()

const Category = require('../models/Category.model')

// BUSQUEDA TODOS LAS CATEGORIAS
router.get('/getAllCategories', (req, res, next) => {
  Category.find()
    .then(allCategories => res.json(allCategories))
    .catch(err => next(new Error(err)))
})

// SUMA CATEGORIAS DE INGRESOS
router.get('/income', (req, res, next) => {
  Category.find({economicNature: 'ingresos'})
  .then(allCategoriesIncome => {
    let totalCategoriesIncome = 0
    for(i = 0; i < allCategoriesIncome.length; i++) {
      totalCategoriesIncome = totalCategoriesIncome + allCategoriesIncome[i].amount
    }
    res.json({income: totalCategoriesIncome})
  } )
  .catch(err => next(new Error(err)))
})

// SUMA CATEGORIAS DE GASTOS
router.get('/expenses', (req, res, next) => {
  Category.find({economicNature: 'gastos'})
  .then(allCategoriesExpenses => {
    let totalCategoriesExpenses = 0
    for(i = 0; i < allCategoriesExpenses.length; i++) {
      totalCategoriesExpenses = totalCategoriesExpenses +  allCategoriesExpenses[i].amount
    }
    res.json({expenses: totalCategoriesExpenses})
  } )
  .catch(err => next(new Error(err)))
})

// BUSQUEDA MOVIMIENTOS UNA CATEGORIA
router.get('/getOneCategory/:id', (req, res, next) => {
  Category.find({ "_id": req.params.id }).sort({ date: -1 })
    .populate('movements')
    .then(foundMovements => {
      res.json(foundMovements)
    })
    .catch(err => next(new Error(err)))
})

// ALTA NUEVA CATEGORIA
router.post('/categoryNew', (req, res, next) => {

  let objectCategory = {
    name: req.body.name,
    amount: 0,
    budget: req.body.budget,
    economicNature: req.body.economicNature
  }

  Category.create(objectCategory)
    .then(oneCategory => res.json(oneCategory))
    .catch(err => next(new Error(err)))

})

// ELIMINAR UNA CATEGORIA
router.get('/deleteCategory/:id', (req, res, next) => {
  Category.findByIdAndDelete(req.params.id)
    .then(() => res.json({ status: 'ok' }))
    .catch(err => next(new Error(err)))
})



module.exports = router