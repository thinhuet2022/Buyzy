import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const OrderDetailsRow = ({ order }) => {
    return (
        <tr>
            <td colSpan="6" className="px-6 py-4 bg-gray-50 text-left">
                <div className="space-x-4 grid grid-cols-3">
                    <div className="col-span-2">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
                        <div className="space-y-4">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                    
                                    <p className="text-sm text-gray-500">Price: {formatCurrency(item.price)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                        <div className="mb-7">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Information</h4>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 h-full pb-4  ">
                                <p className="text-sm text-gray-500">
                                    {order.shipping?.firstName} {order.shipping?.lastName}<br />
                                    {order.shipping?.address}<br />
                                    {order.shipping?.ward}, {order.shipping?.district}<br />
                                    {order.shipping?.province}<br />
                                    Phone: {order.shipping?.phone}<br />
                                    Email: {order.shipping?.email}
                                </p>
                            </div>
                        </div>
                        <div className="mb-7">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Information</h4>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 h-full">
                                <p className="text-sm text-gray-500">
                                    Method: {order.payment?.method === 'cod' ? 'Cash on Delivery' : 'VNPay'}<br />
                                    Status: {order.payment?.status || 'Pending'}<br />
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