import React, {useState} from 'react';
import FormInput from '../auth/FormInput';
import { toast } from 'react-toastify';

const ProfileSettings = ({user, onUpdate}) => {
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
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
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Profile Settings
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <FormInput
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <FormInput
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <FormInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                    />
                </div>

                <div>
                    <FormInput
                        label="Phone Number"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;