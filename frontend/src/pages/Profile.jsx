import React, {useState, useEffect} from 'react';
import userService from '../services/userService';
import ProfileSettings from '../components/profile/ProfileSettings';
import UserProfileHeader from '../components/profile/UserProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import AddressSettings from '../components/profile/AddressSettings';
import { toast } from 'react-toastify';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [fetchedUser, setFetchedUser] = useState(null);
    const [fetchedAddress, setFetchedAddress] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const profile = await userService.getProfile();
                if (profile) {
                    setFetchedUser(profile);
                }
            } catch (error) {
                toast.error('Failed to load profile data');
                console.error('Error fetching profile:', error);
            }
        };
        fetchUser();
    }, []);
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const address = await userService.getAddress();
                if (address) {
                    setFetchedAddress(address);
                }
            } catch (error) {
                toast.error('Failed to load address data');
                console.error('Error fetching address:', error);
            }
        };
        fetchAddress();
    }, []);

    const handleUpdateProfile = async (updatedData) => {
        try {
            const response = await userService.updateProfile(updatedData);
            if (response) {
                setFetchedUser({...fetchedUser, ...response});
                return response;
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update profile');
        }
    };

    const handleUpdateAddress = async (addressData) => {
        try {
            const response = await userService.updateAddress(addressData, fetchedUser.email);
            if (response) {
                setFetchedAddress({...fetchedAddress, ...response});
                return response;
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update address');
        }
    };

    const handleImageChange = async (file) => {
        const response = await userService.updateProfileImage(file);
        if (response) {
    
            console.log(response);
        }
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'address':
                return <AddressSettings address={fetchedAddress} onUpdate={handleUpdateAddress}/>;
            case 'settings':
                return <ProfileSettings user={fetchedUser} onUpdate={handleUpdateProfile}/>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <UserProfileHeader user={fetchedUser} onImageChange={handleImageChange}/>
                    <div className="mt-8">
                        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab}/>
                        <div className="mt-6">{renderActiveTab()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 