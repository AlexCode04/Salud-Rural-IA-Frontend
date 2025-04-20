"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
 

  const handleRegister = async () => {
    setError("");
    setSuccess("");
  
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if(password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (typeof response.data === "string" && response.data === "user already exists") {
        setError("El usuario ya existe");
        return;
      }
      setSuccess("¡Registro exitoso!");
      localStorage.setItem("userEmail", email);
      router.push("/home");
    } catch (err: any) {
      setError("Error al registrar intentelo de nuevo");
    }
  };
  
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/assets/fondo.jpg")' }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-center px-4 space-y-4">
        <div className="bg-white px-8 py-16 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="mb-8 lemonada-title text-[#6FAA1D]">
            <h1 className="text-5xl font-bold">Salud Rural IA</h1>
            <p className="text-2xl mb-6">Tu asistente de salud</p>
          </div>

          <h2 className="text-xl font-semibold mb-2">Crear una cuenta</h2>
          <p className="text-sm text-gray-600 mb-4">
            Introduce tu correo electrónico para registrarte
          </p>
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
          <input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4 text-sm"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4 text-sm"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4 text-sm"
          />
          <button
            onClick={handleRegister}
            className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded font-medium transition-all duration-200"
          >
            Regístrate con el correo electrónico
          </button>
          </form>

          {/* Mensajes de error y éxito */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

          <div className="my-4 text-gray-400 text-sm">o continúe con</div>

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

          <p className="text-xs text-gray-500 mt-4">
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
