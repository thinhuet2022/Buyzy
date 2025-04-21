import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Button from './Button';
import authService from '../../services/authService';
import {clearUser} from '../../stores/userSlice';
import Logo from "./Logo.jsx";
import UserProfileDropdown from './UserProfileDropdown';
import cartService from '../../services/cartService';
import userService from '../../services/userService';
const Header = () => {
    const {isAuthenticated, user} = useSelector((state) => state.auth);
    const hasToken = !!authService.getCurrentUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [cartSize, setCartSize] = useState(0);
    const [imageProfile, setImageProfile] = useState(null);
    const handleLogout = () => {
        authService.logout();
        dispatch(clearUser());
        setImageProfile(null);
        setCartSize(0);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/products/search/${encodeURIComponent(searchQuery)}`);
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            const response = await cartService.getCartItemCount();
            if(response) {
                setCartSize(response);
            }
        }
        const fetchImageProfile = async () => {
            const response = await userService.getImageProfile();
            if(response) {
                setImageProfile(response);
            }
        }
        if(isAuthenticated || hasToken) {   
            fetchCartItems();   
            fetchImageProfile();
        }
        else {
            setCartSize(0);
            setImageProfile(null);
        }
    }, [isAuthenticated, hasToken]);

    return (
        <header
            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg flex items-center justify-center">
            <img
                src="/src/assets/logo.png"
                alt="Buyzy Logo"
                className="h-16 w-16 mix-blend-screen"
            />
            <div className="w-full px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Logo/>
                        <nav className="hidden md:flex items-center space-x-6 pl-10">
                            <Link to="/products" className="text-white hover:text-gray-300 transition-colors">
                                All Products
                            </Link>
                        </nav>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:border-white/30"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-black hover:bg-gray-300 rounded-lg p-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center space-x-4">
                        <Link to={"/seller/register"}>
                            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                                Become a Seller
                            </Button>
                        </Link>
                        {/* Cart Button */}
                        <Link to="/cart" className="relative">
                            <button className="p-2 text-white/80 hover:text-black">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="black"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                {cartSize > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartSize}
                  </span>
                                )}
                            </button>
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <UserProfileDropdown user={user} imageProfile={imageProfile}/>
                            </>
                        ) : (
                            <>
                                <Link to="/seller/login">
                                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                                        Sell on Buyzy
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="secondary">
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 