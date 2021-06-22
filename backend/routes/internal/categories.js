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





module.exports = router


