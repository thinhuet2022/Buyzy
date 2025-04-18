import React, {useState} from 'react';
import Button from '../components/common/Button';
import StepIndicator from '../components/checkout/StepIndicator';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
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

    const handleInputChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    function clearCart() {
        return undefined;
    }

    const handleSubmit = async () => {
        setIsLoading(true);
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
            console.error('Error processing order:', error);
            setError('Failed to process your order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Mock cart items for order summary
    const cartItems = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 199.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 249.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D',
        },
    ];

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal();
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
                    <div className="space-y-6 text-left">
                        <h2 className="text-xl font-semibold text-gray-900">Review Order</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-gray-900">Shipping Information</h3>
                                <p className="text-gray-600">
                                    {formData.shipping.firstName} {formData.shipping.lastName}
                                    <br/>
                                    {formData.shipping.address}
                                    {formData.shipping.additionalInfo && (
                                        <>
                                            <br/>
                                            {formData.shipping.additionalInfo}
                                        </>
                                    )}
                                    <br/>
                                    {formData.shipping.ward}, {formData.shipping.district}
                                    <br/>
                                    {formData.shipping.province}
                                    <br/>
                                    Phone: {formData.shipping.phone}
                                    <br/>
                                    Email: {formData.shipping.email}
                                </p>
                            </div>
                            <div className='flex justify-start space-x-1'>
                                <h3 className="font-medium text-gray-900">Payment Method:</h3>
                                <p className="text-gray-600">
                                    {formData.payment.method === 'cod' ? 'Cash on Delivery' : 'VNPay'}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

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
                            cartItems={cartItems}
                           subtotal={calculateSubtotal()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;