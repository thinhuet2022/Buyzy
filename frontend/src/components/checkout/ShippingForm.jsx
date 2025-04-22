import React from 'react';
import LocationSelector from './LocationSelector';
import FormInput from "../auth/FormInput";

const ShippingForm = ({formData, handleInputChange}) => {
    const handleLocationChange = (location) => {
        handleInputChange('province', location.province);
        handleInputChange('district', location.district);
        handleInputChange('ward', location.ward);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <FormInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                />
                <FormInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                />
               
                <FormInput
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                />
                <FormInput
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    required
                />
                
            </div>

            <div className="space-y-6 text-left">
                <LocationSelector onChange={handleLocationChange}/>
                

                <FormInput
                    label="Street Address"
                    name="address"
                    value={formData.address}
                    placeholder="House number and street name"
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                />
                <FormInput
                    label="Additional Information"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    placeholder="Apartment, suite, unit, building, floor, etc. (optional)"
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    
                />
                
            </div>
        </div>
    );
};

export default ShippingForm; 