import React,{Component} from 'react';

import './Home';

//引入公共组件
import Header from "../common/Header/Header"
import Footer from "../common/Footer/Footer"
import List from '../common/List/List'
//引入自家组件
import Banner from './Banner/Banner'
import BackTop from './BackTop/BackTop'

export default class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
                <Header/>
                <Banner/>
                <List/>
                <BackTop/>
                <Footer/>
            </>
        );
    }
}