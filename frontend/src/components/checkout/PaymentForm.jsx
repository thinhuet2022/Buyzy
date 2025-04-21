import React from 'react';
import {FaTruck, FaMoneyBill, FaCreditCard} from 'react-icons/fa';

const PaymentForm = ({formData, handleInputChange, onVNPayClick, paymentMethod}) => {
    const paymentMethods = [
        {
            id: 'cod',
            name: 'Cash on Delivery',
            description: 'Pay with cash when your order arrives',
            icon: FaTruck,
            iconColor: 'text-green-600'
        },
        {
            id: 'vnpay',
            name: 'VNPay',
            description: 'Pay securely with VNPay',
            icon: FaCreditCard,
            iconColor: 'text-blue-600'
        }
    ];

    return (
        <div className="space-y-6 text-left">
            <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
            <div className=" space-x-2 grid grid-cols-2">
                {paymentMethods.map((method) => (
                    <div
                        key={method.id}
                        className={`
                            relative flex items-start p-4 rounded-lg border cursor-pointer
                            ${paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }
                        `}
                        onClick={() => handleInputChange('method', method.id)}
                    >
                        <input
                            type="radio"
                            name="payment-method"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={() => handleInputChange('method', method.id)}
                            className="h-4 w-4 mt-1 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="ml-4 flex items-center space-x-4">
                            <div className={`p-2 rounded-full bg-gray-50 ${method.iconColor}`}>
                                <method.icon className="h-6 w-6"/>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{method.name}</p>
                                <p className="text-sm text-gray-500">{method.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {paymentMethod === 'vnpay' && (
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                You will be redirected to VNPay to complete your payment
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Please have your payment information ready
                            </p>
                        </div>

                    </div>
                </div>
            )}

            {paymentMethod === 'cod' && (
                <div className="mt-6 bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <FaMoneyBill className="h-6 w-6 text-green-600"/>
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                Pay when you receive
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Our delivery partner will collect the payment when delivering your order
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentForm; 