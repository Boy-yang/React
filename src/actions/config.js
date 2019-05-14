import { 
    GET_KNOWLEDGE_INFO,
    GET_ARTICLE_INFO,
    GET_LOGIN_RESINFO,
    GET_REGISTER_RESINFO,
    GET_USER_INFO } from '../constants';
import { XHR } from '../utils';

//获取列表数据
function receiveKnowledgeInfo( json ) {
    return {
        type: GET_KNOWLEDGE_INFO,
        json,
        receiveAt: Date.now(),
    }
}
export function getKnowledgeInfo() {
    return dispatch => {
        XHR( {
            url:'/api/user/knowledge',
            success: res => {
                dispatch( receiveKnowledgeInfo( res ) )
            }
        } )
    }
}

//获取文章信息
function receiveArticelInfo( json ) {
    return {
        type: GET_ARTICLE_INFO,
        json,
        receiveAt: Date.now(),
    }
}
export function getArticleInfo() {
    return dispatch => {
        XHR( {
            url:'/api/user/article',
            success: res => {
                dispatch( receiveArticelInfo( res ) )
            }
        } )
    }
}

//注册请求
function receiveRegister( json ) {
    return {
        type: GET_REGISTER_RESINFO,
        json,
        receiveAt: Date.now(),
    }
}
export function goToRegister( params ) {
    return dispatch => {
        XHR( {
            type: 'post',
            url: '/api/user/register',
            data: params,
            success: res => {
                dispatch( receiveRegister( res ) )
            }
        } )
    }
}

//登陆请求
function receiveLogin( json ) {
    return {
        type: GET_LOGIN_RESINFO,
        json,
        receiveAt: Date.now(),
    }
}
export function goToLogin( params ) {
    return dispatch => {
        XHR( {
            type: 'post',
            url: '/api/user/login',
            data: params,
            success: data => {
                dispatch( receiveLogin( data ) )
            }
        } )
    }
}

//获取用户信息
function receiveUserInfo( json ) {
    return {
        type: GET_USER_INFO,
        json,
        receiveAt: Date.now(),
    }
}
export function getUserInfo( params ) {
    return dispatch => {
        XHR( {
            type: 'post',
            url: '/api/user/getUserInfo',
            data: params,
            success: data => {
                dispatch( receiveUserInfo( data ) )
            }
        } )
    }
}






