"use client";

import { buildUrl, sleep } from "@/lib/helpers";
import { useState } from "react";

type CopyButtonProps = {
  baseUrl: string;
  code: string;
};

export default function CopyButton({ baseUrl, code }: CopyButtonProps) {
  const [btnText, setBtnText] = useState("Copiar");

  function copyToClipboard() {
    try {
      const url = buildUrl(baseUrl, code);
      navigator.clipboard.writeText(url);
      setBtnText("Copiado!");
      sleep(2000).then(() => setBtnText("Copiar"));
    } catch (_) {
      console.error("Falha ao copiar link");
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className="px-3 py-2 bg-emerald-900 border-2 border-emerald-900 rounded-lg text-emerald-400 font-semibold cursor-pointer transition-all duration-100 hover:border-emerald-400 focus-visible:border-emerald-400 outline-none"
    >
      {btnText}
    </button>
  );
}
