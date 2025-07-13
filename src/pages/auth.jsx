import React from 'react';
import { provider, autho } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const results = await signInWithPopup(autho, provider);

      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profile: results.user.photoURL,
        isAuth : true,
      };

      localStorage.setItem('auth', JSON.stringify(authInfo));
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
      <div className="w-full max-w-md bg-[#1e1e1e] bg-opacity-80 backdrop-blur-lg border border-teal-500 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center mb-4 text-teal-400">AI Interior Designer</h1>
        <p className="text-gray-400 text-center mb-8">
          Reimagine your space with intelligent interior suggestions. Sign in to begin.
        </p>
        <button
          onClick={signIn}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-[0_0_15px_#10b981] transition duration-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Auth;
