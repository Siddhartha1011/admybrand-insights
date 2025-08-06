import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors"; // <-- import here
import { OpenAI } from "openai";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors()); // <-- add this line immediately after creating the app
app.use(bodyParser.json());

// Initialize OpenAI client with Hugging Face router
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_TOKEN, // Add your Hugging Face token in .env
});

app.post("/api/summarize", async (req, res) => {
  try {
    const { date, revenue, cogs, opex } = req.body;
    const prompt = `Generate a financial summary for the date ${date}:
    - Revenue: ₹${revenue}
    - COGS: ₹${cogs}
    - OPEX: ₹${opex}
    Provide an overall insight in 3 concise sentences.`;

    const chatCompletion = await client.chat.completions.create({
      model: "HuggingFaceTB/SmolLM3-3B:hf-inference",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ summary: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Error during Hugging Face request:", error);
    res.status(500).json({
      error: "Failed to fetch summary.",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});