import {
    USER_LOGIN,
    USER_REGISTER,
    GET_USER_INFO,
    USER_LOGOUT
} from '../constants';
import { XHR, notice } from '../utils';

//注册请求
function receiveRegister(json) {
    return {
        type: USER_REGISTER,
        json,
        receiveAt: Date.now(),
    }
}
export function goToRegister(params) {
    return dispatch => {
        XHR({
            type: 'post',
            url: '/api/user/register',
            data: params,
            success: res => {
                dispatch(receiveRegister(res));
                notice(res);
            }
        })
    }
}

//登陆请求
function receiveLogin(json) {
    return {
        type: USER_LOGIN,
        json,
        receiveAt: Date.now(),
    }
}
export function goToLogin(params) {
    return dispatch => {
        XHR({
            type: 'post',
            url: '/api/user/login',
            data: params,
            success: res => {
                dispatch(receiveLogin(res));
                notice(res);
            }
        })
    }
}

// 退出登陆请求
function receiveUserLogout(json) {
    return {
        type: USER_LOGOUT,
        json,
        receiveAt: Date.now(),
    }
}
export function userLogout() {
    return dispatch => {
        XHR({
            url: '/api/user/logout',
            success: res => {
                dispatch(receiveUserLogout(res));
                notice(res);
            }
        })
    }
}

//获取用户信息
function receiveUserInfo(json) {
    return {
        type: GET_USER_INFO,
        json,
        receiveAt: Date.now(),
    }
}
export function getUserInfo(params) {
    return dispatch => {
        XHR({
            type: 'post',
            url: '/api/user/getUserInfo',
            data: params,
            success: res => {
                dispatch(receiveUserInfo(res))
            }
        })
    }
}






