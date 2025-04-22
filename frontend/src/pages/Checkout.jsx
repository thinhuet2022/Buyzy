import React, {useState, useEffect} from 'react';
import Button from '../components/common/Button';
import StepIndicator from '../components/checkout/StepIndicator';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import { toast } from 'react-toastify';
import cartService from '../services/cartService';
import orderService from '../services/orderService';
const Checkout = () => {
    const location = useLocation();
    const { selectedItems} = location.state || { selectedItems: []};
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        shipping: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            province: '',
            district: '',
            ward: '',
            address: '',
            additionalInfo: '',
        },
        payment: {
            method: 'cod' // Default to COD
        },
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCheckoutItems = async () => {
        const response = await cartService.getCheckoutItems(selectedItems);
        setCheckoutItems(response);
        console.log(checkoutItems);
    }

    useEffect(() => {
        // If no selected items, redirect back to cart
        if (!selectedItems || selectedItems.length === 0) {
            toast.error('No items selected for checkout');
            navigate('/cart');
        }
        fetchCheckoutItems();
    }, [selectedItems, navigate]);

    const handleInputChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };
    const calculateSubtotal = () => {
        return selectedItems.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
    };

    const calculateShipping = () => {
        return selectedItems.length > 0 ? 10000 : 0;
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.03;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping() + calculateTax();
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError('');

        try {
            
            const orderData = {
                orderRequest: checkoutItems,
                total: calculateTotal(),
                paymentMethod: formData.payment.method === 'vnpay' ? 'VNPAY' : 'CASH_ON_DELIVERY',
                address: {
                    ...formData.shipping,
                    province: formData.shipping.province.name,
                    district: formData.shipping.district.name,
                    ward: formData.shipping.ward.name
                }
            }
            console.log(orderData);
            // Store selected items in sessionStorage for later use
            sessionStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            
            // Create order
             const orderResponse = await orderService.createOrder(orderData);
             console.log(orderResponse);

            if (orderResponse) {
                if (orderData.paymentMethod === 'VNPAY') { 
                    // Call API to create VNPay payment URL
                    const paymentResponse = await orderService.createPayment(orderData.total, orderResponse.id);
                    // Store order ID in sessionStorage for verification after payment
                    sessionStorage.setItem('pendingOrderId', orderResponse.id);
                    sessionStorage.setItem('order', orderResponse);
                    console.log(paymentResponse);
                    // Redirect to VNPay payment page
                    window.location.href = paymentResponse;
                } else {
                    // For COD, clear cart and navigate to success page
                    cartService.clearCartItems(selectedItems);
                    navigate('/order-confirmation', {
                        state: {
                            order: orderResponse
                        }
                    });
                }
            }
        } catch (error) {
            setError(error.message || 'Failed to place order');
            toast.error('Failed to place order');
        } finally {
            setIsLoading(false);
        }
    };

    
    const renderCurrentStep = () => {
        switch (step) {
            case 1:
                return (
                    <ShippingForm
                        formData={formData.shipping}
                        handleInputChange={(field, value) =>
                            handleInputChange('shipping', field, value)
                        }
                    />
                );
            case 2:
                return (
                    <PaymentForm
                        formData={formData.payment}
                        handleInputChange={(field, value) =>
                            handleInputChange('payment', field, value)
                        }

                        paymentMethod={formData.payment.method}
                        onPaymentMethodChange={(method) =>
                            handleInputChange('payment', 'method', method)
                        }
                    />
                );
            case 3:
                return (
                    <OrderSummary
                        items={selectedItems}
                        subtotal={calculateSubtotal()}
                        shipping={calculateShipping()}
                        tax={calculateTax()}
                        total={calculateTotal()}
                    />
                );
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <StepIndicator
                            currentStep={step}
                            totalSteps={3}
                            stepLabels={['Shipping', 'Payment', 'Review']}
                        />
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (step < 3) {
                                    setStep(step + 1);
                                } else {
                                    handleSubmit();
                                }
                            }}
                            className="space-y-2"
                        >
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                {renderCurrentStep()}
                            </div>
                            <div className="flex justify-end gap-2">
                                {step > 1 && (
                                    <Button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        variant="secondary"
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button type="submit">
                                    {step === 3 ? 'Place Order' : 'Continue'}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="md:col-span-1">
                        <OrderSummary
                            items={selectedItems}
                            subtotal={calculateSubtotal()}
                            shipping={calculateShipping()}
                            tax={calculateTax()}
                            total={calculateTotal()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;