import React from 'react';
import "./Supplier.scss";

const Supplier = ({data}) => {
    const { vendorName, isPendingVendorOnboarding, isBYOS } = data;
    return <span>
        <span>{vendorName}</span> 
        { !isBYOS && <span className="market">Market</span>}
        { isPendingVendorOnboarding && <span className="pending-onboarding">1st</span> }
    </span>
}

export default Supplier;