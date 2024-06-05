import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useAdmin } from "./hooks/useAdmin";


import './index.css';

// Common Components
import Header from "./components/Header";
import HelpButton from "./components/HelpButton";

// Pages
import Start from "./pages/Start";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Item from "./pages/Item";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Help from "./pages/Help";

function App() {
  const { user } = useAuthContext();
  const { admin, adminIsLoading, adminError, answer } = useAdmin();


  useEffect(() => {
    const fetchAdminStatus = async () => {
        try {
            await admin();
        } catch (error) {
            // Handle error if needed
            console.error("Error fetching admin status:", error);
        }
    };

    if (user) {
      fetchAdminStatus();
    }
  }, [user]);

  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <HelpButton />
      <div>
        <Routes>
          <Route
            path="/"
            element={<Start />}
          />
          <Route /* Protect */
            path="/home"
            element={admin && user ? <Home />  : <Navigate to={"/"} />}
          />
          <Route
            path="/item/:kategori"
            element={<Catalogue />}
          />
          <Route
            path="/help"
            element={<Help />}
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
