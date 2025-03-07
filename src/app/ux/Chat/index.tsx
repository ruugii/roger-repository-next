"use client";

import {
  GoogleGenerativeAI
} from "@google/generative-ai";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

type Message = {
  role: "user" | "model";
  parts: { text: string }[];
};

export default function Chat() {

  const t = useTranslations('ia')

  const [apiKey] = useState<string>(process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "");
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Referencia para el scroll
  const [loadingMessage, setLoadingMessage] = useState(false);

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You will be an assistant for people who ask about Roger Barrero. You speak three languages: Catalan, Spanish, and English. If anyone asks for another language, explain that you only understand these three languages. If someone asks about something not related to Roger, return an error message.\n\nToday's date is ${new Date().toDateString()}.\n\nInformation about Roger\nPersonal Details:\n- Name: Roger Barrero\n- Born: May 31, 2001\n\nWork Experience:\n- Solutions Assistant – NTT DATA Europe & Latam (Oct 2023 – Jan 2025 | 1 year, 4 months) | Hybrid, Barcelona\n- Founder & Owner – BledBonds (Aug 2023 – Jan 2025 | 1 year, 6 months) | Remote\n- Intern – nsing.tv (Feb 2023 – Jun 2023 | 5 months) | Hybrid, Barcelona\n- Monitor – Asociación Española Contra el Cáncer (Jul 2021 | 1 month) | Salardú, Catalonia, Spain\n- Intern – Institut Alt Penedès (Feb 2020 – Jul 2020 | 6 months) | On-site, Vilafranca del Penedès\n\nEducation:\n- La Salle BCN – Higher Degree in Multiplatform Application Development (Sep 2024 – Present)\n- La Salle BCN – Higher Degree in Web Application Development (Sep 2021 – Jun 2024)\n- LUCA Tic – InTalent Program, Java Cloud Microservices (Jul 2023 – Sep 2023)\n- IES Eugeni d'Ors – Middle Degree in Network System Administration (Sep 2018 – May 2021)\n\nProjects:\n- BledBonds (Aug 2023 – Jan 2025) – React Native, Next.js, Express.js/Node.js (Backend)\n- OrderNow (Jan 2022 – Jan 2023) – React.js, Express.js/Node.js\n- Turisme de Barcelona – HTML, CSS, JS\n- Rarity Mr. Crypto – JS, JSON, React\n- Rarity Bookers – JS, JSON, Next.js, Tailwind\n- Calc – JS, HTML, CSS\n- Multiply-app – JS, HTML, CSS\n- Digital Clock – JS, HTML, CSS\n- Real-Time Character Counter – JS, HTML, CSS\n- Random Color Generator – JS, HTML, CSS\n- Weather App – React, Git\n- League Results – Next.js, Tailwind, TypeScript, Git\n\nSkills:\n- Frontend & Backend: HTML, CSS, JS, PHP, Node.js, Laravel, React, Java, JavaFX, Kotlin\n- Databases & CMS: MySQL, WordPress, Moodle, Shopify\n\nLanguages:\n- Spanish\n- Catalan\n- English\n\nCertifications:\n- InTalent – LUCA Tic (Jul 2023 – Sep 2023)`,
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  async function run(newMessage: string) {
    setLoadingMessage(true);
    // Agregar mensaje del usuario primero
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", parts: [{ text: newMessage }] },
    ]);

    setMessage("");

    const chatSession = model.startChat({
      generationConfig,
      history: messages, // Enviar historial de la conversación
    });

    const response = await chatSession.sendMessage(newMessage);
    if (response) {
      setLoadingMessage(false);
      const botResponse = response.response.text();

      // Agregar respuesta del modelo al estado
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "model", parts: [{ text: botResponse }] },
      ]);
    }

  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendButtonClicked = () => {
    if (message.trim() === "") return;
    run(message);
  };

  return (
    <div className="fixed bottom-0 right-0 mb-5 mr-5">
      {openChat ? (
        <div className="bg-white p-4 rounded-lg min-h-[60vh] max-h-[60vh] min-w-80 max-w-80 flex flex-col text-black shadow-lg border-black border-solid border-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Chat</h2>
            <button onClick={() => setOpenChat(false)} className="text-red-500">X</button>
          </div>
          <div className="flex flex-col gap-2 overflow-auto max-h-[50vh] p-2 flex-1">
            <div className="p-2 rounded-lg bg-gray-200 text-black">
              <p className="whitespace-pre-wrap">Hola, soy Ruugii GPT, el asistente personal de Roger. ¿En qué puedo ayudarte hoy?</p>
            </div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${msg.role === "model" ? "bg-gray-200" : "bg-yellow-500 text-white"}`}
              >
                {msg.parts.map((part, i) => (
                  <p key={i} className="whitespace-pre-wrap">{part.text}</p>
                ))}
              </div>
            ))}
            {loadingMessage && (
              <div
                className={`p-2 rounded-lg ${"bg-gray-200"}`}
              >
                <div className="flex flex-row gap-2">
                  <div className="w-2 h-2 rounded-full bg-black animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Elemento oculto para el scroll */}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 rounded-lg border-yellow-500 border-2 border-solid"
            />
            <button onClick={sendButtonClicked} className="bg-yellow-500 p-2 rounded-lg text-white">
              <Image src="/icon/send.svg" width={20} height={20} alt="icono para mandar el mensaje a la IA" />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-white p-4 rounded-full min-h-20 min-w-20 flex items-center justify-center text-black shadow-2xl cursor-pointer border-black border-2"
          onClick={() => setOpenChat(true)}
        >
          <Image src="/icon/chat.svg" width={30} height={30} alt="icono de chat, habla con Ruugii GPT" />
          <p className="ml-2">{t('button')}</p>
        </button>
      )}
      <div className="min-h-20 flex items-center bg-white text-black mt-2 pt-2 px-4 shadow-lg rounded-full border-black border-2">
      <p>
        Actualmente ruggiGPT entiende español y ingles.
        <br />
        Currently ruggiGPT understands Spanish and English.
      </p>
      </div>
    </div>
  );
}
