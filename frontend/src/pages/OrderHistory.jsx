import React, {useState, useEffect, useCallback, useMemo} from 'react';
import OrderRow from '../components/orders/OrderRow';
import OrderDetailsRow from '../components/orders/OrderDetailsRow';
import {getStatusColor, getItemCount} from '../utils/formatters';
import Pagination from '../components/common/Pagination';
import {sampleOrders} from '../data/sampleOrders';

const ITEMS_PER_PAGE = 10;

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Simulate API call with sample data
        const fetchOrders = async () => {
            try {
                setLoading(true);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Calculate pagination
                const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                const endIndex = startIndex + ITEMS_PER_PAGE;
                const paginatedOrders = sampleOrders.slice(startIndex, endIndex);
                const total = Math.ceil(sampleOrders.length / ITEMS_PER_PAGE);

                setOrders(paginatedOrders);
                setTotalPages(total);
                setError(null);
            } catch (err) {
                setError('Failed to fetch orders. Please try again later.');
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentPage]);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
        setSelectedOrder(null);
    }, []);

    const handleToggleDetails = useCallback((order) => {
        setSelectedOrder(selectedOrder?.id === order.id ? null : order);
    }, [selectedOrder]);

    const tableHeaders = useMemo(() => [
        {label: 'Order ID', key: 'id'},
        {label: 'Date', key: 'date'},
        {label: 'Status', key: 'status'},
        {label: 'Total', key: 'total'},
        {label: 'Items', key: 'items'},
        {label: 'Actions', key: 'actions'}
    ], []);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMMM d, yyyy');
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // if (loading) {
    //     return (
    //         <div className="min-h-screen bg-gray-50 py-8">
    //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //                 <div className="flex justify-center items-center h-64">
    //                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Order History</h1>
                    <span className="text-sm text-gray-500">
                        Showing {orders.length} of {sampleOrders.length} orders
                    </span>
                </div>

                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                {tableHeaders.map(header => (
                                    <th
                                        key={header.key}
                                        className="pl-20 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <OrderRow
                                        order={order}
                                        isSelected={selectedOrder?.id === order.id}
                                        onToggleDetails={handleToggleDetails}
                                        getStatusColor={getStatusColor}
                                        getItemCount={getItemCount}
                                    />
                                    {selectedOrder?.id === order.id && (
                                        <OrderDetailsRow order={order}/>
                                    )}
                                </React.Fragment>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {totalPages > 1 && (
                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory; 