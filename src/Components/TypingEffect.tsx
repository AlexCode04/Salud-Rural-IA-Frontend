'use client';
import React, { useEffect, useState } from 'react';

type TypingEffectProps = {
  text: string;
};

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCharIndex(0);
  }, [text]);

  useEffect(() => {
    if (charIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, text]);

  return (
    <div className="text-black whitespace-pre-wrap">
      {displayedText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default TypingEffect;
