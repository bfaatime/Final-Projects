import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import './App.css'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Details from './pages/details'
import Add from './pages/Add'
import Wishlist from './pages/Wishlist'
import NotFound from './pages/NotFound'
import Shop from './pages/Shop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout/>} >
        <Route index element={<Home/>}/>
        <Route path='/clothes/:id' element={<Details/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/shop' element={<Shop/>}/>

        <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
