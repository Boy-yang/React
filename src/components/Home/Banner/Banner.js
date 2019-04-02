import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';
// import './Banner.scss';
const Banner = (props)=>(
    <>
        <div style={{height:"1.32rem"}}/>
        <ReactSwipe className="carousel" swipeOptions={{continuous:true,auto:2000}}>
            <div><a href="#"><img src="http://static.winxuancdn.com/topic/subject/201811/18dc/fc/640-304.jpg?201811211334" alt=""/></a></div>
            <div><a href="#"><img src="http://static.winxuancdn.com/topic/subject/201809/dbs/640-304.jpg?201811211334" alt=""/></a></div>
            <div><a href="#"><img src="http://static.winxuancdn.com/topic/subject/201806/dp/640-304.jpg" alt=""/></a></div>
            <div><a href="#"><img src="http://static.winxuancdn.com/topic/subject/201809/xhbs/640-304.jpg?201811211334" alt=""/></a></div>
        </ReactSwipe>
    </>
);
export default Banner;