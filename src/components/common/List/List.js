import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { getListData } from "../../../actions/index";

import './List.scss';

@connect( state => ( {
    listData: state.config.listData
} ), {
        getListData
    }
)
export default class List extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            listData: [],
        }
    }

    componentDidMount () {
        this.props.getListData()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {listData}=nextProps;
        if(listData.length!==0){
            prevState.listData=listData;
        }
        return null;
    }

    render() {
        const { listData } = this.state;//将state中的数据解构出来
        return (
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
        )
    }
}
