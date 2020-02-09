const express = require("express");
const app = express();
const logo = "http://localhost:3000/static/media/logo.0bc5aa75.jpg";
require("dotenv/config");
const cors = require("cors");

const products = [
  {
    title: "Product Title 1",
    handle: "product-handle-1",
    price: 120,
    oldprice: 130,
    id: 1,
    count: 1,
    image: logo
  },
  {
    title: "Product Title 2",
    handle: "product-handle-2",
    price: 120,
    oldprice: 130,
    id: 2,
    count: 1,
    image: logo
  },
  {
    title: "Product Title 3",
    handle: "product-handle-3",
    price: 120,
    oldprice: 130,
    id: 3,
    count: 3,
    image: logo
  },
  {
    title: "Product Title 4",
    handle: "product-handle-4",
    price: 120,
    oldprice: 130,
    id: 4,
    count: 1,
    image: logo
  }
];

//middleware
// app.use("/cart", () => {
//   console.log("cart is loading");
// });
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.get("/", (req, res) => {
  res.send("Basic Api gets ready!!");
});
//Routes
// products list
app.get("/products", (req, res) => {
  res.send(products);
});

// cart list

let cartList = [];

app.get("/cart", (req, res) => {
  res.send(cartList);
});

app.post("/cart/add", (req, res) => {
  const getId = Number(req.body.id);
  const getQnty = Number(req.body.qnty);
  let proLists = [...products];
  if (cartList.length > 0) {
    proLists = [...cartList];
  }
  let product = proLists.find(item => item.id == getId);
  if (cartList.indexOf(product) < 0) {
    product.count = getQnty;
    cartList.push(product);
  } else {
    let proIndex = cartList.indexOf(product);
    cartList[proIndex].count += getQnty;
  }
  res.send(product);
});

app.post("/cart/delete", (req, res) => {
  const getId = Number(req.body.id);
  let product = products.find(item => item.id === getId);
  const delIndex = cartList.indexOf(product);
  cartList.splice(delIndex, 1);
  res.send(product);
});

app.post("/cart/clear", (req, res) => {
  cartList = [];
  res.send(cartList);
});

// Wishlist
let wishlist = [];
app.get("/wishlist", (req, res) => {
  res.send(wishlist);
});

app.post("/wishlist/add", (req, res) => {
  const getId = Number(req.body.id);
  let product = products.find(item => item.id === getId);
  if (wishlist.indexOf(product) < 0) {
    product.count = 1;
    wishlist.push(product);
  }
  const delIndex = cartList.indexOf(product);
  // if (delIndex > -1) {
  //   cartList = cartList.filter((item, index) => index != delIndex);
  // }
  res.send(product);
});

app.post("/wishlist/delete", (req, res) => {
  const getId = Number(req.body.id);
  let product = products.find(item => item.id === getId);
  const delIndex = wishlist.indexOf(product);
  wishlist.splice(delIndex, 1);
  res.send(product);
});

// connect database

// const MongoClient = require("mongodb").MongoClient;
// const uri = process.env.DB_CONNECTION;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   console.log("database connected");
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//How do we start listening to the server

app.listen(3001);
