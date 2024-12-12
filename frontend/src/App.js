import React from 'react';
import CreateProduct from './components/CreateProduct';
import Navbar from './components/page/Navbar';
import Home from './components/Home';
import Footer from './components/page/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Toast from './components/Toast';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './css/App.css'
import './css/Toast.css'

function App() {
    const [toasts, setToasts] = useState([]);

    //Thêm sp vào Cart
    const handleAddToCart = (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in to add products to your cart.');
            return;
        }

        if (productId) {
            axios.post(`http://localhost:5000/cart/${productId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                },
            })
                .then((response) => {
                    console.log('Product added to cart:', response.data);
                    alert('Product added to cart successfully!');
                })
                .catch((error) => {
                    console.error('Error adding product to cart:', error.response?.data || error.message);
                    if (error.response) {
                        alert(`Error: ${error.response.data.message}`);
                    } else {
                        alert('An error occurred, please try again.');
                    }
                });
        }
    };

    //Hien Toast
    function showSuccessToast({ title = "Sản phẩm đã được thêm!", type = "success", duration = 2500 } = {}) {
        const id = Date.now();
        setToasts((prevToasts) => [
            ...prevToasts,
            { id, title, type, duration },
        ]);
    }

    function removeToast(id) {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }

    return (
        <BrowserRouter>
            <div>
                <div id="toast">
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            title={toast.title}
                            type={toast.type}
                            duration={toast.duration}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </div>

                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/create" element={<CreateProduct />} />
                        <Route path="/" element={<Home handleAddToCart={handleAddToCart} showSuccessToast={showSuccessToast} />} />
                        <Route path="/shop" element={<ProductList handleAddToCart={handleAddToCart} showSuccessToast={showSuccessToast} />} />
                        <Route path="/product/:slug" element={<ProductDetail handleAddToCart={handleAddToCart} showSuccessToast={showSuccessToast} />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    )
}
export default App;
