import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };


  const addQty = (id,q) =>{
    var newQty = q+1;
   setFilter( filter.map( p =>  p.productID === id ? { ...p , qty: newQty } : p
   ));
  };

  const removeQty = (id,q) =>{
    var newQty = q-1;
   setFilter( filter.map( p =>  p.productID === id ? { ...p , qty: newQty } : p
   ));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

     const response = await fetch("http://localhost:5270/api/Products");

     
      if (componentMounted) {
        setData(await response.clone().json());
        const dataFetch = await response.json()

        const udata= dataFetch.map ( p => (p = { 
          ...p,
           qty:0 
          }));

        setFilter(udata);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

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

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {

    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.map((product) => {
         var img ="/assets/DCS-2500T.JPG";
          return (
            <div
              id={product.id}
              key={product.id}
              className="row d-flex"
            >
              
              <div className="card text-center h-100" key={product.id}>

              <div  className="row d-flex">
              <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={product.ImageUrl}
                                  // className="w-100"
                                  alt={product.title}
                                  width={100}
                                  height={75}
                                />
                              </div>
                </div>

                <div className="col-lg-3 col-md-12">
                <div  className="row d-flex">
                   <strong> {product.title}</strong>
                 </div>
                 <div  className="row d-flex">
                    {product.title}
                 </div>
                 <div  className="row d-flex">
                    {product.title}
                 </div>

                </div>

                <div className="col-lg-3 col-md-6">
                             <p className="text-start text-md-center">
                                <strong>
                                   {product.price}
                                </strong>
                              </p>
                            </div>

                            <div className="col-lg-3 col-md-12">
                              <div
                                className="d-flex"
                                style={{ maxWidth: "300px" }}
                              >
                                <button
                                  className="btn px-1"
                                  onClick={() => {
                                    removeQty(product.productID,product.qty);
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5">{product.qty}</p>

                                <button
                                  className="btn px-1"
                                  onClick={() => {
                                    addQty(product.productID,product.qty);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>


                </div>
            
                 </div>
            
                <div className="card-body">
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </>
    );
  };
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
      </div>
    </>
  );
};

export default Products;
