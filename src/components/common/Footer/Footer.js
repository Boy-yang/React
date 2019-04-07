import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss'

const Footer = ( props ) => (
    <div className='Footer'>
        <div className="Footer-box">
            <NavLink to='/' data-type="index" activeStyle={ { color: "red" } }>
                <i className="fa fa-home" aria-hidden="true" />
                <b>首页</b>
            </NavLink>
            <NavLink to='/shop' activeStyle={ { color: "red" } }>
                <i className="fa fa-cart-arrow-down" aria-hidden="true" />
                <b>购物</b>
            </NavLink>
            <NavLink to='/user' activeStyle={ { color: "red" } }>
                <i className="fa fa-user-md" aria-hidden="true" />
                <b>用户中心</b>
            </NavLink>
        </div>
    </div>
);
export default Footer;