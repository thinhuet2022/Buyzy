import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {Link, useNavigate} from 'react-router-dom';
import FormInput from '../components/auth/FormInput';
import Button from '../components/common/Button';
import authService from '../services/authService';
import {useDispatch} from 'react-redux';
import {setUser} from '../stores/userSlice';

const TestingPipeline = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await authService.register(formData);
            dispatch(setUser(response));
            localStorage.setItem('user', JSON.stringify(response));
            
            navigate('/address-update');
        } catch (error) {
            setErrors({
                submit: error.response?.data?.message || error.message || 'Registration failed. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8"
        >
            <motion.div
                initial={{scale: 0.95}}
                animate={{scale: 1}}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
            >
                <div className="text-center">
                    <Link to="/" className="inline-block">
            <span
                className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Buyzy
            </span>
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link
                            to="/login"
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            sign in to your account
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput
                                label="First name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                error={errors.firstName}
                                required
                                placeholder="Enter your first name"
                            />
                            <FormInput
                                label="Last name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                error={errors.lastName}
                                required
                                placeholder="Enter your last name"
                            />
                        </div>

                    </div>

                    {errors.submit && (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            className="text-red-500 text-sm text-center"
                        >
                            {errors.submit}
                        </motion.div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full flex justify-center py-2 px-4"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{rotate: 360}}
                                    transition={{duration: 1, repeat: Infinity, ease: "linear"}}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default TestingPipeline; 