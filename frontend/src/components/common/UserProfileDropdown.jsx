import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {clearUser} from '../../stores/userSlice';
import authService from '../../services/authService';
import { logoutUser } from '../../stores/authSlice';
const UserProfileDropdown = ({user, imageProfile}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutUser();
        authService.logout();
        dispatch(clearUser());
        navigate('/login');
        window.location.reload();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>

            <img
                src={imageProfile || 'https://ui-avatars.com/api/?name=ThinhNguyen&background=random'}
                alt="User avatar"
                className="w-12 h-12 object-cover rounded-full"
                onClick={() => setIsOpen(!isOpen)}
                style={{cursor: 'pointer'}}
            />

            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50 text-center">
                    <Link
                        to="/profile"
                        className="block py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        Profile
                    </Link>
                    <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        Order History
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-center rounded-md px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown; 