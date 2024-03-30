'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append
  } = useChat();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages])


  return (
    <div className="flex flex-col w-full h-screen max-w-md py-24 mx-auto stretch">
      <div className="overflow-auto h-[88%] w-full" ref={messagesContainerRef}>
        { messages.map(m => (
          <div
            key={m.id}
            className={`whitesapce-pre-wrap ${
              m.role === 'user'
              ? 'bg-green-700 p-3 m-2 rounded-lg'
              : 'bg-slate-700 p-3 m-2 rounded-lg'
            }`}
          >
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
          ))
        }

        {isLoading && (
          <div className="flex justify-end pr-4">
            <span className="animate-bounce">...</span>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-full max-w-md">
        <div className="flex flex-col justify-center items-center">
          <button
            className="bg-blue-500 p-2- text-white rounded shadow-xl"
            disabled={isLoading}
            onClick={() => append({ role: "user", content: "Give me a random recipe" })}
          >
            Random recipe
          </button>
          <p className="p-4">OR</p>
        </div>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  )
}