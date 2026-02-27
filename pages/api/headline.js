export default function handler(req, res) {
  res.status(200).json({
    keyLoaded: !!process.env.OPENAI_API_KEY
  });
}
