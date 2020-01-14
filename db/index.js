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

const userSchema = new mongoose.Schema({
  userName: { type: String, default: 'N/A' },
  password: String,
  signin: Boolean
});

const User = mongoose.model('user', userSchema);

const Item = mongoose.model('Item', itemsSchema);


const checkUser = (user, passwd) => {
  return new Promise((resolve, reject) => {
    User.find({ userName: user, password: passwd })
      .exec((err, docs) => {
        resolve(docs);
      });
  });
};

const addUser = (userRecord) => {
  return new Promise((resolve, reject) => {
    let user = new User(userRecord);
    console.log(user)
    user.save()
      .exec();
  })
}

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
module.exports = { db, getAllItems, addItem, updateItem, deleteAll, deleteOne, checkUser, addUser };