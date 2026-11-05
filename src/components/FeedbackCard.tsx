import { buildUrl } from "@/lib/helpers";
import { Feedback } from "@/types/form";
import CopyButton from "./CopyButton";

type CardConfig = {
  title: string;
  text: string;
};

const variants: Record<Feedback["type"], CardConfig> = {
  Error: {
    title: "Falha ao encurtar link",
    text: "text-red-400",
  },
  Success: {
    title: "Seu link encurtado:",
    text: "text-emerald-400",
  },
};

export default function FeedbackCard({ type, message, urlData }: Feedback) {
  const { title, text } = variants[type];



  function copyToClipboard(baseUrl: string, code: string) {
    const url = buildUrl(baseUrl, code);
    navigator.clipboard.writeText(url);
  }

  return (
    <div
      className={
        "flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full h-fit font-semibold text-md p-4 border-2 rounded-lg bg-zinc-900 border-zinc-700"
      }
    >
      <div className="flex items-center gap-x-2">
        <div>
          <h1 className="text-sm">{title}</h1>
          {message && <p className={"text-xs " + text}>{message}</p>}
          {urlData && (
            <div className="flex gap-x-2 items-center">
              <p className="text-zinc-400 font-normal">
                {urlData.baseUrl}/
                <span className={"font-semibold " + text}>{urlData.code}</span>
              </p>
            </div>
          )}
        </div>
      </div>
      {urlData && (
        <CopyButton {...urlData}/>
      )}
    </div>
  );
}
