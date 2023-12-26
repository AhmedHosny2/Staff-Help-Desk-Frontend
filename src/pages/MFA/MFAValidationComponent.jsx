// MFAValidationComponent.js
import { useState } from 'react';
import { customFetch } from '../../utils/Fetch';
import { useNavigate } from 'react-router-dom';

export default function MFAValidationComponent({ email }) {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleValidationClick = async () => {
    setIsSubmitting(true);

    const body = { otp };

    // Adjust the endpoint based on your API
    const { err, isPen, newData, newStatusText, newMessage } = await customFetch(
      process.env.REACT_APP_USERS_URL + 'validateMfa',
      'POST',
      body
    );
    localStorage.setItem('loggedin', 'true');

    // Handle the response as needed
    if (newStatusText === 'confirmed') {
      // Redirect to home if MFA validation is successful
      console.log('MFA validated successfully');
      localStorage.setItem('role', newData.role);
      localStorage.setItem('MFA','');
      navigate('/home/user'); // Adjust the route as needed
    } else {
      // Handle error case
      console.error('MFA validation failed:', newMessage);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">MFA Authentication</h1>
          <div className="mb-6">  
            <input
              type="text"
              placeholder="Enter your MFA code"
              className="input input-bordered"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <button
              className="btn btn-primary"
              onClick={handleValidationClick}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Validating' : 'Validate'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}