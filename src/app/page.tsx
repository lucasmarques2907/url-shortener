"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { validateUrl } from "@/lib/helpers";
import FeedbackCard from "@/components/FeedbackCard";
import { Feedback } from "@/types/form";

export default function Home() {
  const [url, setUrl] = useState("");
  const [disableForm, setDisableForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState<Feedback | null>(null);

  const handleUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setUrl(url);
    setDisableForm(!validateUrl(url));
    if (feedbackData !== null) {
      setFeedbackData(null);
    }
  };

  async function handleSubmit(e: React.SubmitEvent<Element>) {
    e.preventDefault();

    if (disableForm) return;

    setLoading(true);

    const response = await fetch("/api/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }),
    });

    const data = await response.json();

    setLoading(false);

    if (data.error) {
      setFeedbackData({
        type: "Error",
        message: data.message,
      });
      return;
    }

    setFeedbackData({
      type: "Success",
      urlData: data.result,
    });

    console.log(data);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex flex-col gap-4 bg-zinc-800 border-2 border-zinc-700 rounded-xl max-w-lg w-full h-fit p-8">
        <div className="flex gap-x-2 items-center">
          <Icon
            width={24}
            icon="material-symbols:link-2"
            className="text-cyan-400"
          />
          <h1 className="font-semibold text-xl">Encurte seu link</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] gap-2"
        >
          <input
            type="text"
            name="url"
            id="url"
            placeholder="Coloque sua URL aqui..."
            value={url}
            onChange={handleUrl}
            className="px-3 py-2 bg-zinc-900 border-2 border-zinc-700 rounded-lg focus:border-cyan-400 outline-none transition-all duration-100"
          />
          <button
            disabled={disableForm || loading}
            type="submit"
            className="relative px-3 py-2 bg-cyan-900 border-2 border-cyan-900 rounded-lg text-cyan-400 font-semibold cursor-pointer transition-all duration-100 hover:border-cyan-400 focus-visible:border-cyan-400 disabled:opacity-50 disabled:border-cyan-900 disabled:cursor-not-allowed outline-none overflow-hidden"
          >
            {loading && (
              <Icon
                width={24}
                icon="eos-icons:loading"
                className="absolute top-0 left-0 w-full h-full p-1 backdrop-blur-xs"
              />
            )}
            Encurtar
          </button>
        </form>

        <div className="flex gap-2 text-zinc-500 text-sm items-center">
          <Icon width={24} icon="material-symbols:timer-outline-rounded" />
          <p>
            Todos os links criados são válidos por{" "}
            <span className="font-semibold">10 minutos.</span>
          </p>
        </div>
        {feedbackData && <FeedbackCard {...feedbackData} />}
      </div>
    </div>
  );
}
