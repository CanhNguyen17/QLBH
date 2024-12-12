import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../../css/Navbar.css'

function Navbar() {
    return (
        <nav className="nav">
            <div>
                <Link to='/' className='name-shop'>
                    <FontAwesomeIcon className='faWind' icon={faWind} />
                    Cuncitizen
                </Link>
            </div>

            <div className='nav-header-between'>
                <NavLink to='/' className='nav-header-between_home' activeClassName='active'>Trang chủ</NavLink>
                <NavLink to='/shop' className='nav-header-between_shop' activeClassName='active'>Cửa hàng</NavLink>
                <NavLink to='/cart' className='nav-header-between_cart' activeClassName='active'>Giỏ hàng</NavLink>
            </div>

            <div className='nav-header-right'>
                <Link to='/cart' className='nav-header-right_cart'>
                    <FontAwesomeIcon className='faCartShopping' icon={faCartShopping} />
                </Link>
                /
                <Link to='/login' className='nav-header-right_sign'>
                    <FontAwesomeIcon className='faUser' icon={faUser} />
                    Đăng nhập
                </Link>
            </div>
        </nav>
    )
}
export default Navbar;