import React from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <input
        type="file"
        id="mushroom-upload-input"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <label
        htmlFor="mushroom-upload-input"
        className="group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-cyan-400/30 rounded-xl hover:border-cyan-400 hover:bg-cyan-900/20 transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
      >
        <UploadIcon className="w-16 h-16 text-cyan-400/50 group-hover:text-cyan-300 mb-4 transition-colors" />
        <span className="font-bold text-slate-300 group-hover:text-cyan-200">Click to upload a photo</span>
        <span className="text-sm text-slate-500 mt-1">PNG, JPG, or WEBP</span>
      </label>
      <p className="mt-6 text-slate-400 max-w-md">
        For best results, use a clear photo of a single mushroom with good lighting.
      </p>
    </div>
  );
};