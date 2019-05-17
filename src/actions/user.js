import { 
    GET_LOGIN_RESINFO,
    GET_REGISTER_RESINFO,
    GET_USER_INFO,
    USER_LOGOUT } from '../constants';
import { XHR } from '../utils';

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

// 退出登陆请求
function receiveUserLogout( json ) {
    return {
        type: USER_LOGOUT,
        json,
        receiveAt: Date.now(),
    }
}
export function userLogout() {
    return dispatch => {
        XHR( {
            url: '/api/user/logout',
            success: res => {
                dispatch( receiveUserLogout( res ) )
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






