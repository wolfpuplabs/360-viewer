'use client';
import { useState, useRef } from 'react';
import { upload } from '@vercel/blob/client';

export default function VideoUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);

    try {
      // Menggunakan Client Upload (upload langsung dari browser ke Blob)
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        onUploadProgress: (progressEvent) => {
          // Progress bar sekarang akan bergerak secara real-time!
          const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(percentage);
        },
      });

      setProgress(100);
      
      if (onUploadSuccess) {
        onUploadSuccess(newBlob.url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload gagal. Pastikan BLOB_READ_WRITE_TOKEN sudah terpasang di Vercel.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="mb-8">
      <h3 className="font-bold mb-4">01 / Video</h3>
      <label className="block text-sm text-gray-400 mb-2">Select video file</label>
      
      <div className="flex items-center gap-2 mb-4">
        <input 
          type="file" 
          accept="video/mp4,video/webm,video/quicktime" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button 
          onClick={() => fileInputRef.current.click()} 
          className="bg-[#1f2937] text-gray-300 border border-gray-700 px-3 py-1.5 rounded-md text-xs hover:bg-gray-700"
        >
          Choose File
        </button>
        <span className="text-xs text-gray-500 truncate w-32">
          {file ? file.name : 'No file chosen'}
        </span>
      </div>

      <button 
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full bg-[#8b5cf6] text-white py-2 rounded-lg text-sm font-medium mb-2 transition ${(!file || uploading) ? 'opacity-50' : 'hover:bg-[#7c3aed]'}`}
      >
        {uploading ? 'Uploading...' : 'Upload & open video'}
      </button>

      {(uploading || progress === 100) && (
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>
            {uploading ? 'Uploading video...' : progress === 100 ? 'Upload complete!' : 'Failed to upload'}
          </span>
          <span>{progress}%</span>
        </div>
      )}
    </section>
  );
}
