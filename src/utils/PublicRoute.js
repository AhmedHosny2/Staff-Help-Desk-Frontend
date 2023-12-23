import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element, isLoggedin, fallbackPath = '/' }) => {
	return !isLoggedin ? element : <Navigate to={fallbackPath} replace />;
};

export default PublicRoute;
