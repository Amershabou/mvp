import React from 'react';
import ItemForm from './itemForm.jsx';
import EditItem from './EditItem.jsx';
import ItemsTable from './ItemsTable.jsx';
import $ from 'jquery';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      edit: false,
      editId: null
    }
    this.getAllItems = this.getAllItems.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.chageToMainView = this.chageToMainView.bind(this);
    this.changeToEdit = this.changeToEdit.bind(this);
  }

  componentDidMount() {
    this.getAllItems()
  }

  getAllItems() {
    axios.get('http://localhost:3000/items')
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
    axios.delete('http://localhost:3000/delete')
      .then(() => console.log(res.data))
      .catch((err) => console.log(err))
    this.setState({ items: [] })

  }

  deleteOne(id) {
    axios.delete(`http://localhost:3000/delete/${id}`)
      .then(() => this.getAllItems())
      .catch((err) => console.log(err))
    this.setState({
      items: this.state.items.filter(item => item._id !== id),
      edit: false
    })
  }

  chageToMainView() {
    this.setState({
      edit: false
    })
  }

  changeToEdit(id) {
    this.setState({
      edit: true,
      editId: id,
    })
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <h1 className="p-3 mb-2 bg-white text-info"><span className="text-muted"> Save For</span><i className="fas fa-dolly"></i>ater</h1>
        <div className="item">
          {this.state.edit ? <EditItem item={this.state.items.filter(item => item._id === this.state.editId)} chageToMainView={this.chageToMainView} getNewItem={this.getAllItems} /> : <ItemForm className="container-fluid text-center" getNewItem={this.getAllItems} />}
        </div>
        <div className='item'>
          {this.state.items.length ? <div> <h4>There are currently <strong>{this.state.items.length}</strong> {this.state.items.length === 1 ? "item" : "items"} in your cart!</h4><ItemsTable deleteAll={this.deleteAll} deleteOne={this.deleteOne} changeToEdit={this.changeToEdit} items={this.state.items} /></div> : <div><h4>Your cart is currently empty. Add new items to buy later</h4></div>}
        </div>

      </div>
    )
  }

}


export default App;