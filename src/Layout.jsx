import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './pages/navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0f0f0f] text-white px-4 py-6">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
