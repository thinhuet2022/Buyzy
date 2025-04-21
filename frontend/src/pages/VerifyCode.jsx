import {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {motion} from 'framer-motion';
import authService from '../services/authService';
import {toast} from 'react-toastify';
import FormInput from '../components/auth/FormInput';
import Button from '../components/common/Button';
import Logo from "../components/common/Logo.jsx";

const VerifyCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState('VERIFY_CODE');
    const [isTimeout, setIsTimeout] = useState(false) // VERIFY_CODE or NEW_PASSWORD

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTimeout(true);
        }, 120000); // 2 minutes

        return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }, []);

    // Redirect to forgot password if no email is provided
    if (!email) {
        navigate('/forgot-password');
        return null;
    }

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.verifyCode(email, verificationCode);
            setStep('NEW_PASSWORD');
            toast.success('Code verified successfully');
        } catch (error) {
            setError(error.message || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await authService.resetPassword(email, newPassword);
            toast.success('Password reset successfully');
            navigate('/login');
        } catch (error) {
            setError(error.message || 'Failed to reset password');
            toast.error(error.message || 'Failed to reset password');
        } finally {
            setLoading(false);
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
                <div>
                    <Logo/>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {step === 'VERIFY_CODE' ? 'Enter verification code' : 'Reset your password'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {step === 'VERIFY_CODE'
                            ? `We've sent a verification code to ${email}`
                            : 'Create a new password for your account'}
                    </p>
                </div>

                <form onSubmit={step === 'VERIFY_CODE' ? handleVerifyCode : handleResetPassword}
                      className="mt-8 space-y-6">
                    {step === 'VERIFY_CODE' ? (
                        <div className="rounded-md shadow-sm space-y-4">
                            <FormInput
                                label="Verification Code"
                                name="code"
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                error={error}
                                required
                                placeholder="Enter 6-digit code"
                                pattern="[0-9]{6}"
                                maxLength={6}
                            />
                        </div>
                    ) : (
                        <div className="rounded-md shadow-sm space-y-4">
                            <FormInput
                                label="New Password"
                                name="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                error={error}
                                required
                                placeholder="Enter new password"
                                minLength={8}
                            />
                            <FormInput
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={error}
                                required
                                placeholder="Confirm new password"
                                minLength={8}
                            />
                        </div>
                    )}
                    {isTimeout ? (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                        >
                            <Button
                                type="button"
                                variant="link"
                                className="text-primary-600 hover:text-primary-500"
                                onClick={() => {
                                    setIsTimeout(false);
                                    // Optionally, trigger resend code logic here
                                    authService.resendCode(email)
                                        .then(() => {
                                            toast.success('Verification code resent successfully');
                                        })
                                        .catch((error) => {
                                            toast.error(error.message || 'Failed to resend verification code');
                                        });
                                }}
                            >
                                Resend code
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            className="text-black text-sm text-left"
                        >
                            The code is valid for 2 minutes. If you didn't receive it, please wait to request a new one.
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
                                    animate={{rotate: 360}}
                                    transition={{duration: 1, repeat: Infinity, ease: "linear"}}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                step === 'VERIFY_CODE' ? 'Verify Code' : 'Reset Password'
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

export default VerifyCode; 
