const { body, validationResult } = require('express-validator/check')


exports.validate = (method) => {
    switch (method) {
      case 'createTest': {
       return [ 
          body('userName', 'userName doesnt exists').exists(),
          body('email', 'Invalid email').exists().isEmail(),
          body('phone').optional().isInt(),
          body('status').optional().isIn(['enabled', 'disabled'])
         ]   
      }
    }
  }

  exports.createTest = async (req, res, next) => {
     
       const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
 
       if (!errors.isEmpty()) {
         res.status(422).json({ errors: errors.array() });
         return;
       }
 
       const { userName, email, phone, status } = req.body
       
 
       res.json({userName: userName, email: email, phone: phone, status: status})
 }