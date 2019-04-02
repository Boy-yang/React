import React from 'react';
import './DH.scss'
const DH = (props)=>{
    return(
        <>
            <div className='DH'>
                <div className='DH-box'>
                    <a href="javascript:history.go(-1);" className="DH-back">
                        <i className="fa fa-chevron-left"/>
                    </a>
                    <ul>
                        <li className='DH-active'>
                            <a href="">基本信息</a>
                        </li>
                        <li>
                            <a href="">商品详情</a>
                        </li>
                        <li>
                            <a href="">用户评价</a>
                        </li>
                    </ul>
                    <div className='DH-more'>
                        <a href="#">
                            <i className="fa fa-ellipsis-h" aria-hidden="true"/>
                        </a>
                        <ul className="DH-nav-sub">
                            <i className="DH-arrow"></i>
                            <li>
                                <a href="//m.winxuan.com" className='DH-active'><s></s>首页</a>
                            </li>
                            <li>
                                <a href="//m.winxuan.com/search"><s></s>分类搜索</a>
                            </li>
                            <li id="onlineService">
                                <a href="javascript:;" onClick="ysf.open()"><s></s>在线客服</a></li>
                            <li>
                                <a href="//m.winxuan.com/usercenter"><s></s>我的文轩</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{height:"1.32rem"}}/>
        </>
    );
};


export default DH;