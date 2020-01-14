const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js')
const port = 3000;
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/items', (req, res) => {
  db.getAllItems()
    .then(data => {
      console.log("data here====>" + data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.post('/item', (req, res) => {
  const itemName = req.body.itemName;
  const price = req.body.price;
  const link = req.body.link;
  db.addItem({ itemName, price, link })
    .then(() => res.status(201).send('A new record has been created!'))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.delete('/delete', (req, res) => {

  db.deleteAll()
    .then(() => {
      res.status(200)
      console.log("All records have been deleted!")
    });
});

app.delete('/delete/:id', (req, res) => {
  let id = req.params.id;
  db.deleteOne(id)
    .then(() => {
      res.status(200)
      console.log("The record have been deleted!")
    });
});

app.put('/update', (req, res) => {
  const itemName = req.body.itemName;
  const price = req.body.price;
  const link = req.body.link;
  db.updateItem(req.body._id, { itemName, price, link })
    .then(() => {
      res.status(200)
      console.log("This record has been updated!")
    });
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});