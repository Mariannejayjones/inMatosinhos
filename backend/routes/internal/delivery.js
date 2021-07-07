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
  db.query('SELECT COUNT(id) FROM deliveries', (error, countResults, _) => {
    if (error) {
      throw error
    }

    const offset = (_page - 1) * _limit
    const total = countResults[0]['COUNT(id)']
    const pageCount = Math.ceil(total / _limit)

    db.query('SELECT * FROM deliveries LIMIT ?, ?', [offset, _limit], (error, results, _) => {
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

// get one deliveries via id //
router.get('/:id', (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM deliveries where id = ?', [id], (error, reservation_results) => {
    if (error) {
      throw error
    }
    
// get all menus items via that deliveries id -  in order not to have multiple similar requests // 

    db.query('SELECT * FROM deliveries where reservation_id = ?', [id], (error, menu_results) => {
      if (error) {
        throw error
      }

      reservation_data = reservation_results[0]  // results for one deliveries via id // array is at 0 - to sort one - 
      reservation_data.menu = menu_results // results all menus for that deliveries via id // 
 
      res.send({
        code: 200,
        data: reservation_data
      })
    })
  })
})


// post deliveries // 
router.post('/', (req, res) => {
  const deliveries = req.body

  validate(deliveries, {
    restaurant_id: "required",  
    user_id: "required",
    price: "required"
  
  }).then((value) => {
    db.query('INSERT INTO deliveries SET ?', [value], (error, results, _) => {
      if (error) {
        throw error
      }

      const { insertId } = results

      db.query('SELECT * FROM deliveries WHERE id = ? LIMIT 1', [insertId], (error, results, _) => {
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
//     db.query('UPDATE deliveries SET ? WHERE id = ?', [value, id], (error, results, _) => {
//       if (error) {
//         throw error
//       }

//       db.query('SELECT * FROM deliveries WHERE id = ? LIMIT 1', [id], (error, results, _) => {
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

  db.query('SELECT * FROM deliveries WHERE id = ?', [id], (error, results, _) => {
    if (error) {
      throw error
    }
    console.log(results)
    const [deliveries] = results

    db.query('DELETE FROM deliveries WHERE id = ?', [id], (error,_, __) => {
      if (error) {
        throw error
      }

      res.send({
        code: 200,
        meta: null,
        data: deliveries
      })
    })
  })
})

module.exports = router