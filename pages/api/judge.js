import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { originalHeadline, userHeadline, synopsis } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
Score 1-10:
Creativity
Accuracy
Catchiness
Originality

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
0-20 Blogger
21-30 Staff Writer
31-35 Senior Editor
36-40 Headline Hero
`
      },
      {
        role: "user",
        content: `
Original: ${originalHeadline}
Synopsis: ${synopsis}
User: ${userHeadline}
`
      }
    ]
  });

  res.status(200).json(
    JSON.parse(completion.choices[0].message.content)
  );
}
