import { 
    GET_ARTICLE_LIST, 
    GET_ARTICLE_DETAIL,
    ADD_ARTICLE
    } from '../constants'

let initialState = {
    articleList:{},
    articleDetail:[],
    addRes:[]
};
export default function update( state = initialState, action ) {
    switch ( action.type ) {
        case GET_ARTICLE_LIST:
            return Object.assign( {}, state, {
                articleList: action.json,
            } );
        case GET_ARTICLE_DETAIL:
            return Object.assign( {}, state, {
                articleDetail: action.json,
            } );
        case ADD_ARTICLE:
            return Object.assign( {}, state, {
                addRes: action.json,
            } );
        default:
            return state;
    }
};
