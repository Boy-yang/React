import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {
  Form,
  Input,
  Button,
  Tag,
  Pagination,
  Modal
} from "antd";
import {
  getArticleList,
  delArticle,

  goToRegister,
  goToLogin,
  getUserInfo,
  userLogout
} from "../../actions/index";
import { formatTime } from '../../utils/index';
//引入公共组件
import Header from "../common/Header/Header"
import './Home.scss';
const FormItem = Form.Item;

@connect(state => ({
  articleList: state.article.articleList,
  userInfo: state.user.userInfo,
}), {
    getArticleList,
    delArticle,
 
    goToRegister,
    goToLogin,
    getUserInfo,
    userLogout
  }
)
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      show: false,
      flag: true,//默认显示登陆
      current: 1,
      limit: 5,
      isPublish: true,
      query: {
        username: '',//用户名
        phoneNumber: '',//手机号
        password: '',//密码
      },
      visible: false,
      warning: {},
      list: [],
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.props.getUserInfo();
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const { articleList } = nextProps;
    let { loading, list } = prevState;
    loading = (loading ? false : loading);
    //文章列表
    if (Object.keys(articleList).length !== 0) {
      list = articleList.list
      return {
        list,
        loading,
      };
    }
    return null;
  }

  componentWillUnmount() {
    document.body.removeEventListener('scroll', this.handleScroll);
  }


  //获取数据
  getData(page) {
    let { current, limit, isPublish } = this.state;
    const params = {
      start: page ? page : current,
      limit,
      isPublish
    }
    this.setState({
      loading: true,
    }, () => {
      this.props.getArticleList(params);
    });
  }

  //分页
  changePage(page) {
    this.getData(page)
  }

  //退出登录弹窗，确认是否退出
  showModal() {
    this.setState({
      visible: true
    })
  }

  onOk() {
    this.setState({
      visible: false
    }, this.logout())
  }

  //退出登陆
  logout() {
    this.setState({
      loading: true,
    }, this.props.userLogout())
  }

  //去登陆
  toLogin() {
    const { username, password } = this.state.query;
    let params = {
      username,
      password
    };
    if (this.loginVerify()) {
      this.setState({
        loading: true
      }, this.props.goToLogin(params))
    }
  }

  //去注册
  toRegister() {
    const { query } = this.state;
    let params = {
      ...query
    };
    if (this.registerVerify()) {
      this.setState({
        loading: true
      }, this.props.goToRegister(params));
    }
  }
  //改变登陆注册的开关
  changeFlag() {
    const { flag } = this.state;
    this.setState({
      flag: !flag
    })
  }

  //登陆信息验证
  loginVerify() {
    const { warning, query } = this.state;
    const { username, password } = query;
    const PWD_REGEXP = /^([0-9a-zA-Z]{8,16})$/;
    //用户名和密码验证
    if (!username && !password) {
      warning.usernameWarning = '用户名不能为空';
      warning.passwordWarning = '密码不能为空';
      this.setState({
        warning
      });
      return false;
    } else if (username && !password) {
      warning.usernameWarning = '';
      warning.passwordWarning = '密码不能为空';
      this.setState({
        warning
      });
      return false;
    } else if (!username && password) {
      warning.usernameWarning = '用户名不能为空';
      if (!PWD_REGEXP.test(password)) {
        warning.passwordWarning = '密码不符合要求';
      } else {
        warning.passwordWarning = '';
      }
      this.setState({
        warning
      });
      return false;
    } else {
      warning.usernameWarning = '';
      if (!PWD_REGEXP.test(password)) {
        warning.passwordWarning = '密码不符合要求';
      } else {
        warning.passwordWarning = '';
      }
      this.setState({
        warning
      });
      return true;
    }
  }

  //注册信息验证
  registerVerify() {
    const { query, warning } = this.state;
    const { username, phoneNumber, password } = query;
    const TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    const PWD_REGEXP = /^([0-9a-zA-Z]{8,16})$/;
    if (!username && !phoneNumber && !password) {
      warning.usernameWarning = '用户名不能为空';
      warning.phoneNumberWarning = '手机号不能为空';
      warning.passwordWarning = '密码不能为空';
      this.setState({
        warning
      });
      return false;
    } else if (username && phoneNumber && password) {
      if (!TEL_REGEXP.test(phoneNumber) && !PWD_REGEXP.test(password)) {
        warning.usernameWarning = '';
        warning.phoneNumberWarning = '手机号格式有误';
        warning.passwordWarning = '密码不符合要求';
        this.setState({
          warning,
        });
        return false;
      } else if (!TEL_REGEXP.test(phoneNumber) && PWD_REGEXP.test(password)) {
        warning.usernameWarning = '';
        warning.phoneNumberWarning = '手机号格式有误';
        warning.passwordWarning = '';
        this.setState({
          warning,
        });
        return false;
      } else if (TEL_REGEXP.test(phoneNumber) && !PWD_REGEXP.test(password)) {
        warning.usernameWarning = '';
        warning.phoneNumberWarning = '';
        warning.passwordWarning = '密码不符合要求';
        this.setState({
          warning,
        });
        return false;
      } else {
        warning.usernameWarning = '';
        warning.phoneNumberWarning = '';
        warning.passwordWarning = '';
        this.setState({
          warning,
        });
        return true;
      }
    } else if (username && phoneNumber) {
      if (!TEL_REGEXP.test(phoneNumber)) {
        warning.phoneNumberWarning = '手机号格式有误';
      } else {
        warning.phoneNumberWarning = '';
      }
      warning.usernameWarning = '';
      warning.passwordWarning = '密码不能为空';
      this.setState({
        warning
      });
      return false;
    } else if (username && password) {
      if (!PWD_REGEXP.test(password)) {
        warning.passwordWarning = '密码不符合要求';
      } else {
        warning.passwordWarning = '';
      }
      warning.usernameWarning = '';
      warning.phoneNumberWarning = '手机号不能为空';
      this.setState({
        warning
      });
      return false;
    } else if (phoneNumber && password) {
      if (!TEL_REGEXP.test(phoneNumber) && !PWD_REGEXP.test(password)) {
        warning.usernameWarning = '用户名不能为空';
        warning.phoneNumberWarning = '手机号格式有误';
        warning.passwordWarning = '密码不符合要求';
        this.setState({
          warning,
        });
        return false;
      } else if (!TEL_REGEXP.test(phoneNumber) && PWD_REGEXP.test(password)) {
        warning.usernameWarning = '用户名不能为空';
        warning.phoneNumberWarning = '手机号格式有误';
        warning.passwordWarning = '';
        this.setState({
          warning,
        });
        return false;
      } else if (TEL_REGEXP.test(phoneNumber) && !PWD_REGEXP.test(password)) {
        warning.usernameWarning = '用户名不能为空';
        warning.phoneNumberWarning = '';
        warning.passwordWarning = '密码不符合要求';
        this.setState({
          warning,
        });
        return false;
      } else {
        warning.usernameWarning = '用户名不能为空';
        warning.phoneNumberWarning = '';
        warning.passwordWarning = '';
        this.setState({
          warning,
        });
        return true;
      }
    } else if (username) {
      warning.usernameWarning = '';
      warning.phoneNumberWarning = '手机号不能为空';
      warning.passwordWarning = '密码不能为空';
      this.setState({
        warning
      });
      return false;
    } else if (phoneNumber) {
      if (!TEL_REGEXP.test(phoneNumber)) {
        warning.phoneNumberWarning = '手机号格式有误';
      } else {
        warning.phoneNumberWarning = '';
      }
      warning.usernameWarning = '用户名不能为空';
      warning.passwordWarning = '密码不能为空';
      this.setState({
        warning
      });
      return false;
    } else if (password) {
      if (!PWD_REGEXP.test(password)) {
        warning.passwordWarning = '密码不符合要求';
      } else {
        warning.passwordWarning = '';
      }
      warning.usernameWarning = '用户名不能为空';
      warning.phoneNumberWarning = '手机号不能为空';
      this.setState({
        warning
      });
      return false;
    }
  }

  //回到顶部
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
    const { username, phoneNumber, password } = this.state.query;
    if (keyCode === 13 && username && phoneNumber && password) {
      this.toRegister();//去注册
    }
  }

  //删除文章
  deleteArticle(id) {
    const param = {
      _id: id
    }
    this.setState({
      loading: true,
    }, this.props.delArticle(param))
  }

  render() {
    let { warning, show, flag, current, limit, query, list, visible } = this.state;
    const { username, phoneNumber, password } = query;
    const { articleList, userInfo } = this.props;
    let isVisible = Object.keys(userInfo).length === 0 ? 'hidden' : 'visible';
    const style = {
      visibility: isVisible
    }
    return (
      <>
        <Header />
        <div className="content">
          <div className='articles'>
            {
              list.map(item => (
                <div className='detail' key={item._id}>
                  <div className='time'>
                    {formatTime(item.time)}
                  </div>
                  <div className='main'>
                    <h2>文章标题：{item.title}</h2>
                    <p>{item.content}</p>
                    <ul>
                      <li>
                        <i className="fa fa-book" aria-hidden="true"></i>
                        <Link to={`/article/${item._id}`}>阅读全文</Link>
                      </li>
                      {/* <li>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                        <Link to={`/update/${item._id}`}>修改</Link>
                      </li> */}
                      <li>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                        <a href='javascript:;' onClick={() => this.deleteArticle(item._id)}>删除</a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))
            }
            <Pagination
              className='page'
              simple
              defaultCurrent={current}
              defaultPageSize={limit}
              total={articleList.total}
              onChange={(current) => this.changePage(current)}
            />
          </div>
          <div className='side'>
            {
              userInfo.data
                ?
                <div className='userInfo'>
                  <h4>欢迎光临我的博客！</h4>
                  <p>用户名：{userInfo.data.username}</p>
                  <p>座右铭：生命不止，奋斗不惜！</p>
                  <p><a href='javascript:;' onClick={() => this.showModal()}>退出登陆</a></p>
                  <Modal
                    title="系统提示"
                    visible={visible}
                    okText='确定'
                    maskClosable={false}
                    cancelText='取消'
                    onOk={() => this.onOk()}
                    onCancel={() => this.setState({ visible: false })}
                  >
                    <p>您确定要退出当前系统吗？</p>
                  </Modal>
                </div>
                :
                <div style={style}>
                  {
                    flag ?
                      <div className='login'>
                        < h2 className='login-title'>欢迎登陆</h2>
                        <Form className='login-form' autoComplete='off'>
                          <FormItem>
                            <Input
                              className='login-info'
                              type="username"
                              placeholder='用户名'
                              value={username}
                              maxLength={11}
                              onChange={(e) => this.handleValueChange(e, 'username')}
                              onKeyDown={(e) => this.handleKeyDown(e.keyCode)}
                            />
                            <p className='warning'>{warning.usernameWarning}</p>
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
                            <p className='warning'>{warning.passwordWarning}</p>
                          </FormItem>
                          <FormItem>
                            <Button
                              className="login-button"
                              type="primary"
                              onClick={() => this.toLogin()}>立即登陆</Button>
                            <p>
                              <span className='no-count'>没有账号?</span>
                              <a
                                href='javascript:;'
                                className='go-register'
                                onClick={() => this.changeFlag()}> 去注册...</a>
                              {/* <Link
                                to='/forget'
                                className="forgot-password"
                                style={{ float: 'right' }}>
                                忘记密码
                          </Link> */}
                            </p>
                          </FormItem>
                          {/* <FormItem>
                            <div className="other-login">
                              <p>第三方账号登录：</p>
                              <p>
                                <img title="微博" alt="微博" src="https://b-gold-cdn.xitu.io/v3/static/img/weibo.fa758eb.svg" />
                                <img title="GitHub" alt="GitHub" src="https://b-gold-cdn.xitu.io/v3/static/img/github.547dd8a.svg" />
                                <img title="微信" alt="微信" src="https://b-gold-cdn.xitu.io/v3/static/img/wechat.e0ff124.svg" />
                              </p>
                            </div>
                          </FormItem> */}
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
                              type="phoneNumber"
                              placeholder='手机号'
                              value={phoneNumber}
                              maxLength={11}
                              onChange={(e) => this.handleValueChange(e, 'phoneNumber')}
                              onKeyDown={(e) => this.handleKeyDown(e.keyCode)}
                            />
                            <p className='warning'>{warning.phoneNumberWarning}</p>
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
                            <p className='warning'>{warning.passwordWarning}</p>
                          </FormItem>
                          <FormItem>
                            <Button
                              className="register-button"
                              type="primary"
                              onClick={() => this.toRegister()}>立即注册</Button>
                            <p>
                              <span className='have-count'>已有账号?</span>
                              <a
                                href='javascript:;'
                                className='go-login'
                                onClick={() => this.changeFlag()}> 去登陆...</a>
                            </p>
                          </FormItem>
                          {/* <FormItem>
                            <div className="other-login">
                              <p>第三方账号登录：</p>
                              <p>
                                <img title="微博" alt="微博" src="https://b-gold-cdn.xitu.io/v3/static/img/weibo.fa758eb.svg" />
                                <img title="GitHub" alt="GitHub" src="https://b-gold-cdn.xitu.io/v3/static/img/github.547dd8a.svg" />
                                <img title="微信" alt="微信" src="https://b-gold-cdn.xitu.io/v3/static/img/wechat.e0ff124.svg" />
                              </p>
                            </div>
                          </FormItem> */}
                        </Form>
                      </div>
                  }
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