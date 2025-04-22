import React, { useState } from 'react';
import {formatCurrency} from '../../utils/formatters';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import orderService from '../../services/orderService';
import { toast } from 'react-toastify';
import ConfirmationModal from '../common/ConfirmationModal';

const OrderDetailsRow = ({order, onOrderCancelled}) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleCancelOrder = async () => {
        try {
            await orderService.cancelOrder(order.orderId);
            toast.success('Order cancelled successfully');
            onOrderCancelled && onOrderCancelled(order.orderId);
            setShowConfirmation(false);
        } catch (error) {
            toast.error('Failed to cancel order');
        }
    };

    const canCancelOrder = order.orderStatus === 'PENDING' || order.orderStatus === 'PROCESSING';

    return (
        <>
            <tr>
                <td colSpan="6" className="px-6 py-4 bg-gray-50 text-left">
                    <div className="space-x-4 grid grid-cols-5">
                        <div className="col-span-3">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
                            <div className="space-y-4">
                                {order.order.orderItems.map((item, index) => (
                                    <div key={index}
                                         className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
                                        <Link to={`/products/${item.productId}`}>
                                            <img src={item.imageUrl} alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md"/>
                                        </Link>
                                        <Link to={`/products/${item.productId}`}>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                                <p className="text-sm text-gray-500">{item.sku}</p>
                                            </div>
                                        </Link>

                                        <p className="text-sm text-primary-500 ml-auto font-bold">{formatCurrency(item.price)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 col-span-2">
                            <div className="mb-7">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Information</h4>
                                <div className="bg-white p-4 rounded-lg border border-gray-200 h-full pb-4">
                                    <p className="text-sm text-gray-500">
                                        {order.order?.fullName}<br/>
                                        {order.shippingAddress}<br/>
                                        {order.order?.phoneNumber}<br/>
                                        {order.order?.email}
                                    </p>
                                </div>
                            </div>
                            <div className="mb-7">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Information</h4>
                                <div className="bg-white p-4 rounded-lg border border-gray-200 h-full">
                                    <p className="text-sm text-gray-500">
                                        Method: {order.paymentMethod === 'CASH_ON_DELIVERY' ? 'Cash on Delivery' : 'VNPay'}<br/>
                                        Status: {order.order.payment.status || 'Pending'}<br/>
                                        Total: {formatCurrency(order.totalPrice)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {canCancelOrder && (
                        <div className="flex justify-end mt-4">
                            <Button 
                                variant="danger" 
                                onClick={() => setShowConfirmation(true)}
                                className="w-auto bg-red-500"
                            >
                                Cancel Order
                            </Button>
                        </div>
                    )}
                </td>
            </tr>

            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={handleCancelOrder}
                title="Cancel Order"
                message="Are you sure you want to cancel this order? This action cannot be undone."
            />
        </>
    );
};

export default React.memo(OrderDetailsRow); 