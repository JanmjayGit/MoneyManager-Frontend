import { BrowserRouter, Navigate, Routes } from "react-router-dom"
import Expence from "./pages/Expence"
import Income from "./pages/Income"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Category from "./pages/Category"
import { Route } from "react-router-dom"
import React from 'react'
import Home from "./pages/Home"
import Filter from "./pages/Filter"
import { Toaster } from "react-hot-toast"

function App() {
  

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/income" element={<Income />} />
            <Route path="/category" element={<Category />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/expense" element={<Expence />} />
            <Route path="/filter" element={<Filter />} />
        </Routes>
      </BrowserRouter>

      
    </>
  )
}

const Root = () => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}

export default App
