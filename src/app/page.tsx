"use client";

export default function Home() {
  async function handleClick() {
    const response = await fetch("/api/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://youtube.com" }),
    });

    const data = await response.json();
    console.log(response.status, data);
  }

  return (
    <div>
      <button onClick={handleClick}>Encurtar</button>
    </div>
  );
}
