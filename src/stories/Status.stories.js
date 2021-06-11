import React from 'react';

import Status from '../components/Status';


export default {
  title: 'NotchUI/Status',
  component: Status,
};

const Template = (args) => <Status {...args} />;

export const Delivered = Template.bind({});

Delivered.args = {
    data : { orderBuyerStatus: 'Delivered'}
};

export const ShoppingCart = Template.bind({});

ShoppingCart.args = {
    data : { orderBuyerStatus: 'In Shopping Cart'}
};


