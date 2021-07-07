const router = require('express').Router()
const { validate } = require('indicative/validator')

const db = require('../../db')
//brings all ids via pagination //
router.get('/', (req, res) => {
  const { limit, page } = req.query
// limits pages to 20 by default
  const _limit = +limit || 20 

  const _page = +page || 1


  // pagination // 
  db.query('SELECT COUNT(id) FROM delivery_items', (error, countResults, _) => {
    if (error) {
      throw error
    }

    const offset = (_page - 1) * _limit
    const total = countResults[0]['COUNT(id)']
    const pageCount = Math.ceil(total / _limit)

    db.query('SELECT * FROM delivery_items LIMIT ?, ?', [offset, _limit], (error, results, _) => {
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

// get one delivery_items via id //
router.get('/:id', (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM delivery_items where id = ?', [id], (error, reservation_results) => {
    if (error) {
      throw error
    }
    
// get all menus items via that delivery_items id -  in order not to have multiple similar requests // 

    db.query('SELECT * FROM reservation_menu_items where reservation_id = ?', [id], (error, menu_results) => {
      if (error) {
        throw error
      }

      reservation_data = reservation_results[0]  // results for one delivery_items via id // array is at 0 - to sort one - 
      reservation_data.menu = menu_results // results all menus for that delivery_items via id // 
 
      res.send({
        code: 200,
        data: reservation_data
      })
    })
  })
})


// post delivery_items // 
router.post('/', (req, res) => {
  const delivery_items = req.body

  validate(delivery_items, {
    delivery_id: "required",  
    quantity: "required",
    restaurant_menu_id: "required",
    price: "required",
    sub_total: "required"
  
  }).then((value) => {
    db.query('INSERT INTO delivery_items SET ?', [value], (error, results, _) => {
      if (error) {
        throw error
      }

      const { insertId } = results

      db.query('SELECT * FROM delivery_items WHERE id = ? LIMIT 1', [insertId], (error, results, _) => {
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

// router.put('/:id', (req, res) => {
//   const { id } = req.params
//   const status = req.body

//   validate(status, {
//     status: 'required',
//   }).then((value) => {
//     db.query('UPDATE delivery_items SET ? WHERE id = ?', [value, id], (error, results, _) => {
//       if (error) {
//         throw error
//       }

//       db.query('SELECT * FROM delivery_items WHERE id = ? LIMIT 1', [id], (error, results, _) => {
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

  db.query('SELECT * FROM delivery_items WHERE id = ?', [id], (error, results, _) => {
    if (error) {
      throw error
    }
    console.log(results)
    const [delivery_items] = results

    db.query('DELETE FROM delivery_items WHERE id = ?', [id], (error,_, __) => {
      if (error) {
        throw error
      }

      res.send({
        code: 200,
        meta: null,
        data: delivery_items
      })
    })
  })
})

module.exports = router