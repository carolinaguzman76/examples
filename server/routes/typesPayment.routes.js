const express = require('express')
const router = express.Router()

const TypePayment = require('../models/TypePayment.model')

// BUSQUEDA TODAS LAS FORMAS DE PAGO-COBRO
router.get('/getAllTypesPayment', (req, res, next) => {
  TypePayment.find()
  .then(allTypesPayment => res.json(allTypesPayment))
  .catch(err => next(new Error(err)))
})

// BUSQUEDA MOVIMIENTOS UNA FORMA DE PAGO-COBRO
router.get('/getOneTypePayment/:id', (req, res, next) => {
  TypePayment.find({ "_id": req.params.id }).sort({ date: -1 })
    .populate('movements')
    .then(foundMovements => {
      console.log("estoy en getOneTypePayment")
      console.log(foundMovements[0])
      res.json(foundMovements)
    })
    .catch(err => next(new Error(err)))
})

// ALTA NUEVA FORMA DE PAGO-COBRO
router.post('/typePaymentNew', (req, res, next) => {

let objectTypePayment = {
  name: req.body.name,
  amount: 0
}

  TypePayment.create(objectTypePayment)
    .then(oneTypePayment => res.json(oneTypePayment))
    .catch(err => next(new Error(err)))
})

// ELIMINAR FORMA DE PAGO-COBRO
router.get('/deleteTypePayment/:id', (req, res, next) => {
  TypePayment.findByIdAndDelete(req.params.id)
    .then(() => res.json({status:'ok'}))
    .catch(err => next(new Error(err)))
})

module.exports = router