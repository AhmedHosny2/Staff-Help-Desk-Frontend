import React from 'react';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function UserCard({ userType, userName, email, userID }) {
  let iconComponent;

  switch (userType) {
    case 'user':
      iconComponent = <PersonIcon />;
      break;
    case 'agent1' || 'agent2' || 'agent3':
      iconComponent = <SupportAgentIcon />;
      break;
    case 'manager':
      iconComponent = <ManageAccountsIcon />;
      break;
    case 'admin':
      iconComponent = <AdminPanelSettingsIcon />;
      break;
    default:
      iconComponent = <PersonIcon />;
  }

  return (
    <div className="w-full max-w-sm bg-base-100 border border-base-200 rounded-lg shadow">
      <div className="flex justify-end px-4 pt-4">
        <span id="dropdownButton" className="inline-block text-primary-content text-sm p-1.5">
          <span className="sr-only">Open dropdown</span>
          {iconComponent}
        </span>
      </div>
      <div className="flex flex-col items-center pb-10">
        <h5 className="mb-1 text-xl font-medium text-gray-900">{userName}</h5>
        <span className="text-sm text-primary-content">{email}</span>
        <span className="text-sm text-primary-content">User ID: {userID}</span>
        <div className="flex mt-4 md:mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-primary-content bg-primary rounded-lg hover:bg-base-100"
          >
            View Profile
          </button>

          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-primary-content bg-secondary rounded-lg hover:bg-base-100 ms-3"
          >
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
