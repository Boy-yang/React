import { GET_USER_INFO,GET_LOGIN_RESINFO,GET_REGISTER_RESINFO } from '../constants';
import { XHR } from '../utils';
export function getUserInfo( params ) {//获取用户信息
    return dispatch => {
        XHR( {
            type:'post',
            url:'/api/user/userInfo',
            data: params,
            success: data => {
                dispatch( receiveUserInfo( data ) )
            }
        } )
    }
}
function receiveUserInfo( json ) {
    return {
        type: GET_USER_INFO,
        json,
        receiveAt: Date.now(),
    }
}

export function goToRegister( params ) {//注册请求
    console.log(params)
    return dispatch => {
        XHR( {
            type: 'post',
            url: '/api/user/register',
            data: params,
            success: res => {
                console.log(res)
                dispatch( receiveRegister( res ) )
            }
        } )
    }
}
function receiveRegister( json ) {
    console.log(json)
    return {
        type: GET_REGISTER_RESINFO,
        json,
        receiveAt: Date.now(),
    }
}

export function goToLogin( params ) {//登陆请求
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
function receiveLogin( json ) {
    return {
        type: GET_LOGIN_RESINFO,
        json,
        receiveAt: Date.now(),
    }
}





