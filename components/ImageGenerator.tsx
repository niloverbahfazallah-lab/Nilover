import React, { useState, useCallback } from 'react';
import { STYLE_OPTIONS, ASPECT_RATIOS } from '../constants';
import { ImageStyle, AspectRatio } from '../types';

interface ImageGeneratorProps {
  onGenerate: (prompt: string, style: ImageStyle, ratio: AspectRatio) => void;
  isLoading: boolean;
}

const EXAMPLES = [
  {
    label: 'Sunset Alexandria',
    labelAr: 'غروب الإسكندرية',
    prompt: 'غروب شمس ساحر على شاطئ بحر الإسكندرية مع قلعة قايتباي في الخلفية، إضاءة ذهبية',
    style: ImageStyle.REALISTIC,
    ratio: AspectRatio.LANDSCAPE_16_9
  },
  {
    label: 'Cute Robot',
    labelAr: 'روبوت لطيف',
    prompt: 'روبوت صغير ودود يزرع زهرة في حديقة مشمسة، ألوان زاهية، تفاصيل دقيقة',
    style: ImageStyle.THREE_D,
    ratio: AspectRatio.SQUARE
  },
  {
    label: 'Cyberpunk City',
    labelAr: 'مدينة المستقبل',
    prompt: 'A futuristic cyberpunk city with neon lights and flying cars, rain reflecting on streets, cinematic lighting',
    style: ImageStyle.CINEMATIC,
    ratio: AspectRatio.LANDSCAPE_16_9
  },
  {
    label: 'Classic Library',
    labelAr: 'مكتبة كلاسيكية',
    prompt: 'A cozy classic library with high wooden shelves, a comfortable leather chair, dust motes dancing in light beams',
    style: ImageStyle.OIL_PAINTING,
    ratio: AspectRatio.PORTRAIT_3_4
  }
];

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>(ImageStyle.NONE);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>(AspectRatio.SQUARE);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, selectedStyle, selectedRatio);
    }
  }, [prompt, selectedStyle, selectedRatio, onGenerate]);

  const applyExample = (ex: typeof EXAMPLES[0]) => {
    setPrompt(ex.prompt);
    setSelectedStyle(ex.style);
    setSelectedRatio(ex.ratio);
  };

  return (
    <div className="bg-studio-800/40 backdrop-blur-md border border-studio-700 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-arabic">
        <span className="bg-studio-accent w-1 h-6 rounded-full"></span>
        إعدادات الصورة
        <span className="text-sm font-normal text-slate-400 ml-2">(Image Settings)</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Prompt Input */}
        <div className="space-y-2">
          <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 font-arabic">
            وصف الصورة (Prompt)
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="ex: A futuristic city on Mars at sunset... / مثال: مدينة مستقبلية على المريخ وقت الغروب"
            className="w-full h-32 bg-studio-900/50 border border-studio-600 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-studio-accent focus:border-transparent transition-all resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Style Selection */}
          <div className="space-y-2">
            <label htmlFor="style" className="block text-sm font-medium text-slate-300 font-arabic">
              نمط الصورة (Style)
            </label>
            <div className="relative">
              <select
                id="style"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value as ImageStyle)}
                className="w-full bg-studio-900/50 border border-studio-600 rounded-xl px-4 py-3 text-white appearance-none focus:ring-2 focus:ring-studio-accent focus:border-transparent cursor-pointer"
              >
                {STYLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.labelAr} - {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Aspect Ratio Selection */}
          <div className="space-y-2">
            <label htmlFor="ratio" className="block text-sm font-medium text-slate-300 font-arabic">
              أبعاد الصورة (Size & Ratio)
            </label>
            <div className="relative">
              <select
                id="ratio"
                value={selectedRatio}
                onChange={(e) => setSelectedRatio(e.target.value as AspectRatio)}
                className="w-full bg-studio-900/50 border border-studio-600 rounded-xl px-4 py-3 text-white appearance-none focus:ring-2 focus:ring-studio-accent focus:border-transparent cursor-pointer"
              >
                {ASPECT_RATIOS.map((ratio) => (
                  <option key={ratio.value} value={ratio.value}>
                    {ratio.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all duration-200 flex items-center justify-center gap-3
            ${isLoading || !prompt.trim()
              ? 'bg-slate-700 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-studio-accent to-purple-600 hover:from-studio-accentHover hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98]'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>تحسين وإنشاء... (Enhancing & Generating)</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              <span className="font-arabic">تحسين وإنشاء (Enhance & Generate)</span>
            </>
          )}
        </button>
      </form>

      {/* Examples Section */}
      <div className="mt-8 border-t border-studio-700 pt-6">
        <p className="text-sm text-slate-400 mb-4 font-arabic flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-studio-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.695 4.675a6 6 0 002.25-2.25" />
            </svg>
            جرب مثالاً (Try an example):
        </p>
        <div className="grid grid-cols-2 gap-3">
            {EXAMPLES.map((ex, idx) => (
                <button
                    key={idx}
                    type="button"
                    onClick={() => applyExample(ex)}
                    className="text-left p-3 rounded-lg bg-studio-900/30 hover:bg-studio-700 border border-studio-600/50 hover:border-studio-500 transition-colors group flex flex-col gap-1"
                >
                    <div className="font-medium text-slate-200 text-sm font-arabic group-hover:text-white">{ex.labelAr}</div>
                    <div className="text-xs text-slate-500 group-hover:text-slate-400">{ex.label}</div>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;