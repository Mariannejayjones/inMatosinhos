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
  db.query('SELECT COUNT(id) FROM owned_restaurants', (error, countResults, _) => {
    if (error) {
      throw error
    }

    const offset = (_page - 1) * _limit
    const total = countResults[0]['COUNT(id)']
    const pageCount = Math.ceil(total / _limit)

    db.query('SELECT * FROM owned_restaurants LIMIT ?, ?', [offset, _limit], (error, results, _) => {
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

// get one owned_restaurants via id //
router.get('/:id', (req, res) => {
  const { id } = req.params

  db.query('SELECT r.name, r.address, r.category, r.contact, o.user_id, o.restaurant_id FROM owned_restaurants o join restaurant r on (r.id = o.restaurant_id) where user_id = ?', [id], (error, results) => {
    if (error) {
      throw error
    }

      res.send({
        code: 200,
        data: results
      })
  })
}),

// get all search words //
router.get('/search', (req, res) => {
  const { search_ } = req.params

  // initialise query string
  var query_string = 'SELECT * FROM owned_restaurants WHERE' 
  // TODO: split terms into word list
  var search_words = ['spam', 'eggs', 'ham']

  for(var i=0; i<search_words.length; i++) { //increment search through each 
    query_string += ' name LIKE %' + search_words[i] + '%'
    if (i<search_words.length-1){
    query_string += ' OR '
    }
  }

  db.query(query_string, (error, owned_restaurants_results) => {
    if (error) {
      throw error
    }
    
    // get all menus items via that owned_restaurantss id -  in order not to have multiple similar requests // 
    db.query('SELECT * FROM owned_restaurants_menu_items where owned_restaurants_id = ?', [id], (error, menu_results) => {
      if (error) {
        throw error
      }

      owned_restaurants_data = owned_restaurants_results[0]  // results for one owned_restaurants via id // array is at 0 - to sort one - 
      owned_restaurants_data.menu = menu_results // results all menus for that owned_restaurants via id // 
 
      res.send({
        code: 200,
        data: owned_restaurants_data
      })
    })
  })
})


// // post owned_restaurantss // 
// router.post('/', (req, res) => {
//   const owned_restaurants = req.body

//   validate(owned_restaurants, {
//     name: "required",  
//     category: "required",
//     capacity: "required",
//     address: "required",
//     contact: "required",
//     pricerangemin: "required",
//     pricerangemax: "required",
//     created: "required",
//   }).then((value) => {
//     db.query('INSERT INTO owned_restaurants SET ?', [value], (error, results, _) => {
//       if (error) {
//         throw error
//       }

//       const { insertId } = results

//       db.query('SELECT * FROM owned_restaurants WHERE id = ? LIMIT 1', [insertId], (error, results, _) => {
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
//     db.query('UPDATE owned_restaurantss SET ? WHERE id = ?', [value, id], (error, results, _) => {
//       if (error) {
//         throw error
//       }

//       db.query('SELECT * FROM owned_restaurantss WHERE id = ? LIMIT 1', [id], (error, results, _) => {
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

  db.query('SELECT * FROM owned_restaurants WHERE id = ?', [id], (error, results, _) => {
    if (error) {
      throw error
    }
    console.log(results)
    const [owned_restaurants] = results

    db.query('DELETE FROM owned_restaurants WHERE id = ?', [id], (error,_, __) => {
      if (error) {
        throw error
      }

      res.send({
        code: 200,
        meta: null,
        data: owned_restaurants
      })
    })
  })
})

module.exports = router