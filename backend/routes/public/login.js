const { validate } = require('indicative/validator')
const bcrypt = require('bcrypt') //provides the hash // 
const jwt = require('jsonwebtoken')

const db = require('../../db')

module.exports = (req, res) => { validate(req.body,
  {
    email: 'required|email',
    password: 'required'
  }).then((value) => {
      db.query('SELECT * FROM users WHERE email = ?', [value.email], (error, results) => {
        
        if (results.length === 0) {
          res.status(400).send('Não existe conta com este Email-password')
  
        } else {
          bcrypt.compare(value.password, results[0].password)
            .then((match) => {
              if (match) {
                const secret = "B18fbWIyeU1utFA31mzGaVyzjyL9ZnfP"
  
                delete results[0].password

                //sign to crypt secret // 
                const token = jwt.sign({id: results[0].id}, secret) // will give me my token
        
                  res.send({
                    code: 200,
                    user: results[0],
                    token: token
                  })
  
              } else {
                res.status(400).send('Cannot find any account that matches the given email and password')
              }
            }).catch((error) => { throw error })
        }
      })
    }).catch((error) => res.status(400).send(error))
}