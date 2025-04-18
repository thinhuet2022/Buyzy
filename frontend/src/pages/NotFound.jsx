import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
                        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Oops! The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-600">
                            Here are some helpful links to get you back on track:
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/">
                                <Button variant="primary">Go to Homepage</Button>
                            </Link>
                            <Link to="/products">
                                <Button variant="outline">Browse Products</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12">
                        <p className="text-sm text-gray-500">
                            If you believe this is an error, please{' '}
                            <Link to="/contact" className="text-primary-600 hover:text-primary-700">
                                contact support
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound; 