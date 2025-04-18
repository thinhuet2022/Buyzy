import { format } from 'date-fns';

export const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

export const getStatusColor = (status) => {
    const statusColors = {
        'PENDING': 'bg-yellow-100 text-yellow-800',
        'PROCESSING': 'bg-blue-100 text-blue-800',
        'SHIPPED': 'bg-purple-100 text-purple-800',
        'DELIVERED': 'bg-green-100 text-green-800',
        'CANCELLED': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
};

export const getItemCount = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
}; 