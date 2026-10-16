'use client';
import { useState } from 'react';
import VideoUploader from './components/VideoUploader';
import Viewer360 from './components/Viewer360';

export default function Page() {
  const [videoUrl, setVideoUrl] = useState(null);

  return (
    <div className="h-screen flex overflow-hidden bg-[#0d0e15] text-[#e2e8f0] font-sans">
      
      {/* Main Viewer Area */}
      <main className="flex-1 flex flex-col p-4 md:p-6">
        <Viewer360 videoUrl={videoUrl} />
        
        {/* Controls */}
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            ▶ Play video
          </button>
          <button className="bg-[#1f2937] border border-[#374151] hover:bg-[#374151] px-4 py-2 rounded-lg text-sm font-medium">⟲ Reset view</button>
          <button className="bg-[#1f2937] border border-[#374151] hover:bg-[#374151] px-4 py-2 rounded-lg text-sm font-medium">+ Add annotation</button>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 bg-[#151620] border-l border-gray-800 flex flex-col p-6 overflow-y-auto">
        <VideoUploader onUploadSuccess={setVideoUrl} />
        
        <hr className="border-gray-800 mb-8" />

        <section className="mb-8">
          <h3 className="font-bold mb-4">02 / Annotations</h3>
          <p className="text-sm text-gray-500">There are no annotations yet.</p>
        </section>
      </aside>
      
    </div>
  );
}
