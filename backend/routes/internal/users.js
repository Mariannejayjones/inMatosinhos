const router = require('express').Router()
const { validate } = require('indicative/validator')
const bcrypt = require('bcrypt')

const db = require('../../db')

function removePasswordProperty(object) {
  delete object.password
}
//brings all ids via pagination //
router.get('/', (req, res) => {
  const { limit, page } = req.query
// limits pages to 20 by default
  const _limit = +limit || 20 

  const _page = +page || 1


  // pagination // 
  db.query('SELECT COUNT(id) FROM users', (error, countResults, _) => {
    if (error) {
      throw error
    }

    const offset = (_page - 1) * _limit
    const total = countResults[0]['COUNT(id)']
    const pageCount = Math.ceil(total / _limit)

    db.query('SELECT * FROM users LIMIT ?, ?', [offset, _limit], (error, results, _) => {
      if (error) {
        throw error
      }

      res.send({
        code: 200,
        meta: {
          pagination: {
            total: total,
            pages: pageCount,
            page: _page,
            limit: _limit
          }
        },
        data: results
      })
    })

    
  })
})

// get one users via id //
router.get('/:id', (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM users where id = ?', [id], (error, users_results) => {
    if (error) {
      throw error
    }

  })
})


// post users // 
router.post('/', (req, res) => {
  const users = req.body

  validate(users, {
    name: "required",  
    address: "required",
    date_of_birth: "required",
    phone: "required",
    email: "required|email",
    password: "required",

  }).then((value) => {
    bcrypt.hash(value.password, 10).then((hash) => {
      value.password = hash
      console.log(value)

      db.query('INSERT INTO users SET ?', [value], (error, results, _) => {
        if (error) {
          throw error
        }

        const { insertId } = results

        db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [insertId], (error, results, _) => {
          if (error) {
            throw error
          }

          removePasswordProperty(results[0])

          res.send({
            code: 200,
            meta: null,
            data: results[0]
          })
        })
      })
    }).catch((error) => { throw error })
  }).catch((error) => res.status(400).send(error))
})


module.exports = router