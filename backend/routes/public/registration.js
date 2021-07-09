const { validate } = require('indicative/validator')
const bcrypt = require('bcrypt') //provides the hash // 
const jwt = require('jsonwebtoken')

const db = require('../../db')

module.exports = (req, res) => { validate(req.body,
  {
    name: "required",
    dateOfBirth: "required|date",
    email: 'required|email',
    password: 'required',
    address: "required"

  }).then((value) => {
    value.password = bcrypt.hashSync(value.password, "B18fbWIyeU1utFA31mzGaVyzjyL9ZnfP"); // hashing password //
    db.query('INSERT INTO users SET ?', [value], (error, results) => { // inserting into DB //
      if (error) {
        res.status(400).send('Erro ao criar registo!') // if error //

      } else {
        const { insertId } = results

        db.query('SELECT * FROM users WHERE id = ?', [insertId], (error, results, _) => { 
          if (error) {
            throw error
          }
          // confirmation email would be sent here //
          db.query('UPDATE users SET status = 1 WHERE id = ?', [insertId], (error, results, _) => { // place info into DB //
            if (error) {
              throw error
            }
            res.send({
              code: 200,
              meta: null,
              data: results[0]
          })})
        })
        
      }
    })
  }).catch((error) => res.status(400).send(error))

    
}