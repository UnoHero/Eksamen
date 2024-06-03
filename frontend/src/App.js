import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import './index.css';

// Common Components
import Header from "./components/Header";

// Pages
import Start from "./pages/Start";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Item from "./pages/Item";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route
            path="/"
            element={<Start />}
          />
          <Route /* Protect */
            path="/home"
            element={<Home />}
          />
          <Route
            path="/:kategori"
            element={<Catalogue />}
          />
          <Route  
            path="/:id"
            element={<Item />}
          />
          <Route /* Protect */
            path="/cart"
            element={<Cart />} 
          />
          
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
        </Routes>
      </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
