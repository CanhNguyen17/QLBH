import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/CreateProduct.css'

function CreateProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    //
    const navigate = useNavigate();
    //
    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = {
            name,
            description,
            image,
            oldPrice,
            newPrice,
            location,
            category
        };

        axios.post('http://localhost:5000/products/create', productData)
            .then(response => {
                navigate("/shop");
            })
            .catch(error => {
                console.error('Error creating product:', error);  // Log lỗi khi tạo sản phẩm
            });
    };

    return (
        <div>
            <div className='rowrow'>
                <div className="col col-12 img-extra">Tạo sản phẩm</div>
            </div>

            <div className='container'>

                <h2 className='text-create-product'>Tạo sản phẩm mới</h2>

                <form id='form' onSubmit={handleSubmit}>

                    <div className='form-input'>
                        <label>Tên:</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Loại danh mục:</label>
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option>Chọn</option>
                            <option>Dây đeo</option>
                            <option>Khăn choàng</option>
                            <option>Vớ</option>
                            <option>Quần</option>
                            <option>Chân váy</option>
                        </select>
                    </div>

                    <div className='form-description-textarea'>
                        <label>Mô tả:</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} maxLength="600" />
                    </div>

                    <div className='form-input'>
                        <label>Image URL:</label>
                        <input type="text" onChange={(e) => setImage(e.target.value)} maxLength="255" />
                    </div>

                    <div className='form-input'>
                        <label>Gía cũ:</label>
                        <input type="text" onChange={(e) => setOldPrice(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Gía mới:</label>
                        <input type="text" onChange={(e) => setNewPrice(e.target.value)} required />
                    </div>

                    <div className='form-input'>
                        <label>Vị trí:</label>
                        <input type="text" onChange={(e) => setLocation(e.target.value)} maxLength="20" />
                    </div>

                    <button className='create-prd-button' type="submit">Tạo sản phẩm</button>

                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
