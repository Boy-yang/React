import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from "antd";
import { goToRegister } from "../../actions";

import "./Register.scss";
@connect( state => ( {
  registerInfo: state.config.registerInfo
} ), {
    goToRegister
  }
)
class Register extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      query: {
        phoneNumber: null,//用户名
        password: null,//密码
        repassword: null,//重复密码
        identifyCode: null,//验证码
      },
      show: false,
      IcodeBtnText: '获取验证码',
      loading: false,
      warnInfo: ''
    };
  }

  goRegister() {
    const { phoneNumber, password, repassword } = this.state.query;
    let data = {};
    //手机号/密码验证
    const TEL_registerEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    const PWD_registerEXP = /^([0-9a-zA-Z]{8,16})$/;
    if ( !phoneNumber ) {
      this.setState( {
        warnInfo: '手机号不能为空'
      } );
      return;
    } else if ( TEL_registerEXP.test( phoneNumber ) ) {
      // 密码验证8-16位数字+字母组合
      if ( !password ) {
        this.setState( {
          warnInfo: '密码不能为空'
        } );
        return;
      } else if ( PWD_registerEXP.test( password ) ) {
        if ( password !== repassword ) {
          this.setState( {
            warnInfo: '两次输入的密码不一致'
          } );
          return;
        }
        data = {
          phoneNumber,
          password,
          repassword
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
    }, () => this.props.goToregisterister( data ) );
  }

  handleValueChange( e, type ) {
    const { query } = this.state;
    query[ type ] = e.target.value;
    this.setState( { ...query } );
  }

  handleKeyDown( keyCode ) {
    const { phoneNumber, password } = this.state.query;
    if ( keyCode === 13 && phoneNumber && password ) {
      this.goRegister();//去注册
    }
  }

  // getIdentifyCode() {
  //   const { phoneNumber } = this.state.query;
  //   this.props.getCaptcha( phoneNumber, function () {
  //     console.log( 'success' );
  //   } )
  // }
  showNav() {
    const {show}=this.state;
    if(!show){
      this.setState({
        show:true
      })
    }else{
      this.setState({
        show:false
      })
    }  
  }

  render() {
    const { phoneNumber, password, repassword } = this.state.query;
    const { loading, warnInfo, show } = this.state;
    const { registerInfo } = this.props;

    return (
      <div className="register">
        <div className="register-head">
          <a href="javascript:history.go(-1);" className="register-back">
            <i className="fa fa-chevron-left" />
          </a>
          <div className="register-cont">
            <h2>注册</h2>
            <div className="register-more">
              <a className="register-dropdown-toggle" onClick={ () => this.showNav() }>
                <i className="fa fa-ellipsis-h" aria-hidden="true" />
              </a>
              {
                show &&
                <ul className="register-dropdown-content">
                  <i className="register-arrow" />
                  <li>
                    <NavLink to='/home'>
                      <i className="fa fa-home" aria-hidden="true" />
                      <b>首页</b>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/shop'>
                      <i className="fa fa-cart-arrow-down" aria-hidden="true" />
                      <b>购物</b>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/user'>
                      <i className="fa fa-user-md" aria-hidden="true" />
                      <b>用户中心</b>
                    </NavLink>
                  </li>
                </ul>
              }
            </div>
          </div>
        </div>
        <Form className="register-form" autoComplete='off'>
          {/* <span style={ { color: "red" } }>{ registerInfo.msg || warnInfo }</span> */ }
          {/* { registerInfo.code && <Link to='/' style={ { marginLeft: '1rem' } }>去登陆</Link> } */ }
          <Form.Item label="PhoneNumber">
            <Input
              type="phoneNumber"
              placeholder='手机号'
              value={ phoneNumber }
              maxLength={ 11 }
              onChange={ ( e ) => this.handleValueChange( e, 'phoneNumber' ) }
              onKeyDown={ ( e ) => this.handleKeyDown( e.keyCode ) }
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input
              type="password"
              placeholder='请输入8-16位密码'
              value={ password }
              onChange={ ( e ) => this.handleValueChange( e, "password" ) }
              onKeyDown={ ( e ) => this.handleKeyDown( e.keyCode ) }
            />
          </Form.Item>
          <Form.Item label="ConfirmPassword">
            <Input
              type="password"
              placeholder='请确认密码'
              value={ repassword }
              onChange={ ( e ) => this.handleValueChange( e, "repassword" ) }
              onKeyDown={ ( e ) => this.handleKeyDown( e.keyCode ) }
            />
          </Form.Item>
          {/* <Form.Item label="IdentifyCode">
            <Input
              type="identifyCode"
              placeholder='请输入验证码'
              value={ identifyCode }
              onChange={ ( e ) => this.handleValueChange( e, "identifyCode" ) }
              onKeyDown={ ( e ) => this.handleKeyDown( e.keyCode ) }
            />
            <Button
              className='IdentifyCode-btn'
              type='primary'
              size='small'
              onClick={ () => this.getIdentifyCode() }
            >
              { IcodeBtnText }
            </Button>
          </Form.Item> */}
          <Form.Item>
            <Checkbox>
              I have read the <a href="#">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="register-form-button"
              // loading={ registerInfo.code ? false : loading }
              onClick={ () => this.goRegister() }
            >
              注册
            </Button>
            <Link to='/login' style={ { color: 'red' } }>已有账号,去登录&gt;</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Register;
