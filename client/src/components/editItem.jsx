import React from 'react';
import $ from 'jquery';
import { Form, Button, Col } from 'react-bootstrap';


class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.item[0]._id,
      itemName: props.item[0].itemName,
      price: props.item[0].price,
      link: props.item[0].link
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
  }

  handleSubmit() {
    // event.preventDefault();
    $.ajax({
      method: 'PUT',
      url: "http://localhost:3000/update",
      data: this.state,
      success: () => {
        console.log('Data has been sucessfully posted');
      }
    })
      .catch((err) => console.log(err))

  }

  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        {/* <Form.Row>
          <Form.Group controlId="formGridItem">
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="Item Name" value={this.state.itemName} name="itemName" onChange={this.handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formGridPrice">
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="Price" value={this.state.price} name="price" onChange={this.handleInputChange} />
          </Form.Group>
        </Form.Row> */}

        <Form.Row>
          <Col>
            <Form.Control type="text" placeholder="Item Name" value={this.state.itemName} name="itemName" onChange={this.handleInputChange} />
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Merchant Name" value={this.state.price} name="merchant" onChange={this.handleInputChange} />
          </Col>
          <Col>
            <Form.Control type="text" placeholder="Price" value={this.state.price} name="price" onChange={this.handleInputChange} />
          </Col>
        </Form.Row>

        <Form.Group controlId="formGridLink">
          <Form.Label></Form.Label>
          <Form.Control placeholder="Product Link" value={this.state.link} name="link" onChange={this.handleInputChange} />
        </Form.Group>


        <Button className='button' variant="info" type="submit" >
          Submit Changes
  </Button>
        <Button className='button' variant="secondary" onClick={() => this.props.chageToMainView()}  >
          Cancel Changes
  </Button>

      </Form>
    )
  }
}

export default ItemForm;