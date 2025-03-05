"use client";

import {
  GoogleGenerativeAI
} from "@google/generative-ai";

import { useEffect, useState } from "react";

type Message = {
  role: "user" | "model";
  parts: { text: string }[];
};

export default function Chat() {
  const [apiKey] = useState<string>(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(apiKey);
  }, [apiKey]);

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "My name is Roger, it will be a system that give information about me when they ask, it have to be in 3rd person and the respnse have to be similar to:\n\nRoger tiene la siguiente...\n\nIf they ask something not related to me, response the next text:\n\nEsto no esta relacionado con Roger.\n\nThe current date its march 2025\n\nThe data that you have about me its the next one:\nExperiencia:\nsolutions assistant\nNTT DATA Europe & Latam · Jornada completa\noct. 2023 - ene. 2025 · 1 año 4 meses\nBarcelona y alrededores · Híbrido\n\nPropietario\nBledBonds · Profesional independiente\nago. 2023 - ene. 2025 · 1 año 6 meses\nEn remoto\n\nBecario\nnsign.tv · Jornada parcial\nfeb. 2023 - jun. 2023 · 5 meses\nBarcelona, Cataluña, España · Híbrido\n\nMonitor\nAsociación Española Contra el Cáncer · Jornada completa\njul. 2021 - jul. 2021 · 1 mes\nSalardú, Cataluña, España · Presencia\n\nBecario\nInstitut Alt Penedès · Jornada parcial\nfeb. 2020 - jul. 2020 · 6 meses\nVilafranca del Penedès, Cataluña, España · Presencial\n\nEstudios:\nLa Salle BCN\nDesarrollo de aplicaciones Multiplataforma\nsept. 2024 - actualidad\n\nLa Salle BCN\nCiclo Formativo de Grado Superior, Desarrollo de aplicaciones we\nsept. 2021 - jun. 2024\n\nLUCA Tic\nPrograma InTalent, Java Cloud Microservicios., Programación informática\njul. 2023 - sept. 2023\n\nIES Eugeni d'ors\nCiclo Formativo de Grado Medio, Administración de sistemas informáticos en red\nsept. 2018 - may. 2021\n\nProyectos:\nBledBonds\nago. 2023 - ene. 2025 \nEn remoto\n\nOrdernow\nene. 2022 - ene. 2023",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  async function run(newMessage: string) {
    const chatSession = model.startChat({
      generationConfig,
      history: messages,
    });

    await chatSession.sendMessage(newMessage);
    setMessage("");
  }

  const sendButtonClicked = () => {
    if (message === "") return;
    run(message);
  };

  const handleClick = () => {
    setOpenChat(!openChat);
    if (!openChat) {
      setMessages([
        { role: "user", parts: [{ text: "Dime la experiencia en 2025" }] },
        {
          role: "model",
          parts: [{ text: "Roger tiene la siguiente experiencia en 2025..." }],
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-5 mr-5">
      {openChat ? (
        <div className="bg-white p-4 rounded-lg min-h-[60vh] max-h-[60vh] min-w-80 max-w-80 flex flex-col text-black shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Chat</h2>
            <button onClick={() => setOpenChat(false)} className="text-red-500">X</button>
          </div>
          <div className="flex flex-col gap-2 overflow-auto max-h-[50vh] p-2 flex-1">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${message.role === "model" ? "bg-gray-200" : "bg-yellow-500 text-white"}`}
              >
                {message.parts.map((part, i) => (
                  <p key={i} className="whitespace-pre-wrap">{part.text}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 rounded-lg"
            />
            <button onClick={sendButtonClicked} className="bg-yellow-500 p-2 rounded-lg text-white">
              Enviar
            </button>
          </div>
        </div>
      ) : (
        <div
          className="bg-white p-4 rounded-full min-h-20 min-w-20 flex items-center justify-center text-black shadow-lg cursor-pointer"
          onClick={handleClick}
        >
          <h1>Chat</h1>
        </div>
      )}
    </div>
  );
}
