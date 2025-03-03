import React from "react";
import {  Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart ,delProduct } from "../redux/action";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    dispatch(addCart(product));
  };

  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  const removeProduct = (product) => {
    dispatch(delProduct(product));
  };




  const ShowCart = () => {
    let subtotal = 0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">

                  <div className="card-header ">

                    <div className="col-lg-3 col-md-3">

                    <h5 className="mb-0">Cart Product List</h5>
                    </div>
                 

                  </div>
                  <div className="card-body">


                  <div className="row d-flex ">
                            <div className="col-lg-3 col-md-12">
                              <p>Product</p>
                            </div>

                            <div className="col-lg-3 col-md-12">
                                <p>Quantity</p>
                            </div>


                            <div className="col-lg-3 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                               

                                <p className="mx-5">Price</p>

                              
                              </div>

                            </div>


                            <div className="col-lg-3 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                               

                                <p className="mx-5">Total</p>

                              
                              </div>

                            </div>
                            <hr className="my-1" />

                          </div>



                    {state.map((item) => {
                      return (
                        <div key={item.productID}>
                          <div className="row d-flex align-items-center">

                            <div className="col-lg-3 col-md-12">

                            <div className="row d-flex">

                            <div className="col-lg-3 col-md-12">

                                      <div
                                          className="bg-image rounded"
                                          data-mdb-ripple-color="light"
                                        >
                                          <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            width={50}
                                            height={75}
                                          />
                                        </div>
                              
                              </div>

                              <div className="col-lg-6 col-md-12">
                            <div className="row d-flex">
                                <p>
                                  <strong> Title: {item.title}</strong>
                                </p>
                              
                            </div>
                            <div className="row d-flex">
                                <p>
                                  <strong> Code: {item.productCode}</strong>
                                </p>
                              
                            </div>
                            </div>

                            </div>
                            <div className="row d-flex">
                               <button
                                  className="btn btn-dark m-1"
                                  onClick={() => {
                                    removeProduct(item);
                                  }}
                                >
                                  <i class="fa-solid fa-trash"></i>
                                  Delete
                                </button>
                             </div> 

                            </div>



                            <div className="col-lg-3 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <button
                                  className="btn px-1"
                                  onClick={() => {
                                    removeItem(item);
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5">{item.qty}</p>

                                <button
                                  className="btn px-1"
                                  onClick={() => {
                                    addItem(item);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                            </div>

                            <div className="col-lg-3 col-md-12">
                            <div className="row d-flex">
                                <p>
                                  <strong>{item.price}</strong>
                                </p>
                              
                            </div>
                            </div>

                            <div className="col-lg-3 col-md-12">
                            <div className="row d-flex">
                                <p>
                                  <strong> $ { item.qty * item.price}</strong>
                                </p>
                              
                            </div>
                            </div>



                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Shopping cart details</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})<span>${Math.round(subtotal)}</span>
                      </li>
                    
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>${Math.round(subtotal)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/checkout"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Process Order
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">My Shopping Cart</h1>
        <hr />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
    </>
  );
};

export default Cart;
