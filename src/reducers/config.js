import { GET_LIST_DATA, GET_REGISTER_RESINFO,GET_LOGIN_RESINFO } from '../constants'

let initialState = {
    listData:[],
    registerResInfo: {},
    loginResInfo: {},
};
export default function update( state = initialState, action ) {
    switch ( action.type ) {
        case GET_LIST_DATA:
            return Object.assign( {}, state, {
                listData: action.json,
            } );
        //或者
        // return {
        //     listData: {...action.json}
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
