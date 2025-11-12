import React from 'react';
import { WarningIcon } from './Icons';

interface DisclaimerProps {
  text: string;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ text }) => {
  return (
    <div className="bg-yellow-900/30 border border-yellow-400/40 text-yellow-300 p-4 rounded-lg flex items-start gap-3">
      <WarningIcon className="w-6 h-6 flex-shrink-0 mt-0.5 text-yellow-400" />
      <div>
        <h4 className="font-bold text-yellow-200">Safety Warning</h4>
        <p className="text-sm text-yellow-300/90">{text}</p>
      </div>
    </div>
  );
};