import { 
    GET_KNOWLEDGE_INFO,
    GET_ARTICLE_INFO, 
    GET_REGISTER_RESINFO,
    GET_LOGIN_RESINFO,
    GET_USER_INFO } from '../constants'

let initialState = {
    knowledgeInfo:[],
    articleInfo:[],
    registerRes: {},
    loginRes: {},
    userInfo:{}
};
export default function update( state = initialState, action ) {
    switch ( action.type ) {
        case GET_KNOWLEDGE_INFO:
            return Object.assign( {}, state, {
                knowledgeInfo: action.json,
            } );
        //或者
        // return {
        //     listData: {...action.json}
        // };
        case GET_ARTICLE_INFO:
            return Object.assign( {}, state, {
                articleInfo: action.json,
            } );
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
        default:
            return state;
    }
};
