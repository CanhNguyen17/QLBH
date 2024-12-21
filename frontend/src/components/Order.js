import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Order() {
    const [orderItems, setOrderItems] = useState([]);
    /// Lấy giỏ hàng từ server khi load trang
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Người dùng chưa đăng nhập.');
        } else {
            axios.get('http://localhost:5000/order')
                .then(response => {
                    setOrderItems(response.data); // Giỏ hàng từ API
                })
                .catch(error => {
                    console.error('Lỗi khi tải giỏ hàng:', error);
                });
        }
    }, []);

    return (
        <div>
            <div>
                {orderItems.length > 0 ? (
                    <div>
                        <div className="col col-2">Ảnh</div>
                        <div className="col col-3">Tên</div>
                        <div className="col col-2">Giá</div>
                        <div className="col col-2">Số lượng</div>
                        <div className="col col-3">Thời gian</div>
                    </div>
                ) : ('')}

                <div>
                    {orderItems.length > 0 ? (
                        orderItems.map(item => (
                            <div className="row cart-item" key={item._id}>
                                <div className="col col-2">
                                    <img src={item.total} alt='' />
                                </div>

                                <div className="col col-3">
                                    <div>
                                        <h5>{item.name}</h5>
                                    </div>
                                </div>

                                <div className="col col-2">
                                    <p ><span className="font-size_small">đ</span>{item.newPrice}</p>
                                </div>

                                <div className="col col-2">
                                    <p>{item.quantity}</p>
                                </div>

                                <div className="col col-4">
                                    <p>{item.createdAt}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="cart-empty">
                            <div className="cart-empty_back">
                                <p >Đơn hàng trống.
                                    <Link className='remove-text-decoration color-text-home' to={`/shop`}> Thêm vào giỏ ngay!</Link>
                                </p>
                            </div>

                            <div>
                                <img src="img/cart-empty.png"></img>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Order;

