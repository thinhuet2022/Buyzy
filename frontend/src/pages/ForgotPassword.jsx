import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import authService from '../services/authService';
import { toast } from 'react-toastify';
import FormInput from '../components/auth/FormInput';
import Button from '../components/common/Button';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.forgotPassword(email);
      toast.success('Verification code has been sent to your email');
      navigate('/verify-code', { state: { email } });
    } catch (error) {
      setError(error.message || 'Failed to send verification code');
      toast.error(error.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div>
          <Link to="/" className="block text-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Buyzy
            </span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a code to verify that it's you.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <FormInput
              label="Email address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              required
              placeholder="Enter your email"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full flex justify-center py-2 px-4"
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Send verification code'
              )}
            </Button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Back to login
            </Link>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword; 