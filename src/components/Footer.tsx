"use cache";

import { Icon } from "@iconify/react";
import { cacheLife } from "next/cache";

export default async function Footer() {
  cacheLife("days");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-fit w-full absolute bottom-0 bg-zinc-800 flex flex-row items-center justify-center p-4 gap-x-2">
      <p className="text-zinc-400 text-sm">
        &copy; {currentYear} Lucas Vinícius Marques
      </p>
      <span className="text-zinc-400">|</span>
      <div className="flex gap-x-2">
        <button>
          <Icon icon="bi:github" />
        </button>
        <button>
          <Icon icon="bi:linkedin" />
        </button>
      </div>
    </footer>
  );
}
