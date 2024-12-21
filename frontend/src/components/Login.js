import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'

function Login({ showSuccessLoginToast }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/login', { email, password })
            .then((response) => {
                const { token, username } = response.data;
                login(token, username);
                showSuccessLoginToast();
                navigate("/");
            })
            .catch((error) => {
                setMessage('Đăng nhập thất bại');
            });
    };

    return (
        <div className="img-login-register">
            <div className="login">
                <p className="login-title">Đăng nhập</p>
                <form className="login-form" onSubmit={handleLogin}  >
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

                    <button type="submit">Đăng nhập</button>

                    <p className="login-question">Bạn chưa Đăng ký?
                        <Link className="link-to_register" to={`/register`}> Đăng ký ngay</Link>
                    </p>
                </form>
                <span>
                    <p>{message}</p>
                </span>
            </div>
        </div>
    )
}

export default Login;