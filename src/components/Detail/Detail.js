import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DH from './DHead/DH'
import DF from './DFoot/DF'

import './Detail.scss'

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailData: []
        }
    }

    componentWillMount() {
        fetch(`../data/List.json`,
            {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const _id = this.props.match.params.id - 1;
                this.setState({detailData: data[_id]})
            });
    }

    render() {
        let {detailData} = this.state;
        // console.log(detailData);
        return (
            <div className="Detail">
                <DH/>
                <div className="DB">
                    <dl>
                        <dt>
                            <img
                                src={detailData.imgSrc}
                                alt=""/>
                        </dt>
                        <dd className="DB-title">
                            <h2 className='tit-h2'>{detailData.name}</h2>
                            <h3/>
                        </dd>
                        <dd className='DB-price'>
                            <span className="price-n"><b>{detailData.priceN}</b></span>
                            <span className="price-o">{detailData.priceO}</span>
                            <span className="zq">{detailData.zq}</span>
                            <i className="fa fa-share-alt-square" aria-hidden="true"/>
                        </dd>
                        <dd className='DB-author'>
                            作 者：<b><a href="http://m.winxuan.com/search?author=%E5%91%A8%E6%9C%AB">{detailData.author}</a></b>
                        </dd>
                        <dd className='DB-pub'>
                            出版社：<a href="#"><b>{detailData.pub}</b></a>
                        </dd>
                    </dl>
                    <div className="DB-num">
                        <b>数 量：</b>
                        <button className='DB-btn-l'>
                            <i className="fa fa-minus" aria-hidden="true"/>
                        </button>
                        <input type="number" className='DB-ipt' defaultValue='1'/>
                        <button className='DB-btn-r'>
                            <i className="fa fa-plus" aria-hidden="true"/>
                        </button>
                        <span className="DB-limit"><b>2049</b></span>
                    </div>
                </div>
                <DF/>
            </div>
        );
    }
}