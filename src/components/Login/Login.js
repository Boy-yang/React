
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { goToLogin } from "../../actions";
import "./login.scss";
@connect( state => ( {
    loginResInfo: state.config.loginResInfo
} ),
    {
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
        }, () => this.props.goTologin( data ) );
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
        const { warnInfo, loading } = this.state;
        const { loginResInfo } = this.props;
        return (
            <div className="login">
                <div className='login-header'>
                    <a href="javascript:history.go(-1);" className="login-back">
                        <i className="fa fa-chevron-left" />
                    </a>
                    <div className="login-cont">
                        <h2 className='login-h2'>文轩登录</h2>
                    </div>
                </div>
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
                        <Link to='/forget' className="login-form-forgot" >
                            忘记密码
                        </Link>
                        <Button
                            type="primary"
                            className="login-form-button"
                            loading={ loginResInfo.code ? false : loading }
                            onClick={ () => this.goLogin() }
                        >
                            登陆
                        </Button>
                        <Link to="/register" className='register-now'>立即注册!</Link>
                    </Form.Item>
                </Form>
                <div className="login-other">
                    <p>-----------------其他方式------------------</p>
                    <div className="login-method">
                        <a href="//m.winxuan.com/oauth/weibo?state=" className="login-xl" />
                        <a href="//m.winxuan.com/oauth/qq?state=" className="login-qq" />
                    </div>
                </div>
                <div className="login-service-tip">
                    <div className="login-item">
                        <span><i className="fa fa-lock" /></span>
                        <b>100%正品保证</b>
                    </div>
                    <div className="login-item">
                        <i className="fa fa-circle-o-notch" />
                        <b>7天无理由退换货</b>
                    </div>
                    <div className="login-item">
                        <i className="fa fa-truck" />
                        <b>多仓直发快速配送</b>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;