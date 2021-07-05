// const auth = require('../middlewares/auth')

const restaurantsRouter = require("./internal/restaurants");
const restaurantMenuItemsRouter = require("./internal/menuitems");
const timeSlotsRouter = require("./internal/time_slots");
// const todosRouter = require('./internal/todos')
// const categoriesRouter = require("./internal/categories");

// const login = require("./public/login");
// const bcrypt = require("bcrypt");

module.exports = {
  register(app) {
    app.use("/restaurant", restaurantsRouter);
    app.use("/menuitems", restaurantMenuItemsRouter);
    app.use("/time-slots", timeSlotsRouter);
    // app.use('/todos', auth, todosRouter)

    // app.use("/categories", auth, categoriesRouter)

    // app.post("/login", login);

    // app.get("/encrypt", async (req, res) => {
      // test route

      // receive string from password to convert to hash //
    //   let result = await bcrypt.hash("987654", 10); // needs to have async when you have await
    //   res.send({
    //     unencrypted: "12345",
    //     encrypted: result,
    //   });
    // });
  },
};
