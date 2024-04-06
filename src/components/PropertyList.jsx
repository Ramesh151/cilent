import React from "react";
import { Link } from "react-router-dom";

const PropertyList = ({ products }) => {
  return (
    <div className="">
      <h1 className=" text-black p-6 text-2xl font-bold text-center">
        PRODUCT LIST
      </h1>
      
      {products.map((product) => (
        <Link to={`/products/${product._id}`} key={product._id}>
          <div className="max-w-2xl mx-auto mt-4">
            <div className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start py-10 px-8">
              <div className="relative w-32 h-32 flex-shrink-0">
                <img
                  className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50 "
                  loading="lazy"
                  src={product.images[0]}
                  alt={product.address}
                />
              </div>

              <div className="flex flex-col gap-2 py-2 px-3">
                <p className="text-xl font-bold">{product.address}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
     <div className=" w-100 h-auto flex  justify-center items-center my-4 ">
        <Link
          className=" bg-black px-2 p-2 rounded-lg  text-white text-center hover:bg-slate-500 "
          to="/addproperty"
        >
          Add Property
        </Link>
      </div>
    </div>
  );
};

export default PropertyList;
