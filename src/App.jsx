// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './pages/auth';
import Home from './pages/Home';
import ProtectedRoute from './context/ProtectedRoute';
import Responses from './pages/responses';
import Layout from './Layout';
import Images from './pages/Images';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />

       <Route
        element={<Layout />}
      >

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
            
          </ProtectedRoute>
        }
      />

      <Route path='/responses' element={<Responses/>}></Route>
      <Route path='/images' element={<Images/>}> </Route>
      </Route>
    </Routes>
  );
};

export default App;
