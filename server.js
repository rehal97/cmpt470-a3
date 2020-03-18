const express = require("express");
const con = require("./config/db.js")
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

// connecting route to database
app.use((req, res, next) => {
    req.con = con;
    next();
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// body parser middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


const users = require("./routes/user");
app.use("/user", users);


app.get("/", (req, res) => {
    res.render("pages/index");    
});

console.log("Running on " + process.env.NODE_ENV);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));