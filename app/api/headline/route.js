import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
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
          "Create ONE random news headline and a 2 sentence synopsis. Return JSON {headline:'', synopsis:''}"
      }
    ]
  });

  return Response.json(JSON.parse(completion.choices[0].message.content));
}
