import React, { useState, useEffect } from 'react';
import { useGetUserInfo } from '../hooks/getUserInfo';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Navbar = () => {
  const [uname, setUname] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { name, isAuth } = useGetUserInfo();

  useEffect(() => {
    if (name) setUname(name);
  }, [name]);

  if (!isAuth) return null;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-[#0e0d0d] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        <div className="text-xl font-bold tracking-wide">AI Interior Designer</div>

        
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

      
        <div className="hidden md:flex gap-6">
          <Link to="/home" className="hover:text-purple-400 transition">
            Home
          </Link>
          <Link to="/responses" className="hover:text-purple-400 transition">
            Responses
          </Link>
          <Link to="/images" className="hover:text-purple-400 transition">
            Images
          </Link>
        </div>

        
        <div className="hidden md:block text-sm text-gray-300">
          Welcome, <span className="font-semibold text-white">{uname || 'Guest'}</span>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-4">
            <Link to="/home" onClick={closeMenu} className="hover:text-purple-400 transition">
              Home
            </Link>
            <Link to="/responses" onClick={closeMenu} className="hover:text-purple-400 transition">
              Responses
            </Link>
            <Link to="/images" onClick={closeMenu} className="hover:text-purple-400 transition">
              Images
            </Link>
            <div className="text-sm text-gray-300 mt-2">
              Welcome, <span className="font-semibold text-white">{uname || 'Guest'}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
