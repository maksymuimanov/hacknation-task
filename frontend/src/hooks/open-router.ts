import { OpenRouter } from "@openrouter/sdk";

export async function testOpenRouter() {
  const client = new OpenRouter({
    apiKey: import.meta.env.VITE_OPEN_ROUTER_API_KEY,
  });

  const response = await client.chat.send({
    model: "x-ai/grok-4.1-fast",
    messages: [
      { role: "user", content: "Hello!" }
    ]
  });

  console.log("OpenRouter Response:", response.choices[0].message.content);
}
