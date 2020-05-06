const express = require('express')
const router = express.Router()
const url = require('url');
// const testController = require('../controllers/test')
const { check, query, validationResult, buildCheckFunction } = require('express-validator')
const checkBodyAndQuery = buildCheckFunction(['body', 'query'])


// EJERCICIO 1 
// Endpoint con query que acepta 1 fecha y 1 parametro con dias
// Devuelve la fecha con los días sumados
// Validaciones: los días son de tipo numero positivo y fecha correcta

// Sin usar express-validator

router.get('/ejercicio1sin', function (req, res) {
    const queryObject = url.parse(req.url, true).query

    const dateInstance = new Date(queryObject.fecha)

    if (dateInstance == 'Invalid Date') {
        res.status(400).json({ error: 'Campo fecha mal contruido' })
    } else {
        const daysOfDate = dateInstance.getDate()
        const daysNumber = parseInt(queryObject.dias, 10)

        if (typeof daysNumber == 'number' && daysNumber >= 0) {
            const numberResult = daysOfDate + daysNumber + 1
            const dateResult = new Date(dateInstance.getFullYear(), dateInstance.getMonth(), numberResult)

            res.send(dateResult)
        } else {
            res.status(400).json({ error: 'Numero de dias incorrecto' })
        }

    }
})


// Usando express-validator

router.get(
    '/ejercicio1con',
    [
        query('fecha').isISO8601().toDate(),
        query('dias', 'mensaje de error').isInt()
    ],
    function (req, res) {
        const errors = validationResult(req)
        console.log('los errores', errors)

        if (!errors.isEmpty()) {
            console.log('if')

            res.send(errors)

        } else {
            console.log('else')
            const queryObject = url.parse(req.url, true).query
            const dateInstance = new Date(queryObject.fecha)

            const daysOfDate = dateInstance.getDate()
            const daysNumber = parseInt(queryObject.dias, 10)
            const numberResult = daysOfDate + daysNumber + 1

            const dateResult = new Date(dateInstance.getFullYear(), dateInstance.getMonth(), numberResult)

            res.send(dateResult)
        }


    }
)


// EJERCICIO 2
// Dadas 2 fechas indicar el tiempo transcurrido entre las 2, devolverlo en formato años, meses y dias
// Validaciones: que las fechas sean correctas

// Sin usar express-validator

router.get('/ejercicio2sin', function (req, res) {
    const queryObject = url.parse(req.url, true).query

    const fromDateInstance = new Date(queryObject.fromDate)
    const toDateInstance = new Date(queryObject.toDate)

    if (fromDateInstance == 'Invalid Date' || toDateInstance == 'Invalid Date') {
        res.status(400).json({ error: 'Campo fecha mal contruido' })
    } else {
        const result = toDateInstance.getTime() - fromDateInstance.getTime()

        const resultDays = result / (1000 * 60 * 60 * 24)

        const resultMonths = result / (1000 * 60 * 60 * 24 * 30)

        const resultYears = result / (1000 * 60 * 60 * 24 * 30 * 12)

        res.json({ Dias: resultDays, Meses: resultMonths, Años: resultYears })


    }
})

// Usando express-validator

router.get(
    '/ejercicio2con',
    [
        query('fromDate').isISO8601().toDate(),
        query('toDate').isISO8601().toDate()
    ],
    function (req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            res.send(errors)

        } else {
            const queryObject = url.parse(req.url, true).query

            const fromDateInstance = new Date(queryObject.fromDate)
            const toDateInstance = new Date(queryObject.toDate)

            const result = toDateInstance.getTime() - fromDateInstance.getTime()

            const resultDays = result / (1000 * 60 * 60 * 24)

            const resultMonths = result / (1000 * 60 * 60 * 24 * 30)

            const resultYears = result / (1000 * 60 * 60 * 24 * 30 * 12)

            res.json({ Dias: resultDays, Meses: resultMonths, Años: resultYears })
        }


    }
)


// Ejemplo documentacion express-validator

router.post(
    '/',
    [check('email', 'email mal formateado').isEmail(),
    check('edad', 'la edad debe ser un numero').isInt(),
    check('DNI', 'debe der ser el DNI de Andrian').custom(value => {

        return value === 'x7546691t' ? true : false

    })],
    function (req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            res.send(errors)

        } else {
            res.send(req.body)
        }
    }
)


// EJERCICIO 3
// 1) Una petición REST que haga lo siguiente

// Que acepte el siguiente JSON

// {
// "numeros":[7,89,2,1,5,0,12,12,12,56,56]
// "tipo":"MEDIAN"
// }

// te devuelva la media de la lista si el tipo = MEDIA, 
// te devuelve la mediana si el tipo = mediana

// Notas: 
//    * Gestión de errores es obligatoria
//    * La lógica NO DEBE ESTAR en el fichero routes

// Extra 1) Guardar todo en un histórico en Mongo, es decir, por cada petición CORRECTA, guardamos, la lista de número, el tipo y el resultado y fecha de creación
// Extra 2) Poder consultar el histórico de Mongo mediante fechas (desde , hasta)

router.post(
    '/ejercicio3',
    [check('tipo', 'Solo se admite MEDIAN o MEDIA').isIn(['MEDIAN', 'MEDIA']),
    check('numeros', 'Solo puede ser una lista de numeros enteros').custom(value => {

        for (i = 0; i < value.length; i++) {
            if (isNaN(value[i])) {
                return false
            }
        }
        return true

    })
    ],
    function (req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            res.send(errors)

        } else {
            
            let oneNumber = 0
            let sum = 0
            let media = 0
            let count = 0   
            let median = 0
            let valueMedian = 0
            let message = ''

            for (i = 0; i < req.body.numeros.length; i++) {

                oneNumber = parseInt(req.body.numeros[i], 10)
                

                sum = sum + oneNumber

                count = count + 1
                median = Math.round(count / 2)

            }

            media = sum / 2

            valueMedian = req.body.numeros[median - 1]

            if (req.body.tipo === 'MEDIA') {
                message = `la media es ${media}`
                
            } else {
                message = `la mediana es ${valueMedian}`
            
            }
            res.send(message)
        }
    }
)



module.exports = router