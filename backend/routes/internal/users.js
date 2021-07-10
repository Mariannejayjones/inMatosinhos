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

    // value.password = bcrypt.hashSync(value.password, "B18fbWIyeU1utFA31mzGaVyzjyL9ZnfP"); // hashing password //
    // db.query('INSERT INTO users SET ?', [value], (error, results) => { // inserting into DB //
    //   if (error) {
    //     res.status(400).send('Erro ao criar registo!') // if error //

    //   } else {
    //     const { insertId } = results

    //     db.query('SELECT * FROM users WHERE id = ?', [insertId], (error, results, _) => { 
    //       if (error) {
    //         throw error
    //       }
    //       // confirmation email would be sent here //
    //       db.query('UPDATE users SET status = 1 WHERE id = ?', [insertId], (error, results, _) => { // place info into DB //
    //         if (error) {
    //           throw error
    //         }
    //         res.send({
    //           code: 200,
    //           meta: null,
    //           data: results[0]
    //       })})
    //     })
        
    //   }
    // })
  }).catch((error) => res.status(400).send(error))
})



// router.put('/:id', (req, res) => {
//   const { id } = req.params
//   const status = req.body

//   validate(status, {
//     status: 'required',
//   }).then((value) => {
//     db.query('UPDATE users SET ? WHERE id = ?', [value, id], (error, results, _) => {
//       if (error) {
//         throw error
//       }

//       db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id], (error, results, _) => {
//         if (error) {
//           throw error
//         }

//         res.send({
//           code: 200,
//           meta: null,
//           data: results[0]
//         })
//       })
//     })
//   }).catch((error) => {
//     res.status(400).send(error)
//   })
// })

// // router.patch('/:id/completed', (req, res) => {
// //   const { id } = req.params

// //   const data = req.body

// //   validate(data, {
// //     completed: 'boolean',
// //   }).then((value) => {
// //     db.query(`UPDATE todos SET completed = ${value.completed} WHERE id = ${id}`, (error, results, _) => {
// //       if (error) {
// //         throw error
// //       }

// //       res.send(value.completed)
// //     })
// //   }).catch((error) => {
// //     res.status(400).send(error)
// //   })
// // })

// router.delete('/:id', (req, res) => {
//   const { id } = req.params

//   db.query('SELECT * FROM users WHERE id = ?', [id], (error, results, _) => {
//     if (error) {
//       throw error
//     }
//     console.log(results)
//     const [users] = results

//     db.query('DELETE FROM users WHERE id = ?', [id], (error,_, __) => {
//       if (error) {
//         throw error
//       }

//       res.send({
//         code: 200,
//         meta: null,
//         data: users
//       })
//     })
//   })
// })

module.exports = router