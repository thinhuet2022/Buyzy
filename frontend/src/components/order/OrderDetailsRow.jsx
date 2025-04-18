import React from 'react';
import {formatCurrency} from '../../utils/formatters.js';

const OrderDetailsRow = ({order}) => {
    return (
        <tr>
            <td colSpan="6" className="px-6 py-4 bg-gray-50">
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {order.items.map((item, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="h-full">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Information</h4>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 h-full">
                                <p className="text-sm text-gray-500">
                                    {order.shipping?.firstName} {order.shipping?.lastName}<br/>
                                    {order.shipping?.address}<br/>
                                    {order.shipping?.ward}, {order.shipping?.district}<br/>
                                    {order.shipping?.province}<br/>
                                    Phone: {order.shipping?.phone}<br/>
                                    Email: {order.shipping?.email}
                                </p>
                            </div>
                        </div>
                        <div className="h-full">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Information</h4>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 h-full">
                                <p className="text-sm text-gray-500">
                                    Method: {order.payment?.method === 'cod' ? 'Cash on Delivery' : 'VNPay'}<br/>
                                    Status: {order.payment?.status || 'Pending'}<br/>
                                    Total: {formatCurrency(order.total)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default React.memo(OrderDetailsRow); 