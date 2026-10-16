'use client';

export default function Viewer360({ videoUrl }) {
  if (!videoUrl) {
    return (
      <div className="flex-1 rounded-2xl bg-[#0a0b10] border border-gray-800 flex flex-col items-center justify-center relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center w-[calc(100%-2rem)]">
          <div className="px-3 py-1 rounded-full bg-gray-900 border border-gray-700 text-xs font-semibold tracking-wider flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div> ORBIT VIEWER
          </div>
          <div className="px-3 py-1 rounded-full bg-gray-900 border border-gray-700 text-xs text-gray-400">
            No videos yet
          </div>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-gray-600 flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-500"></div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Explore your 360° videos</h2>
          <p className="text-gray-400 max-w-sm mx-auto">Upload a video to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 rounded-2xl bg-black border border-gray-800 overflow-hidden relative">
      <video 
        src={videoUrl} 
        controls 
        autoPlay 
        crossOrigin="anonymous" 
        className="w-full h-full object-contain"
      />
      {/* Tambahkan library 360 viewer (misal: pannellum / three.js) di sini untuk produksi */}
    </div>
  );
}
