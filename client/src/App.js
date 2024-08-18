// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Form from './Component/From';
import ProductListingPage from './Component/ProductListingPage';
import './style.css'
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/login" element={<Form />} />
                <Route path="/signup" element={<Form />} />
                <Route
                    path="/products"
                    element={
                        localStorage.getItem('token') ? (
                            <ProductListingPage />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
