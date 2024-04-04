import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyList from "./components/PropertyList";
import PropertyDetails from "./components/PropertyDetails";
import AddProperty from "./components/AddProperty";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://server-jvhw.onrender.com/api/getproperty"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PropertyList products={products} />} />
          <Route path="/addproperty" element={<AddProperty />} />
          <Route
            path="/products/:id"
            element={<PropertyDetails products={products} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
