


import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { registerValidationSchema } from '../../validation.js';
import Notification from '../../component/notification/Notification.jsx';

import './Register.css';

const Register = ({showNotification}) => {
    const [emailError, setEmailError] = useState(''); // Email error message state
    const [notification, setNotification] = useState(null); // State for notification
    const navigate = useNavigate();

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            // role: '',
            password: '',
            address: '', // Add initial value for address
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_END_POINT}/auth/register`, values);
                 // Simulate a successful login
      showNotification("success", "Login successful!");
                
                    navigate('/login'); // Navigate after the notification disappears
               
            } catch (error) {
                console.error('Register error:', error);
                // Handle specific errors like email already in use
                if (error.response?.data?.message?.includes('email')) {
                    setEmailError('Email already in use');
                }
                 // Show error notification
                 showNotification("error", "Login failed!");
            }
        },
    });

    const handleEmailChange = (event) => {
        handleChange(event);
        setEmailError(''); // Clear email error on change
    };

    return (
        <>

            {/* Notification Box */}
            {notification && <Notification status={notification.status} text={notification.text} />}

            {/* Register section */}
            <div className="registerContainer formContainer">
                <form className="registerBox formBox" onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        <p>{errors.name}</p>
                    </div>

                    <div className="inputContainer">
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleEmailChange}
                        />
                        <p>{emailError || errors.email}</p>
                    </div>

                    <div className="inputContainer">
                        <input type="phone" placeholder="Phone" name="phone" value={values.phone} onChange={handleChange} />
                        <p>{errors.phone}</p>
                    </div>

                    {/* <div className="inputContainer">
                        <p className="role">Select Role</p>
                        <label>
                            <select name="role" value={values.role} onChange={handleChange}>
                                <option value="Seller">Seller</option>
                                <option value="Buyer">Buyer</option>
                            </select>
                        </label>
                        <p>{errors.role}</p>
                    </div> */}

                    <div className="inputContainer">
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                        />
                        <p>{errors.address}</p> </div>

                    <div className="inputContainer">
                        <input type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} />
                        <p>{errors.password}</p>
                    </div>

                    <input type="submit" value="Register" className="registerButton" />

                    <hr />
                    <div className="pageChange">
                        <p>Already have an account?</p>
                        <NavLink to="/login">Login</NavLink>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;