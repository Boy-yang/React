import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {
  Form,
  Input,
  Button,
  Tag,
} from "antd";
import { getArticleInfo } from "../../actions/index";
//引入公共组件
import Header from "../common/Header/Header"
import './Home.scss';
const FormItem = Form.Item;

@connect(state => ({
  articleInfo: state.config.articleInfo
}), {
    getArticleInfo
  }
)
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      show: false,
      flag: true,//默认显示登陆
      query: {
        username: '',//用户名
        phoneNo: '',//手机号
        password: '',//密码
      },
      warning: {},
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.getData();
    document.body.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let currentTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentTop > 600) {
      this.setState({
        show: true
      })
    } else {
      this.setState({
        show: false
      })
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('scroll', this.handleScroll);
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
      loading: true,
    }, this.props.getArticleInfo())
  }

  login() {

  }

  register() {
    const { query } = this.state;
    let params = {
      ...query
    };
    if (this.handleVerify()) {
      this.setState({
        loading: true
      }, this.goRegister(params))
    }
  }

  changeFlag(){
    const {flag}=this.state;
    this.setState({
      flag:!flag
    })
  }


  //注册信息验证
  handleVerify() {
    const { query } = this.state;
    const { username, phoneNo, password } = query;
    const TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    const PWD_REGEXP = /^([0-9a-zA-Z]{8,16})$/;
    if (username && phoneNo && password) {
      if (TEL_REGEXP.test(phoneNo) && PWD_REGEXP.test(password)) {
        return true;
      } else if (!TEL_REGEXP.test(phoneNo) && !PWD_REGEXP.test(password)) {
        warning.usernameWarning = '';
        warning.phoneNoWarning = '手机号格式有误';
        warning.passwordWarning = '密码不符合要求';
        this.setState({
          warning
        });
        return false;
      } else if (!TEL_REGEXP.test(phoneNo)) {
        warning.usernameWarning = '';
        warning.phoneNoWarning = '手机号格式有误';
        warning.passwordWarning = '密码不符合要求';
        this.setState({
          warning
        });
        return false;
      } else if (!PWD_REGEXP.test(password)) {
        warning.usernameWarning = '';
        warning.phoneNoWarning = '';
        warning.passwordWarning = '密码不符合要求';
        this.setState({
          warning
        });
        return false;
      }
    } else if (!username && !phoneNo && !password) {
      warning.usernameWarning = '用户名不能为空';
      warning.phoneNoWarning = '手机号不能为空';
      warning.passwordWarning = '密码不能为空';
      this.setState({
        warning
      });
      return false;
    } else if (!username && !phoneNo) {
      warning.usernameWarning = '用户名不能为空';
      warning.phoneNoWarning = '手机号不能为空';
      warning.passwordWarning = '';
      this.setState({
        warning
      });
      return false;
    } else if (!username && !password) {
      warning.usernameWarning = '用户名不能为空';
      warning.phoneNoWarning = '手机号不能为空';
      warning.passwordWarning = '';
      this.setState({
        warning
      });
      return false;
    } else if (!phoneNo && !password) {
      warning.usernameWarning = '';
      warning.phoneNoWarning = '手机号不能为空';
      warning.passwordWarning = '密码不能为空';
      this.setState({
        warning
      });
      return false;
    } else if (!username) {
      warning.usernameWarning = '用户名不能为空';
      warning.phoneNoWarning = '';
      warning.passwordWarning = '';
      this.setState({
        warning
      });
      return false;
    } else if (!phoneNo) {
      warning.usernameWarning = '';
      warning.phoneNoWarning = '手机号不能为空';
      warning.passwordWarning = '';
      this.setState({
        warning
      });
      return false;
    } else if (!password) {
      warning.usernameWarning = '';
      warning.phoneNoWarning = '';
      warning.passwordWarning = '密码不能为空';
      this.setState({
        warning
      });
      return false;
    }
  }

  scrollTop() {
    let currentTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentTop > 0) {
      //window.scrollTo()  没有效果 （坑）
      document.body.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  handleValueChange(e, type) {
    const { query } = this.state;
    query[type] = e.target.value;
    this.setState({ ...query });
  }

  handleKeyDown(keyCode) {
    const { phoneNo, password } = this.state.query;
    if (keyCode === 13 && phoneNo && password) {
      this.goRegister();//去注册
    }
  }

  render() {
    const { warning, show,flag ,query } = this.state;
    const { username, phoneNo, password } = query;
    const { articleInfo } = this.props;
    return (
      <>
        <Header />
        <div className="content">
          <div className='articles'>
            {
              articleInfo.map(item => (
                <div className='detail' key={item.id}>
                  <div className='time'>
                    <p className='hour'><b>{item.time}</b><span>{item.tChoose}</span></p>
                    <p className='date'><span>{item.date}</span></p>
                  </div>
                  <div className='main'>
                    <Link to={`/article/${item.id}`}>{item.title}</Link>
                    <ul>
                      <li>
                        <i className="fa fa-book" aria-hidden="true"></i>
                        <a href='#'>文章</a>
                      </li>
                      <li>
                        <i className="fa fa-share-square-o" aria-hidden="true"></i>
                        <a href='#'>分享</a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='side'>
            <div className='userInfo'>
              <h4>欢迎光临我的博客！</h4>
              <p>用户名：Boy-yang</p>
              <p>座右铭：生命不止，奋斗不惜！</p>
              <p>关注：6</p>
              <p>关注者：1</p>
              <p className='watch'>+  关注</p>
            </div>
            {
              flag ?
                <div className='login'>
                  <h2 className='login-title'>欢迎登陆</h2>
                  <Form className='login-form' autoComplete='off'>
                    <FormItem>
                      <Input
                        className='login-info'
                        type="phoneNo"
                        placeholder='手机号'
                        value={phoneNo}
                        maxLength={11}
                        onChange={(e) => this.handleValueChange(e, 'phoneNo')}
                        onKeyDown={(e) => this.handleKeyDown(e.keyCode)}
                      />
                      <p className='warning'>{warning.phoneNoWarning}</p>
                    </FormItem>
                    <FormItem>
                      <Input
                        className='login-info'
                        type="password"
                        placeholder='请输入8-16位密码'
                        value={password}
                        onChange={(e) => this.handleValueChange(e, "password")}
                        onKeyDown={(e) => this.handleKeyDown(e.keyCode)}
                      />
                      <p className='warning'>{warning.passwardWarning}</p>
                    </FormItem>
                    <FormItem>
                      <Button
                        className="login-button"
                        type="primary"
                        onClick={() => this.login()}>立即登陆</Button>
                      <p>
                        <span className='no-count'>没有账号?</span>
                        <a
                          href='javascript:;'
                          className='go-register'
                          onClick={() => this.changeFlag()}> 去注册...</a>
                        <Link
                          to='/forget'
                          className="forgot-password"
                          style={{ float: 'right' }}>
                          忘记密码
                    </Link>
                      </p>
                    </FormItem>
                    <FormItem>
                      <div className="other-login">
                        <p>第三方账号登录：</p>
                        <p>
                          <img title="微博" alt="微博" src="https://b-gold-cdn.xitu.io/v3/static/img/weibo.fa758eb.svg" />
                          <img title="GitHub" alt="GitHub" src="https://b-gold-cdn.xitu.io/v3/static/img/github.547dd8a.svg" />
                          <img title="微信" alt="微信" src="https://b-gold-cdn.xitu.io/v3/static/img/wechat.e0ff124.svg" />
                        </p>
                      </div>
                    </FormItem>
                  </Form>
                </div>
                :
                <div className='register'>
                  <h2 className='register-title'>欢迎注册</h2>
                  <Form className='register-form' autoComplete='off'>
                    <FormItem>
                      <Input
                        className='register-info'
                        type="username"
                        placeholder='用户名'
                        value={username}
                        onChange={(e) => this.handleValueChange(e, 'username')}
                        onKeyDown={(e) => this.handleKeyDown(e.keyCode)}
                      />
                      <p className='warning'>{warning.usernameWarning}</p>
                    </FormItem>
                    <FormItem>
                      <Input
                        className='register-info'
                        type="phoneNo"
                        placeholder='手机号'
                        value={phoneNo}
                        maxLength={11}
                        onChange={(e) => this.handleValueChange(e, 'phoneNo')}
                        onKeyDown={(e) => this.handleKeyDown(e.keyCode)}
                      />
                      <p className='warning'>{warning.phoneNoWarning}</p>
                    </FormItem>
                    <FormItem>
                      <Input
                        className='register-info'
                        type="password"
                        placeholder='请输入8-16位密码'
                        value={password}
                        onChange={(e) => this.handleValueChange(e, "password")}
                        onKeyDown={(e) => this.handleKeyDown(e.keyCode)}
                      />
                      <p className='warning'>{warning.passwardWarning}</p>
                    </FormItem>
                    <FormItem>
                      <Button
                        className="register-button"
                        type="primary"
                        onClick={() => this.register()}>立即注册</Button>
                      <p>
                        <span className='have-count'>已有账号?</span>
                        <a
                          href='javascript:;'
                          className='go-login'
                          onClick={() => this.changeFlag()}> 去登陆...</a>
                      </p>
                    </FormItem>
                    <FormItem>
                      <div className="other-login">
                        <p>第三方账号登录：</p>
                        <p>
                          <img title="微博" alt="微博" src="https://b-gold-cdn.xitu.io/v3/static/img/weibo.fa758eb.svg" />
                          <img title="GitHub" alt="GitHub" src="https://b-gold-cdn.xitu.io/v3/static/img/github.547dd8a.svg" />
                          <img title="微信" alt="微信" src="https://b-gold-cdn.xitu.io/v3/static/img/wechat.e0ff124.svg" />
                        </p>
                      </div>
                    </FormItem>
                  </Form>
                </div>
            }
            <div className='hot-tags'>
              <div className='tag-header'>
                <h4>热门标签</h4>
                <a href='#' className='watch-all'>查看全部</a>
              </div>
              <div className='tag-content'>
                <a href='#' className='tags'><Tag color="magenta">前端</Tag></a>
                <a href='#' className='tags'><Tag color="green">JavaScript</Tag></a>
                <a href='#' className='tags'><Tag color="blue">Node</Tag></a>
                <a href='#' className='tags'><Tag color="purple">后端</Tag></a>
                <a href='#' className='tags'><Tag color="orange">全栈</Tag></a>
                <a href='#' className='tags'><Tag color="gold">Python</Tag></a>
                <a href='#' className='tags'><Tag color="cyan">系统架构</Tag></a>
                <a href='#' className='tags'><Tag color="volcano">人工智能</Tag></a>
              </div>
            </div>
          </div>
        </div >
        {
          show &&
          <div className='backTop' onClick={() => this.scrollTop()}>
            <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
          </div>
        }
      </>
    )
  }
}
export default Home;