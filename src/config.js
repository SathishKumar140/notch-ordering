import moment from 'moment';
import Status from './components/Status';
import Supplier from './components/Supplier';

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