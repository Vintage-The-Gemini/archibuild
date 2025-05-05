import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import PlansPage from './pages/PlansPage';
import PlanDetailPage from './pages/PlanDetailPage';
const LoginPage = () => <div className="max-w-7xl mx-auto px-4 py-8 pt-24">Login Page</div>;
const RegisterPage = () => <div className="max-w-7xl mx-auto px-4 py-8 pt-24">Register Page</div>;
const CartPage = () => <div className="max-w-7xl mx-auto px-4 py-8 pt-24">Cart Page</div>;
const CheckoutPage = () => <div className="max-w-7xl mx-auto px-4 py-8 pt-24">Checkout Page</div>;
const CustomPage = () => <div className="max-w-7xl mx-auto px-4 py-8 pt-24">Custom Design Page</div>;
const AboutPage = () => <div className="max-w-7xl mx-auto px-4 py-8 pt-24">About Us Page</div>;
const ContactPage = () => <div className="max-w-7xl mx-auto px-4 py-8 pt-24">Contact Page</div>;

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
            <Route path="/custom" element={<CustomPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;