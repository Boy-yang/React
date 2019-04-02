import { GET_LIST_DATA,GET_LOGIN_RESINFO,GET_REGISTER_RESINFO } from '../constants';
import { XHR } from '../utils';
export function getListData() {//获取列表数据
    return dispatch => {
        XHR( {
            url:'/api/user/listdata',
            success: res => {
                dispatch( receiveListData( res ) )
            }
        } )
    }
}
function receiveListData( json ) {
    return {
        type: GET_LIST_DATA,
        json,
        receiveAt: Date.now(),
    }
}

export function goToRegister( params ) {//注册请求
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
function receiveRegister( json ) {

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





