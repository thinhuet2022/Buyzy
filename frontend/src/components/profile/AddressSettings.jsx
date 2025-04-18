import React, { useState } from 'react';
import FormInput from '../auth/FormInput';
import { toast } from 'react-toastify';

const AddressSettings = ({ address, onUpdate}) => {
    const [formData, setFormData] = useState({
        street: address?.street || '',
        city: address?.city || '',
        ward: address?.ward || '',
        district: address?.district || '',
        country: address?.country || 'Vietnam',
        isDefault: address?.isDefault || true,
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onUpdate(formData);
            toast.success('Address updated successfully!');
        } catch (error) {
            toast.error(error.message || 'Failed to update address');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Address Settings
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <FormInput
                            label="Street Address"
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                            placeholder="Enter your street address"
                        />
                    </div>
                    <div>
                        <FormInput
                            label="City"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            placeholder="Enter your city"
                        />
                    </div>
                    <div>
                        <FormInput
                            label="Ward"
                            type="text"
                            name="ward"
                            value={formData.ward}
                            onChange={handleChange}
                            required
                            placeholder="Enter your ward"
                        />
                    </div>
                    <div>
                        <FormInput
                            label="District"
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            required
                            placeholder="Enter your district"
                        />
                    </div>
                    <div>
                        <FormInput
                            label="Country"
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            disabled
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isDefault"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={(e) => handleChange({
                            target: {
                                name: 'isDefault',
                                value: e.target.checked
                            }
                        })}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
                        Set as default address
                    </label>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Saving...' : 'Save Address'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddressSettings; 