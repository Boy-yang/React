import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { getUserInfo, goToLogin } from "../../actions";
import "./Login.scss";
@connect( state => ( {
  userInfo: state.config.userInfo,
  loginResInfo: state.config.loginResInfo
} ),
  {
    getUserInfo,
    goToLogin
  }
)
class Login extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      loading: false,
      query: {
        phoneNumber: null,//用户名
        password: null,//密码
        identifyCode: null,//验证码
      },
      warnInfo: ''
    };

    this.props.getUserInfo();
  }

  goLogin() {
    const { phoneNumber, password } = this.state.query;
    let data = {};
    //手机号/密码验证
    const TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    const PWD_REGEXP = /^([0-9a-zA-Z]{8,16})$/;
    if ( !phoneNumber ) {
      this.setState( {
        warnInfo: '手机号不能为空'
      } );
      return;
    } else if ( TEL_REGEXP.test( phoneNumber ) ) {
      // 密码验证8-16位数字+字母组合
      if ( !password ) {
        this.setState( {
          warnInfo: '密码不能为空'
        } );
        return;
      } else if ( PWD_REGEXP.test( password ) ) {
        data = {
          phoneNumber,
          password,
        };
      } else {
        this.setState( {
          warnInfo: '密码格式有误，请输入8-16位数字和字母...'
        } );
        return;
      }
    } else {
      this.setState( {
        warnInfo: '手机号有误，请重新输入...'
      } );
      return;
    }
    this.setState( {
      loading: true,
    }, () => this.props.goToLogin( data ) );
  }

  handleValueChange( e, type ) {
    const { query } = this.state;
    query[ type ] = e.target.value;
    this.setState( { ...query } );
  }

  handleKeyDown( keyCode ) {
    const { phoneNumber, password } = this.state.query;
    if ( keyCode === 13 && phoneNumber && password ) {
      this.goLogin();//去登陆
    }
  }

  render() {
    const { warnInfo,loading } = this.state;
    const { loginResInfo } = this.props;
    return (
      <div className="login">
        <Form className="login-form">
          <span style={ { color: "red" } }>{ loginResInfo.msg || warnInfo }</span>
          <Form.Item>
            <Input
              prefix={ <Icon type="user" style={ { color: "rgba(0,0,0,.25)" } } /> }
              type="phoneNumber"
              placeholder="PhoneNumber"
              maxLength={ 11 }
              onChange={ ( e ) => this.handleValueChange( e, "phoneNumber" ) }
              onKeyDown={ ( e ) => this.handleKeyDown( e.keyCode ) }
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={ <Icon type="lock" style={ { color: "rgba(0,0,0,.25)" } } /> }
              type="password"
              placeholder="Password"
              onChange={ ( e ) => this.handleValueChange( e, "password" ) }
              onKeyDown={ ( e ) => this.handleKeyDown( e.keyCode ) }
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
              loading={ loginResInfo.code ? false : loading }
              onClick={ () => this.goLogin() }
            >
              登陆
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Login;
