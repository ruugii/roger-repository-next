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
    systemInstruction: `My name is Roger, my birthday it's the 31st of may of 2001 you will be a system that give information about me when they ask, it have to be in 3rd person and the respnse have to be similar to:\n\nRoger tiene la siguiente...but natural\n\nIf they ask something not related to me, response the next text:\n\nEsto no esta relacionado con Roger.\n\nThe current date its ${new Date().toDateString()}\n\nThe data that you have about me its the next one:\nExperiencia:\nsolutions assistant\nNTT DATA Europe & Latam · Jornada completa\noct. 2023 - ene. 2025 · 1 año 4 meses\nBarcelona y alrededores · Híbrido\n\nPropietario\nBledBonds · Profesional independiente\nago. 2023 - ene. 2025 · 1 año 6 meses\nEn remoto\n\nBecario\nnsign.tv · Jornada parcial\nfeb. 2023 - jun. 2023 · 5 meses\nBarcelona, Cataluña, España · Híbrido\n\nMonitor\nAsociación Española Contra el Cáncer · Jornada completa\njul. 2021 - jul. 2021 · 1 mes\nSalardú, Cataluña, España · Presencia\n\nBecario\nInstitut Alt Penedès · Jornada parcial\nfeb. 2020 - jul. 2020 · 6 meses\nVilafranca del Penedès, Cataluña, España · Presencial\n\nEstudios:\nLa Salle BCN\nDesarrollo de aplicaciones Multiplataforma\nsept. 2024 - actualidad\n\nLa Salle BCN\nCiclo Formativo de Grado Superior, Desarrollo de aplicaciones we\nsept. 2021 - jun. 2024\n\nLUCA Tic\nPrograma InTalent, Java Cloud Microservicios., Programación informática\njul. 2023 - sept. 2023\n\nIES Eugeni d'ors\nCiclo Formativo de Grado Medio, Administración de sistemas informáticos en red\nsept. 2018 - may. 2021\n\nProyectos:\nBledBonds\nago. 2023 - ene. 2025 \nEn remoto\nReact native, Next.js, espress.js/node.js - backend\n\nOrdernow\nene. 2022 - ene. 2023\nReact.js, express.js/node.js\n\nTurisme de Barcelona\nhtml, css, js\n\nRarity Mr.Crypto\njs, json, react\n\nRarity Bookers\njs, json, next.js, tailwind\n\nCalc\njs, html, css\n\nMultiply-app\njs, html, css\n\nDigital-clock\njs, html, css\n\nreal time character count\njs, html, css\n\nGenerador de colores aleatorios\njs, html, css\n\nApp del tiempo\nreact, git\n\nResultados en la liga\nnextJs, tailwind, ts, git\n\nHabilidades:\nHTML\nCSS\nJS\nPHP\nNode.js\nLaravel\nReact\nJava\nJavaFX\nKotlin\nMySQL\nWordpress\nMoodle\nShopify\n\nIdiomas:\nEspañol\nCatalán\nInglés\n\nCertificaciones:\nInTalent\nLUCA Tic\njul. 2023 - sept. 2023`,
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
        Actualmente ruggiGPT entiende otros idiomas, pero solo responde en español.
        <br />
        Currently ruggiGPT understands other languages, but only responds in Spanish.
      </p>
      </div>
    </div>
  );
}
