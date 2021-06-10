import * as ActionTypes from '../constant/types';

const initialState = {
    totalCount: 0,
    limit: 0,
    orderList: []
};

export function notchReducer(state = initialState, action) {
    switch (action.type) {

        case ActionTypes.FETCH_ORDER_LIST_SUCCESS: {
            const { response = {} } = action;
            const { data, totalCount, limit } = response;
            return { ...state,  totalCount, limit, orderList: data  }
        }
        case ActionTypes.FETCH_ORDER_LIST_FAIL: {
            return { ...initialState }
        }
        
        default:
            return state;
    }
}