import React from 'react';
import { useGetResponses } from '../hooks/useGetResponses';

const Responses = () => {
  const { responses } = useGetResponses();
  console.log("Fetched Successfully:", responses);

  return (
    <div className="min-h-screen bg-[#0e0d0d] text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-purple-400 text-center">
        Your AI Design Responses
      </h1>

      {responses.length === 0 ? (
        <p className="text-gray-400 text-center">No responses found yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {responses.map((res) => (
            <div
              key={res.id}
              className="bg-[#1a1a1a] rounded-xl shadow-lg p-6 border border-gray-700 hover:border-purple-400 transition"
            >
              {/* Date */}
              <p className="text-sm text-gray-400 mb-3">
                <strong>Date:</strong>{' '}
                {res.date?.toDate
                  ? res.date.toDate().toLocaleString()
                  : 'No valid timestamp'}
              </p>

              {/* Suggestion Text */}
              {res.responses?.suggestion && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-purple-300 mb-1">Suggestions:</h2>
                  <p className="text-white text-justify whitespace-pre-wrap">
                    {res.responses.suggestion}
                  </p>
                </div>
              )}

              {/* Generated Image */}
              {res.responses?.generatedImage && (
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-purple-300 mb-2">Generated Image:</h2>
                  <img
                    src={res.responses.generatedImage}
                    alt="Generated design"
                    className="rounded-lg w-full max-w-full border border-gray-600"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Responses;
