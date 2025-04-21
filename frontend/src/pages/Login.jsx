import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {Link, useNavigate} from 'react-router-dom';
import FormInput from '../components/auth/FormInput';
import Button from '../components/common/Button';
import {useDispatch} from 'react-redux';
import {login} from '../stores/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const resultAction = await dispatch(login(formData));
            if (login.fulfilled.match(resultAction)) {
                navigate('/');
            } else if (login.rejected.match(resultAction)) {
                setErrors({
                    submit: resultAction.payload || 'Login failed. Please try again.',
                });
            }
        } catch (error) {
            setErrors({
                submit: error.message || 'Login failed. Please try again.',
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
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link
                            to="/register"
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            create a new account
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <FormInput
                            label="Email address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                            placeholder="Enter your email"
                        />
                        <FormInput
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            required
                            placeholder="Enter your password"
                        />
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
                                'Sign in'
                            )}
                        </Button>
                    </div>
                </form>
                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <Link
                            to="/forgot-password"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <div className="text-sm">
                        <Link
                            to="/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Login; 