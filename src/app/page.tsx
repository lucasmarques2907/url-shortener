"use client";

import { ShortenedUrl } from "@/lib/url";
import { useState } from "react";
import { Icon } from "@iconify/react";

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
      <div className="flex flex-col gap-4 bg-zinc-800 border-2 border-zinc-700 rounded-xl max-w-lg w-full h-fit p-8">
        <div className="flex gap-x-2 items-center">
          <Icon
            width={24}
            icon="akar-icons:link-chain"
            className="text-cyan-400"
          />
          <h1 className="font-semibold text-xl">Encurte seu link</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid sm:grid-cols-[1fr_auto] gap-2"
        >
          <input
            type="text"
            name="url"
            id="url"
            placeholder="Coloque sua URL aqui..."
            value={url}
            onChange={handleUrl}
            className="px-3 py-2 bg-zinc-900 border-2 border-zinc-700 rounded-lg"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-cyan-400 border-2 border-cyan-400 rounded-lg text-black font-semibold"
          >
            Encurtar
          </button>
        </form>

        <div className="flex gap-2 text-zinc-500 text-sm items-center">
          <Icon width={24} icon="ant-design:info-circle-twotone" />
          <p>
            Todos os links criados possuem uma validade de{" "}
            <span className="font-semibold">10 minutos.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
