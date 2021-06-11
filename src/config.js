import moment from 'moment';
import Status from './components/Status';
import Supplier from './components/Supplier';
import { DROPDOWN, STATUS, SUPPLIER } from './constant';

export const cols = [
    {
      key: 'orderBuyerStatus',
      display: 'STATUS',
      component: Status
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
      component: Supplier
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
    wrapperStyle: { width: '300px', fontSize: '14px', marginRight: '10px'},
    listItemStyle: {fontSize: '14px'},
    cb: () => ({})
  },
  {
    type: DROPDOWN,
    name: STATUS,
    placeholder: 'Select status',
    options: [],
    wrapperStyle: { width: '300px', fontSize: '14px', marginRight: '10px'},
    listItemStyle: {fontSize: '14px'},
    cb: () => ({})
  }
]