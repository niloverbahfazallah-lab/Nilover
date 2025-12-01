import React, { useState, useRef } from 'react';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';
import GeneratedImage from './components/GeneratedImage';
import { generateImage } from './services/geminiService';
import { ImageStyle, AspectRatio } from './types';

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  
  // Ref to scroll to result on mobile
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (prompt: string, style: ImageStyle, ratio: AspectRatio) => {
    setIsLoading(true);
    setError(null);
    setCurrentPrompt(prompt);
    setImageUrl(null);

    // Scroll result into view on smaller screens so user sees the loading state immediately
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

    try {
      const url = await generateImage(prompt, style, ratio);
      setImageUrl(url);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-studio-900 text-slate-100 font-sans pb-12">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Intro Text */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-studio-accent to-purple-400 mb-4 font-arabic">
            حوّل أفكارك إلى واقع
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-arabic">
            قم بإنشاء صور مذهلة باستخدام أحدث تقنيات الذكاء الاصطناعي من Google. فقط اكتب ما تتخيله.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Create stunning images with Google's latest AI. Just describe what you imagine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 sticky top-24">
            <ImageGenerator onGenerate={handleGenerate} isLoading={isLoading} />
            
            {/* Example Prompts / Tips */}
            <div className="bg-studio-800/20 border border-studio-700/50 rounded-xl p-5">
              <h3 className="text-sm font-bold text-slate-300 mb-3 font-arabic flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-yellow-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 2.625v2.813c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V6a2.25 2.25 0 00-2.25-2.25h-2.25V12a2.25 2.25 0 002.25 2.25z" />
                </svg>
                نصائح للحصول على أفضل النتائج
              </h3>
              <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside font-arabic">
                <li>كن دقيقاً في وصف المشهد (الإضاءة، الألوان).</li>
                <li>حدد الزاوية (مثلاً: من الأعلى، عن قرب).</li>
                <li>جرب أنماطاً مختلفة لنفس الوصف.</li>
                <li>Be specific about lighting and colors.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Preview/Result */}
          <div className="lg:col-span-7 xl:col-span-8" ref={resultRef}>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008h-.008v-.008z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <GeneratedImage 
              imageUrl={imageUrl} 
              loading={isLoading} 
              prompt={currentPrompt}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;