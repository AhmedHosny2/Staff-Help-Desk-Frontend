import React, { useState } from 'react';
import { customFetch } from '../../utils/Fetch';
import { getToastStyle, removeToast } from '../../utils/toastStyle';
import toast, { Toaster } from 'react-hot-toast';

function AddUser() {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        role: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const someNull = Object.values(user).some((x) => x === '');
        if (someNull === true) {
            let nullKeys = '';
            Object.entries(user)
                .filter(([k, v]) => v === '')
                .forEach(([k]) => (nullKeys += `${k} `));
            toastId = toast.error(`Please fill the following data : ${nullKeys}`, getToastStyle());
            return;
        }
        const { err, isPen, newMessage, newStatus } = await customFetch(
            `${process.env.REACT_APP_USERS_URL}adminAddUser`,
            "POST",
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                phoneNumber: user.phoneNumber,
                address: user.address,
                role: user.role,
            }
        );

        if (newStatus === 200) {
            setUser({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phoneNumber: '',
                address: '',
                role: '',
            })
            var toastId = toast.success("User added Succesfully", getToastStyle());
        }
        else {
            toastId = toast.error(newMessage, getToastStyle());
        }
        removeToast(toast, toastId);

    }

    return (
        <>
            <h1 className="text-3xl font-bold text-center flex items-center justify-center h-full pt-4">Add a user</h1>
            <div className="hero min-h-screen pt-0">
                <div className="hero-content pt-0">
                    <div className="card shrink-0 w-full max-w-3xl shadow-2xl pt-0">
                        <div className="card-body ">
                            <div className="flex lg:flex-row flex-col">
                                <div className="flex-1 lg:mr-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">First Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John"
                                            className="input input-bordered"
                                            name="firstName"
                                            value={user.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Last Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Doe"
                                            className="input input-bordered"
                                            name="lastName"
                                            value={user.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex lg:flex-row flex-col">
                                <div className="flex-1 lg:mr-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone number</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="012345678901"
                                            className="input input-bordered"
                                            name="phoneNumber"
                                            value={user.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Address</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="jenkings street; building no. 34; 5th floor"
                                            className="input input-bordered"
                                            address
                                            name="address"
                                            value={user.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    className="input input-bordered"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="input input-bordered"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Role</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    name="role"
                                    value={user.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Select User Role</option>
                                    <option value="user">User</option>
                                    <option value="agent1">Agent1</option>
                                    <option value="agent2">Agent2</option>
                                    <option value="agent3">Agent3</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="form-control mt-6">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmit}>
                                    Add User</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
}
export default AddUser;