import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { originalHeadline, userHeadline, synopsis } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
You are a professional editor.

Score 1-10:
Creativity
Accuracy
Catchiness
Originality (must compare against original headline)

Return JSON:
{
  creativity: number,
  accuracy: number,
  catchiness: number,
  originality: number,
  totalScore: number,
  rank: string,
  feedback: string
}

Ranks:
0-20 = Blogger
21-30 = Staff Writer
31-35 = Senior Editor
36-40 = Headline Hero
`
      },
      {
        role: "user",
        content: `
Original Headline: ${originalHeadline}
Synopsis: ${synopsis}
User Headline: ${userHeadline}
`
      }
    ]
  });

  return Response.json(JSON.parse(completion.choices[0].message.content));
}
