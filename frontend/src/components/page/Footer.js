import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import '../../css/Footer.css'

function Footer() {
    return (
        <footer>
            <div className='row page_width footer'>
                <ul className="col col-3">
                    <p>CunCitizen
                        <br />
                        <li> Mang lại những món hàng về quần áo hữu dụng trong cuộc sống hằng ngày, mua sắm nhanh chóng với trang web dễ nhìn và tương tác.</li>
                    </p>

                </ul>

                <ul className="col col-3">
                    <p>Danh Mục Hàng Đầu
                        <br />
                        <li>
                            <Link className='footer-link' to='/shop'>Dây đeo</Link>
                        </li>
                        <li>
                            <Link className='footer-link' to='/shop'>Khăn choàng</Link>
                        </li>
                        <li>
                            <Link className='footer-link' to='/shop'>Quần</Link>
                        </li>
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
    )
}
export default Footer;