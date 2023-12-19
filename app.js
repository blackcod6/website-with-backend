const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");

 const bodyParser = require("body-parser");
app.use(bodyParser.json());

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

// const product = require("./models/product");
// const collection = require("./views/config");
const mongoose = require("mongoose");
app.use(express.static("views"));
const port = 3000; // Set the desired port number
mongoose.connect("mongodb://localhost:27017/e-commerce").then(() => {
  console.log("Database Connection is ready...");
});

 


// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views",path.join(__dirname, "/views"));

// Define a route to render the HTML file

app.get("/signup", (req, res) => {
  res.render("home"); // Renders views/index.ejs
});
app.get("/", (req, res) => {
  res.render("home"); // Renders views/index.ejs
});
app.get("/home", (req, res) => {
  res.render("home"); // Renders views/index.ejs
});
app.get("/account", (req, res) => {
  res.render("account"); // Renders views/index.ejs
});
app.get("/products", (req, res) => {
  res.render("productlist1"); // Renders views/index.ejs
});
app.get("/contact", (req, res) => {
  res.render("contact"); // Renders views/index.ejs
});



app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.myname,
    email: req.body.myemail,
    password: req.body.mypassword,
    confirmpassword: req.body.myconfirmpassword,
  };

  //check to see if user is already exist or not
  const existinguser = await collection.findOne({ email: data.email });
  if (existinguser) {
    res.send(
      "user is already registered .try again with differnt user email-id"
    );
  } else {
    //hashing the passwords
    const saltround = 10;
    const hashedpassword = await bcrypt.hash(data.password, saltround);
    const hashedconfirmpassword = await bcrypt.hash(
      data.confirmpassword,
      saltround
    );
    data.password = hashedpassword;
    data.confirmpassword = hashedconfirmpassword;
    const userdata = await collection.insertMany(data);
    console.log(userdata);
    res.render("home");
  }
});



app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.myloginemail });
    if (!check) {
      res.send("user does not found!");
    }
    //compare the password
    const ispasswordmatch = await bcrypt.compare(
      req.body.myloginpass,
      check.password
    );

    // const isconfirmpasswordmatch = await bcrypt.compare(req.body.myconfirmpassword, check.confirmpassword);
    if (ispasswordmatch) {
      res.render("account")
      // res.send("welcome");
    } else {
      res.send("wrong email and password");
    }
  } catch (error) {
    res.send("wrond email and password");
  }
});


const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("users", LoginSchema);
module.exports = collection;






















// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




