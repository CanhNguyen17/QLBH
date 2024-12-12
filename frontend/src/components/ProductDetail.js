import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import '../css/ProductDetail.css';

function ProductDetail({ handleAddToCart,showSuccessToast }) {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/product/${slug}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Product not found');
                setLoading(false);
            });
    }, [slug]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="row page_width">
                <div className="col col-12 img-extra">Sản phẩm</div>
            </div>

            <div className='row page_width detail_cotainer'>
                <div className='col col-12 detail_page'>
                    <Link className='remove-text-decoration color-text-home' to='/shop'>Cửa hàng</Link> / {product.name}
                </div>

                <div className='col col-6'>
                    <img className='detail_img' src={product.image} alt={product.name} />
                </div>

                <div className='col col-6 detail_price'>
                    <div>
                        <h2>{product.name}</h2>
                    </div>

                    <div className='detail_price-0'>
                        <div className='detail_price-1'>
                            <p className='line-through text-gray'>
                                <span className="font-size_small">đ</span>
                                {product.oldPrice}</p>
                            <p className='newPrice-red'>
                                <span className="font-size_small">đ</span>
                                {product.newPrice}</p>
                        </div>

                        <div className='detail_price-2 text-gray'>
                            <p>Kho: 343</p>
                            <p>Da ban: 169</p>
                        </div>
                    </div>

                    <div className='detail_description'>
                        <p>{product.description}</p>
                    </div>

                    <div className='detail_button'>
                        <button className='detail_button-font-cart' onClick={() => { handleAddToCart(product._id); showSuccessToast() }}>
                            <FontAwesomeIcon className='card-body_primary-cartplus' icon={faCartPlus} />
                            <p>Thêm vào giỏ hàng</p>
                        </button>
                        <button className='detail_button-pay'>
                            <p>Mua ngay</p>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductDetail;
