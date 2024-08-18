// src/components/Form.js
import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const Form = () => {
    const [formType, setFormType] = useState('signIn');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleFormChange = (type) => {
        setFormType(type);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const containerClass = `container ${formType === 'signUp' ? 'right-panel-active' : ''}`;

    return (
        <div className="App">
            <div className={containerClass} id="container">
                {formType === 'signIn' ? (
                    <LoginForm onLogin={handleLogin} />
                ) : (
                    <RegistrationForm onSuccess={() => handleFormChange('signIn')} />
                )}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={() => handleFormChange('signIn')}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button
                                className="ghost"
                                id="signUp"
                                onClick={() => handleFormChange('signUp')}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
