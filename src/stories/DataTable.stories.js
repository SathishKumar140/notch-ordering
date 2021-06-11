import React from 'react';
import Status from '../components/Status';
import DataTable from '../components/DataTable';
import 'font-awesome/css/font-awesome.min.css';


export default {
  title: 'NotchUI/DataTable',
  component: DataTable,
};

const columns = [
    {
      key: 'status',
      display: 'STATUS'
    },
    {
      key: 'supplier',
      display: 'SUPPLIER',
      sort: true
    }
];

const rows = [
    {
        status: 'Delivered',
        orderBuyerStatus: 'Delivered',
        supplier: 'Supplier 1 delivered'
    },
    {
        status: 'Paid',
        orderBuyerStatus: 'Paid',
        supplier: 'Paid Info'
    },
    {
        status: 'Paid',
        orderBuyerStatus: 'Paid',
        supplier: 'Paid info 2'
    },
    {
        status: 'Delivered',
        orderBuyerStatus: 'Delivered',
        supplier: 'Delivered info'
    }
]

const Template = (args) => <DataTable {...args} />;

export const Basic = Template.bind({});

Basic.args = {
    columns,
    rows
};


export const PageSize = Template.bind({});

PageSize.args = {
    columns,
    rows,
    pageSize: 2
};

export const CustomComponentColumn = Template.bind({});

CustomComponentColumn.args = {
    columns: columns.map((column) => column.key === 'status' ? Object.assign({}, column, { component: Status }) : column),
    rows
};

export const Selector = Template.bind({});

Selector.args = {
    columns: columns.map((column) => column.key === 'status' ? Object.assign({}, column, { selector: ({status}) => 'Modified Status' }) : column),
    rows
};