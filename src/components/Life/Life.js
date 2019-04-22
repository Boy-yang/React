import React, { Component } from 'react';
import Header from '../common/Header/Header';
import {
    Carousel, Skeleton, List, Avatar, Icon,
} from 'antd';

import './Life.scss';
const listData = [];
for (let i = 0; i < 3; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class Life extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    render() {
        const { loading } = this.state;
        return (
            <>
                <Header />
                <div className='life'>
                    <Carousel autoplay>
                        <div><img src={require('./images/bg1.jpg')} alt='' /></div>
                        <div><img src={require('./images/bg2.jpg')} alt='' /></div>
                        <div><img src={require('./images/bg3.jpg')} alt='' /></div>
                        <div><img src={require('./images/bg4.jpeg')} alt='' /></div>
                    </Carousel>
                </div>
                <div className='ideas'>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={!loading && [<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                                extra={!loading && <img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                            >
                                <Skeleton loading={!loading} active avatar>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}
                                    />
                                    {item.content}
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>
            </>
        );
    }
}
export default Life;

