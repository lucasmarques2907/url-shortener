"use client";

import { ShortenedUrl } from "@/lib/url";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");

  const handleUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  async function handleSubmit(e: React.SubmitEvent<Element>) {
    e.preventDefault();

    const response = await fetch("/api/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });

    const data = (await response.json()) as ShortenedUrl;
    console.log(response.status, data);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-zinc-900 border-2 border-zinc-800 rounded-md flex flex-col items-center justify-center max-w-lg w-full h-64">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 flex-wrap justify-center"
        >
          <input
            type="text"
            name="url"
            id="url"
            placeholder="Ex: http://localhost:3000/"
            value={url}
            onChange={handleUrl}
            className="px-2 py-1 bg-zinc-800 border-2 border-zinc-700 rounded-md"
          />
          <button
            type="submit"
            className="px-2 py-1 bg-emerald-800 border-2 border-emerald-700 rounded-md text-emerald-400 font-semibold"
          >
            Encurtar
          </button>
        </form>
      </div>
    </div>
  );
}
