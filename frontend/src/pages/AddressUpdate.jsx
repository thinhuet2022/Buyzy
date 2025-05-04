import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import FormInput from '../components/auth/FormInput';
import Button from '../components/common/Button';
import userService from '../services/userService';

const AddressUpdate = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;

    const [formData, setFormData] = useState({
        street: '',
        city: '',
        ward: '',
        district: '',
        country: '',
        isDefault: true,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // TODO: Call API to update user address
            // For now, we'll just navigate to home
            userService.updateAddress(formData, email);
            navigate('/login');
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    const handleSkip = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="bg-white rounded-lg shadow-sm p-6"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Add Your Address
                        </h1>
                        <p className="text-gray-600">
                            Add your shipping address to make checkout easier
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormInput
                            label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                        <FormInput
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormInput
                                label="District"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                            />
                            <FormInput
                                label="Ward"
                                name="ward"
                                value={formData.ward}
                                onChange={handleChange}
                            />
                        </div>

                        <FormInput
                            label="Street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                        />

                        <div className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save Address
                            </Button>


                            <button
                                type="button"
                                onClick={handleSkip}
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Skip for Now
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddressUpdate; 