import moment from 'moment';
import Status from './components/Status';
import Supplier from './components/Supplier';
import { DROPDOWN, STATUS, SUPPLIER } from './constant';

export const cols = [
    {
      key: 'orderBuyerStatus',
      display: 'STATUS',
      component: Status,
      sort: true
    },
    {
      key: 'deliveryDay',
      display: 'DELIVERY DATE',
      selector: ({deliveryDay}) => {
        if(!deliveryDay){
            return ''
        }
        return moment(deliveryDay).format("ll")
      }
    },
    {
      key: 'vendorName',
      display: 'SUPPLIER',
      component: Supplier,
      sort: true
    },
    {
      key: 'total',
      display: 'TOTAL',
      selector: ({total}) => {
        if(!total){
            return ''
        }
        return total
      }
    } 
];

export const filters = [
  {
    type: DROPDOWN,
    name: SUPPLIER,
    placeholder: 'Select supplier',
    options: [],
    wrapperStyle: { width: '300px', fontSize: '14px', margin: '5px 10px 0 0'},
    listItemStyle: {fontSize: '14px'},
    cb: () => ({})
  },
  {
    type: DROPDOWN,
    name: STATUS,
    placeholder: 'Select status',
    options: [],
    wrapperStyle: { width: '300px', fontSize: '14px', margin: '5px 10px 5px 0'},
    listItemStyle: {fontSize: '14px'},
    cb: () => ({})
  }
]