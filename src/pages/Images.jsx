import React from 'react';
import { Loader2 } from 'lucide-react'; 

const Images = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0e0d0d] text-white px-4">
      <div className="animate-pulse text-center">
        {/* Icon or SVG */}
        <div className="mb-6">
          <Loader2 className="w-16 h-16 text-purple-400 animate-spin" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
          Page Under Development
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm md:text-base">
          We're working hard to bring this feature to life. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default Images;
