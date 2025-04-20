import React from 'react';
import { MessageBubbleProps } from '@/app/types';


export default function MessageBubble({ message, type }: MessageBubbleProps) {
  const isInput = type === 'input';

  return (
    <div className={`flex ${isInput ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`
          max-w-11/12 px-4 py-2 rounded-xl text-sm 
          ${isInput ? 'bg-[#1d43aa] text-white rounded-br-none' : 'bg-gray-200 text-black rounded-bl-none'}
        `}
      >
        {message}
      </div>
    </div>
  );
}
