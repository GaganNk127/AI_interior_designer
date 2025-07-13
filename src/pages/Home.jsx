import React, { useState } from 'react';
import Layout from '../Layout';
import { useAddResponses } from '../hooks/useAddResponses';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [designSuggestions, setDesignSuggestions] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState('');

  const {addResponses} = useAddResponses();

  const handleSaveResponse = async () => {
    try {
      await addResponses({
        responses: {
          suggestion: designSuggestions,
        },
      });
      console.log('Response saved to Firestore');
    } catch (err) {
      console.error('Error saving response:', err);
      setError('Failed to save response');
    }
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setError('');
      setDesignSuggestions('');
      setGeneratedImageUrl('');

      const reader = new FileReader();
      reader.onloadend = () => setImagePreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImagePreviewUrl('');
      setDesignSuggestions('');
      setGeneratedImageUrl('');
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleGenerateTextSuggestions = async () => {
    if (!selectedImage) {
      setError('Please select an image first.');
      return;
    }

    setIsLoadingText(true);
    setError('');
    setDesignSuggestions('');
    setGeneratedImageUrl('');

    try {
      const base64ImageData = await getBase64(selectedImage);

      const prompt = "Analyze this room image and suggest interior design changes...";

      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: selectedImage.type,
                  data: base64ImageData
                }
              }
            ]
          }
        ]
      };

      const apiKey = "AIzaSyCfWeFTQ2JwrmE2gMHzaKGB2Omtsn3ksMc";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates[0].content?.parts?.length > 0
      ) {
        const cleanedText = result.candidates[0].content.parts[0].text.replace(/\*\*/g, '').trim();
        setDesignSuggestions(cleanedText)
      } else {
        setError('Failed to get design suggestions.');
        console.error('Unexpected response:', result);
      }
    } catch (err) {
      setError('Error generating text: ' + err.message);
    } finally {
      setIsLoadingText(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!designSuggestions) {
      setError('Please generate text suggestions first.');
      return;
    }

    setIsLoadingImage(true);
    setError('');
    setGeneratedImageUrl('');

    try {
      const imagePrompt = `A high-quality, realistic interior design rendering of a room based on these suggestions: ${designSuggestions}`;

      const payload = { instances: { prompt: imagePrompt }, parameters: { "sampleCount": 1 } };
      const apiKey = `${import.meta.env.api}`;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.predictions?.[0]?.bytesBase64Encoded) {
        setGeneratedImageUrl(`data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`);
      } else {
        setError('Failed to generate image.');
      }
    } catch (err) {
      setError('Image generation error: ' + err.message);
    } finally {
      setIsLoadingImage(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-[#1e1e1e] bg-opacity-90 backdrop-blur-lg border border-teal-500 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-emerald-400 mb-8">
          Welcome to AI Room Designer
        </h1>

       
        <div className="mb-8 border-2 border-dashed border-teal-400 bg-[#2a2a2a] rounded-lg p-6 text-center hover:border-emerald-400 transition duration-300">
          <label htmlFor="image-upload" className="cursor-pointer block">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg shadow-lg object-contain"
              />
            ) : (
              <div className="text-emerald-300">
                <p className="text-lg font-medium">Click to upload a room image</p>
                <p className="text-sm text-gray-400 mt-1">(JPG, PNG, JPEG up to 5MB)</p>
              </div>
            )}
          </label>
        </div>

        
        <button
          onClick={handleGenerateTextSuggestions}
          disabled={isLoadingText || !selectedImage}
          className={`w-full py-3 rounded-lg font-bold transition-all ${
            isLoadingText || !selectedImage
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-emerald-500 hover:bg-emerald-600 shadow-md hover:shadow-lg'
          }`}
        >
          {isLoadingText ? 'Generating Suggestions...' : 'Generate Design Suggestions'}
        </button>

       
        {error && (
          <div className="mt-6 bg-red-500 bg-opacity-10 border border-red-600 text-red-400 rounded-lg p-4 text-center">
            <p className="font-medium">{error}</p>
          </div>
        )}

       
        {designSuggestions && (
          <div className="mt-8 bg-[#292929] border border-emerald-700 rounded-xl p-6 shadow-inner">
            <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
              Design Suggestions:
            </h2>
            <div className="text-gray-200 space-y-2 text-sm">
              {designSuggestions.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            <button
              onClick={handleSaveResponse}
              className={`w-full mt-6 py-3 rounded-lg font-bold transition-all ${
                isLoadingImage
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-teal-500 hover:bg-teal-600 shadow-md hover:shadow-lg'
              }`}
            >
                Save Response
            </button>


            <button
              onClick={handleGenerateImage}
              disabled={isLoadingImage}
              className={`w-full mt-6 py-3 rounded-lg font-bold transition-all ${
                isLoadingImage
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-teal-500 hover:bg-teal-600 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoadingImage ? 'Generating Image...' : 'Generate Image from Suggestions'}
            </button>
          </div>
        )}

        
        {generatedImageUrl && (
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold text-teal-300 mb-4">
              Generated Interior Image:
            </h2>
            <img
              src={generatedImageUrl}
              alt="Generated Design"
              className="max-h-[500px] mx-auto rounded-lg shadow-lg object-contain"
            />
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Home;
