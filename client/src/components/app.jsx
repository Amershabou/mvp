import React from 'react';
import ItemForm from './itemForm.jsx';
import EditItem from './EditItem.jsx';
import ItemsTable from './ItemsTable.jsx';
import $ from 'jquery';
import axios from 'axios';
import { Alert } from 'react-bootstrap';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      edit: false,
      editId: null,
      edited: false,
      deletedOne: false,
      deletedAll: false
    }

    this.getAllItems = this.getAllItems.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.chageToMainView = this.chageToMainView.bind(this);
    this.changeToEdit = this.changeToEdit.bind(this);
    this.myAlert = this.myAlert.bind(this)
    this.editAlert = this.editAlert.bind(this)

  }

  componentDidMount() {
    this.getAllItems()
  }

  getAllItems() {
    axios.get('/items')
      .then(res => {
        this.setState({
          items: res.data,
          edit: false

        })
        this.state.items.length
      })
      .catch(err => console.log(err))
  }


  deleteAll() {
    axios.delete('/delete')
      .then(() => console.log(res.data))
      .catch((err) => console.log(err))
    this.setState({ items: [], deletedAll: true })
    setTimeout(() => {
      this.setState({
        deletedAll: false
      })
    }, 3000)
  }

  deleteOne(id) {
    axios.delete(`/delete/${id}`)
      .then(() => this.getAllItems())
      .catch((err) => console.log(err))
    this.setState({
      items: this.state.items.filter(item => item._id !== id),
      edit: false,
      deletedOne: true
    })
    setTimeout(() => {
      this.setState({
        deletedOne: false
      })
    }, 3000)
  }

  chageToMainView() {
    this.setState({
      edit: false
    })

  }

  editAlert(updatedItem) {
    updatedItem['price'] = Number(updatedItem['price'])
    let updateItems = this.state.items;
    updateItems.forEach((item, i)=>{
      if (item._id === updatedItem._id){
        updateItems[i] = updatedItem;
      }
    })

    this.setState({
      edited: true,
      items: updateItems,
      edit: false
    })
    setTimeout(() => {
      this.setState({
        edited: false
      })
    }, 3000)

  }

  changeToEdit(id) {
    this.setState({
      edit: true,
      editId: id,
    })
  }

  myAlert(alert, heading, msg) {
    return (
      <Alert variant={alert}>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>
          {msg}
        </p>
      </Alert>)
  }

  render() {
    return (
      <div className="container-fluid text-center">
        {this.state.deletedOne ? this.myAlert("danger", "One Item deleted!", "You have successfully deleted one item from your Save For Later list!") : ""}
        {this.state.edited ? this.myAlert("success", "One Item updated!", "You have successfully updated one item in your Save For Later list!") : ""}
        {this.state.deletedAll ? this.myAlert("danger", "All Items deleted!", "You have successfully cleared your Save For Later list!") : ""}
        <h1 className="p-3 mb-2 bg-white text-info"><span className="text-muted"> Save For</span><i className="fas fa-dolly"></i>ater</h1>
        <h4>Welcome Back, Amer!</h4>
        <div className="item">
          {this.state.edit ? <EditItem  item={this.state.items.filter(item => item._id === this.state.editId)} chageToMainView={this.chageToMainView} editAlert={this.editAlert} getNewItem={this.getAllItems} /> : <ItemForm className="container-fluid text-center"  getNewItem={this.getAllItems} />}
        </div>
        <div className='item'>
          {this.state.items.length ? <div> <h4>There are currently <strong>{this.state.items.length}</strong> {this.state.items.length === 1 ? "item" : "items"} in your cart!</h4><ItemsTable deleteAll={this.deleteAll} deleteOne={this.deleteOne} changeToEdit={this.changeToEdit} items={this.state.items} /></div> : <div><h4>Your cart is currently empty. Add new items to buy later</h4></div>}
        </div>
      </div>
    )
  }
}

export default App;