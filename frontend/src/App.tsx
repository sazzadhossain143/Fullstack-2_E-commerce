// import { useState } from 'react'

import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import PlaceOrder from "./pages/PlaceOrder"
import Login from "./pages/Login"
import Collection from "./pages/Collection"
import Orders from "./pages/Orders"
import Navbar from "./components/Navbar"



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          {/* Your route definitions go here */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={ <About />} />
          <Route path="/contact" element={ <Contact />} />
          <Route path="/collection" element={ <Collection />} />
          <Route path="/product/:productId" element={ <Product />} />
          <Route path="/order" element={ <Orders />} />
          <Route path="/placeorder" element={ <PlaceOrder />} />
          <Route path="/login" element={ <Login />} />

        </Routes>
      </div>
    </>
  )
}

export default App
