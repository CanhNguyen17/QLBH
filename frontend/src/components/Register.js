import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';
import '../css/Register.css'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:5000/register', { email, password })
            .then((response) => {
                setMessage('Đăng ký thành công! Vui lòng đăng nhập');
            })
            .catch((error) => {
                setMessage('Đăng ký thất bại');
            });
    };

    return (
        <div className="img-login-register">
            <div className="register">
                <p className="register-title">Đăng ký</p>
                <form className="register-form" onSubmit={handleRegister}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email" />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Mật khẩu" />

                    <button type="submit">Đăng ký</button>

                    <p className="register-question">Đã có tài khoản?
                        <Link className="link-to_login" to={`/login`}> Đăng nhập ngay</Link>
                    </p>
                </form>

                <span>
                    <p>{message}</p>
                </span>
            </div>
        </div>
    )
}
export default Register;