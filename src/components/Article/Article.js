import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { getArticleInfo } from '../../actions'
import './Article.scss';
@withRouter
@connect(state => ({
    articleInfo: state.config.articleInfo
}), {
        getArticleInfo,
    })
class Article extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            articleId:this.props.match.params.id
        }
    }

    componentDidMount() {
        this.getData()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { articleInfo } = nextProps;
        let { loading } = prevState;
        if (articleInfo.length !== 0 && loading === true) {
            return {
                loading: false
            }
        }
        return null;
    }

    getData() {
        this.setState({
            loading: true
        }, () => this.props.getArticleInfo())
    }


    render() {
        const {articleInfo}=this.props;
        const {articleId}=this.state;
        return (
            <div className='article'>
                {
                    articleInfo.map(item => {
                        if(item.id === articleId){
                            return (
                                <div className='content' key={item.id}>
                                    <h1>{item.title}</h1>
                                    <div>{item.content}</div>
                                </div>
                            )
                        }  
                    })
                }
            </div>
        );
    }
}

export default Article;