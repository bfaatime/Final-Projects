import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Add from './pages/Add';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import Basket from './pages/Basket';
import Brands from './pages/Brands';
import Fragrance from './pages/Fragrance';
import Hair from './pages/Hair';
import Gifts from './pages/Gifts';
import Bestsellers from './pages/Bestsellers';
import Skincare from './pages/Skincare';
import Checkout from './pages/checkout';
import Details from './pages/details';
import Success from './pages/Success';
import Error from './pages/Error';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem('authToken') ? true : false);

  useEffect(() => {
    // Token kontrolü her sayfa yüklemesinde yapılabilir
    setAuth(localStorage.getItem('authToken') ? true : false);
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout setAuth={setAuth} />} >
          <Route index element={<Home />} />
          <Route path='/clothes/:id' element={<Details />} />
          <Route path='/add' element={auth ? <Add /> : <Login />} />
          <Route path='/wishlist' element={auth ? <Wishlist /> : <Login />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/brands' element={<Brands />} />
          <Route path='/fragrance' element={<Fragrance />} />
          <Route path='/hair' element={<Hair />} />
          <Route path='/gifts' element={<Gifts />} />
          <Route path='/bestsellers' element={<Bestsellers />} />
          <Route path='/skincare' element={<Skincare />} />
          <Route path='/login' element={<Login setAuth={setAuth} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/basket' element={<Basket />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
