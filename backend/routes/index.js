const auth = require('../middlewares/auth')

const restaurantsRouter = require("./internal/restaurants");
const restaurantMenuItemsRouter = require("./internal/menuItems");
const timeSlotsRouter = require("./internal/timeSlots");
const reservationRouter = require("./internal/reservations");
const deliveryRouter = require("./internal/delivery");
const deliveryItemsRouter = require("./internal/deliveryItems");
const usersRouter = require("./internal/users");
const categoriesRouter = require("./internal/categories");
const ownedRestaurantsRouter = require("./internal/ownedRestaurants");
const login = require("./public/login");
// const bcrypt = require("bcrypt");

module.exports = {
  register(app) {
    app.use("/restaurant", restaurantsRouter);
    app.use("/menuitems", restaurantMenuItemsRouter);
    app.use("/ownedRestaurants", ownedRestaurantsRouter);
    app.use("/timeslots", timeSlotsRouter);
    app.use("/reservations", auth, reservationRouter);
    app.use("/delivery", auth, deliveryRouter);
    app.use("/deliveryItems", auth, deliveryItemsRouter);
    app.use("/users", auth,usersRouter);
    app.use("/categories", categoriesRouter)
    app.post("/login", login);

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
