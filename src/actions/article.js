import { 
    ADD_ARTICLE,
    GET_ARTICLE_LIST,
    GET_ARTICLE_DETAIL,
     } from '../constants';
import { XHR } from '../utils';

//添加文章
function receiveAddArticle( json ) {
    return {
        type: ADD_ARTICLE,
        json,
        receiveAt: Date.now(),
    }
}
export function addArticle(params) {
    return dispatch => {
        XHR( {
            url:'/api/user/addArticle',
            data:params,
            success: res => {
                dispatch( receiveAddArticle( res ) )
            }
        } )
    }
}

//获取列表数据
function receiveArticleList( json ) {
    return {
        type: GET_ARTICLE_LIST,
        json,
        receiveAt: Date.now(),
    }
}
export function getArticleList(params) {
    return dispatch => {
        XHR( {
            url:'/api/user/articleList',
            data:params,
            success: res => {
                dispatch( receiveArticleList( res ) )
            }
        } )
    }
}

//获取文章信息
function receiveArticelDetail( json ) {
    return {
        type: GET_ARTICLE_DETAIL,
        json,
        receiveAt: Date.now(),
    }
}
export function getArticleDetail(id) {
    return dispatch => {
        XHR( {
            url:'/api/user/articleDetail',
            data:id,
            success: res => {
                dispatch( receiveArticelDetail( res ) )
            }
        } )
    }
}














