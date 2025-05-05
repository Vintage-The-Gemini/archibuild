import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Placeholder Pages (We'll create these later)
const HomePage = () => <div className="max-w-7xl mx-auto px-4 py-8">Home Page</div>;
const PlansPage = () => <div className="max-w-7xl mx-auto px-4 py-8">Plans Page</div>;
const PlanDetailPage = () => <div className="max-w-7xl mx-auto px-4 py-8">Plan Detail Page</div>;
const LoginPage = () => <div className="max-w-7xl mx-auto px-4 py-8">Login Page</div>;
const RegisterPage = () => <div className="max-w-7xl mx-auto px-4 py-8">Register Page</div>;
const CartPage = () => <div className="max-w-7xl mx-auto px-4 py-8">Cart Page</div>;
const CheckoutPage = () => <div className="max-w-7xl mx-auto px-4 py-8">Checkout Page</div>;

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/plans/:id" element={<PlanDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;