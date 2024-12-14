import { useFormik } from 'formik';
import { useDispatch } from "react-redux"
import { setLogin } from '../../redux/index.js';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginValidationSchema } from '../../validation.js';
import Notification from '../../component/notification/Notification.jsx';

import("./Login.css");






const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [email, setEmail] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [notification, setNotification] = useState(null); // State for notification

    // wrong management
    const handleWrong = () => {
        setWrong(false)
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
        validationSchema: loginValidationSchema,
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values, errors) => {
            await axios.post(`${process.env.REACT_APP_END_POINT}/auth/login`, values, { withCredentials: true }).then((res) => {
                const user = res.data.user;
                const token = res.data.token;
                console.log(user, token)
                dispatch(setLogin({ user, token }))
                // Show success notification
                setNotification({ status: 'success', text: 'Login successful!' });

                // Hide notification after 2 seconds
                setTimeout(() => {
                    setNotification(null);
                    navigate('/'); // Navigate after the notification disappears
                }, 2000);

            }).catch(error => {
                console.log("login error")
                if (error.response.data.msg == "wrong password") {
                    setWrong(true);
                }
                // Show error notification
                setNotification({ status: 'failed', text: "Email or password mismatch!" });
                setTimeout(() => setNotification(null), 2000);


            })
        }
    })

    return (
        <>

            {/* Notification Box */}
            {notification && <Notification status={notification.status} text={notification.text} />}
            
            <div className="loginContainer formContainer">

                <form className="loginBox formBox" onSubmit={handleSubmit} >
                    <div className="inputContainer">
                        <input type="text" placeholder='Email' name="email" value={values.email} onChange={handleChange} onKeyUp={handleWrong} />

                        <p>{email ? "email alredy used" : errors.email}</p>
                    </div>

                    <div className="inputContainer">
                        <input type="password" placeholder='Password' name="password" value={values.password} onChange={handleChange} onKeyUp={handleWrong} />
                        <p>{errors.password}</p>
                        {wrong && <div className='wrong'>username and password mismatch</div>}
                    </div>


                    <input type='submit' value="Login" className='loginButton' />
                    <hr />
                    <p className='forgetPass'>Forget Password?</p>
                    <div className='pageChange'>

                        <NavLink to="/register"> Create New Account</NavLink>

                    </div>
                </form>
            </div>
        </>
    )
}

export default Login