import React from "react";
import App from "./app.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Col, Modal, Card } from "react-bootstrap";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      passwordConf: "",
      submitted: false,
      errors: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  compareTwoPasswords(pass, conf) {
    if (pass.length !== conf.length) return false;
    for (let i = 0; i < pass.length; i++) {
      if (pass[i] !== conf[i]) {
        return false;
      }
    }
    return true;
  }

  validateInput() {
    let { userName, firstName, lastName, password, passwordConf } = this.state;
    this.setState({ errors: {} });
    let errors = {};
    let count = 0;
    if (userName === "") {
      errors.userName = "This field is required";
      count++;
    }
    if (firstName === "") {
      errors.firstName = "This field is required";
      count++;
    }
    if (lastName === "") {
      errors.lastName = "This field is required";
      count++;
    }
    if (password === "") {
      errors.password = "This field is required";
      count++;
    }
    if (passwordConf === "") {
      errors.passwordConf = "This field is required";
      count++;
    }
    if (this.compareTwoPasswords(password, passwordConf) === false) {
      errors.passwordConf = "Passwords must match";
      count++;
    }
    this.setState({ errors });
    return count;
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

    if (this.validateInput() > 0) {
      return;
    }
    axios.post(`/signup`, this.state).then((data) => {
      this.setState({
        submitted: true,
      });
    });
    //
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        {this.state.submitted ? (
          <Card className="container-fluid text-center">
            <Card.Header>Woohoo!!</Card.Header>
            <Card.Body>
              <Card.Title>Welcome {this.state.firstName}!</Card.Title>
              <Card.Text>
                Thank you for signing up! You can now start using you
                SaveForLater account. If you want to login into your new account
                now, you may return to the login page by clicking on the button
                below.
              </Card.Text>
              <Link to="/">
                <Button variant="primary">Go to login</Button>
              </Link>
            </Card.Body>
          </Card>
        ) : (
          <div className="container-fluid text-center">
            <div>
              <h1 className="p-3 mb-2 bg-white text-info">
                <span className="text-muted"> Save For</span>
                <i className="fas fa-dolly"></i>ater
              </h1>
            </div>
            <br></br>
            <h2 className="text-muted">Sign up form</h2>
            <div className="signin">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label></Form.Label>
                  <Form.Control
                    className={errors.firstName ? "has-error" : ""}
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={this.handleInputChange}
                  />
                  {errors.firstName ? (
                    <span className="error">{errors.firstName}</span>
                  ) : (
                    <div></div>
                  )}
                  <Form.Label></Form.Label>
                  <Form.Control
                    className={errors.lastName ? "has-error" : ""}
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={this.handleInputChange}
                  />
                  {errors.lastName ? (
                    <span className="error">{errors.lastName}</span>
                  ) : (
                    <div></div>
                  )}
                  <Form.Label></Form.Label>
                  <Form.Control
                    className={errors.userName ? "has-error" : ""}
                    type="email"
                    placeholder="Enter email"
                    name="userName"
                    onChange={this.handleInputChange}
                  />
                  {errors.userName ? (
                    <span className="error">{errors.userName}</span>
                  ) : (
                    <div></div>
                  )}
                  <Form.Label></Form.Label>
                  <Form.Control
                    className={errors.password ? "has-error" : ""}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleInputChange}
                  />
                  {errors.password ? (
                    <span className="error">{errors.password}</span>
                  ) : (
                    <div></div>
                  )}
                  <Form.Label></Form.Label>
                  <Form.Control
                    className={errors.passwordConf ? "has-error" : ""}
                    type="password"
                    placeholder="Password Confirmation"
                    name="passwordConf"
                    onChange={this.handleInputChange}
                  />
                  {errors.passwordConf ? (
                    <span className="error">{errors.passwordConf}</span>
                  ) : (
                    <div></div>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Submit
                </Button>
              </Form>
              <div>
                <p>
                  Already have an account? <Link to="/">Login</Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Signup;
