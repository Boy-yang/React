import React, { Component } from 'react'
import './User.scss'
import Header from '../common/Header/Header'
class User extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <Header />
                <div className='user'>
                    <div className='introduce'>
                        <img src={require('./images/touxiang.jpg')} />
                        <div>
                            <p>昵称：<span>Boy-yang</span></p>
                            <p>性别：<span>男</span></p>
                            <p>职业：<span>前端攻城狮</span></p>
                            <p>个性签名：<span>生命不止，奋斗不息！</span></p>
                        </div>
                        <a className='watch'>+ <span>关注</span></a>
                    </div>
                    <div className='education'>
                        <h3>
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                            <span>教育经历</span>
                        </h3>
                        <div>
                            <p>
                                <span>学校：蚌埠学院</span>
                                <span>时间：2015/9/12～2019/6/30</span>
                            </p>
                            <p>
                                <span>学历：本科</span>
                                <span>专业：网络工程</span>
                            </p>
                        </div>
                    </div>
                    <div className='honor'>
                        <h3>
                            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                            <span>荣获证书</span>
                        </h3>
                        <div>
                            <p><span>1. 2016/5</span><span>荣获优秀团员</span></p>
                            <p><span>2. 2016/8</span><span>CET4</span></p>
                            <p><span>3. 2016/10</span><span>安徽省高校物联网创新应用大赛创意赛三等奖</span></p>
                            <p><span>4. 2016/11</span><span>荣获国家励志奖学金</span></p>
                            <p><span>5. 2016/12</span><span>一等优秀奖学金/优秀学生干部/三好学生/学风建设标兵</span></p>
                            <p><span>6. 2017/1</span><span>普通话等级证书（二级甲等）</span></p>
                            <p><span>7. 2017/5</span><span>校园思想政治主题征文二等奖</span></p>
                            <p><span>8. 2017/11</span><span>国家励志奖学金</span></p>
                            <p><span>9. 2017/12</span><span>一等优秀奖学金/优秀学生干部/三好学生/学风建设标兵</span></p>
                            <p><span>10. 2018/12</span><span>二等优秀奖学金</span></p>
                            <p><span>11.2019/3</span><span>省级双优生</span></p>
                        </div>
                    </div>
                    <div className='work'>
                        <h3>
                            <i className="fa fa-life-ring" aria-hidden="true"></i>
                            <span>工作经验</span>
                        </h3>
                    </div>
                    <div className='hobbies'>
                        <h3>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                            <span>兴趣爱好</span>
                        </h3>
                    </div>
                </div>
            </>
        );
    }
}

export default User;