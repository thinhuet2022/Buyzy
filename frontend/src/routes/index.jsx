import React, {Suspense, lazy} from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PrivateRoute from './PrivateRoute';

// Lazy load all pages
const Home = lazy(() => import('../pages/Home'));
const Product = lazy(() => import('../pages/Product'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const OrderConfirmation = lazy(() => import('../pages/OrderConfirmation'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const PaymentCallback = lazy(() => import('../pages/PaymentCallback'));
const OrderHistory = lazy(() => import('../pages/OrderHistory'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const VerifyCode = lazy(() => import('../pages/VerifyCode'));
const AddressUpdate = lazy(() => import('../pages/AddressUpdate'));

// Loading component
const Loading = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
);

// Error boundary component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center h-screen w-full">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
                        <p className="text-gray-600 mb-4">We're sorry, but there was an error loading this page.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const AppRoutes = () => {
    return (
        <ErrorBoundary>
            <Header/>
            <main className="min-h-screen">
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/products" element={<ProductsPage type="all"/>}/>
                        <Route path="/products/search/:query" element={<ProductsPage type="search"/>}/>
                        <Route path="/products/category/:categoryName" element={<ProductsPage type="category"/>}/>
                        <Route path="/products/:productId" element={<Product/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>
                        <Route path="/verify-code" element={<VerifyCode/>}/>

                        {/* Protected Routes */}
                        <Route
                            path="/cart"
                            element={
                                <PrivateRoute>
                                    <Cart/>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/checkout"
                            element={
                                <PrivateRoute>
                                    <Checkout/>
                                </PrivateRoute>
                            }
                        />

                        <Route path="/payment/callback" element={
                            <PrivateRoute>
                                <PaymentCallback/>
                            </PrivateRoute>
                        }/>

                        <Route path="/order-confirmation" element={
                            <PrivateRoute>
                                <OrderConfirmation/>
                            </PrivateRoute>
                        }/>

                        <Route path="/profile" element={
                            <PrivateRoute>
                                <Profile/>
                            </PrivateRoute>
                        }/>

                        <Route path="/profile/orders" element={
                            <PrivateRoute>
                                <OrderHistory/>
                            </PrivateRoute>
                        }/>

                        <Route path="/address-update" element={
                            <PrivateRoute>
                                <AddressUpdate/>
                            </PrivateRoute>
                        }/>

                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Suspense>
            </main>
            <Footer/>
        </ErrorBoundary>
    );
};

export default AppRoutes; 