// components/UserInfo.tsx
'use client';

import Image from 'next/image';

export default function BotInfo() {
  return (
    <div className="flex items-center space-x-3">
      <Image
        src="/assets/botimage.webp"
        alt="Bot Image"
        width={60}
        height={60}
        className="rounded-full object-cover"
      />
      <div>
        <p className="text-sm font-semibold">Asistente Medico IA</p>
      </div>
    </div>
  );
}
