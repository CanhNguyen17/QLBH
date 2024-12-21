import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../css/Home.css'
import '../css/ProductList.css';

function Home({ handleAddToCart }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/best-seller')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((error) => {
                console.error('Error data', error)
            })
    }, [])

    return (
        <div>
            <div className='row home'>
                <div className='col col-6'>
                    <p >Trending product in 2024</p>
                    <span >Làm cho quá trình mua sắm của bạn trở nên dễ dàng hơn</span>
                    <p >Website thường cung cấp thông tin về các bộ sưu tập thời trang mới nhất, theo mùa hoặc theo phong cách.Danh mục sản phẩm đa dạng, công cụ tìm kiếm và bộ lọc giúp khách hàng tìm sản phẩm theo giá, kích cỡ, màu sắc, thương hiệu hoặc phong cách.</p>
                    <Link to='/shop'>
                        <button>Shop Now</button>
                    </Link>
                </div>

                <div className='col col-6 img-home'>
                    <img className="img-background" src="img/img-background.png"></img>
                </div>
            </div>

            <div className='row commit-sign'>
                <div className='col col-3 commit-sign_green' >
                    <FontAwesomeIcon className='commit-sign_green-award' icon={faAward} />
                    <p>
                        Sản phẩm uy tín<br />
                        Chất lượng
                    </p>
                </div>

                <div className='col col-3 commit-sign_orange' >
                    <FontAwesomeIcon className='commit-sign_orange-swap' icon={faRightLeft} />
                    <p>
                        Đổi trả 7 ngày <br />
                        Hoàn tiền 100%
                    </p>
                </div>

                <div className='col col-3 commit-sign_blue' >
                    <FontAwesomeIcon className='commit-sign_blue-headset' icon={faHeadset} />
                    <p>Tư vấn viên tận tình<br />
                        Nhiều kinh nghiệm
                    </p>
                </div>

                <div className='col col-3 commit-sign_yellow' >
                    <FontAwesomeIcon className='commit-sign_yellow-truck' icon={faTruckFast} />
                    <p>Miễn phí giao hàng<br />
                        toàn quốc</p>
                </div>
            </div>

            <h1>Sản phẩm bán chạy</h1>

            <div className="product-list">
                <div className='row'>
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
                                    <button className='card-body_primary-button' onClick={() => { handleAddToCart(product._id) }}>
                                        <FontAwesomeIcon className='card-body_primary-cartplus' icon={faCartPlus} />
                                        <p className="card-body_primary-size-p">Thêm vào giỏ</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div >
            </div>
        </div>
    )
}

export default Home;