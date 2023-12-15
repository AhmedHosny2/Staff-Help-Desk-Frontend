import React, { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function ManageUsers() {
    const numberOfCards = 11;
    const cardsArray = Array.from({ length: numberOfCards }, (_, index) => index);
    return (
        <>
            <div className="w-90 flex p-4">
                <div className="join flex-grow ">
                    <div className="w-5/6">
                        <div>
                            <input className="input input-bordered join-item w-full" placeholder="Search" />
                        </div>
                    </div>
                    <select className="select select-bordered join-item w-1/6 focus:outline-none">
                        <option disabled selected>Filter</option>
                        <option>User Id</option>
                        <option>Name</option>
                        <option>Email</option>
                    </select>
                    <div className="indicator">
                        <button className="btn join-item">Search</button>
                    </div>
                </div>
            </div>
            <div className="w-3/4 mx-auto flex p-4 gap-4">
                <div className="badge badge-outline w-1/4">User<PersonIcon /></div>
                <div className="badge badge-outline w-1/4">Support Agent<SupportAgentIcon /></div>
                <div className="badge badge-outline w-1/4">Manager<ManageAccountsIcon /></div>
                <div className="badge badge-outline w-1/4">Admin<AdminPanelSettingsIcon /></div>
            </div>
            <div className="flex flex-wrap justify-around gap-4">
                {cardsArray.map((cardIndex) => (
                    <UserCard key={cardIndex} userType="manageAccounts" userName="Alice Smith" email="alice.smith@example.com" userID="121121" />

                ))}
            </div>
        </>
    );
}
export default ManageUsers;