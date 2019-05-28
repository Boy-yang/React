import {
    LEAVE_MESSAGE,GET_LEAVE_MESSAGE
} from '../constants';
import { XHR, notice } from '../utils';


//添加用户留言
function receiveLeaveMsg(json) {
    return {
        type: LEAVE_MESSAGE,
        json,
        receiveAt: Date.now(),
    }
}
export function addLeaveMsg(params) {
    return dispatch => {
        XHR({
            type:'post',
            url: '/api/user/addLeaveMsg',
            data: params,
            success: res => {
                dispatch(receiveLeaveMsg(res));
                notice(res);
            }
        })
    }
}

function receiveMsgList(json) {
    return {
        type: GET_LEAVE_MESSAGE,
        json,
        receiveAt: Date.now(),
    }
}
export function getLeaveMsg(params) {
    return dispatch => {
        XHR({
            url: '/api/user/getLeaveMsg',
            data: params,
            success: res => {
                dispatch(receiveMsgList(res));
            }
        })
    }
}









