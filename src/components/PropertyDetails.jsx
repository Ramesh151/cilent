import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PropertyDetails({ products }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((product) => product._id === id);
    setProduct(foundProduct);
  }, [id, products]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <div className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start py-10 px-8">
        <div className="relative w-32 h-32 flex-shrink-0">
          <img
            className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
            loading="lazy"
            src={product.images[0]}
            alt={product.address}
          />
        </div>

        <div className="flex flex-col gap-2 py-2">
          <p className="text-xl font-bold">{product.address}</p>
          <p className="text-l font-bold">{product.email}</p>
          <p className="text-l font-bold">{product.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
