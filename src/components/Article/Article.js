import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getArticleDetail } from '../../actions/index'
import { Form} from 'antd';
import './Article.scss';
const FormItem = Form.Item;

@withRouter
@connect(state => ({
    articleDetail: state.article.articleDetail,
}), {
        getArticleDetail,
    })
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            articleId: this.props.match.params.id,
            detail: [],
        }
    }

    componentDidMount() {
        this.getData();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { articleDetail } = nextProps;
        let { loading, detail } = prevState;
        loading = (loading ? false : loading);
        if (articleDetail.length !== 0) {
            detail = articleDetail.data;
            return {
                detail,
                loading,
            }
        }
        return null;
    }

    getData() {
        const { articleId } = this.state;
        let params = {
            _id: articleId,
        }
        this.setState({
            loading: true
        }, this.props.getArticleDetail(params))
    }

    render() {
        let { detail} = this.state;
        let title, content;
        if (detail.length !== 0) {
            title = detail.title;
            content = detail.content;
        }
        return (
            <div className='article'>
                <Form autoComplete='off' className='form'>
                    <FormItem>
                        <h1 className='title'><span>标题：</span>{title}</h1>
                    </FormItem>
                    <br></br>
                    <FormItem>
                        <div className='detail'>{content}</div>
                    </FormItem>  
                </Form>
            </div>
        );
    }
}

export default Article;