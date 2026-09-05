import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);

  // GET - Fetch coffee products
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  // POST - Add product
  const addProduct = (newProduct) => {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
      })
      .catch((err) => console.error("Error:", err));
  };

  // PUT - Update product
  const updateProduct = (id, updatedData) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(products.map((p) => (p.id === id ? data : p)));
      })
      .catch((err) => console.error("Error:", err));
  };

  // DELETE - Remove product
  const deleteProduct = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-amber-50 text-amber-950">
        <nav className="bg-amber-950 text-amber-50 sticky top-0 z-50 shadow">
          <div className="p-4 flex justify-between items-center">
            <Link
              to="/"
              className="flex justify-center items-center gap-2 text-xl font-bold"
            >
              Coffee Shop
            </Link>
            <div className="flex gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-1 rounded text-sm font-medium ${
                    isActive
                      ? "bg-amber-50/20 text-white"
                      : "text-amber-300 hover:text-white"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `px-3 py-1 rounded text-sm font-medium ${
                    isActive
                      ? "bg-amber-50/20 text-white"
                      : "text-amber-300 hover:text-white"
                  }`
                }
              >
                Shop
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-3 py-1 rounded text-sm font-medium ${
                    isActive
                      ? "bg-amber-50/20 text-white"
                      : "text-amber-300 hover:text-white"
                  }`
                }
              >
                Admin Portal
              </NavLink>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/shop"
              element={<ShopPage products={products} />}
            />
            <Route path="/admin" element={
              <AdminPage 
                products={products}
                onAdd={addProduct}
                onUpdate={updateProduct}
                onDelete={deleteProduct}
              />
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
