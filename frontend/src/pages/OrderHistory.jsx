import React, {useState, useEffect, useCallback, useMemo} from 'react';
import OrderRow from '../components/orders/OrderRow';
import OrderDetailsRow from '../components/orders/OrderDetailsRow';
import {getStatusColor, getItemCount} from '../utils/formatters';
import Pagination from '../components/common/Pagination';
import {sampleOrders} from '../data/sampleOrders';
import orderService from '../services/orderService';
const ITEMS_PER_PAGE = 20;

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await orderService.getOrderHistory({page: currentPage - 1, size: ITEMS_PER_PAGE});
                console.log(response);
                setOrders(response.content);
                setTotalPages(response.totalPages);
                setTotalElements(response.totalElements);
                setCurrentPage(response.currentPage + 1);
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
        setSelectedOrder(selectedOrder?.orderId === order.orderId ? null : order);
    }, [selectedOrder]);

    const handleOrderCancelled = (orderId) => {
        setOrders(orders.map(order => order.orderId === orderId ? {...order, orderStatus: 'CANCELLED'} : order));
    };

    const tableHeaders = useMemo(() => [
        {label: 'Order ID', key: 'orderId'},
        {label: 'Date', key: 'createdAt'},
        {label: 'Status', key: 'orderStatus'},
        {label: 'Total', key: 'totalPrice'},
        {label: 'Items', key: 'quantity'},
        {label: 'Actions', key: 'actions'}
    ], []);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMMM d, yyyy');
    };



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
                        Showing {orders.length} of {totalElements} orders
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
                                <React.Fragment key={order.orderId}>
                                    <OrderRow
                                        order={order}
                                        isSelected={selectedOrder?.orderId === order.orderId}
                                        onToggleDetails={handleToggleDetails}
                                    />
                                    {selectedOrder?.orderId === order.orderId && (
                                        <OrderDetailsRow order={order}
                                        onOrderCancelled={handleOrderCancelled}
                                        />
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