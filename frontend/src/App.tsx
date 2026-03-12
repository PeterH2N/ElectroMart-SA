import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Carousel from './components/Carousel';
import './App.css';
import ProductPage from "./pages/ProductPage";
import {ProductType} from "./models/ProductType";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>ElectroMart</h1>
          <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "inactive")}>Home</NavLink>
            <NavLink to="/laptops" className={({ isActive }) => (isActive ? "active" : "inactive")}>Laptops</NavLink>
            <NavLink to="/ssds" className={({ isActive }) => (isActive ? "active" : "inactive")}>SSD's</NavLink>
            <NavLink to="/phones" className={({ isActive }) => (isActive ? "active" : "inactive")}>Phones</NavLink>
            <NavLink to="/playstations" className={({ isActive }) => (isActive ? "active" : "inactive")}>Playstations</NavLink>
          </nav>

        </header>
        <Carousel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/laptops" element={<ProductPage productType={ProductType.Laptop} />} />
          <Route path="/ssds" element={<ProductPage productType={ProductType.SSD} />} />
          <Route path="/phones" element={<ProductPage productType={ProductType.Phone} />} />
          <Route path="/playstations" element={<ProductPage productType={ProductType.PlayStation} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
