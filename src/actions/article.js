import {
    ADD_ARTICLE,
    DELETE_ARTICLE,
    SEARCH_ARTICLE,
    UPDATE_ARTICLE,
    GET_ARTICLE_LIST,
    GET_ARTICLE_DETAIL,
} from '../constants';
import { XHR, notice } from '../utils';
import {notification} from 'antd';


//添加文章
function receiveAddArticle(json) {
    return {
        type: ADD_ARTICLE,
        json,
        receiveAt: Date.now(),
    }
}
export function addArticle(params) {
    return dispatch => {
        XHR({
            url: '/api/user/addArticle',
            data: params,
            success: res => {
                dispatch(receiveAddArticle(res));
                setTimeout(() => {
                    
                    window.location.href = 'http://localhost:8000/#/';
                    window.location.reload();
                    
                }, 3000)
                notification.success({
                    message: res.msg,
                    duration: 2,
                })
            }
        })
    }
}

//获取文章列表
function receiveArticleList(json) {
    return {
        type: GET_ARTICLE_LIST,
        json,
        receiveAt: Date.now(),
    }
}
export function getArticleList(params) {
    return dispatch => {
        XHR({
            url: '/api/user/articleList',
            data: params,
            success: res => {
                dispatch(receiveArticleList(res))
            }
        })
    }
}

//获取文章详情
function receiveArticelDetail(json) {
    return {
        type: GET_ARTICLE_DETAIL,
        json,
        receiveAt: Date.now(),
    }
}
export function getArticleDetail(id) {
    return dispatch => {
        XHR({
            url: '/api/user/articleDetail',
            data: id,
            success: res => {
                dispatch(receiveArticelDetail(res))
            }
        })
    }
}

//修改文章
function receiveUpdateArticle(json) {
    return {
        type: UPDATE_ARTICLE,
        json,
        receiveAt: Date.now(),
    }
}
export function updateArticle(id) {
    return dispatch => {
        XHR({
            url: '/api/user/updateArticle',
            data: id,
            success: res => {
                dispatch(receiveUpdateArticle(res));
                notice(res);
            }
        })
    }
}

//删除文章
function receiveDelArticle(json) {
    return {
        type: DELETE_ARTICLE,
        json,
        receiveAt: Date.now(),
    }
}
export function delArticle(id) {
    return dispatch => {
        XHR({
            url: '/api/user/delArticle',
            data: id,
            success: res => {
                dispatch(receiveDelArticle(res));
                notice(res);
            }
        })
    }
}

//搜索文章
function receiveSearchArticle(json) {
    return {
        type: SEARCH_ARTICLE,
        json,
        receiveAt: Date.now(),
    }
}
export function searchArticle(param) {
    return dispatch => {
        XHR({
            url: '/api/user/searchArticle',
            data: param,
            success: res => {
                dispatch(receiveSearchArticle(res));
                notice(res);
            }
        })
    }
}

searchArticle














