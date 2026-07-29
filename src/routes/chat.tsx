import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Bot, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import logo from "@/assets/workflow-ai-logo.png";
import { AiDisclaimer, Markdown } from "@/components/ai-output";
import { FeatureNav } from "@/components/feature-nav";
import { PageHeader } from "@/components/page-header";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const STORAGE_KEY = "workflow-ai:chat";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — WorkFlow AI" },
      {
        name: "description",
        content:
          "Chat with your AI workplace assistant about emails, meetings, planning, research and daily decisions.",
      },
      { property: "og:title", content: "AI Chatbot — WorkFlow AI" },
      {
        property: "og:description",
        content: "An interactive AI assistant for everyday workplace questions.",
      },
    ],
  }),
  component: ChatPage,
});

function loadMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as UIMessage[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const suggestions = [
  "Draft a polite nudge for an overdue invoice",
  "How should I structure a weekly team stand-up?",
  "Help me prioritise 6 competing deadlines",
];

function ChatPage() {
  const [initialMessages] = useState<UIMessage[]>(() => loadMessages());
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    id: "workflow-ai-chat",
    messages: initialMessages,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (error) => toast.error(error.message || "The assistant is unavailable right now."),
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (status === "ready") textareaRef.current?.focus();
  }, [status]);

  const isBusy = status === "submitted" || status === "streaming";

  const submit = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value || isBusy) return;
      setInput("");
      void sendMessage({ text: value });
      textareaRef.current?.focus();
    },
    [isBusy, sendMessage],
  );

  return (
    <div className="mx-auto flex h-[calc(100svh-3.5rem)] w-full max-w-4xl flex-col gap-4 p-4 sm:p-6">
      <PageHeader
        icon={Bot}
        title="AI Chatbot"
        description="Your always-on workplace assistant."
        action={
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => {
              setMessages([]);
              if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
            }}
          >
            <RotateCcw className="size-4" /> New conversation
          </Button>
        }
      />

      <Card className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border-border/70 p-0 shadow-card">
        <Conversation className="min-h-0 flex-1">
          <ConversationContent className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                <img src={logo} alt="WorkFlow AI" className="size-14" />
                <div>
                  <p className="text-base font-semibold">How can I help you work smarter?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ask about emails, meetings, planning or research.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((s) => (
                    <Button
                      key={s}
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => submit(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => {
                const text = message.parts
                  .map((part) => (part.type === "text" ? part.text : ""))
                  .join("");
                if (!text) return null;
                return (
                  <Message from={message.role} key={message.id}>
                    <MessageContent
                      className={
                        message.role === "user"
                          ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground"
                          : "text-foreground"
                      }
                    >
                      {message.role === "assistant" ? (
                        <div className="space-y-3">
                          <Markdown>{text}</Markdown>
                          <AiDisclaimer />
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap text-sm">{text}</p>
                      )}
                    </MessageContent>
                  </Message>
                );
              })
            )}

            {status === "submitted" ? (
              <Message from="assistant">
                <MessageContent>
                  <Shimmer>Thinking…</Shimmer>
                </MessageContent>
              </Message>
            ) : null}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="border-t border-border/70 bg-background/60 p-3">
          <PromptInput
            onSubmit={(message, event) => {
              event.preventDefault();
              submit(message.text ?? input);
            }}
          >
            <PromptInputTextarea
              ref={textareaRef}
              autoFocus
              value={input}
              placeholder="Ask your workplace assistant…"
              onChange={(e) => setInput(e.target.value)}
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={!input.trim() && !isBusy} />
            </PromptInputFooter>
          </PromptInput>
          <AiDisclaimer className="mt-2 justify-center" />
        </div>
      </Card>

      <FeatureNav />
    </div>
  );
}
