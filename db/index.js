const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = mongoose.connection;
mongoose.connect("mongodb://localhost/saveforlater", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Our database is connected!");
});

const itemsSchema = new mongoose.Schema({
  itemName: { type: String, default: "N/A" },
  price: Number,
  merchant: String,
  userId: String,
  created: { type: Date, default: new Date() },
  link: String,
});

const Item = mongoose.model("Item", itemsSchema);

const getAllItems = async (req, res) => {
  const { userId } = req.params;
  await Item.find({ userId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
};

const addItem = async (req, res) => {
  const { itemName, merchant, price, link, userId } = req.body;
  let rec = { itemName, merchant, price, link, userId };
  try {
    let item = new Item(rec);
    console.log(item);
    item.save();
    res.status(201).send("A new record has been created!");
  } catch (e) {
    return res.status(404).end();
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { itemName, merchant, price, link } = req.body;
  const record = { itemName, merchant, price, link };
  await Item.findOneAndUpdate({ _id: id }, record)
    .then(() => {
      res.status(200).send("The record has been updated!");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
};

const deleteAll = async (req, res) => {
  const { userId } = req.params;

  await Item.deleteMany({ userId }).then(() => {
    res
      .status(200)
      .send("All records have been deleted!")
      .catch((err) => {
        console.log(err);
        res.status(404).end();
      });
  });
};

const deleteOne = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  await Item.deleteOne({ _id: id })
    .then(() => {
      res.status(200).send("The record has been deleted!");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
};

module.exports = Item;
module.exports = { db, getAllItems, addItem, updateItem, deleteAll, deleteOne };
