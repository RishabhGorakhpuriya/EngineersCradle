// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
    const initialValue = { email: "", password: "" };
    const [credential, setCredential] = useState(initialValue);
    const [error, setError] = useState('');
    const [formError, setFormError] = useState({});
    const navigate = useNavigate();

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
            const response = await axios.post(process.env.REACT_APP_LOGIN_URL, credential);
            localStorage.setItem('token', response.data.token);
            onLogin(); // Call the onLogin function to indicate successful login
            navigate('/products'); // Redirect to products page
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const validate = (values) => {
        const errors = {};
        const getPassword = localStorage.getItem('password');
        if (!values.email) {
            errors.email = "Please enter your email";
        }   
        if (!values.password) {
            errors.password = "Please enter your password";
        }
        else if (values.password.length < 8) {
            errors.password = "Password length must be at least 8 characters";
        }else if(values.password !== getPassword){
            errors.password = "Wrong Password";
        }
        return errors;
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <span>or use your account</span>
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
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default LoginForm;
