import { GET_USER_INFO, GET_REGISTER_RESINFO,GET_LOGIN_RESINFO } from '../constants'

let initialState = {
    userInfo: {},
    registerResInfo: {},
    loginResInfo: {},
};
export default function update( state = initialState, action ) {
    switch ( action.type ) {
        case GET_USER_INFO:
            return Object.assign( {}, state, {
                userInfo: action.json,
            } );
        //或者
        // return {
        //     userInfo: {...action.json}
        // };
        case GET_REGISTER_RESINFO:
            return Object.assign( {}, state, {
                registerResInfo: action.json,
            } );
        case GET_LOGIN_RESINFO:
            return Object.assign( {}, state, {
                loginResInfo: action.json,
            } );
        default:
            return state;
    }
};
