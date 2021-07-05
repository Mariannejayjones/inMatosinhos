const router = require('express').Router()
const { validate } = require('indicative/validator')
const { sanitize } = require('indicative/sanitizer')
const bcrypt = require('bcrypt')

const db = require('../../db')

router.get("/", (req, res) => {
  db.query("SELECT * FROM categories", (error, result) => {
    if (error){
      throw error
    }
    res.send(result)
  })
})

// //get categories via id //
// router.get('/:id', (req, res) => {
//   const { id } = req.params

//   db.query(`SELECT * FROM categories WHERE id = ${id}`, (error, results) => {
//     if (error) {
//       throw error
//     }

//     res.send({
//       code: 200,
//       meta: null,
//       data: results[0]
//     })
//   })
// })



module.exports = router


