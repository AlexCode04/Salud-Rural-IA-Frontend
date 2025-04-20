"use client";
import React from 'react';
import { FaSearch, FaImage, FaCommentDots, FaEllipsisH } from 'react-icons/fa';

type UserProfileSidebarProps = {
  email: string;
};

export default function UserProfileSidebar({email}: UserProfileSidebarProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      {/* Imagen de perfil */}
      <img
        src="/assets/user.png" // Cambia esto por tu ruta de imagen real
        alt="Helena"
        className="w-24 h-24 rounded-full object-cover mb-4"
      />

      {/* Nombre y estado */}
      <h2 className="text-lg font-semibold">{email}</h2>
      <p className="text-sm text-gray-500 mb-4">Paciente</p>

      {/* Botón ver perfil */}
      <button className="bg-[#1d43aa] text-white text-sm py-2 px-4 rounded mb-6">
        View profile
      </button>

      {/* Acciones */}
      <div className="w-full space-y-4 text-left">
        <SidebarOption icon={<FaSearch />} label="Buscar en el chat" />
        <SidebarOption icon={<FaImage />} label="Enviar imagenes" />
        <SidebarOption icon={<FaCommentDots />} label="Chatea con un Experto" />
        <SidebarOption icon={<FaEllipsisH />} label="Más opciones" />
      </div>
    </div>
  );
}

function SidebarOption({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-800 cursor-pointer hover:text-black transition-colors duration-200">
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
