import * as ActionTypes from '../constant/types';

export function fetchOrders() {
    return async dispatch => {
        try{
            const response = await fetch(`/.netlify/functions/orders`, {
                method: "POST",
                body: JSON.stringify({}),
            })
            const data = await response.json();
            dispatch({ type: ActionTypes.FETCH_ORDER_LIST_SUCCESS, response: data });
        }catch {
            dispatch({ type: ActionTypes.FETCH_ORDER_LIST_FAIL});
        }
    }
}

export function resetFilters() {
    return {
        type: ActionTypes.RESET_FILTERS
    }
}

export function setSelectedFilter(value) {
    return {
        type: ActionTypes.SET_SELECTED_FILTER,
        value
    }
}