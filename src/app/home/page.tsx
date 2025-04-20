"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BotInfo from '@/Components/UserInfo';
import MessageBubble from '@/Components/MessageBubble';
import UserProfileSidebar from '@/Components/UserProfileSidebar';
import BotProfile from '@/Components/BotProfile';
import TypingEffect from '@/Components/TypingEffect';

export default function ChatLayout() {
  const [messages, setMessages] = useState<{ message: string; type: string }[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { message: inputText, type: "input" };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      const response = await axios.get(`http://127.0.0.1:8001/generate-answer/`, {
        params: {
          query: inputText
        }
      });

      const botResponse = {
        message: (response.data as { answer: string }).answer,
        type: "response"
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error al obtener la respuesta:", error);
      setMessages(prev => [...prev, {
        message: "Ocurrió un error al procesar tu consulta. Intenta nuevamente.",
        type: "response"
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sección izquierda */}
      <aside className="w-1/4 p-4 overflow-y-auto flex justify-center items-center border-gray-200">
        <BotProfile />
      </aside>

      {/* Sección central - Chat */}
      <main className="w-2/4 bg-white border-x border-gray-300 flex flex-col">
        {/* Header del chat */}
        <div className="border-b-2 py-6 flex justify-center border-gray-200">
          <BotInfo />
        </div>

        {/* Mensajes con scroll */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 && (
            <div className="flex  flex-col justify-center items-center h-full">
              <h1 className='text-2xl '>¿Como te encuentras el dia de hoy?</h1>
              <h2 className='text-xl'>Escribe tus sintomas en la parte inferior!</h2>
            </div>
          )}
          {messages.map((msg, index) => {
            const isLast = index === messages.length - 1;
            const isResponse = msg.type === "response";

            if (isLast && isResponse && !loading) {
              return (
                <MessageBubble key={index} message={<TypingEffect text={msg.message.replace("undefined", "")} />} type={msg.type} />
              );
            }

            return <MessageBubble key={index} message={msg.message} type={msg.type} />;
          })}
          {loading && <MessageBubble message="Pensando..." type="response" />}
        </div>

        {/* Input fijo abajo */}
        <div className="border-t border-gray-200 p-4 flex items-center">
          <input
            type="text"
            placeholder="Escribe lo que sientes..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="w-10/12 py-2 px-3 border-gray-500 border-2 hover:border-black rounded text-sm focus:outline-none transition-all duration-200"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#1d43aa] hover:bg-[#323b63f8] text-white py-2 px-4 rounded ml-2 transition-all duration-200"
            disabled={loading}
          >
            Enviar
          </button>
        </div>
      </main>

      {/* Sección derecha */}
      <aside className="w-1/4 border-x border-gray-200 p-4 overflow-y-auto">
        <UserProfileSidebar email={userEmail}/>
      </aside>
    </div>
  );
}
