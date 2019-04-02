import React from 'react';
import './DF.scss'
import {Link} from 'react-router-dom'
const DF = (props)=>{
    return(
        <>
            <div className='DF'>
                <div className='DF-box'>
                    <div className='DF-btn-l'>
                        <Link to='/home'>
                            <i className="fa fa-home" aria-hidden="true"/>
                            <b>首页</b>
                        </Link>
                        <a href="#">
                            <i className="fa fa-heart" aria-hidden="true"/>
                            <b>收藏</b>
                        </a>
                        <a>
                            <i className="fa fa-shopping-cart" aria-hidden="true"/>
                            <b>购物车</b>
                            <s>0</s>
                        </a>
                    </div>
                    <div className='DF-btn-r'>
                        <a href="javascript:;" className="DF-r-a1">加入购物车</a>
                        <a href="/trade?params[0][productList]=1201733827*1" className="DF-r-a2">立即购买</a>
                        <a href="javascript:;" className="DF-r-a0">商品已下架</a>
                    </div>
                </div>
            </div>
            <div style={{height:"1.44rem"}}/>
        </>
    );
};

export default DF;