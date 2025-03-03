import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;

  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const addAProduct = (product) => {
    const isAvailable = validateStock(product);
    if (!isAvailable) {
      toast.error("Quantity is greater than Available Stock");
    } else {
      toast.success("Added to cart");
      dispatch(addProduct(product));
    }
  };

  const validateStock = (product) => {
    const exist = state.find((x) => x.productID === product.productID);
    if (exist) {
      return exist.qty + product.qty > product.availableStock ? false : true;
    } else {
      return product.qty > product.availableStock ? false : true;
    }
  };

  const addQty = (id, q) => {
    var newQty = q + 1;
    setFilter(
      filter.map((p) =>
        p.productID === id ? { ...p, qty: newQty } : p
      )
    );
  };

  const removeQty = (id, q) => {
    var newQty = q - 1;
    setFilter(
      filter.map((p) =>
        p.productID === id ? { ...p, qty: newQty } : p
      )
    );
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5270/api/Products");

      const dataFetch = await response.json();
      const udata = dataFetch.map((p) => ({
        ...p,
        qty: 0,
      }));

      setData(udata);
      setFilter(udata);
      setLoading(false);
    };

    getProducts();
  }, []);

  // Calculate the products to display on the current page
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filter.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        {getCurrentPageProducts().map((product) => (
          <div id={product.productID} key={product.productID} className="row d-flex">
            <div className="card text-center h-100" key={product.productID}>
              <div className="row d-flex">
                <div className="col-lg-3 col-md-12">
                  <div className="bg-image rounded" data-mdb-ripple-color="light">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      width={100}
                      height={75}
                    />
                  </div>
                </div>

                <div className="col-lg-3 col-md-12">
                  <div className="row d-flex">
                    <strong>{`Title: ${product.title}`}</strong>
                  </div>
                  <div className="row d-flex">{`Code: ${product.productCode}`}</div>
                  <div className="row d-flex">{`Description: ${product.smallDescription}`}</div>
                </div>

                <div className="col-lg-3 col-md-6">
                  <div className="row d-flex">
                    <p className="text-start text-md-center">
                      <strong>{product.price}</strong>
                    </p>
                  </div>
                  <div className="row d-flex">
                    <p className="text-start text-md-center">
                      <strong>{`Available Stock: ${product.availableStock}`}</strong>
                    </p>
                  </div>
                </div>

                <div className="col-lg-3 col-md-12">
                  <div className="d-flex" style={{ maxWidth: "300px" }}>
                    <button className="btn px-1" onClick={() => removeQty(product.productID, product.qty)}>
                      <i className="fas fa-minus"></i>
                    </button>
                    <p className="mx-5">{product.qty}</p>
                    <button className="btn px-1" onClick={() => addQty(product.productID, product.qty)}>
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <button className="btn btn-dark m-1" onClick={() => addAProduct(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  // Calculate total pages
  const totalPages = Math.ceil(filter.length / productsPerPage);

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>

        {/* Pagination controls */}
        <div className="row justify-content-center">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Products;
