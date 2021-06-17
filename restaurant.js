const restaurant = []

module.exports = (app) => {
  app.get('/restaurant', (_, res) => {
    res.send({
      code: 200,
      meta: {
        pagination: {
          total: restaurant.length,
          pages: 1,
          page: 1,
          limit: undefined,
        }
      },
      data: restaurant
    })
  })

  app.get('/restaurant', (req, res) => {
    const user = users.find((user) => user.id == req.params.id)

    res.send(user)
  })

}