import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import './Forget.scss';

class Forget extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            showNav: false,
            showReset: true,
            identifyCode: '',//验证码
        }
    }

    showNav() {
        const { showNav } = this.state;
        if ( !showNav ) {
            this.setState( {
                showNav: true
            } )
        } else {
            this.setState( {
                showNav: false
            } )
        };
    }

    showReset() {
        const { showReset } = this.state;
        if ( showReset ) {
            this.setState( {
                showReset: false,
            } )
        } else {
            this.setState( {
                showReset: true,
            } )
        }
    }

    saveNewPwd() {
        console.log( 'save new password' )
    }

    getIdentifyCode() {
        console.log( "获取验证码" )
    }

    render() {
        const { showNav, showReset, identifyCode } = this.state;
        return (
            <div className='forget'>
                <div className="forget-head">
                    <a href="javascript:history.go(-1);" className="forget-back">
                        <i className="fa fa-chevron-left" />
                    </a>
                    <div className="forget-cont">
                        <h2>忘记密码</h2>
                        <div className="forget-more">
                            <a className="forget-dropdown-toggle" onClick={ () => this.showNav() }>
                                <i className="fa fa-ellipsis-h" aria-hidden="true" />
                            </a>
                            {
                                showNav &&
                                <ul className="forget-dropdown-content">
                                    <i className="forget-arrow" />
                                    <li>
                                        <NavLink to='/'>
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

                <Form className="forget-form">
                    <h3>仅需3步,创建您的新密码:</h3>
                    <ul>
                        <li>
                            1、身份验证 >
                        </li>
                        <li>
                            2、下一步 >
                        </li>
                        <li>
                            3、重置密码 >
                        </li>
                    </ul>
                    { showReset ?
                        <Form.Item>
                            <Input type="phoneNumber" placeholder="请输入手机号" maxLength={ 11 } />
                            <div className='identifyCode'>
                                <Input type="identifyCode" placeholder="请输入验证码" value={ identifyCode } />
                                <Button
                                    className='identifyCode-btn'
                                    type='primary'
                                    size='small'
                                    onClick={ () => this.getIdentifyCode() }
                                >
                                    获取验证码
                                    </Button>
                            </div>
                            <Button
                                type='primary'
                                className='next'
                                onClick={ () => this.showReset() }
                            >
                                下一步
                                </Button>
                        </Form.Item>
                        :
                        <Form.Item>
                            <Input
                                type="password"
                                placeholder='请输入8-16位密码'
                            />
                            <Input
                                className='reset-password'
                                type="password"
                                placeholder='请确认密码'
                            />
                            <Button
                                type='primary'
                                className='next'
                                onClick={ () => this.saveNewPwd() }
                            >
                                重置密码
                                </Button>
                        </Form.Item> }
                    <span className='warnInfo'></span>
                </Form>
                <div className="forget-call">遇到问题？ 请联系客服(4007020808)</div>
            </div>
        );
    }
}

export default Forget;