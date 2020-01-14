import React from 'react';
import $ from 'jquery';
import { Form, Button } from 'react-bootstrap';


class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      price: null,
      link: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state)
  }


  handleSubmit() {
    // event.preventDefault();
    $.ajax({
      method: 'POST',
      url: "http://localhost:3000/item",
      data: this.state,
      success: () => {
        console.log('Data has been sucessfully posted');
      }
    })
      .then(() => {
        props.getNewItem()
      })
      .catch((err) => console.log(err))

  }


  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group controlId="formGridItem">
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="Item Name" name="itemName" onChange={this.handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formGridPrice">
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="Price" name="price" onChange={this.handleInputChange} />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridLink">
          <Form.Label></Form.Label>
          <Form.Control placeholder="Product Link" name="link" onChange={this.handleInputChange} />
        </Form.Group>

        <Button variant="primary" type="submit" >
          Submit
  </Button>
      </Form>
    )
  }
}

export default ItemForm;