import React from 'react';
import "./Status.scss";

const statusBgMapping = {
    'Delivered': 'light-green',
    'In Shopping Cart': 'light-purple'
}

const Status = ({data}) => {
    const { orderBuyerStatus } = data;
    const className = `status-container ${statusBgMapping[orderBuyerStatus]}`
    return <span className={className}>{orderBuyerStatus}</span>
}

export default Status;