import React, { useState } from 'react';

interface GeneratedImageProps {
  imageUrl: string | null;
  loading: boolean;
  prompt: string;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageUrl, loading, prompt }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = () => {
    if (!imageUrl) return;
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    // Sanitize prompt for filename
    const filename = prompt.slice(0, 20).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `nilover-studio-${filename}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="w-full h-full min-h-[400px] bg-studio-800/50 rounded-2xl border-2 border-dashed border-studio-700 flex flex-col items-center justify-center animate-pulse">
        <div className="w-16 h-16 border-4 border-studio-accent border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-300 font-arabic animate-bounce">
          جاري التوليد... Creating Magic...
        </p>
        <p className="text-xs text-slate-500 mt-2">Using model: imagen-4.0</p>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full h-full min-h-[400px] bg-studio-800/30 rounded-2xl border border-studio-700 flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-studio-800 p-4 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-200 mb-2 font-arabic">جاهز للإبداع</h3>
        <p className="text-slate-400 max-w-sm font-arabic">
          أدخل وصفًا للصورة، اختر النمط، واضغط على إنشاء لرؤية النتيجة هنا.
        </p>
        <p className="text-slate-500 text-sm mt-2">Ready to create. Enter a prompt to start.</p>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group border border-studio-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={imageUrl} 
        alt={prompt} 
        className="w-full h-auto object-contain max-h-[70vh] bg-black mx-auto"
      />
      
      {/* Overlay Actions */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 flex flex-col justify-end p-6 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
        <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
          <div className="flex-1">
             <p className="text-white/90 text-sm line-clamp-2 font-medium mb-2 drop-shadow-md">
                {prompt}
             </p>
          </div>
          <button
            onClick={handleDownload}
            className="bg-white text-studio-900 hover:bg-studio-100 px-6 py-2.5 rounded-lg font-bold shadow-lg transform transition-transform active:scale-95 flex items-center gap-2 font-arabic"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span>تحميل (Download)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedImage;