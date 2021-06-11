import React from 'react';

import Supplier from '../components/Supplier';


export default {
  title: 'NotchUI/Supplier',
  component: Supplier,
};

const Template = (args) => <Supplier {...args} />;

export const VendorName = Template.bind({});

VendorName.args = {
    data : { vendorName: 'Demo Vendor'}
};

export const PendingVendorOnboarding = Template.bind({});

PendingVendorOnboarding.args = {
    data : { vendorName: 'Demo Vendor', isPendingVendorOnboarding: true }
};
