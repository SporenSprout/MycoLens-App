
import React from 'react';
import { SpinnerIcon } from './Icons';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
      <SpinnerIcon className="w-16 h-16 text-cyan-400" />
      <h2 className="mt-4 text-xl font-semibold text-cyan-300">Analyzing...</h2>
      <p className="text-slate-400">Please wait while we identify your mushroom.</p>
    </div>
  );
};