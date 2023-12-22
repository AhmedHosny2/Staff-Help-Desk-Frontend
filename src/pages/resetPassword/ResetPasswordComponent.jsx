// ResetPasswordRequestComponent.jsx
import { useState } from 'react';
import { customFetch } from '../../utils/Fetch';

export default function ResetPasswordRequestComponent() {
  const [email, setEmail] = useState('');
  const [resetTokenSent, setResetTokenSent] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const handleSendResetToken = async () => {
    const body = { email };
    const response = await customFetch(
      process.env.REACT_APP_USERS_URL + 'resetPassword',
      'POST',
      body
    );

    // Log the entire response for debugging
    console.log('Full API Response:', response);

    if ( response.newStatus== 200) {
      setResetTokenSent(true);
      setResultMessage('A reset password link will be sent to this email if it exists on our website!');
    } else {
      setResultMessage('Error sending reset token. Please try again.'); // Set an error message
      console.error('Error sending reset token:', response.err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Reset Password</h1>

        {resultMessage && (
          <p className={resetTokenSent ? 'text-green-500 mb-6' : 'text-red-500 mb-6'}>
            {resultMessage}
          </p>
        )}

        {resetTokenSent ? (
          // Render additional content if reset token is sent
          <div>
            {/* ... existing code ... */}
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <button
                className="btn btn-primary"
                onClick={handleSendResetToken}
              >
                Send Reset Token
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
