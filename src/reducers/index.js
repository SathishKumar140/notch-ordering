import * as ActionTypes from '../constant/types';
import { ALL_SUPPLIERS, ALL_STATUS } from '../constant';

const initialState = {
    totalCount: 0,
    limit: 0,
    orderList: [],
    filteredList: [],
    selectedFilters: {},
    supplierOptions: [],
    statusOptions: []
};

export function notchReducer(state = initialState, action) {
    switch (action.type) {

        case ActionTypes.FETCH_ORDER_LIST_SUCCESS: {
            const { response = {} } = action;
            const { data, totalCount, limit } = response;
            const supplierOptions = Array.isArray(data) ? [ALL_SUPPLIERS, ...new Set(data.map(({vendorName})=>vendorName))].map(vendor => ({label: vendor, value: vendor})) : []
            const statusOptions = Array.isArray(data) ? [ALL_STATUS, ...new Set(data.map(({orderBuyerStatus})=>orderBuyerStatus))].map(status => ({label: status, value: status})) : []
            return { ...state,  totalCount, limit, orderList: data, filteredList: data, supplierOptions, statusOptions  }
        }
        case ActionTypes.FETCH_ORDER_LIST_FAIL: {
            return { ...initialState }
        }

        case ActionTypes.RESET_FILTERS: {
            return { ...state, filteredList: state.orderList}
        }

        case ActionTypes.SET_SELECTED_FILTER: {
            const { value } = action;
            const filterData = Object.keys(value).reduce((list, key) => {
                return [...list, ...state.orderList.filter(item => item[key] === value[key])]
            }, []);
            const filteredList = [...new Map(filterData.map(item =>[item['id'], item])).values()];
            return { ...state, selectedFilters: value, filteredList}
        }
        
        default:
            return state;
    }
}