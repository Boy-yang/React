import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import ReactSwipe from 'react-swipe';

import { getListData } from "../../actions/index";

import './Home.scss';

//引入公共组件
import Header from "../common/Header/Header"
import Footer from "../common/Footer/Footer"

@connect( state => ( {
  listData: state.config.listData
} ), {
    getListData
  }
)
export default class Home extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      listData: [],
      show: false
    }
  }
  componentDidMount() {
    this.props.getListData();
    //window 不可用 坑
    document.body.addEventListener( 'scroll', () => {
      let currentTop = document.documentElement.scrollTop || document.body.scrollTop;
      if ( currentTop > 400 ) {
        this.setState( {
          show: true
        } )
      } else {
        this.setState( {
          show: false
        } )
      }
    } );
  }

  static getDerivedStateFromProps( nextProps, prevState ) {
    const { listData } = nextProps;
    if ( listData.length !== 0 ) {
      prevState.listData = listData;
    }
    return null;
  }

  scrollTop() {
    let currentTop = document.documentElement.scrollTop || document.body.scrollTop;
    if ( currentTop > 0 ) {
      //window.scrollTo()  没有效果 （坑）
      document.body.scrollTo( {
        top: 0,
        behavior: 'smooth',
      } );
    }
  }

  render() {
    const { listData, show } = this.state;//将state中的数据解构出来
    return (
      <>
        <Header />
        <div style={ { height: "1.34rem" } } />
        <div className="Banner">
          <ReactSwipe swipeOptions={ { continuous: true, auto: 3000 } }>
            <div>
              <a href="#">
                <img src="http://static.winxuancdn.com/topic/subject/201811/18dc/fc/640-304.jpg?201811211334" alt="" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src="http://static.winxuancdn.com/topic/subject/201809/dbs/640-304.jpg?201811211334" alt="" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src="http://static.winxuancdn.com/topic/subject/201806/dp/640-304.jpg" alt="" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src="http://static.winxuancdn.com/topic/subject/201809/xhbs/640-304.jpg?201811211334" alt="" />
              </a>
            </div>
          </ReactSwipe>
        </div>

        <div className='List'>
          <div className="List-item">
            {
              listData.map( item => {//使用map遍历dataList数据
                return (
                  <Link to={ `/detail/${ item.id }` } title="延禧攻略(2册)" key={ item.id }>
                    <div className="List-left">
                      <img src={ item.imgSrc } alt="延禧攻略(2册)" />
                    </div>
                    <div className="List-right">
                      <p>书名：{ item.name }</p>
                      <p>作者：{ item.author }</p>
                      <p>价格：{ item.price }</p>
                      <p>出版社：{ item.publish }</p>
                    </div>
                  </Link> )
              } )
            }
          </div>
          <div style={ { height: "1.44rem" } } />
        </div>
        {
          show &&
          <div className='BackTop' onClick={ () => this.scrollTop() } >
            <a href="javascript:;" className='BackTop-icon'>
              <i className="fa fa-long-arrow-up" />
            </a>
          </div>
        }
        <Footer />
      </>
    );
  }
}