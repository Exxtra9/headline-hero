"use client";
import { useState } from "react";

export default function Home() {
  const [headline, setHeadline] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [userHeadline, setUserHeadline] = useState("");
  const [result, setResult] = useState(null);

  const generate = async () => {
    const res = await fetch("/api/headline");
    const data = await res.json();
    setHeadline(data.headline);
    setSynopsis(data.synopsis);
    setResult(null);
  };

  const submit = async () => {
    const res = await fetch("/api/judge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalHeadline: headline, synopsis, userHeadline })
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <main style={{ padding: 20, maxWidth: 500, margin: "auto", fontFamily: "Arial" }}>
      <h1>📰 Headline Hero</h1>

      <button onClick={generate}>Generate Story</button>

      {headline && (
        <>
          <h3>Original Headline</h3>
          <p>{headline}</p>
          <p>{synopsis}</p>

          <textarea
            placeholder="Write your headline..."
            value={userHeadline}
            onChange={(e) => setUserHeadline(e.target.value)}
            style={{ width: "100%", height: 80 }}
          />

          <button onClick={submit}>Submit</button>
        </>
      )}

      {result && (
        <>
          <h2>Total Score: {result.totalScore}</h2>
          <h3>{result.rank}</h3>
          <p>{result.feedback}</p>
        </>
      )}
    </main>
  );
}
