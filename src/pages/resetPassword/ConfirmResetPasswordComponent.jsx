import { useState } from 'react';
import { customFetch } from '../../utils/Fetch';
import { useNavigate, useParams } from 'react-router-dom';

export default function ConfirmResetPasswordComponent() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tokenValid, setTokenValid] = useState(true); // New state variable

  const handleConfirmResetToken = async () => {
    const body = { token, password };
    const response = await customFetch(
      process.env.REACT_APP_USERS_URL + 'confirmResetToken',
      'POST',
      body
    );

    if (response.newStatus== 200) {
      // Password reset successful, you can redirect to login page or another page
      console.log('Password reset successfully');
      navigate('/login'); // Redirect to the login page
    } else {
      // Handle error case
      console.error('Error confirming reset token:', response.err);
      setTokenValid(false); // Set tokenValid state to false
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Confirm Reset Password</h1>

        {!tokenValid && (
          <p className="text-red-500 mb-6">Token is invalid. Please try again later.</p>
        )}

        <div className="mb-6">
          <label className="label">
            <span className="label-text">New Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            className="input input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm your new password"
            className="input input-bordered"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <button
            className="btn btn-primary"
            onClick={handleConfirmResetToken}
          >
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
}
