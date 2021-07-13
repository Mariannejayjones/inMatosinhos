const router = require('express').Router()
const { validate } = require('indicative/validator')

const db = require('../../db')

router.get('/', (req, res) => {
  const { limit, page } = req.query
//brings all ids via pagination //
  const _limit = +limit || 20 
// limits pages to 20 by default
  const _page = +page || 1

  db.query('SELECT COUNT(id) FROM restaurant_menu_items', (error, countResults, _) => {
    if (error) {
      throw error
    }

    const offset = (_page - 1) * _limit
    const total = countResults[0]['COUNT(id)']
    const pageCount = Math.ceil(total / _limit)

    db.query('SELECT * FROM restaurant_menu_items LIMIT ?, ?', [offset, _limit], (error, results, _) => {
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

// get restaurant_menu_items via id //
router.get('/:id', (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM restaurant_menu_items where restaurant_id = ?', [id], (error, results) => {
    if (error) {
      throw error
    }

    res.send({
      code: 200,
      data: results
    })
  })
})

// get restaurant_menu_items via name // 
router.get('/:id/name', (req, res) => {
  const { id } = req.params

  db.query('SELECT name FROM restaurant_menu_items where id = ?', [id], (error, results) => {
    if (error) {
      throw error
    }

    res.send({
      code: 200,
      data: results
    })
  })
})

// // post restaurant_menu_itemss // 
// router.post('/', (req, res) => {
//   const restaurant_menu_items = req.body

//   validate(restaurant_menu_items, {
//     name: "required",  
//     category: "required",
//     capacity: "required",
//     address: "required",
//     contact: "required",
//     pricerangemin: "required",
//     pricerangemax: "required",
//     created: "required",
//   }).then((value) => {
//     db.query('INSERT INTO restaurant_menu_items SET ?', [value], (error, results, _) => {
//       if (error) {
//         throw error
//       }

//       const { insertId } = results

//       db.query('SELECT * FROM restaurant_menu_items WHERE id = ? LIMIT 1', [insertId], (error, results, _) => {
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

router.put('/:id', (req, res) => {
  const { id } = req.params
  const items = req.body

  validate(items, {
    restaurant_id: 'required',
    name: 'required',
    description: 'required',
    price: 'required'
  }).then((value) => {
    db.query('UPDATE restaurant_menu_items SET ? WHERE id = ?', [value, id], (error, results, _) => {
      if (error) {
        throw error
      }

      db.query('SELECT * FROM restaurant_menu_items WHERE id = ? LIMIT 1', [id], (error, results, _) => {
        if (error) {
          throw error
        }

        res.send({
          code: 200,
          meta: null,
          data: results[0]
        })
      })
    })
  }).catch((error) => {
    res.status(400).send(error)
  })
})

// router.patch('/:id/completed', (req, res) => {
//   const { id } = req.params

//   const data = req.body

//   validate(data, {
//     completed: 'boolean',
//   }).then((value) => {
//     db.query(`UPDATE todos SET completed = ${value.completed} WHERE id = ${id}`, (error, results, _) => {
//       if (error) {
//         throw error
//       }

//       res.send(value.completed)
//     })
//   }).catch((error) => {
//     res.status(400).send(error)
//   })
// })

router.delete('/:id', (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM restaurant_menu_items WHERE id = ?', [id], (error, results, _) => {
    if (error) {
      throw error
    }
    console.log(results)
    const [restaurant_menu_items] = results

    db.query('DELETE FROM restaurant_menu_items WHERE id = ?', [id], (error,_, __) => {
      if (error) {
        throw error
      }

      res.send({
        code: 200,
        meta: null,
        data: restaurant_menu_items
      })
    })
  })
})

module.exports = router