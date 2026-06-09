"use client";

import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

type Message = {
  role: "user" | "model";
  parts: { text: string }[];
};

export default function Chat(props: {
  text: string;
  firstMsg: string;
  changeAudio: string;
  changeText: string;
  power: string;
}) {
  const { text, firstMsg, changeAudio, changeText, power } = props;

  const searchParams = useSearchParams();
  const [audioEnabled] = useState<boolean>(false);
  const [textEnabled] = useState<boolean>(true);
  const [mode, setMode] = useState<"text" | "audio">("text");
  const [openChat, setOpenChat] = useState<boolean>(
    searchParams.get("open")?.toString() === "true"
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Referencia para el scroll
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);

  const finish = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const record = () => {
    if (mediaRecorder) {
      setAudioChunks([]);
      mediaRecorder.start();
      setRecording(true);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && mode === "audio") {
          audioChunks.push(event.data);
          console.log(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(audioBlob));
        setAudioChunks([]);
        setRecording(false);
      };
    }
  };

  useEffect(() => {
    if (audioURL !== "") {
      setMessages([
        ...messages,
        {
          role: "user",
          parts: [
            {
              text: audioURL,
            },
          ],
        },
      ]);
      setAudioURL("");
      // uploadToGemini(audioURL, 'audio/webm')
    }
  }, [audioURL, messages]);

  const changeToAudioIA = () => {
    setMode("audio");
    setMessage("");
    if (navigator?.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream) => {
          setMediaRecorder(new MediaRecorder(stream));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      return;
    }
  };

  const changeToTextIA = () => {
    setMode("text");
    if (mediaRecorder) {
      setRecording(false);
      setAudioURL("");
      setMediaRecorder(null);
    }
  };

  async function run(newMessage: string) {
    setLoadingMessage(true);
    // Agregar mensaje del usuario primero
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", parts: [{ text: newMessage }] },
    ]);

    setMessage("");

    try {
      fetch("https://n8n.petons.cat/webhook/0969abbd-d4f3-493b-a587-54e66ea9a0cd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage, history: messages }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del webhook:", data);
          let botResponse = data[0].output;
          do {
            botResponse = botResponse
              .replace("**", "<strong>")
              .replace("**", "</strong>");
          } while (botResponse.includes("**"));
          do {
            botResponse = botResponse.replace("*", "-");
          } while (botResponse.includes("*"));
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "model", parts: [{ text: botResponse }] },
          ]);
          setLoadingMessage(false);

        });
    } catch (error) {
      setLoadingMessage(false);
      console.error("Error al enviar el mensaje:", error);
      return;
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendButtonClicked = () => {
    if (message.trim() === "") return;
    run(message);
  };

  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  useEffect(() => {
    params.set("open", `${openChat}`);
    replace(`${pathname}?${params.toString()}`);
  }, [openChat]);

  return (
    <div className="fixed bottom-0 right-0 mb-5 mr-5 hidden md:block">
      {openChat ? (
        <div className="bg-white p-4 rounded-lg min-h-[60vh] max-h-[60vh] min-w-md max-w-md flex flex-col text-black shadow-lg border-black border-solid border-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Chat</h2>
            <button onClick={() => setOpenChat(false)} className="text-red-500">
              X
            </button>
          </div>
          <div className="flex flex-col gap-2 overflow-auto max-h-[50vh] p-2 flex-1">
            <div className="p-2 rounded-lg bg-gray-200 text-black">
              <p className="whitespace-pre-wrap">{firstMsg}</p>
            </div>
            {messages.map((msg, index) => (
              <div
                key={index + 1}
                className={`p-2 rounded-lg ${
                  msg.role === "model"
                    ? "bg-gray-200"
                    : "bg-yellow-500 text-white"
                }`}
              >
                {msg.parts.map((part, i) =>
                  part.text.includes("blob:http://") ||
                  part.text.includes("blob:https://") ? (
                    <audio key={i + 1} controls className="w-full">
                      <source src={part.text} type="audio/webm" />
                      Your browser does not support the <code>audio</code>{" "}
                      element.
                    </audio>
                  ) : (
                    <p
                      key={i + 1}
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: part.text }}
                    ></p>
                  )
                )}
              </div>
            ))}
            {loadingMessage && (
              <div className={`p-2 rounded-lg ${"bg-gray-200"}`}>
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
              value={
                mode === "text"
                  ? message
                  : mode === "audio" && recording
                  ? "RECORDING"
                  : ""
              }
              onChange={(e) => setMessage(e.target.value)}
              disabled={mode === "audio"}
              className="flex-1 p-2 rounded-lg border-yellow-500 border-2 border-solid"
            />
            {audioEnabled &&
              (mode === "text" ? (
                <button
                  onClick={changeToAudioIA}
                  className="bg-yellow-500 disabled:bg-yellow-200 disabled:text-black/50 p-2 rounded-lg text-white"
                  disabled={!audioEnabled}
                >
                  <p>{changeAudio}</p>
                </button>
              ) : (
                <button
                  onClick={changeToTextIA}
                  className="bg-yellow-500 disabled:bg-yellow-200 disabled:text-black/50 p-2 rounded-lg text-white"
                  disabled={!textEnabled}
                >
                  <p>{changeText}</p>
                </button>
              ))}
            {mode === "text" ? (
              <button
                onClick={sendButtonClicked}
                className="bg-yellow-500 disabled:bg-yellow-200 p-2 rounded-lg text-white"
                disabled={loadingMessage}
              >
                <Image
                  src="/icon/send.svg"
                  width={20}
                  height={20}
                  alt="icono para mandar el mensaje a la IA"
                />
              </button>
            ) : mode === "audio" && recording ? (
              <button
                onClick={recording ? finish : record}
                className="bg-yellow-500 disabled:bg-yellow-200 p-2 rounded-lg text-white"
                disabled={!audioEnabled}
              >
                <Image
                  src="/icon/send.svg"
                  width={20}
                  height={20}
                  alt="icono para grabar el mensaje de audio a la IA"
                />
              </button>
            ) : (
              <button
                onClick={recording ? finish : record}
                className="bg-yellow-500 disabled:bg-yellow-200 p-2 rounded-lg text-white"
                disabled={!audioEnabled}
              >
                <Image
                  src="/icon/mic.svg"
                  width={20}
                  height={20}
                  alt="icono para grabar el mensaje a la IA"
                />
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          className="bg-white p-4 rounded-full min-h-20 min-w-20 text-black shadow-2xl cursor-pointer border-black border-2 flex flex-col"
          onClick={() => setOpenChat(true)}
        >
          <div className="flex items-center justify-center">
            <Image
              src="/icon/chat.svg"
              width={30}
              height={30}
              alt="icono de chat, habla con Ruugii GPT"
            />
            <p className="ml-2">{text}</p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/icon/gemini.svg"
              width={30}
              height={30}
              alt="icono de chat, habla con Ruugii GPT"
            />
            <p className="ml-2">{power}</p>
          </div>
        </button>
      )}
    </div>
  );
}
