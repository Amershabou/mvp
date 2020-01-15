import React from 'react';
import App from './app.jsx';
import axios from 'axios';


import { Form, Button, Col } from 'react-bootstrap';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      signin: false
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

  async handleSubmit(event) {
    event.preventDefault()

    let res = await axios.get(`/user/${this.state.userName}/${this.state.password}`)
    this.setState({
      signin: res.data
    })
    console.log(res.data)
      .catch(err => console.log(err))

  }


  render() {


    return (
      <div>
        {this.state.signin ? <App /> : <div className="container-fluid text-center">
          <div><h1 className="p-3 mb-2 bg-white text-info"><span className="text-muted"> Save For</span><i className="fas fa-dolly"></i>ater</h1></div>
          <div className="signin">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="userName" onChange={this.handleInputChange} />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
  </Button>
            </Form>
          </div>
        </div>}

      </div>
    )

  }
}


export default Main;