import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import cartService from '../services/cartService';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { toast } from 'react-toastify';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const initialCartItemsRef = useRef([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [modalState, setModalState] = useState({
        isOpen: false,
        itemId: null,
        itemName: '',
        type: 'single'
    });

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await cartService.getCart();
                if(response) {
                    setCartItems(response);
                    initialCartItemsRef.current = response;
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCartItems();
    
    }, []);

    // Cleanup function to update changed items
    useEffect(() => {
        return () => {
            const updateChangedItems = async () => {
                const initialItems = initialCartItemsRef.current;
                const currentItems = cartItems;

                // Find items that have changed quantity
                const changedItems = currentItems.filter(currentItem => {
                    const initialItem = initialItems.find(item => item.id === currentItem.id);
                    return initialItem && initialItem.quantity !== currentItem.quantity;
                });

                // Update each changed item
                for (const item of changedItems) {
                    try {
                        await cartService.updateCartItem(item.id, item.quantity);
                    } catch (error) {
                        console.error(`Error updating cart item ${item.id}:`, error);
                    }
                }
            };

            updateChangedItems();
        };
    }, [cartItems]);

    const handleUpdateQuantity = (itemId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? {...item, quantity: newQuantity} : item
            )
        );
    };

    const handleRemoveClick = (itemId, itemName) => {
        setModalState({
            isOpen: true,
            itemId,
            itemName,
            type: 'single'
        });
    };

    const handleClearCartClick = () => {
        setModalState({
            isOpen: true,
            itemId: null,
            itemName: '',
            type: 'all'
        });
    };

    const handleClearCartConfirm = async () => {
        try {
            const response = await cartService.clearCart();
            if(response) {
                toast.success('Cart cleared successfully');
                setCartItems([]);
                initialCartItemsRef.current = [];
            }
            else {
                toast.error('Error clearing cart');
            }
        } catch (error) {
            toast.error('Error clearing cart');
            console.error('Error clearing cart:', error);
        }
        setModalState({ isOpen: false, itemId: null, itemName: '', type: 'single' });
    };

    const handleRemoveConfirm = async () => {
        const { itemId, type } = modalState;
        if (type === 'single') {
            try {
                const response = await cartService.removeFromCart(itemId);
                if(response) {
                    toast.success('Item removed from cart successfully');
                    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
                }
            } catch (error) {
                console.error('Error removing item:', error);
            }
        } else {
            
            await handleClearCartConfirm();
        }
        setModalState({ isOpen: false, itemId: null, itemName: '', type: 'single' });
    };

    const handleRemoveCancel = () => {
        setModalState({ isOpen: false, itemId: null, itemName: '', type: 'single' });
    };

    const calculateSubtotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const calculateShipping = () => {
        return cartItems.length > 0 ? 10000 : 0;
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.03; // 10% tax
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping() + calculateTax();
    };

    const handleItemSelect = (itemId) => {
        setSelectedItems(prev => {
            const newSelected = new Set(prev);
            if (newSelected.has(itemId)) {
                newSelected.delete(itemId);
            } else {
                newSelected.add(itemId);
            }
            return newSelected;
        });
    };

    const handleCheckout = () => {
        if (selectedItems.size === 0) {
            toast.error('Please select at least one item to checkout');
            return;
        }

        const selectedCartItems = cartItems
            .filter(item => selectedItems.has(item.id))
            .map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                cartItemId: item.id,
                productName: item.productName,
                productImage: item.productImage,
                productPrice: item.price,
                sku: item.sku,
            
            }));

        // Navigate to checkout with the selected items
        navigate('/checkout', { state: { selectedItems: selectedCartItems} });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-left">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Looks like you haven't added any items to your cart yet.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={handleUpdateQuantity}
                                        onRemove={() => handleRemoveClick(item.id, item.productName)}
                                        isSelected={selectedItems.has(item.id)}
                                        onSelect={handleItemSelect}
                                    />
                                ))}
                            </AnimatePresence>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleClearCartClick}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:text-black"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <CartSummary
                                subtotal={calculateSubtotal()}
                                shipping={calculateShipping()}
                                tax={calculateTax()}
                                total={calculateTotal()}
                                onCheckout={handleCheckout}
                            />
                        </div>
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={modalState.isOpen}
                onClose={handleRemoveCancel}
                onConfirm={handleRemoveConfirm}
                title={modalState.type === 'all' ? "Clear Cart" : "Remove Item"}
                message={modalState.type === 'all' 
                    ? "Are you sure you want to remove all items from your cart?"
                    : `Are you sure you want to remove "${modalState.itemName}" from your cart?`}
            />
        </div>
    );
};

export default Cart; 