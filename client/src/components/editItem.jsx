import React from "react";
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.item[0]._id,
      itemName: props.item[0].itemName,
      price: props.item[0].price,
      merchant: props.item[0].merchant,
      created: props.item[0].created,
      link: props.item[0].link,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editAlert(this.state);
    axios
      .post("/api/update", this.state)
      .then(() => {
        props.getNewItem();
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Item Name"
              value={this.state.itemName}
              name="itemName"
              onChange={this.handleInputChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Merchant Name"
              value={this.state.merchant}
              name="merchant"
              onChange={this.handleInputChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Price"
              value={this.state.price}
              name="price"
              onChange={this.handleInputChange}
            />
          </Col>
        </Form.Row>

        <Form.Group controlId="formGridLink">
          <Form.Label></Form.Label>
          <Form.Control
            placeholder="Product Link"
            value={this.state.link}
            name="link"
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Button
          className="button"
          variant="info"
          type="submit"
          onClick={() => this.props.editAlert()}
        >
          Submit Changes
        </Button>
        <Button
          className="button"
          variant="secondary"
          onClick={() => this.props.chageToMainView()}
        >
          Cancel Changes
        </Button>
      </Form>
    );
  }
}

export default ItemForm;
