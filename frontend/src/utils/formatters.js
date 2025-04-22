import {format} from 'date-fns';

export const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
};

export const formatCurrency = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const getStatusColor = (status) => {
    const statusColors = {
        'PENDING': 'bg-yellow-100 text-yellow-800',
        'PROCESSING': 'bg-blue-100 text-blue-800',
        'SHIPPED': 'bg-purple-100 text-purple-800',
        'DELIVERED': 'bg-green-100 text-green-800',
        'CANCELLED': 'bg-red-100 text-red-800',
        'RETURNED': 'bg-gray-100 text-gray-800'

    
    };
    return statusColors[status];
};

export const getItemCount = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
}; 
export const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  