import React, {Component} from 'react'
import './FH.scss'

const FH = (props) => (
    <div className="FH">
        <a href="javascript:history.go(-1);" className="FH-back">
            <i className="fa fa-chevron-left"/>
        </a>
        <div className="FH-cont">
            <h2>忘记密码</h2>
            <div className="FH-more" data-am-dropdown="">
                <a className="FH-dropdown-toggle" data-dropdown-toggle="">
                    <i className="fa fa-ellipsis-h" aria-hidden="true"/>
                </a>
                <ul className="FH-dropdown-content">
                    <i className="FH-arrow"/>
                    <li>
                        <a href="//m.winxuan.com"><i className="iconfont"/>首页</a></li>
                    <li>
                        <a href="//m.winxuan.com/cms/class_s"><i className="iconfont"/>分类搜索</a>
                    </li>
                    <li>
                        <a href="//m.winxuan.com/usercenter"><i className="iconfont"/>我的文轩</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

export default FH;