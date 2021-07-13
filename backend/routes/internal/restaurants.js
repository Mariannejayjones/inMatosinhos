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

// get all search terms //
router.get('/search', (req, res) => {
  const { keywords } = req.query

  let query_string = 'SELECT * FROM restaurant WHERE ' // initialise query string
  const search_words = keywords.split(' ') // splits search terms into seperate words by removing white spaces between words // 

  for(var i=0; i<search_words.length; i++) { //increment search through each 
    query_string += 'name LIKE "%' + search_words[i] + '%"'
    if (i<search_words.length-1){
      query_string += ' OR '
    }
  }

  db.query(query_string, (error, results) => {
    if (error) {
      throw error
    }
 
    res.send({
      code: 200,
      data: results
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

module.exports = router