import { ShortenedUrl } from "./url";

export type Feedback = {
  type: "Success" | "Error";
  message?: string;
  urlData?: ShortenedUrl
};
