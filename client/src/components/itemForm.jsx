import React from "react";
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      price: null,
      link: "",
      userId: localStorage.getItem("id"),
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

  handleSubmit() {
    let token = localStorage.getItem("jwtToken");
    axios
      .post("/api/item/add", this.state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        props.getNewItem();
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Item Name"
                name="itemName"
                onChange={this.handleInputChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Merchant Name"
                name="merchant"
                onChange={this.handleInputChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Price"
                name="price"
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Row>
          <Form.Group controlId="formGridLink">
            <Form.Label></Form.Label>
            <Form.Control
              placeholder="Product Link"
              name="link"
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" size="lg" block>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default ItemForm;
