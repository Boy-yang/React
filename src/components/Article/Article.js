import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getArticleDetail } from '../../actions'
import './Article.scss';
@withRouter
@connect(state => ({
    articleDetail: state.article.articleDetail
}), {
        getArticleDetail,
    })
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            articleId: this.props.match.params.id
        }
    }

    componentDidMount() {
        this.getData()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { articleDetail } = nextProps;
        let { loading } = prevState;
        if (articleDetail.length !== 0 && loading === true) {
            return {
                loading: false
            }
        }
        return null;
    }

    getData() {
        const {articleId}=this.state;
        this.setState({
            loading: true
        }, () => this.props.getArticleDetail({articleId}))
    }


    render() {
        const { articleDetail } = this.props;
        return (
            <div className='article'>
              articleDetail
            </div>
        );
    }
}

export default Article;