import React, { Component } from 'react'
import { Form, Input, Button, notification } from 'antd';
import { connect } from "react-redux";
import { getUserInfo,addArticle } from "../../actions/index";
import './Write.scss'
const FormItem = Form.Item;
const { TextArea } = Input;
@connect(state => ({
    userInfo: state.user.userInfo,
    addRes:state.article.addRes
}), {
        getUserInfo,
        addArticle
    }
)

class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            query: {
                title: '',//文章标题
                content: '',//文章内容
                isPublish:true,//是否发布
            }
        }
    }

    componentDidMount() {
        this.getData();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { userInfo,addRes } = nextProps;
       
        let { loading } = prevState;
        if (userInfo && loading === true) {
            return {
                loading: false
            }
        }
        //文章添加成功通知
        if(addRes.length !== 0){
            setTimeout(()=>{
                window.location.href='http://localhost:8000/#/';
            },3000)
            notification.success({
                message:addRes.msg,
                duration:2,
            })
        }
        return null;
    }

    getData() {
        this.setState({
            loading: true
        }, this.props.getUserInfo());
    }

    handleValueChange(e, type) {
        console.log(e.target.value,type)
        const { query } = this.state;
        query[type] = e.target.value;
        this.setState({ ...query});
    }

    //添加文章
    publish() {
        const { query } = this.state;
        let params = {
            ...query
        }
        this.setState({
            loading: true
        }, this.props.addArticle(params))
    }

    render() {
        const { query } = this.state;
        const { title, content } = query;
        return (
            <div className='write'>
                <Form autoComplete='off'>
                    <FormItem>
                        <h1>
                            <Input
                                type='title'
                                placeholder='标题'
                                value={title}
                                onChange={(e) => this.handleValueChange(e, 'title')}
                            />
                        </h1>
                    </FormItem>
                    <FormItem>
                        <TextArea
                            placeholder='正文'
                            autosize={{ minRows: 20, maxRows: 200 }}
                            value={content}
                            onChange={(e) => this.handleValueChange(e, 'content')}
                        />
                    </FormItem>
                    <FormItem>
                        <Button
                            className='publish'
                            type='primary'
                            onClick={() => this.publish()}>发表文章</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Write;