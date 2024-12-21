import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../css/ProductList.css';
import debounce from 'lodash.debounce';

function ProductList({ handleAddToCart }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["Tất cả", "Dây đeo", "Khăn choàng", "Vớ", "Quần", "Chân váy"]);
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    ///
    const [sortOrder, setSortOrder] = useState("");
    ////
    const [query, setQuery] = useState(''); // Từ khóa tìm kiếm

    //set Sản phẩm từ API
    useEffect(() => {
        axios.get('http://localhost:5000/shop')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Khi thay đổi loại sản phẩm
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        fetchProducts(category, sortOrder); // Lấy sản phẩm theo loại được chọn
    };
    ///
    const handleSortChange = (event) => {
        const sort = event.target.value;
        setSortOrder(sort);
        fetchProducts(selectedCategory, sort);
    }

    // Lọc
    const fetchProducts = (category, sort) => {
        const baseUrl = "http://localhost:5000/shop";
        const url = `${baseUrl}?category=${category !== "Tất cả" ? category : ""}&sort=${sort}`;

        axios.get(url)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setProducts([]); // Nếu lỗi, đặt danh sách sản phẩm thành rỗng
            });
    };

    // Lấy ds sản phẩm khi component mount
    useEffect(() => {
        fetchProducts(selectedCategory, sortOrder);
    }, []);


    //// Xử lý nhập liệu trong ô tìm kiếm
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value); // Gọi debounce để tránh gọi API liên tục
    };

    //// Debounce hàm tìm kiếm
    const debouncedSearch = useCallback(
        debounce((value) => {
            loadProducts(value); // Gọi API sau khi debounce
        }, 500),
        []);

    //// Hàm gọi API từ backend và xử lý tìm kiếm với Promise
    const loadProducts = (searchQuery) => {
        axios
            .get(`http://localhost:5000/shop?q=${searchQuery}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => console.error('Error adding product to cart:', error));

    };

    //// Tải sản phẩm khi trang load lần đầu
    useEffect(() => {
        loadProducts('');
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col col-12 img-extra">Sản phẩm</div>
            </div>

            <div className="product-list">
                <div className='row filter-search'>
                    <div className="col col-3">
                        <select className="filter-category" value={selectedCategory} onChange={handleCategoryChange}>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col col-3 ">
                        <select className="filter-sortby" value={sortOrder} onChange={handleSortChange}>
                            <option>Sắp xếp</option>
                            <option value={"asc"}>Tăng dần</option>
                            <option value={"desc"}>Giảm dần</option>
                        </select>
                    </div>

                    <div className="col col-6 search-common">
                        <FontAwesomeIcon className="faMagnifyingGlass" icon={faMagnifyingGlass} />
                        <input className="search-product" onChange={handleInputChange} placeholder="Tìm kiếm..."></input>
                    </div>
                </div>

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
            </div >
        </div>
    )
}

export default ProductList;