import React, { useState } from 'react';

function UserCard({ userType, userName, email, userID }) {
  const [open, setOpen] = useState(false);
  let iconComponent;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  switch (userType) {
    case 'user':
      iconComponent = (
        <svg
          className="w-6 h-6 text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"
          ></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
      break;
    case 'agent1':
    case 'agent2':
    case 'agent3':
      iconComponent = (
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 6L9 17l-5-5"
          ></path>
        </svg>
      );
      break;
    case 'manager':
      iconComponent = (
        <svg
          className="w-6 h-6 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 5l5 5l10-10"
          ></path>
        </svg>
      );
      break;
    case 'admin':
      iconComponent = (
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 14V9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v5"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M22 12h-6"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 22s8-4 8-10h-6"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 22s-8-4-8-10h6"
          ></path>
        </svg>
      );
      break;
    default:
      iconComponent = (
        <svg
          className="w-6 h-6 text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"
          ></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
  }

  const renderImage = () => {
    if (profilePicture) {
      return <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={profilePicture} alt={`${userName} image`} />;
    } else {
      return <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={defaultProfile} alt="Default image" />;
    }
  };

  return (
    <div className="w-full max-w-md bg-primary border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-end p-4">{iconComponent}</div>
      <div className="flex flex-col items-center pb-6">
        <h5 className="mb-1 text-xl font-medium text-gray-800">{userName}</h5>
        <span className="text-sm text-gray-600">{email}</span>
        <span className="text-sm text-gray-600">User ID: {userID}</span>
        <div className="flex mt-4 md:mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-secondary rounded-lg hover:bg-blue-600"
          >
            View Profile
          </button>

          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-secondary rounded-lg hover:bg-indigo-600 ms-3"
            onClick={handleOpen}
          >
            Change Role
          </button>
        </div>
      </div>


      {open && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center backdrop-blur-3 min-h-screen">
            <div className="fixed inset-0 bg-primary opacity-60 "></div>
            <div className="relative z-10 bg-secondary p-6 mx-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Change Role</h2>
              <p>Select a new role for the user:</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => {/* change role to 'user' */ handleClose(); }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  User
                </button>
                <button
                  onClick={() => {/* change role to 'agent' */ handleClose(); }}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Agent
                </button>
                <button
                  onClick={() => {/* change role to 'manager' */ handleClose(); }}
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                >
                  Manager
                </button>
                <button
                  onClick={() => {/* change role to 'admin' */ handleClose(); }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCard;
