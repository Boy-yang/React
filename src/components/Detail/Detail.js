import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { Tabs } from 'antd';
import { getListData } from "../../actions/index";

const TabPane = Tabs.TabPane;

import './Detail.scss'

@connect( state => ( {
    listData: state.config.listData
} ), {
        getListData
    }
)
class Detail extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            id: this.props.match.params.id - 1,
            detailData: {

            }
        }
    }
    componentDidMount() {
        this.props.getListData();

    }

    static getDerivedStateFromProps( nextProps, prevState ) {
        const { listData } = nextProps;
        const { id } = prevState;
        if ( listData.length !== 0 ) {
            prevState.detailData = listData[ id ];
        }
        return null;
    }

    render() {
        const { detailData } = this.state;
        return (
            <div className='detail'>
                <div className='detail-tags'>
                    <Tabs
                        defaultActiveKey="1"
                        onChange={ () => { console.log( 'key' ) } }
                        size="small"
                    >
                        <TabPane tab="Tab 1" key="1">
                            <img src={ detailData.imgSrc } alt="" />
                            <h2 className='tit-h2'>{ detailData.name }</h2>
                            <span className="price">价格：<b>{ detailData.price }</b></span>
                            <p>作 者:<b><a href="#">{ detailData.author }</a></b></p>
                            <p>出版社：<a href="#"><b>{ detailData.publish }</b></a></p>
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </div>
                <div className='detail-footer'>
                    <div className="detail-footer-box">
                        <NavLink to='/' data-type="index" activeStyle={ { color: "red" } }>
                            <i className="fa fa-home" aria-hidden="true" />
                            <b>首页</b>
                        </NavLink>
                        <NavLink to='/user' activeStyle={ { color: "red" } }>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <b>收藏</b>
                        </NavLink>
                        <NavLink to='/shop' activeStyle={ { color: "red" } }>
                            <i className="fa fa-shopping-cart" aria-hidden="true" />
                            <b>购物车</b>
                        </NavLink>

                    </div>
                </div>
            </div>

        );
    }
}
export default Detail;