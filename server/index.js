const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/items', (req, res) => {
  db.getAllItems()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.post('/user', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const signin = true;
  db.addUser({ userName, password, signin })
    .then(() => res.status(201).send('A new user has been created!'))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.get('/user/:userName/:password', (req, res) => {

  db.checkUser(req.params.userName, req.params.password)
    .then(data => {
      res.send(data[0].signin);
    })
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.post('/item', (req, res) => {
  const itemName = req.body.itemName;
  const price = req.body.price;
  const merchant = req.body.merchant;
  const link = req.body.link;
  db.addItem({ itemName, merchant, price, link })
    .then(() => res.status(201).send('A new record has been created!'))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.delete('/delete', (req, res) => {

  db.deleteAll()
    .then(() => {
      res.status(200);
      console.log('All records have been deleted!');
    });
});

app.delete('/delete/:id', (req, res) => {
  let id = req.params.id;
  db.deleteOne(id)
    .then(() => {
      res.status(200);
      console.log('The record have been deleted!');
    });
});

app.put('/update', (req, res) => {
  const itemName = req.body.itemName;
  const merchant = req.body.merchant;
  const price = req.body.price;
  const link = req.body.link;
  db.updateItem(req.body._id, { itemName, merchant, price, link })
    .then(() => {
      res.status(200);
      console.log('This record has been updated!');
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});