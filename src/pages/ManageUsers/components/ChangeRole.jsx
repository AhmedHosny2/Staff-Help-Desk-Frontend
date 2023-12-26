import React, { useState } from 'react';
import { customFetch } from '../../../utils/Fetch';
import toast, { Toaster } from 'react-hot-toast';
import { getToastStyle, removeToast } from '../../../utils/toastStyle';


function ChangeRole({ isModalOpen, closeModal, userId, role }) {
  const [selectedRole, setSelectedRole] = useState(role);

  const handleRoleChange = async () => {
    const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
      `${process.env.REACT_APP_USERS_URL}updateRole`,
      "PUT",
      {
        role: selectedRole,
        userId
      }
    );
    if (newStatus === 200) {
      var toastId = toast.success(`User Role Changed Succesfully`, getToastStyle());
    }
    else {
      toastId = toast.error(`An error has occured`, getToastStyle());
    }

    removeToast(toast, toastId);
  };

  return (
    <div>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
              <div className="bg-white rounded-lg p-8 z-20" style={{ width: '100vw', maxWidth: '500px' }}>
                <h2 className="text-2xl font-semibold text-center">Choose the appropriate role :</h2>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <span className="indicator-item badge badge-secondary mr-2">User</span>
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio"
                      defaultChecked={role === 'user'}
                      onChange={() => setSelectedRole('user')}
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="indicator-item badge badge-secondary mr-2">Agent 1</span>
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio"
                      defaultChecked={role === 'agent1'}
                      onChange={() => setSelectedRole('agent1')}
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="indicator-item badge badge-secondary mr-2">Manager</span>
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio"
                      defaultChecked={role === 'manager'}
                      onChange={() => setSelectedRole('manager')}
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="indicator-item badge badge-secondary mr-2">Agent 2</span>
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio"
                      defaultChecked={role === 'agent2'}
                      onChange={() => setSelectedRole('agent2')}
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="indicator-item badge badge-secondary mr-2">Admin</span>
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio"
                      defaultChecked={role === 'admin'}
                      onChange={() => setSelectedRole('admin')}
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="indicator-item badge badge-secondary mr-2">Agent 3</span>
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio"
                      defaultChecked={role === 'agent3'}
                      onChange={() => setSelectedRole('agent3')}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    className="button w-full bg-secondary text-neutral px-4 py-2 rounded-full"
                    onClick={handleRoleChange}
                  >
                    Change Role
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Toaster />
        </>
      )}
    </div>
  );
}

export default ChangeRole;
