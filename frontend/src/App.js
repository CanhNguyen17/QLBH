import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProduct from './components/CreateProduct';
import Navbar from './components/pages/Navbar';
import Home from './components/Home';
import Footer from './components/pages/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Toast from './components/Toast';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Checkout from './components/Checkout';
import Order from './components/Order';
import './css/App.css'
import './css/Toast.css'

function App() {
    const [toasts, setToasts] = useState([]);

    //Thêm sp vào Cart
    const handleAddToCart = (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            showLoginToast();
            return;
        } else {
            showSuccessToast()
        }

        if (productId) {
            axios.post(`http://localhost:5000/cart/${productId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                },
            })
                .then((response) => {
                    console.log('Product added to cart:', response.data);
                })
                .catch((error) => {
                    console.error('Error adding product to cart:', error.response?.data || error.message);
                });
        }
    };
    //Hien Toast bắt phải đăng nhập
    function showLoginToast({ title = "Hãy đăng nhập trước!", type = "warning", duration = 2500 } = {}) {
        const id = Date.now();
        setToasts((prevToasts) => [
            ...prevToasts,
            { id, title, type, duration },
        ]);
    }
    //Hien Toast
    function showSuccessToast({ title = "Sản phẩm đã được thêm!", type = "success", duration = 2500 } = {}) {
        const id = Date.now();
        setToasts((prevToasts) => [
            ...prevToasts,
            { id, title, type, duration },
        ]);
    }
    // Toast LOGIN thành công
    function showSuccessLoginToast({ title = "Đăng nhập thành công!", type = "success", duration = 2500 } = {}) {
        const id = Date.now();
        setToasts((prevToasts) => [
            ...prevToasts,
            { id, title, type, duration },
        ]);
    }
    // Toast LOGOUT thành công
    function showLogoutToast({ title = "Đăng xuất thành công!", type = "success", duration = 2500 } = {}) {
        const id = Date.now();
        setToasts((prevToasts) => [
            ...prevToasts,
            { id, title, type, duration },
        ]);
    }
    // Toast ORDER thành công
    function showOrderToast({ title = "Đặt hàng thành công!", type = "success", duration = 2500 } = {}) {
        const id = Date.now();
        setToasts((prevToasts) => [
            ...prevToasts,
            { id, title, type, duration },
        ]);
    }
    //xoa toast
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
                    <Navbar showLogoutToast={showLogoutToast} />

                    <Routes>
                        <Route path="/create" element={<CreateProduct />} />
                        <Route path="/" element={<Home handleAddToCart={handleAddToCart} />} />
                        <Route path="/shop" element={<ProductList handleAddToCart={handleAddToCart} />} />
                        <Route path="/product/:slug" element={<ProductDetail handleAddToCart={handleAddToCart} />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login showSuccessLoginToast={showSuccessLoginToast} />} />
                        <Route path="/checkout" element={<Checkout showOrderToast={showOrderToast} />} />
                        <Route path="/order" element={<Order />} />
                    </Routes>

                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    )
}
export default App;
