import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import '../css/Home.css'
import '../css/ProductList.css';

function Home() {

    return (
        <div>
            <div className='row home'>
                <div className='col col-6 introduce-home'>
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
                <div className='col col-3 sign commit-sign_green' >
                    <FontAwesomeIcon className='commit-sign_green-award' icon={faAward} />
                    <p>
                        Sản phẩm uy tín<br />
                        Chất lượng
                    </p>
                </div>

                <div className='col col-3 sign commit-sign_orange' >
                    <FontAwesomeIcon className='commit-sign_orange-swap' icon={faRightLeft} />
                    <p>
                        Đổi trả 7 ngày <br />
                        Hoàn tiền 100%
                    </p>
                </div>

                <div className='col col-3 sign commit-sign_blue' >
                    <FontAwesomeIcon className='commit-sign_blue-headset' icon={faHeadset} />
                    <p>Tư vấn viên tận tình<br />
                        Nhiều kinh nghiệm
                    </p>
                </div>

                <div className='col col-3 sign commit-sign_yellow' >
                    <FontAwesomeIcon className='commit-sign_yellow-truck' icon={faTruckFast} />
                    <p>Miễn phí giao hàng<br />
                        toàn quốc</p>
                </div>
            </div>
        </div>
    )
}

export default Home;