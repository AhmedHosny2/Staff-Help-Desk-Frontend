import { useNavigate } from 'react-router-dom';

const loggedin = localStorage.getItem('loggedin');

const PublicRoute = ({ element, fallbackPath }) => {
	const navigate = useNavigate();

	if (!loggedin) {
		return element;
	} else {
		navigate(fallbackPath);
		return null;
	}
};

export default PublicRoute;
