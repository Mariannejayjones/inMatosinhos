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
  db.query('SELECT COUNT(id) FROM restaurant', (error, countResults, _) => {
    if (error) {
      throw error
    }

    const offset = (_page - 1) * _limit
    const total = countResults[0]['COUNT(id)']
    const pageCount = Math.ceil(total / _limit)

    db.query('SELECT * FROM restaurant LIMIT ?, ?', [offset, _limit], (error, results, _) => {
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

// get one restaurant via id //
router.get('/:id', (req, res) => {
  const { id } = req.params

  db.query('SELECT * FROM restaurant where id = ?', [id], (error, restaurant_results) => {
    if (error) {
      throw error
    }
    
// get all menus items via that restaurants id -  in order not to have multiple similar requests // 

    db.query('SELECT * FROM restaurant_menu_items where restaurant_id = ?', [id], (error, menu_results) => {
      if (error) {
        throw error
      }

      restaurant_data = restaurant_results[0]  // results for one restaurant via id // array is at 0 - to sort one - 
      restaurant_data.menu = menu_results // results all menus for that restaurant via id // 
 
      res.send({
        code: 200,
        data: restaurant_data
      })
    })
  })
}),

// get all search terms //
router.get('/search', (req, res) => {
  const { search_terms } = req.params

  // initialise query string
  var query_string = 'SELECT * FROM restaurant WHERE' 

  // TODO: split terms into word list
  var search_words = ['spam', 'eggs', 'ham']

  for(var i=0; i<search_words.length; i++) {
    query_string += ' name LIKE %' + search_words[i] + '%'
  }


  db.query(query_string, (error, restaurant_results) => {
    if (error) {
      throw error
    }
    
// get all menus items via that restaurants id -  in order not to have multiple similar requests // 

    db.query('SELECT * FROM restaurant_menu_items where restaurant_id = ?', [id], (error, menu_results) => {
      if (error) {
        throw error
      }

      restaurant_data = restaurant_results[0]  // results for one restaurant via id // array is at 0 - to sort one - 
      restaurant_data.menu = menu_results // results all menus for that restaurant via id // 
 
      res.send({
        code: 200,
        data: restaurant_data
      })
    })
  })
})


// // post restaurants // 
// router.post('/', (req, res) => {
//   const restaurant = req.body

//   validate(restaurant, {
//     name: "required",  
//     category: "required",
//     capacity: "required",
//     address: "required",
//     contact: "required",
//     pricerangemin: "required",
//     pricerangemax: "required",
//     created: "required",
//   }).then((value) => {
//     db.query('INSERT INTO restaurant SET ?', [value], (error, results, _) => {
//       if (error) {
//         throw error
//       }

//       const { insertId } = results

//       db.query('SELECT * FROM restaurant WHERE id = ? LIMIT 1', [insertId], (error, results, _) => {
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

// router.put('/:id', (req, res) => {
//   const { id } = req.params
//   const status = req.body

//   validate(status, {
//     status: 'required',
//   }).then((value) => {
//     db.query('UPDATE restaurants SET ? WHERE id = ?', [value, id], (error, results, _) => {
//       if (error) {
//         throw error
//       }

//       db.query('SELECT * FROM restaurants WHERE id = ? LIMIT 1', [id], (error, results, _) => {
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

  db.query('SELECT * FROM restaurant WHERE id = ?', [id], (error, results, _) => {
    if (error) {
      throw error
    }
    console.log(results)
    const [restaurant] = results

    db.query('DELETE FROM restaurant WHERE id = ?', [id], (error,_, __) => {
      if (error) {
        throw error
      }

      res.send({
        code: 200,
        meta: null,
        data: restaurant
      })
    })
  })
})

module.exports = router