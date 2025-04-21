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
const Checkout = () => {
    const location = useLocation();
    const { selectedItems } = location.state || { selectedItems: [] };
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        shipping: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
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
        console.log(response);
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

    const handleSubmit = async () => {
        setIsLoading(true);
        setError('');

        try {
            // Create order first
            const orderData = {
                ...formData,
                items: cartItems,
                total: calculateTotal(),
                status: formData.payment.method === 'vnpay' ? 'PENDING_PAYMENT' : 'PENDING'
            };

            // Create order
            const orderResponse = await axios.post('http://localhost:8080/api/v1/orders', orderData);

            if (orderResponse.status === 201) {
                if (formData.payment.method === 'vnpay') {
                    // Call API to create VNPay payment URL
                    const paymentResponse = await axios.post('http://localhost:8080/api/v1/payment/create_payment', {
                        amount: calculateTotal() * 23000, // Convert to VND
                        orderInfo: `Order-${orderResponse.data.id}`,
                        orderId: orderResponse.data.id,
                        returnUrl: `${window.location.origin}/payment/callback`
                    });

                    // Store order ID in sessionStorage for verification after payment
                    sessionStorage.setItem('pendingOrderId', orderResponse.data.id);

                    // Redirect to VNPay payment page
                    window.location.href = paymentResponse.data.payUrl;
                } else {
                    // For COD, clear cart and navigate to success page
                    dispatch(clearCart());
                    navigate('/order-success', {
                        state: {
                            orderId: orderResponse.data.id,
                            paymentMethod: 'cod'
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

    // Calculate totals based on selected items
    const calculateSubtotal = () => {
        return selectedItems.reduce(
            (total, item) => total + (item.price * item.quantity),
            0
        );
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