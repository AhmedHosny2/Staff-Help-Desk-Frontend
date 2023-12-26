import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChangeRole from './ChangeRole';
import defaultProfile from '../../../assets/defaultProfile.jpg';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function UserCard({ userType, userName, email, userID, role, profilePicture }) {
  const [isModalOpen, setModalOpen] = useState(false);

  let iconComponent;

  switch (userType) {
    case 'user':
      iconComponent = <PersonIcon />;
      break;
    case 'agent1':
    case 'agent2':
    case 'agent3':
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

  const renderImage = () => {
    if (profilePicture) {
      return <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={profilePicture} alt={`${userName} image`} />;
    } else {
      return <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={defaultProfile} alt="Default image" />;
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full max-w-sm bg-base-100 border border-base-200 rounded-lg shadow">
      <div className="flex justify-end px-4 pt-4">
        <span id="dropdownButton" className="inline-block text-primary-content text-sm p-1.5">
          <span className="sr-only">Open dropdown</span>
          {iconComponent}
        </span>
      </div>
      <div className="flex flex-col items-center pb-10">
        {renderImage()}
        <h5 className="mb-1 text-xl font-medium text-gray-900">{userName}</h5>
        <span className="text-sm text-primary-content">{email}</span>
        <span className="text-sm text-primary-content">User ID: {userID}</span>
        <div className="flex mt-4 md:mt-6">
          <Link
            to={"/profile/" + userID}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-primary-content bg-primary rounded-lg hover:bg-base-100"
          >
            View Profile
          </Link>

          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-primary-content bg-secondary rounded-lg hover:bg-base-100 ms-3"
          >
            Change Role
          </button>
        </div>
      </div>

      <ChangeRole isModalOpen={isModalOpen} closeModal={closeModal} userId={userID} role={role} />

    </div>
  );
}

export default UserCard;