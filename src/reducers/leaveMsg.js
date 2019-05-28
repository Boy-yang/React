import { GET_LEAVE_MESSAGE } from '../constants'

let initialState = {
    message:{},
};
export default function update(state = initialState, action) {
    switch (action.type) {
        case GET_LEAVE_MESSAGE:
            return Object.assign({}, state, {
                message: action.json,
            });
        default:
            return state;
    }
};
