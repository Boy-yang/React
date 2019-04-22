import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Input, Form } from 'antd';
import './Header.scss';
const FormItem = Form.Item;

const Search = Input.Search;

class Header extends Component {
    constructor(props) {
        super(props);
    }

    
    handleSearch(value) {
        console.log(value)
    }

    render() {
        return (
            <div className="header">
                <div className='logo'>Blog</div>
                <div className='nav'>
                    <NavLink exact to='/' activeClassName='active'>
                        <i className="fa fa-home" aria-hidden="true" />
                        <b>首页</b>
                    </NavLink>
                    <NavLink to='/life' activeClassName='active'>
                        <i className="fa fa-coffee" aria-hidden="true"></i>
                        <b>生活</b>
                    </NavLink>
                    <NavLink to='/user' activeClassName='active'>
                        <i className="fa fa-male" aria-hidden="true"></i>
                        <b>关于我</b>
                    </NavLink>
                </div>
                <div className='search'>
                    <Search
                        placeholder="input search text"
                        onSearch={value => this.handleSearch(value)}
                        enterButton
                    />
                </div>
                <div className='write'>
                    <Link to='/write'>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        <b>写文章</b>
                    </Link>      
                </div>
            </div>
        );
    }
}
export default Header;