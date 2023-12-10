import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isLoggedin, fallbackPath = '/' }) => {
	return isLoggedin ? element : <Navigate to={fallbackPath} replace />;
};

export default PrivateRoute;
