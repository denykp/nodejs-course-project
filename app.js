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

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const { error404 } = require("./controllers/errors");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(error404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  // .sync()
  .sync({ force: true })
  .then((res) => {
    // console.log("sqlres", res);
    app.listen(3001);
  })
  .catch((err) => console.error(err));
