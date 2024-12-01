import React from 'react';
import CreateProduct from './components/CreateProduct';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Toast from './components/Toast';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import './css/App.css'
import './css/Toast.css'

function App() {

    const [toasts, setToasts] = useState([]);

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

                <nav className="nav">
                    <div>
                        <Link to='/' className='name-shop'>
                            <FontAwesomeIcon className='faWind' icon={faWind} />
                            Cuncitizen
                        </Link>
                    </div>

                    <div className='nav-header-between'>
                        <NavLink to='/' className='nav-header-between_home' activeClassName='active'>Trang chủ</NavLink>
                        <NavLink to='/shop' className='nav-header-between_shop' activeClassName='active'>Cửa hàng</NavLink>
                        <NavLink to='/cart' className='nav-header-between_cart' activeClassName='active'>Giỏ hàng</NavLink>
                    </div>

                    <div className='nav-header-right'>
                        <Link to='/cart' className='nav-header-right_cart'>
                            <FontAwesomeIcon className='faCartShopping' icon={faCartShopping} />
                        </Link>
                        /
                        <Link to='/login' className='nav-header-right_sign'>
                            <FontAwesomeIcon className='faUser' icon={faUser} />
                            Đăng nhập
                        </Link>
                    </div>
                </nav>

                <div>
                    <Routes>
                        <Route path="/create" element={<CreateProduct />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<ProductList showSuccessToast={showSuccessToast} />} />
                        <Route path="/product/:slug" element={<ProductDetail showSuccessToast={showSuccessToast} />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>

                <footer>
                    <div className='row detail_page footer'>
                        <ul className="col col-3">
                            <p>CunCitizen
                                <br />
                                <li> Mang lại những món hàng về quần áo hữu dụng trong cuộc sống hằng ngày, mua sắm nhanh chóng với trang web dễ nhìn và tương tác.</li>
                            </p>

                        </ul>

                        <ul className="col col-3">
                            <p>Danh Mục Hàng Đầu
                                <br />
                                <li></li>
                                <li></li>
                                <li></li>
                            </p>

                        </ul>

                        <ul className="col col-3">
                            <p>Liên kết hữu ích
                                <br />
                                <li>
                                    <Link className='footer-link' to='/shop'>Cửa hàng</Link>
                                </li>
                                <li>
                                    <Link className='footer-link' to='/cart'>Giỏ hàng</Link>
                                </li>
                                <li>
                                    <Link className='footer-link' to='/login'>Đăng nhập</Link>
                                </li>
                            </p>
                        </ul>

                        <ul className="col col-3">
                            <p>Thông Tin Liên Hệ
                                <br />
                                <li>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    412/1 Tôn Đức Thắng, Đà Nẵng
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faPhone} />
                                    +363866809
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    canh038472@gmail.com
                                </li>
                            </p>
                        </ul>

                        <ul>
                            <li>Copyright © CunCitizen</li>
                        </ul>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    )
}
export default App;
