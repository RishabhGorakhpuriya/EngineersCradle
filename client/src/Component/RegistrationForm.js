// src/components/RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ onSuccess }) => {
    const initialValue = { email: "", password: "" };
    const [credential, setCredential] = useState(initialValue);
    const [error, setError] = useState('');
    const [formError, setFormError] = useState({});

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(credential);
        setFormError(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }
        

        try {
            console.log(process.env.REACT_APP_SIGNUP_URL);
            await axios.post(process.env.REACT_APP_SIGNUP_URL, credential);
            alert('Successfully Registered');
            localStorage.setItem('password', credential.password);
            localStorage.setItem('email', credential.email);
            
            onSuccess(); // Call the onSuccess function to switch to login form
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!values.email) {
            errors.email = "Please enter your email";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format";
        }
        if (!values.password) {
            errors.password = "Please enter the password";
        } else if (values.password.length < 8) {
            errors.password = "Password length must be at least 8 characters";
        }
        const getUser = localStorage.getItem('email');
        if(values.email === getUser){
            errors.email = "User already exists";
        }
        return errors;
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                {/* <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"/></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
                </div> */}
                <span>or use your email for registration</span>
                <input
                    type="email"
                    name="email"
                    value={credential.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <span className="error-message">{formError.email}</span>
                <input
                    type="password"
                    name="password"
                    value={credential.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <span className="error-message">{formError.password}</span>
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
