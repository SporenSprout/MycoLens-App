import React from 'react';
import type { MushroomIdentification } from '../types';
import { Disclaimer } from './Disclaimer';

interface ResultCardProps {
  result: MushroomIdentification;
  imagePreviewUrl: string;
  onReset: () => void;
}

const ConfidenceBar: React.FC<{ score: number }> = ({ score }) => {
    const getBarColor = (s: number) => {
        if (s < 40) return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]';
        if (s < 75) return 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.7)]';
        return 'bg-green-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]';
    };

    const getTextColor = (s: number) => {
        if (s < 40) return 'text-red-400';
        if (s < 75) return 'text-yellow-300';
        return 'text-green-300';
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-300">Confidence Score</span>
                <span className={`text-sm font-bold ${getTextColor(score)}`}>{score}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                <div 
                    className={`${getBarColor(score)} h-2.5 rounded-full transition-all duration-500`} 
                    style={{ width: `${score}%` }}
                ></div>
            </div>
        </div>
    );
};

export const ResultCard: React.FC<ResultCardProps> = ({ result, imagePreviewUrl, onReset }) => {
  return (
    <div className="animate-fade-in flex flex-col md:flex-row gap-6 md:gap-8 items-start p-6">
      <div className="w-full md:w-1/3 flex-shrink-0">
        <img src={imagePreviewUrl} alt={result.commonName} className="w-full h-auto rounded-xl object-cover shadow-lg shadow-black/50 border border-slate-700" />
      </div>
      <div className="w-full md:w-2/3 space-y-4">
        <div>
          <h2 className="text-3xl font-bold text-cyan-300 text-shadow-[0_0_8px_rgba(0,255,255,0.5)]">{result.commonName}</h2>
          <p className="text-slate-400 italic">{result.scientificName}</p>
        </div>
        
        <ConfidenceBar score={result.confidence} />
        
        <div>
          <h3 className="font-semibold text-slate-200 mb-1">Description</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{result.description}</p>
        </div>
        
        <Disclaimer text={result.disclaimer} />

        <button 
          onClick={onReset} 
          className="w-full mt-4 px-6 py-3 bg-cyan-500 text-slate-900 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
          Identify Another
        </button>
      </div>
    </div>
  );
};