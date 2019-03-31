import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { getUserInfo,goToLogin } from "../../actions";
import "./Login.scss";
@connect(state => ({
    userInfo: state.base.userInfo,
    loginResInfo:state.base.loginResInfo
  }),
  {
    getUserInfo,
    goToLogin
  }
)
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: false
    };
    this.props.getUserInfo();
  }
  render() {
    return (
      <div className="login">
        <Form className="login-form">
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              className="login-form-button"
              onClick={ () => this.goLogin() }
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Login;
