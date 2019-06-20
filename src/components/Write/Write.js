import React, { Component } from 'react'
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { connect } from "react-redux";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import { getUserInfo, addArticle } from "../../actions/index";
import './Write.scss'
const FormItem = Form.Item;
const { TextArea } = Input;
const content = {
    "entityMap": {},
    "blocks": [{
        "key": "637gr",
        "text": "",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
    }]
};
@connect(state => ({
    userInfo: state.user.userInfo,
}), {
        getUserInfo,
        addArticle
    }
)
class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            contentState: content,
            loading: true,
            query: {
                title: '',//文章标题
                abstract: '',//文章摘要
                isPublish: true,//是否发布
            }
        }
    }

    componentDidMount() {
        this.getData();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { userInfo } = nextProps;
        let { loading } = prevState;
        loading = (loading ? false : loading);
        if (Object.keys(userInfo).length !== 0) {
            return {
                loading: false
            }
        }
        return null;
    }

    getData() {
        this.setState({
            loading: true
        }, this.props.getUserInfo());
    }

    handleValueChange = (e, type) => {
        const { query } = this.state;
        query[type] = e.target.value;
        this.setState({ ...query });
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onContentStateChange = (contentState) => {
        this.setState({
            contentState,
        });
    };

    uploadImageCallBack = () => {

    }

    //添加文章
    publish() {
        const { editorState, query } = this.state;
        let params = {
            ...query,
            content: editorState && draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
        this.setState({
            loading: true
        }, this.props.addArticle(params))
    }

    render() {
        const { editorState, contentState, query } = this.state;
        const { title, abstract } = query;
        return (
            <div className='write'>
                <Form autoComplete='off'>
                    <FormItem label='文章标题'>
                        <Input
                            placeholder="请输入标题"
                            type='title'
                            value={title}
                            onChange={e => this.handleValueChange(e, 'title')}
                        />
                    </FormItem>
                    <FormItem label='摘要'>
                        <TextArea
                            placeholder="限制200个字"
                            autosize={{ minRows: 5, maxRows: 5 }}
                            value={abstract}
                            onChange={e => this.handleValueChange(e, 'abstract')}
                        />
                    </FormItem>
                    <FormItem label='内容编辑器'>
                        <Card bordered style={{ minHeight: 400 }}>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={this.onEditorStateChange}
                                onContentStateChange={this.onContentStateChange}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                localization={{ locale: 'zh' }}
                                toolbar={{
                                    image: {
                                        uploadCallback: this.uploadImageCallBack,
                                        alt: { present: true, mandatory: true }
                                    },
                                }}
                            />
                        </Card>
                    </FormItem>
                    <FormItem>
                        <Row gutter={10}>
                            <Col span={8}>
                                <Card title='同步转换HTML' bordered style={{ minHeight: 200 }}>
                                    {editorState && draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title='同步转换MarkDown' bordered style={{ minHeight: 200 }}>
                                    {editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title='同步转换JSON' bordered style={{ minHeight: 200 }}>
                                    {JSON.stringify(contentState, null, 4)}
                                </Card>
                            </Col>
                        </Row>
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