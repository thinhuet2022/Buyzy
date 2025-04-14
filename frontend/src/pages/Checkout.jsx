import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle final submission
      console.log('Form submitted:', formData);
      // Redirect to order confirmation
      window.location.href = '/order-confirmation';
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

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <React.Fragment key={stepNumber}>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stepNumber <= step
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {stepNumber}
            </div>
            <div className="ml-2 text-sm font-medium">
              {stepNumber === 1
                ? 'Shipping'
                : stepNumber === 2
                ? 'Payment'
                : 'Review'}
            </div>
          </div>
          {stepNumber < 3 && (
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div
                className={`h-full bg-primary-600 transition-all duration-300 ${
                  stepNumber < step ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderShippingForm = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={formData.shipping.firstName}
            onChange={(e) =>
              handleInputChange('shipping', 'firstName', e.target.value)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={formData.shipping.lastName}
            onChange={(e) =>
              handleInputChange('shipping', 'lastName', e.target.value)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.shipping.email}
            onChange={(e) =>
              handleInputChange('shipping', 'email', e.target.value)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={formData.shipping.phone}
            onChange={(e) =>
              handleInputChange('shipping', 'phone', e.target.value)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            value={formData.shipping.address}
            onChange={(e) =>
              handleInputChange('shipping', 'address', e.target.value)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={formData.shipping.city}
            onChange={(e) =>
              handleInputChange('shipping', 'city', e.target.value)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            value={formData.shipping.state}
            onChange={(e) =>
              handleInputChange('shipping', 'state', e.target.value)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code
          </label>
          <input
            type="text"
            value={formData.shipping.zipCode}
            onChange={(e) =>
              handleInputChange('shipping', 'zipCode', e.target.value)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            value={formData.shipping.country}
            onChange={(e) =>
              handleInputChange('shipping', 'country', e.target.value)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            type="text"
            value={formData.payment.cardNumber}
            onChange={(e) =>
              handleInputChange('payment', 'cardNumber', e.target.value)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            value={formData.payment.cardName}
            onChange={(e) =>
              handleInputChange('payment', 'cardName', e.target.value)
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              value={formData.payment.expiryDate}
              onChange={(e) =>
                handleInputChange('payment', 'expiryDate', e.target.value)
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              value={formData.payment.cvv}
              onChange={(e) =>
                handleInputChange('payment', 'cvv', e.target.value)
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="123"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrderReview = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Order Review</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Shipping Address
          </h3>
          <p className="text-gray-600">
            {formData.shipping.firstName} {formData.shipping.lastName}
            <br />
            {formData.shipping.address}
            <br />
            {formData.shipping.city}, {formData.shipping.state}{' '}
            {formData.shipping.zipCode}
            <br />
            {formData.shipping.country}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Payment Method
          </h3>
          <p className="text-gray-600">
            Card ending in {formData.payment.cardNumber.slice(-4)}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Order Items</h3>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold text-primary-600">
              ${(calculateSubtotal() + 10 + calculateSubtotal() * 0.1).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {renderStepIndicator()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              {step === 1 && renderShippingForm()}
              {step === 2 && renderPaymentForm()}
              {step === 3 && renderOrderReview()}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    type="button"
                  >
                    Back
                  </Button>
                )}
                <Button variant="primary" type="submit">
                  {step === 3 ? 'Place Order' : 'Continue'}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">$10.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">
                      ${(calculateSubtotal() * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-semibold text-primary-600">
                        ${(calculateSubtotal() + 10 + calculateSubtotal() * 0.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 