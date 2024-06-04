import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";


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
import NotFound from "./pages/NotFound";

function App() {
  const { user } = useAuthContext();

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
            element={user ? <Home />  : <Navigate to={"/"} />}
          />
          <Route
            path="/item/:kategori"
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
            element={!user ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to={"/"} />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
