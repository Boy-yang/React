import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {Input} from 'antd';
import './Header.scss'

const Search=Input.Search;

class Header extends Component {
    constructor ( props ) {
        super( props );
    }

    handleSearch(value){
        console.log(value)
    }

    render() {
        return (
            <div className="header">
                <div className='logo'>Blog</div>
                <div className='nav'>
                    <a href='javascript:;'>首页</a>
                    <a href='javascript:;'>技术</a>
                    <a href='javascript:;'>生活</a>
                    <a href='javascript:;'>关于我</a>
                </div>
                <div className='search'>
                    <Search
                        placeholder="input search text"
                        onSearch={value => this.handleSearch(value)}
                        enterButton
                    />
                </div>
                <div className='write-login'>
                    <a href='javascript:;'>写文章</a>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to='/login'>登陆</Link>
                </div> 
            </div>
        );
    }
}
export default Header;