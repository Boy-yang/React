import React,{Component} from 'react';
import './Header.scss'
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor ( props ) {
        super( props );
    }

    render() {
        return (
            <div className="Header">
                <a href="#" className='logo'>文轩网</a>
                <div className='search'>
                    <input type="text" className={ 'index-search' } placeholder={ '' } />
                    <a href="javascript:;" />
                    <i className="fa fa-search" aria-hidden="true" />
                </div>
                <div className="user">
                    <Link to='/login'>登录</Link>
                </div>
            </div>
        );
    }
}
export default Header;