import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { connect } from "react-redux";
import { getUserInfo, updateArticle, getArticleDetail } from "../../actions/index";
import './Update.scss'
const FormItem = Form.Item;
const { TextArea } = Input;
@connect(state => ({
    userInfo: state.user.userInfo,
    articleDetail: state.article.articleDetail,
}), {
        getUserInfo,
        updateArticle,
        getArticleDetail
    }
)

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            articleId: this.props.match.params.id,
            detail: [],
            query:{
                title: '',//文章标题
                content: '',//文章内容
                isPublish: true,//是否发布
            }
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
        }, () => {
            this.props.getUserInfo();
            this.props.getArticleDetail(params);
        });
    }

    handleValueChange(e, type) {
        const { query } = this.state;
        query[type] = e.target.value;
        this.setState({ ...query });
    }

    //修改文章
    handleChangeArticle() {
        const { query } = this.state;
        console.log(query)
        // let params = {
        //     ...query
        // }
        // this.setState({
        //     loading: true
        // }, this.props.updateArticle(params))
    }

    render() {
        let { query } = this.state;
        return (
            <div className='update'>
                <Form autoComplete='off'>
                    <FormItem>
                        <h1>
                            <Input
                                type='title'
                                placeholder='标题'
                                value={query.title}
                                onChange={(e) => this.handleValueChange(e, 'title')}
                            />
                        </h1>
                    </FormItem>
                    <FormItem>
                        <TextArea
                            placeholder='正文'
                            autosize={{ minRows: 20, maxRows: 200 }}
                            value={query.content}
                            onChange={(e) => this.handleValueChange(e, 'content')}
                        />
                    </FormItem>
                    <FormItem>
                        <Button
                            className='updateArticle'
                            type='primary'
                            onClick={() => this.handleChangeArticle()}>修改完成</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Update;