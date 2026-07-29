import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import {
  CHAT_MODEL,
  createLovableAiGatewayProvider,
  requireLovableApiKey,
} from "./ai-gateway.server";

const BASE_STYLE = [
  "You are an expert workplace productivity assistant used inside a professional SaaS product.",
  "Always answer in clean GitHub-flavoured Markdown using the exact section headings requested.",
  "Be concrete, concise and business-appropriate. Never invent private facts about real people.",
  "Do not add meta commentary, apologies, or notes about being an AI.",
].join(" ");

async function run(system: string, prompt: string) {
  const gateway = createLovableAiGatewayProvider(requireLovableApiKey());
  const { text } = await generateText({
    model: gateway(CHAT_MODEL),
    system: `${BASE_STYLE}\n${system}`,
    prompt,
    providerOptions: { lovable: { reasoningEffort: "none" } },
  });
  return { text };
}

const EmailInput = z.object({
  purpose: z.string().trim().min(1).max(2000),
  recipient: z.string().trim().min(1).max(200),
  tone: z.enum(["Formal", "Friendly", "Persuasive"]),
  audience: z.enum(["Client", "Manager", "Team"]),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) =>
    run(
      [
        "Task: write one professional email.",
        "Output exactly these markdown sections in order:",
        "## Subject Line",
        "## Email Body",
        "## Closing",
        "Keep the body under 250 words, well paragraphed, with a clear call to action.",
      ].join("\n"),
      [
        `Purpose: ${data.purpose}`,
        `Recipient: ${data.recipient}`,
        `Tone: ${data.tone}`,
        `Audience: ${data.audience}`,
      ].join("\n"),
    ),
  );

const NotesInput = z.object({ notes: z.string().trim().min(1).max(20000) });

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => NotesInput.parse(input))
  .handler(async ({ data }) =>
    run(
      [
        "Task: summarize raw meeting notes for busy executives.",
        "Output exactly these markdown sections in order:",
        "## Executive Summary",
        "## Key Points",
        "## Decisions Made",
        "## Action Items",
        "## Deadlines",
        "## Responsible Persons",
        "Use bullet lists for every section except the executive summary (2-4 sentences).",
        "If information for a section is absent, write 'Not specified in the notes.'",
      ].join("\n"),
      `Meeting notes:\n${data.notes}`,
    ),
  );

const TasksInput = z.object({
  tasks: z.string().trim().min(1).max(8000),
  workingHours: z.string().trim().max(120).optional(),
});

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => TasksInput.parse(input))
  .handler(async ({ data }) =>
    run(
      [
        "Task: turn a raw task list into an actionable day plan.",
        "Output exactly these markdown sections in order:",
        "## Task Priorities",
        "## Suggested Daily Schedule",
        "## Time Estimates",
        "## Productivity Recommendations",
        "Use a markdown table for the schedule (Time | Task | Focus) and for time estimates (Task | Estimate | Priority).",
      ].join("\n"),
      [
        `Tasks:\n${data.tasks}`,
        data.workingHours ? `Working hours: ${data.workingHours}` : "Working hours: 9:00-17:00",
      ].join("\n"),
    ),
  );

const ResearchInput = z.object({ topic: z.string().trim().min(1).max(1000) });

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ResearchInput.parse(input))
  .handler(async ({ data }) =>
    run(
      [
        "Task: produce a briefing on a research topic for a professional audience.",
        "Output exactly these markdown sections in order:",
        "## Summary",
        "## Key Insights",
        "## Recommendations",
        "## Suggested References",
        "References must be described generically (organisation, report type, where to look) rather than fabricated URLs.",
      ].join("\n"),
      `Research topic: ${data.topic}`,
    ),
  );
