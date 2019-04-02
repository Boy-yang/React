import React, {Component} from 'react'
import './FB.scss'

import {Link} from 'react-router-dom'
const FB = (props)=>(
    <>
        <div className="FB">
            <p className="FB-step">仅需3步,创建您的新密码:</p>
            <ul className='FB-nav'>
                <li style={{color:"red"}}>
                    1、输入账号
                    <i className="fa fa-angle-right" aria-hidden="true"/>
                </li>
                <li>
                    2、身份验证
                    <i className="fa fa-angle-right" aria-hidden="true"/>
                </li>
                <li>
                    3、重置密码
                    <i className="fa fa-angle-right" aria-hidden="true"/>
                </li>
            </ul>
            <div className='FB-ipt'>
                <div className="FB-step1">
                    <div className="FB-import">
                        <input type="text" className="w_input" id="J_account" placeholder="请输入用户名/手机/邮箱"/>
                    </div>
                    <div className="FB-import">
                        <input type="text" className="w_input" id="J_code" placeholder="请输入验证码  点击图片刷新"/>
                        <img src="//m.winxuan.com/verifycode?t=1543432120654" className="J_getCode" alt="验证码"/>
                    </div>
                    <div className="FB-info">账号未注册！</div>
                    <div className="FB-sub">下一步</div>
                    {/*<a href="//m.winxuan.com/signup" className="FB-jump">立即注册 &gt;</a>*/}
                    <Link to='/reg' className="FB-jump">立即注册&gt;</Link>
                </div>
                <div className="FB-step2 FB-hide">
                    <div className="FB-import">
                        <p className="FB-mode">选择身份验证方式</p>
                        <div className="FB-choice">
                            <span></span>
                            <i></i>
                        </div>
                    </div>
                    <div className="FB-import">
                        <input type="text" className="w_input" placeholder="请输入图片验证码  点击图片刷新"/>
                        <img src="//m.winxuan.com/verifycode?t=1543432120654" className="J_imageCode" alt="图像验证码"/>
                    </div>
                    <div className="FB-import">
                        <input type="text" className="w_input" placeholder="请输入验证码" />
                        <a href="javascript:;" className="getCode">获取验证码</a>
                    </div>
                    <div className="FB-info">验证码有误,请重新输入</div>
                    <div className="FB-sub">下一步</div>
                </div>
                <div className="FB-step3  FB-hide">
                    <div className="FB-import">
                        <input type="text" className="FB-pwd"  placeholder="请设置6-16位登录密码"/>
                            <b>
                                <strong className="FB-switch-btn active">
                                    <i></i>
                                    <em></em>
                                </strong>
                            </b>
                    </div>
                    <div className="FB-import">
                        <input type="password" className="FB-pwd" placeholder="请再次输入密码"/>
                            <b>
                                <strong className="FB-showSurePwd">
                                    <i></i>
                                    <em></em>
                                </strong>
                            </b>
                    </div>
                    <div className="FB-info">密码输入不一致，请重新输入</div>
                    <div className="FB-sub">重置密码</div>
                </div>
            </div>
            <div className="FB-call">遇到问题？ 请联系客服(4007020808)</div>
        </div>
    </>
);
export default FB;