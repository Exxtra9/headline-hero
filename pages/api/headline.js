import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "Generate realistic fictional news headlines."
      },
      {
        role: "user",
        content:
          "Create ONE random headline and 2 sentence synopsis. Return JSON {headline:'', synopsis:''}"
      }
    ]
  });

  res.status(200).json(
    JSON.parse(completion.choices[0].message.content)
  );
}
