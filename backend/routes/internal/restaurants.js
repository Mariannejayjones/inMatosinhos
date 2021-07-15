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
  const { keywords,categories } = req.query

  let query_string = 'SELECT DISTINCT restaurant.* FROM restaurant,restaurants_categories WHERE (' // initialise query string
  const search_words = keywords.split(' ') // splits search terms into seperate words by removing and spliting white spaces between words // 

  for(let i=0; i<search_words.length; i++) { // increment search through each word and for each word to add condition "name like"
    query_string += 'name LIKE "%' + search_words[i] + '%"' // filtering by name 
    if (i<search_words.length-1){ // unless its the last item adds an OR to the query 
      query_string += ' OR '
    }
  }
  if (categories){ // on top of that add categories to the search 
    const check_categories = categories.split(',') 
    query_string += ') AND (restaurants_categories.restaurant_id = restaurant.id AND restaurants_categories.category_id IN (' + check_categories.join(',') + ')'
  }
  query_string += ')'
  query_string += 'ORDER BY restaurant.id'

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
      db.query('SELECT c.* FROM categories c join restaurants_categories rc ON c.id = rc.category_id and rc.restaurant_id= ?', [id], (error, category_results) => {
        if (error) {
          throw error
        }

        restaurant_data = restaurant_results[0]  // results for one restaurant via id // array is at 0 - to sort one - 
        restaurant_data.menu = menu_results // results all menus for that restaurant via id // 
        restaurant_data.categories = category_results // result for each category of a specific restaurant //

        res.send({
          code: 200,
          data: restaurant_data
        })
      })
    })
  })
}),

module.exports = router