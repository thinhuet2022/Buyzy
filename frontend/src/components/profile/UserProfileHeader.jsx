import React, {useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {formatDate} from '../../utils/dateUtils';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfileHeader = ({user, onImageChange}) => {
    const [imageUrl, setImageUrl] = useState(user?.imageUrl);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setImageUrl(user?.imageUrl);
    }, [user]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }

            // Check file type
            if (!file.type.match(/image\/(jpeg|png|jpg|gif)/)) {
                toast.error('Please select a valid image file (JPEG, PNG, JPG, GIF)');
                return;
            }

            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageUrl(reader.result);
                    if (onImageChange) {
                        onImageChange(file);
                        toast.success('Profile image updated successfully!');
                    }
                };
                reader.onerror = () => {
                    toast.error('Error reading the image file');
                };
                reader.readAsDataURL(file);
            } catch (error) {
                toast.error('Failed to update profile image');
                console.error('Error updating profile image:', error);
            }
        }
    };

    const handleEditAvatarClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                <div className="absolute bottom-[-150px] left-6 transform -translate-y-20">
                    <motion.div
                        whileHover={{scale: 1.05}}
                        className="relative group"
                        onClick={handleEditAvatarClick}
                    >
                        <img
                            src={imageUrl || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`}
                            alt={`${user?.firstName} ${user?.lastName}`}
                            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <div
                            className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                            <div className="text-white text-center">
                                <svg
                                    className="w-6 h-6 mx-auto mb-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-sm font-medium">Change Photo</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
            />

            {/* User Info */}
            <div className="pt-20 px-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl text-left font-bold text-gray-900">
                            {user?.firstName} {user?.lastName}
                        </h1>
                        <div className="mt-2 space-y-1">
                            <div className="flex items-center text-gray-600">
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                {user?.email}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                {user?.phoneNumber || 'No phone number'}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                Member since {user?.createdAt === "None" ? "None" : formatDate(user?.createdAt)}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default UserProfileHeader; 