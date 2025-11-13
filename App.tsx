import React, { useState, useCallback } from 'react';
import type { AppStatus, MushroomIdentification } from './types';
import { identifyMushroom } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import { ResultCard } from './components/ResultCard';
import { SpinnerIcon } from './components/Icons';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>('idle');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<MushroomIdentification | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    setStatus('preview');
    setError(null);
    setResult(null);
  };

  const handleIdentify = useCallback(async () => {
    if (!imageFile) return;

    setStatus('loading');
    setError(null);
    try {
      const identificationResult = await identifyMushroom(imageFile);
      setResult(identificationResult);
      setStatus('success');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setStatus('error');
    }
  }, [imageFile]);

  const handleReset = () => {
    setStatus('idle');
    setImageFile(null);
    setImagePreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans text-slate-300">
      <main className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8 animate-fade-in flex flex-col items-center">
          <img 
            src="https://raw.githubusercontent.com/SporenSprout/MycoLens-App/main/assets/images/7B26F205-A653-4ADD-A27A-DBF397810922%202.PNG"
            alt="MycoLens Logo" 
            className="w-32 h-32 mb-4"
          />
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-cyan-300 text-shadow-[0_0_10px_rgba(0,255,255,0.5)]">MycoLens</h1>
          <p className="text-slate-400 mt-2 font-semibold">Free Mushroom Identification Tool</p>
        </header>

        <div className="bg-slate-900/50 backdrop-blur-md border border-cyan-400/30 rounded-2xl shadow-2xl shadow-cyan-500/20 transition-all duration-300 min-h-[30rem] flex flex-col justify-center">
          {status === 'idle' && <ImageUploader onImageSelect={handleImageSelect} />}
          
          {status === 'preview' && imagePreviewUrl && (
            <div className="text-center flex flex-col items-center gap-4 p-6">
              <img src={imagePreviewUrl} alt="Mushroom preview" className="max-h-80 w-auto rounded-xl object-cover shadow-lg shadow-black/50" />
              <div className="flex items-center gap-4 mt-4">
                <button onClick={handleReset} className="px-6 py-2 text-slate-300 bg-slate-700/50 border border-slate-500 hover:bg-slate-600/50 hover:border-slate-400 rounded-full font-semibold transition-all">
                  Change Photo
                </button>
                <button onClick={handleIdentify} className="px-8 py-3 bg-cyan-500 text-slate-900 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
                  Identify Mushroom
                </button>
              </div>
            </div>
          )}

          {status === 'loading' && imagePreviewUrl && (
             <div className="text-center flex flex-col items-center gap-4 p-6 animate-fade-in">
              <div className="relative inline-block overflow-hidden rounded-xl">
                <img src={imagePreviewUrl} alt="Analyzing mushroom" className="max-h-80 w-auto object-cover shadow-lg shadow-black/50" />
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="scan-line absolute left-0 w-full h-[3px] bg-cyan-400 shadow-[0_0_10px_theme(colors.cyan.400),0_0_20px_theme(colors.cyan.300)]"></div>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-cyan-300">Analyzing...</h2>
                <p className="text-slate-400">Please wait while we identify your mushroom.</p>
              </div>
            </div>
          )}

          {status === 'success' && result && imagePreviewUrl && (
            <ResultCard result={result} imagePreviewUrl={imagePreviewUrl} onReset={handleReset} />
          )}

          {status === 'error' && (
            <div className="text-center flex flex-col items-center gap-4 p-6 text-red-400">
              <h3 className="font-bold text-xl text-shadow-[0_0_8px_rgba(255,0,0,0.5)]">Identification Failed</h3>
              <p className="max-w-md">{error}</p>
              <button onClick={handleReset} className="mt-4 px-6 py-2 bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30 hover:border-red-500 rounded-full font-semibold transition-colors">
                Try Again
              </button>
            </div>
          )}
        </div>

        <footer className="text-center mt-8 text-sm text-slate-500">
          <p>This tool is for educational purposes only. Do not consume any mushroom based on this app's identification.</p>
          <p className="mt-2 text-slate-600">provided by <span className="font-semibold text-slate-500">Spore n' Sprout</span></p>
        </footer>
      </main>
    </div>
  );
};

export default App;