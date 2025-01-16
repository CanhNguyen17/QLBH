import React, { useEffect, useContext } from 'react';
import { ProfileContext } from './contexts/ProfileContext';
import { ToastContext } from "./contexts/ToastContext";
import axios from 'axios';
import '../css/Profile.css'

function Profile() {
    const { username, phonenumber, address, city, country, setUsername, setPhonenumber, setAddress, setCity, setCountry } = useContext(ProfileContext)
    const { showToast } = useContext(ToastContext)
    // Hàm fetchData để lấy dữ liệu từ API và cập nhật trạng thái
    const fetchData = () => {
        axios.get('http://localhost:5000/profile')
            .then(response => {
                const { username, phonenumber, address, city, country } = response.data;
                setUsername(username || '');
                setPhonenumber(phonenumber || '');
                setAddress(address || '');
                setCity(city || '');
                setCountry(country || '');
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            console.error('Người dùng chưa đăng nhập');
        } else {
            fetchData();
        }
    }, [])

    //
    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedData = {
            username,
            phonenumber,
            address,
            city,
            country,
        };

        axios.put('http://localhost:5000/profile', updatedData)
            .then(response => {
                // Cập nhật trạng thái trực tiếp từ dữ liệu trả về
                const { username, phonenumber, address, city, country } = response.data;
                setUsername(username || '');
                setPhonenumber(phonenumber || '');
                setAddress(address || '');
                setCity(city || '');
                setCountry(country || '');
                //
                showToast({ title: "Cập nhật thành công!", type: "success" });
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };

    return (
        <div>
            <div className="row">
                <div className="col col-12 img-extra">Hồ sơ</div>
            </div>

            <div className="row container-profile">
                <div className="col col-4 img-change_profile">
                    <img src="data:image/png;base64,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" alt="User Profile" />
                    <p>Cập nhật ảnh</p>
                </div>

                <form className="col col-8 response-profile" onSubmit={handleUpdate}>
                    <p className='text-profile'>Thông tin</p>

                    <div className='form-input_profile'>
                        <label>Tên người dùng:</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} maxLength="600" />
                    </div>

                    <div className='form-input_profile'>
                        <label>Số điện thoại:</label>
                        <input type="text" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} maxLength="255" />
                    </div>

                    <div className='form-des-textarea_profile'>
                        <label>Địa chỉ nhà:</label>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>

                    <div className='form-input_profile'>
                        <label>Thành phố:</label>
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>

                    <div className='form-input_profile'>
                        <label>Nước:</label>
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </div>

                    <div className='button_profile'>
                        <button type="submit">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
