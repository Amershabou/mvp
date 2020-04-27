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
  id: String,
  created: { type: Date, default: new Date() },
  link: String,
});

const Item = mongoose.model("Item", itemsSchema);

const getAllItems = (id) => {
  return new Promise((resolve, reject) => {
    Item.find({ id }).exec((err, docs) => {
      resolve(docs);
    });
  });
};

// const addItem = (record) => {
//   return new Promise((resolve, reject) => {
//     let item = new Item(record);
//     // console.log(item)
//     item.save()
//       .exec();
//   });
// };
const addItem = async (req, res) => {
  const { itemName, merchant, price, link, id } = req.body;
  console.log(id);
  let rec = { itemName, merchant, price, link, id };
  try {
    let item = new Item(rec);
    console.log(item);
    item.save();
    res.status(201).send("A new record has been created!");
  } catch (e) {
    return res.status(404).end();
  }
};

const updateItem = (id, record) => {
  return new Promise((resolve, reject) => {
    Item.findOneAndUpdate({ _id: id }, record).exec();
  });
};

const deleteAll = (id) => {
  return new Promise((resolve, reject) => {
    Item.deleteMany({ id }).exec();
  });
};

const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    Item.deleteOne({ _id: id }).exec();
  });
};

module.exports = Item;
module.exports = { db, getAllItems, addItem, updateItem, deleteAll, deleteOne };
