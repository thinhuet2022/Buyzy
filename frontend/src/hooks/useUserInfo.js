import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, setError} from '../stores/userSlice';
import userService from '../services/userService';

const useUserInfo = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (isAuthenticated && !user) {
                try {
                    const userData = await userService.getProfile();
                    dispatch(setUser(userData));
                } catch (error) {
                    dispatch(setError(error.message));
                    console.error('Error fetching user info:', error);
                }
            }
        };

        fetchUserInfo();
    }, [isAuthenticated, user, dispatch]);

    return {user, isAuthenticated};
};

export default useUserInfo; 