import React from 'react'
import { BadgeIndianRupee, X, Menu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Navigation = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };
  return (
    <div>
      {/* Navigation */}
      <nav className="bg-gray-900 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo part */}
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-emerald-600 rounded-lg flex items-center justify-center">
                <BadgeIndianRupee className="w-10 h-10 text-white" />
              </div>
              <span className="text-4xl font-bold text-emerald-500">MoneyManager</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => handleNavigation('/')} className="text-gray-300 hover:text-white transition-colors">Home</button>
              <button onClick={() => handleNavigation('/about')} className="text-gray-300 hover:text-white transition-colors">About us</button>
              <button onClick={() => handleNavigation('/contact')} className="text-gray-300 hover:text-white transition-colors">Contact us</button>
              <button onClick={() => handleNavigation('/login')} className="text-gray-300 hover:text-white transition-colors">Login</button>
              <button
                onClick={() => handleNavigation('/signup')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t border-gray-700">
              <button onClick={() => handleNavigation('/')} className="block py-2 text-gray-300 hover:text-white w-full text-left">Home</button>
              <button onClick={() => handleNavigation('/about')} className="block py-2 text-gray-300 hover:text-white w-full text-left">About us</button>
              <button onClick={() => handleNavigation('/contact')} className="block py-2 text-gray-300 hover:text-white w-full text-left">Contact us</button>
              <button onClick={() => handleNavigation('/login')} className="block py-2 text-gray-300 hover:text-white w-full text-left">Login</button>
              <button
                onClick={() => handleNavigation('/signup')}
                className="block py-2 bg-gray-500 hover:bg-emerald-600 text-white px-4 rounded-lg text-center"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navigation
