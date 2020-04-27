import React, { useEffect } from "react";
import App from "./app.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";
import setAuthToken from "../utils/setAuthToken";
import jwt from "jsonwebtoken";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      firstName: "",
      userName: "",
      errors: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserSignin = this.handleUserSignin.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(`/signin`, this.state).then(
      (res) => {
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        let decoded = jwt.decode(token);
        localStorage.setItem("id", decoded.id);
        localStorage.setItem("name", decoded.name);

        this.props.history.push(`/user/${decoded.id}`);
      },
      (err) => this.setState({ errors: { form: "Invalid Credentials!" } })
    );
  }

  render() {
    return (
      <div>
        <div className="container-fluid text-center">
          <div>
            <h1 className="p-3 mb-2 bg-white text-info">
              <span className="text-muted"> Save For</span>
              <i className="fas fa-dolly"></i>ater
            </h1>
          </div>
          <br></br>
          <h2 className="text-muted">Login</h2>
          <div className="signin">
            <Form onSubmit={this.handleSubmit}>
              {errors.form && (
                <div className="alert alert-danger">{errors.form}</div>
              )}
              <Form.Group controlId="formBasicEmail">
                <Form.Label></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="userName"
                  onChange={this.handleInputChange}
                />
                <Form.Text className="text-muted"></Form.Text>
                <Form.Label></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Log in
              </Button>
            </Form>
          </div>
          <br></br>
          <p>Don't have an account?</p>
          <Link to="/signup">
            <Button variant="outline-primary" type="submit">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
