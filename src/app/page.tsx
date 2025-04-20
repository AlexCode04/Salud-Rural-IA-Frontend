"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/assets/fondo.jpg")' }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center px-4">
        <div className="bg-white px-10 py-16 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="mb-10 text-[#6FAA1D] lemonada-title">
            <h1 className="text-5xl font-bold">Salud Rural IA</h1>
            <p className="text-2xl mt-2">Tu asistente de salud</p>
          </div>

          <p className="text-gray-600 mb-8 text-sm">
            Bienvenido a Salud Rural IA, una solución tecnológica para brindar asistencia médica digital en zonas rurales.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded font-medium transition-all duration-200"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => router.push("/register")}
              className="w-full border border-gray-700 text-black py-2 rounded font-medium hover:bg-gray-100 transition-all duration-200"
            >
              Registrarse
            </button>
          </div>

          <div className="my-6 text-gray-400 text-sm">o ingresa con</div>

          <button className="w-full border py-2 rounded flex items-center hover:bg-gray-300 justify-center gap-2 transition-all duration-200">
            <Image
              src="/assets/google.png"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            Google
          </button>

          <p className="text-xs text-gray-500 mt-6">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="underline text-black">
              Términos de servicio
            </a>{" "}
            y{" "}
            <a href="#" className="underline text-black">
              Política de privacidad
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
