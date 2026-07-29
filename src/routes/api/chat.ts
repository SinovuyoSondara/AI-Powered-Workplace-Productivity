import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  CHAT_MODEL,
  createLovableAiGatewayProvider,
} from "@/lib/ai-gateway.server";

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway(CHAT_MODEL),
          system: [
            "You are the AI Workplace Productivity Assistant inside a professional SaaS product.",
            "Help professionals with email drafting, meetings, planning, research and workplace decisions.",
            "Answer in clear Markdown. Be practical and concise; use bullet lists and short paragraphs.",
            "Ask one clarifying question only when the request is genuinely ambiguous.",
          ].join(" "),
          messages: await convertToModelMessages(messages as UIMessage[]),
          providerOptions: { lovable: { reasoningEffort: "none" } },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
