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
app.use("/api", protect);

app.get("/api/items/:userId", getAllItems);
app.post("/api/item/add", addItem);
app.delete("/api/items/delete/:userId", deleteAll);
app.delete("/api/item/delete/:id", deleteOne);
app.put("/api/item/update/:id", updateItem);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
