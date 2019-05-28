import React, { Component } from 'react'

import { connect } from "react-redux";
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { getUserInfo, addLeaveMsg,getLeaveMsg } from "../../actions/index";
import { formatTime } from '../../utils/index';
import './LeaveMsg.scss'
import Header from '../common/Header/Header'
const TextArea = Input.TextArea;



const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header='留言板'
        itemLayout="horizontal"
        renderItem={item => <Comment {...item} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
               发表留言
            </Button>
        </Form.Item>
    </div>
);

@connect(state => ({
    userInfo: state.user.userInfo,
    message: state.leaveMsg.message,
}), {
        getUserInfo,
        addLeaveMsg,
        getLeaveMsg
    }
)

class LeaveMsg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: '',
        }
    }

    componentDidMount() {
        this.getData();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { userInfo, message } = nextProps;
        let { submitting,comments } = prevState;
        submitting = (submitting ? false : false);

        if (userInfo) {
            if(message.list){
                message.list.map(item=>{
                    item.datetime=formatTime(item.datetime)
                });
                comments=message.list; 
            }
            return {
                submitting,
                comments
            }
        }
        return null;
    }


    getData(query) {
        let params={};
        if (query) {
            let { author, avatar,content } = query;
            params = {
                author,
                avatar,
                content,
            };
        }
        this.setState({
            submitting: true,
        }, () => {
            this.props.getUserInfo();
            this.props.getLeaveMsg();
            if(Object.keys(params).length !== 0){
                this.props.addLeaveMsg(params);
            }
        })
    }

    handleSubmit = () => {
        const { value } = this.state;
        const { data } = this.props.userInfo;
        let query = {
            author: data.username,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: value,
        }
        this.setState({
            submitting: true,
        }, this.getData(query)); 
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            value: value,
        });
    };

    render() {
        const { comments, submitting, value } = this.state;
        return (
            <>
                <Header></Header>
                <div className='leaveMsg'>
                    {comments.length>0 && <CommentList comments={comments} />}
                    <Comment
                        avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt=""
                            />
                        }
                        content={
                            <Editor
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                submitting={submitting}
                                value={value}
                            />
                        }
                    />
                </div>
            </>
        )
    }
}
export default LeaveMsg;




