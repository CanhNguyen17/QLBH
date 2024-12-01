import React, { useState } from 'react';
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
        };

        axios.post('http://localhost:5000/create', productData)
            .then(response => {
                console.log('Product created:', response.data);  // Log khi tạo sản phẩm thành công
                navigate("/shop");
            })
            .catch(error => {
                console.error('Error creating product:', error);  // Log lỗi khi tạo sản phẩm
            });
    };

    return (
        <div className='container'>

            <h2 className='text-create-product'>Tạo sản phẩm mới</h2>

            <form id='form' onSubmit={handleSubmit}>

                <div className='form-name-input'>
                    <label>Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className='form-description-textarea'>
                    <label>Description:</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} maxLength="600" />
                </div>

                <div className='form-image-input'>
                    <label>Image URL:</label>
                    <input type="text" onChange={(e) => setImage(e.target.value)} maxLength="255" />
                </div>

                <div className='form-oldprice-input'>
                    <label>Old Price:</label>
                    <input type="text" onChange={(e) => setOldPrice(e.target.value)} required />
                </div>

                <div className='form-newprice-input'>
                    <label>New Price:</label>
                    <input type="text" onChange={(e) => setNewPrice(e.target.value)} required />
                </div>

                <div className='form-location-input'>
                    <label>Location:</label>
                    <input type="text" onChange={(e) => setLocation(e.target.value)} maxLength="20" />
                </div>

                <button type="submit">Create Product</button>

            </form>
        </div>
    );
}

export default CreateProduct;
