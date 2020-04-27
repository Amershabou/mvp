const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  getAllItems,
  addItem,
  updateItem,
  deleteAll,
  deleteOne,
} = require("../db/index.js");
const { signup, signin, protect } = require("../db/auth.js");
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static(__dirname + "/../client/dist"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signup", signup);
app.post("/signin", signin);
// app.use('/api', protect)

app.get("/api/items/:id", (req, res) => {
  const { id } = req.params;
  getAllItems(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
});

app.post("/api/item", addItem);

app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;

  deleteAll(id).then(() => {
    res.status(200);
    console.log("All records have been deleted!");
  });
});

app.delete("/api/delete/:id", (req, res) => {
  let { id } = req.params;
  deleteOne(id).then(() => {
    res.status(200);
    console.log("The record have been deleted!");
  });
});

app.put("/api/update", (req, res) => {
  const { itemName, merchant, price, link } = req.body;
  updateItem(req.body._id, { itemName, merchant, price, link }).then(() => {
    res.status(200);
    console.log("This record has been updated!");
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
