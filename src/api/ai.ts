import { GROQ_URL, SYSTEM_PROMPT } from "@/constants/wishPage";

interface AISuggestion {
  title: string;
  description: string;
}

export const generateWishSuggestion = async (keywords: string): Promise<AISuggestion> => {
  const apiKey = import.meta.env.VITE_GROQ_KEY;

  if (!apiKey) {
    throw new Error("VITE_GROQ_KEY не настроен");
  }

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: keywords },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ошибка AI: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Пустой ответ от AI");
  }

  return JSON.parse(content) as AISuggestion;
};
