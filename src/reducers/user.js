import { 
    GET_REGISTER_RESINFO,
    GET_LOGIN_RESINFO,
    GET_USER_INFO,
    USER_LOGOUT } from '../constants'

let initialState = {
    registerRes: {},
    loginRes: {},
    userInfo:{},
    logoutRes:{}
};
export default function update( state = initialState, action ) {
    switch ( action.type ) {
        case GET_REGISTER_RESINFO:
            return Object.assign( {}, state, {
                registerRes: action.json,
            } );
        case GET_LOGIN_RESINFO:
            return Object.assign( {}, state, {
                loginRes: action.json,
            } );
        case GET_USER_INFO:
            return Object.assign( {}, state, {
                userInfo: action.json,
            } );
        case USER_LOGOUT:
            return Object.assign( {}, state, {
                logoutRes: action.json,
            } );
        default:
            return state;
    }
};
