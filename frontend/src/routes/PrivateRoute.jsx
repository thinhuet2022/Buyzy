import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import authService from '../services/authService';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const hasToken = !!authService.getCurrentUser();

    if (!isAuthenticated || !hasToken) {
        // Redirect to login page but save the attempted url
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
};

export default PrivateRoute; 