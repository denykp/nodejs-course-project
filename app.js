// import { createServer } from "http";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const { error404 } = require("./controllers/errors");

const userId = 1;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, _, next) => {
  User.findByPk(userId)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(error404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    return User.findByPk(userId).then((data) => {
      if (data) {
        return data;
      } else {
        return User.create({ name: "John Doe", email: "john@doe.com" });
      }
    });
  })
  .then((user) => user.createCart())
  .then(() => {
    app.listen(3001);
  })
  .catch((err) => console.error("err", err));
