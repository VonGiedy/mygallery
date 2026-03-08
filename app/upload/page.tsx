'use client';

import { useState } from 'react';
import { uploadPhoto } from './actions';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      await uploadPhoto(formData);
      
      // If successful, go to the homepage to see the new photo!
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-8">
          Upload a New Photo
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Image
            </label>
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
            />
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input 
              type="text" 
              name="title" 
              required
              placeholder="E.g., Sunset in Davao"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea 
              name="description" 
              rows={4}
              placeholder="Tell the story behind this shot..."
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button 
            type="submit" 
            disabled={isUploading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl px-4 py-3 font-medium transition-colors"
          >
            {isUploading ? 'Uploading...' : 'Publish Photo'}
          </button>
        </form>
      </div>
    </div>
  );
}