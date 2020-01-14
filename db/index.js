const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
mongoose.connect('mongodb://localhost/saveforlater', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Our database is connected!');
});


const itemsSchema = new mongoose.Schema({
  itemName: { type: String, default: 'N/A' },
  price: Number,
  created: { type: Date, default: new Date },
  link: String
});

const Item = mongoose.model('Item', itemsSchema);


const getAllItems = () => {
  return new Promise((resolve, reject) => {
    Item.find()
      .exec((err, docs) => {
        resolve(docs);
      });
  });
}

const addItem = (record) => {
  return new Promise((resolve, reject) => {
    let item = new Item(record);
    console.log(item)
    item.save()
      .exec();
  })
};

const updateItem = (id, record) => {
  console.log(record)
  return new Promise((resolve, reject) => {

    Item.findOneAndUpdate({ _id: id }, record)
      .exec();
  })
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    Item.deleteMany({})
      .exec();
  })
};

const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    Item.deleteOne({ _id: id })
      .exec();
  })
};

module.exports = Item;
module.exports = { db, getAllItems, addItem, updateItem, deleteAll, deleteOne };