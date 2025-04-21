import React from 'react';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import {formatDate, formatCurrency} from '../../utils/formatters';

const OrderRow = ({order, isSelected, onToggleDetails, getStatusColor, getItemCount}) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{order.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(order.date)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(order.total)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {getItemCount(order.items)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                    onClick={() => onToggleDetails(order)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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