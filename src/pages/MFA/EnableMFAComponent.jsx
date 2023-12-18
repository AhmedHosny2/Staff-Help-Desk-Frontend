import { useState, useEffect } from 'react';
import { customFetch } from '../../utils/Fetch';
import { useNavigate } from 'react-router-dom';

export default function EnableMFAComponent() {
  const navigate = useNavigate();
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [otp, setOtp] = useState('');
  const [isEnabling, setIsEnabling] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState('');
  const [verificationError, setVerificationError] = useState(null);
  const [isMFAEnabled, setIsMFAEnabled] = useState(false);

  useEffect(() => {
    // Fetch the QR code image when the component mounts
    fetchQRCode();
  }, []);

  const fetchQRCode = async () => {
    setIsEnabling(true);

    // Adjust the endpoint based on your API
    const response = await customFetch(
      process.env.REACT_APP_USERS_URL + 'enableMfa',
      'POST'
    );
    if (!response.err && !response.isPen) {
      setQrCodeImage(response.newData);
    } else {
      // Handle error case
      console.error('Error fetching QR code:', response.err);
    }

    setIsEnabling(false);
  };

  const handleVerificationClick = async () => {
    setIsVerifying(true);

    const body = { otp };

    // Adjust the endpoint based on your API
    const response = await customFetch(
      process.env.REACT_APP_USERS_URL + 'verifyMfa',
      'POST',
      body
    );
    if (response.newStatus === 200) {
      setVerificationResult(response.newData);

      // Set the state to indicate that MFA is enabled successfully
      setIsMFAEnabled(true);

      // Simulate a delay before redirecting to /home
      setTimeout(() => {
        navigate('/home/user');
      }, 2000); // 2000 milliseconds (2 seconds)
    } else {
      // Handle error case
      console.error('Error verifying MFA:', response.err);
      setVerificationError(response.err || 'you entered a wrong pin, please try again');
    }

    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Enable MFA</h1>

        {/* Show QR code image if available */}
        {qrCodeImage && (
          <div className="mb-6 text-center">
            <img src={qrCodeImage} alt="QR Code" className="mx-auto w-64 h-64" />
          </div>
        )}

        {/* Show textbox and Verify button if QR code image is shown */}
        {qrCodeImage ? (
          <div>
            <div className="mb-6">
              <label className="label">
                <span className="label-text">MFA Code</span>
              </label>
              <input
                type="text"
                placeholder="Enter your MFA code"
                className="input input-bordered"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <button
                className="btn btn-primary"
                onClick={handleVerificationClick}
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying MFA...' : 'Verify MFA'}
              </button>
            </div>

            {/* Display verification error */}
            {verificationError && (
              <div className="text-red-500">
                <p>{verificationError}</p>
              </div>
            )}
          </div>
        ) : (
          // Show Enable button if QR code image is not shown
          <div className="mb-6">
            <button
              className="btn btn-primary"
              onClick={fetchQRCode}
              disabled={isEnabling}
            >
              {isEnabling ? 'Enabling MFA...' : 'Enable MFA'}
            </button>
          </div>
        )}

        {/* Display verification result and success message */}
        {verificationResult && (
          <div className="text-green-500">
            <p>{verificationResult}</p>
          </div>
        )}
        
        {/* Display MFA enabled success message */}
        {isMFAEnabled && (
          <div className="text-green-500">
            <p>MFA enabled successfully. You are being redirected to home...</p>
          </div>
        )}
      </div>
    </div>
  );
}
