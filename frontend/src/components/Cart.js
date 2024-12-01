import React from "react";
import DeleteModal from "./DeleteModal";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';
import '../css/DeleteModal.css'

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    //
    const [ModalOpen, setModalOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const navigate = useNavigate();

    /// Lấy giỏ hàng từ server khi load trang
    useEffect(() => {
        axios.get('http://localhost:5000/cart')
            .then(response => {
                setCartItems(response.data); // Giỏ hàng từ API
            })
            .catch(err => {
                setError(err.response?.data?.message || 'Lỗi khi tải giỏ hàng.');
            });
    }, []);

    // mở , đóng modal
    const handleOpenModal = (productIdCart) => {
        setProductIdToDelete(productIdCart);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setProductIdToDelete(null);
        setModalOpen(false);
    };

    // Xử lý logic xóa sản phẩm
    const handleDelete = () => {
        if (productIdToDelete) {
            axios.delete(`http://localhost:5000/cart/${productIdToDelete}`)
                .then(response => {
                    setCartItems(prevItems => prevItems.filter(item => item._id !== productIdToDelete));
                    navigate("/cart");
                })
                .catch((error) => {
                    console.error('Error deleting product from cart:', error);
                });
        }
        setModalOpen(false);
    };

    // + so luong
    const handlePlus = (productIdCart) => {
        axios.put(`http://localhost:5000/cart/${productIdCart}`, { action: "increase" })
            .then(response => {
                setCartItems(prevItems => prevItems.map(item => item._id === productIdCart
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ))
            })
            .catch(error => {
                console.error('Error increasing quantity:', error);
            });
    };

    // - so luong
    const handleMinus = (productIdCart) => {
        const currentItem = cartItems.find(item => item._id === productIdCart);
        if (currentItem.quantity > 1) {
            axios.put(`http://localhost:5000/cart/${productIdCart}`, { action: "decrease" })
                .then(response => {
                    setCartItems(prevItems => prevItems.map(item => item._id === productIdCart
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                    ))
                })
        }
    };

    // Ẩn SL <= 1
    const isDisabled = (productIdCart) => {
        const currentItem = cartItems.find(item => item._id === productIdCart);
        return currentItem.quantity <= 1;
    };

    // Tổng  
    const total = cartItems.reduce((accumulator, item) => {
        return accumulator + item.newPrice * item.quantity;
    }, 0);

    // Quantity (chỉ để hiển thị từ quantity đã có sẵn)
    const quantity = cartItems.reduce((accumulator, item) => {
        return accumulator + item.quantity;
    }, 0);

    return (
        <div>
            <div className="row page_width">
                <div className="col col-12 img-extra">Giỏ hàng</div>
            </div>

            <div className="cart-list">
                {cartItems.length > 0 ? (
                    <div className="row page_width cart-title">
                        <div className="col col-1">Ảnh</div>
                        <div className="col col-4">Thông tin sản phẩm</div>
                        <div className="col col-4">Số lượng</div>
                    </div>
                ) : ('')}

                <div className="page_width">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div className="row cart-item" key={item._id}>
                                <div className="col col-1 cart-item_img">
                                    <Link to={`/product/${item.slug}`}>
                                        <img src={item.image} alt='' />
                                    </Link>
                                </div>

                                <div className="col col-4 cart-item_info">
                                    <div>
                                        <Link className="remove-text-decoration" to={`/product/${item.slug}`}>
                                            <h5>{item.name}</h5>
                                        </Link>
                                    </div>
                                    <p className="newPrice-red"><span className="font-size_small">đ</span>{item.newPrice}</p>
                                    <p className="text-gray">Kho: 343</p>
                                </div>

                                <div className="col col-4 cart-item_quantity">
                                    <div>
                                        <button onClick={() => handleMinus(item._id)} disabled={isDisabled(item._id)}>-</button>
                                    </div>
                                    <div>
                                        <p>{item.quantity}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => handlePlus(item._id)}>+</button>
                                    </div>
                                    <div onClick={() => handleOpenModal(item._id)}>
                                        <FontAwesomeIcon className="trashcan" icon={faTrashCan} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="cart-empty">
                            <div className="cart-empty_back">
                                <p>Giỏ hàng trống.
                                    <Link className='remove-text-decoration color-text-home' to={`/shop`}> Xem sản phẩm ngay!</Link>
                                </p>
                            </div>

                            <div>
                                <img src="img/cart-empty.png"></img>
                            </div>
                        </div>
                    )}

                    {cartItems.length > 0 ? (
                        <div className="row page_width">
                            <div className="col col-3 cart-item_total">
                                <div>
                                    <p>Tổng ({quantity} sản phẩm) :</p>
                                </div>

                                <div>
                                    <h4>{total.toFixed(3)}</h4>
                                </div>

                                <button>Đặt hàng</button>
                            </div>
                        </div>
                    ) : ('')}
                </div>

                <div>
                    <DeleteModal
                        ModalOpen={ModalOpen}
                        handleCloseModal={handleCloseModal}
                        handleDelete={handleDelete}
                    />
                </div>

            </div>
        </div>

    )
}

export default Cart;