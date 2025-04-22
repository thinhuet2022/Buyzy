import React from 'react';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import {formatCurrency, getStatusColor} from '../../utils/formatters';

const OrderRow = ({order, isSelected, onToggleDetails}) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #ORD-{order.orderId}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.orderDate).toLocaleDateString('en-GB')}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(order.totalPrice)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.quantity}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                    onClick={() => onToggleDetails(order)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm 
                    font-medium rounded-md text-primary-600 hover:text-primary-700 focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    View Details
                    {isSelected ? (
                        <FaChevronUp className="ml-1.5 h-4 w-4"/>
                    ) : (
                        <FaChevronDown className="ml-1.5 h-4 w-4"/>
                    )}
                </button>
            </td>
        </tr>
    );
};

export default React.memo(OrderRow); 