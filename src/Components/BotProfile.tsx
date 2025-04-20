"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

const messages = [
  '📄 Sube tu historia clínica y cuéntame sobre tus síntomas.',
  '💬 Dime qué sientes y te daré un pronóstico.',
  '🤖 Estoy aquí para ayudarte, ¿cómo te sientes hoy?',
];

export default function BotProfile() {
  return (
    <div className="flex flex-col items-center text-center p-6">
      {/* Imagen de perfil */}
      <Image
        src="/assets/botimage.webp"
        alt="Helena"
        width={96}
        height={96}
        className="rounded-full object-cover mb-4"
      />

      {/* Nombre y estado */}
      <h2 className="text-lg font-semibold">Asistente Medico IA</h2>
      <p className="text-sm text-gray-500 mb-4">Bot</p>

      {/* Texto animado */}
      <Typewriter messages={messages} />
    </div>
  );
}

function Typewriter({ messages }: { messages: string[] }) {
  const [index, setIndex] = useState(0); // mensaje actual
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < messages[index].length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + messages[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 40); // velocidad de escritura

      return () => clearTimeout(timeout);
    } else {
      // Esperar y pasar al siguiente mensaje
      const pause = setTimeout(() => {
        setDisplayedText('');
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % messages.length);
      }, 2000); // cuánto tiempo espera el mensaje antes de cambiar

      return () => clearTimeout(pause);
    }
  }, [charIndex, index, messages]);

  return (
    <div className="text-sm border-2 border-gray-100 text-gray-700 shadow-md px-4 py-3 rounded-xl mt-2 min-h-[48px]">
      {displayedText}
      <span className="animate-pulse">|</span>
    </div>
  );
}
