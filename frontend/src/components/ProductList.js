import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../css/ProductList.css';

function ProductList({ showSuccessToast }) {
    const [products, setProducts] = useState([]);
    //
    useEffect(() => {
        axios.get('http://localhost:5000/shop')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    //
    const handleAddToCart = (productId) => {
        if (productId) {
            axios.post(`http://localhost:5000/cart/${productId}`)
                .then(() => '')
                .catch((error) => console.error('Error adding product to cart:', error));
        }
    };

    return (
        <div>
            <div className="row page_width">
                <div className="col col-12 img-extra">Sản phẩm</div>
            </div>

            <div className="product-list">
                <div className='row page_width filter-search'>
                    <div className="col col-3">
                        <select className="filter-category">
                            <option>Danh mục</option>
                        </select>
                    </div>

                    <div className="col col-3 ">
                        <select className="filter-sortby">
                            <option>Sắp xếp</option>
                        </select>
                    </div>

                    <div className="col col-6 search-common">
                        <FontAwesomeIcon className="faMagnifyingGlass" icon={faMagnifyingGlass} />
                        <input className="search-product" placeholder="Tìm kiếm..."></input>
                    </div>
                </div>

                <div className='row page_width'>
                    {products.map((product) => (
                        <div className='col col-3 product-list-wrap' key={product._id}>
                            <div>
                                <Link to={`/product/${product.slug}`}>
                                    <img className='card-top-img' src={product.image} alt='' />
                                </Link>
                            </div>

                            <div className='card-body'>
                                <div className="card">
                                    <Link className="remove-text-decoration" to={`/product/${product.slug}`}>
                                        <h5 className='card-body_title'>{product.name}</h5>
                                    </Link>
                                </div>

                                <div className="card card-body_price">
                                    <p className="line-through text-gray"><span className="font-size_small">đ</span>
                                        {product.oldPrice}</p>
                                    <p className="newPrice-red"><span className="font-size_small">đ</span>
                                        {product.newPrice}</p>
                                </div>

                                <div className="card card-body_storage text-gray">
                                    <p>Kho: 343</p>
                                    <p>Da Ban: 169</p>
                                </div>

                                <div className="card card-body_place-evaluate">
                                    <p>{product.location}</p>
                                    <div className="card-body_place-evaluate-color">
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                </div>

                                <div className="card-body_primary">
                                    <button className='card-body_primary-button' onClick={() => { handleAddToCart(product._id); showSuccessToast() }}>
                                        <FontAwesomeIcon className='card-body_primary-cartplus' icon={faCartPlus} />
                                        <p className="card-body_primary-size-p">Thêm vào giỏ</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div >
            </div >
        </div>
    )
}

export default ProductList;