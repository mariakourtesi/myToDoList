const express = require("express");
const bodyParser = require("body-parser");
const geolocator = require("geolocator");
const https = require("https");
const date = require(__dirname + "/date.js");
const { getQuote } = require(__dirname + "/quote.js");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.use(express.static("public"));



let items = [];
let workItems = [];

app.get("/", getQuote, (req, res) => {

  let day = date.getDate();
  let year = date.getYear();
  
       res.render("list", {
          listTitle: day,
          newList: items,
          year: year,
          quote: res.quote
       });
  });


app.post("/", (req, res) => {
  let item = req.body.todo;

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});


// work director
app.get("/work", getQuote, (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newList: workItems,
    quote: res.quote
  });
});

app.post("/work", (req, res) => {
  let item = req.body.todo;
  workItems.push(item);
  res.redirect("/");
});

app.listen(3000, () => console.log("Server is up and running"));