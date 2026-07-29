import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  Clock,
  Mail,
  NotebookPen,
  Search,
  Sparkle,
  TrendingUp,
} from "lucide-react";

import { AiDisclaimer } from "@/components/ai-output";
import { FeatureNav } from "@/components/feature-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — WorkFlow AI Productivity Assistant" },
      {
        name: "description",
        content:
          "Your AI workspace overview: productivity stats and quick actions for emails, meetings, planning and research.",
      },
      { property: "og:title", content: "Dashboard — WorkFlow AI Productivity Assistant" },
      {
        property: "og:description",
        content: "Your AI workspace overview with quick actions for everyday work tasks.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Tasks automated", value: "128", trend: "+18% this week", icon: CheckCircle2, pct: 78 },
  { label: "Hours saved", value: "24.5", trend: "+3.2 hrs vs last week", icon: Clock, pct: 62 },
  { label: "Focus score", value: "86%", trend: "Consistently strong", icon: TrendingUp, pct: 86 },
  { label: "AI drafts created", value: "47", trend: "12 pending review", icon: Sparkle, pct: 54 },
];

const features = [
  {
    title: "Smart Email Generator",
    description: "Draft polished emails with the right tone for any audience.",
    url: "/email-generator" as const,
    icon: Mail,
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Turn messy notes into decisions, actions and deadlines.",
    url: "/meeting-summarizer" as const,
    icon: NotebookPen,
  },
  {
    title: "AI Task Planner",
    description: "Prioritise your workload and get a realistic day plan.",
    url: "/task-planner" as const,
    icon: CalendarClock,
  },
  {
    title: "AI Research Assistant",
    description: "Get briefings with insights, recommendations and references.",
    url: "/research-assistant" as const,
    icon: Search,
  },
  {
    title: "AI Chatbot",
    description: "Ask anything about your work, projects and next steps.",
    url: "/chat" as const,
    icon: Bot,
  },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-elevated sm:p-9">
        <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-80">
          AI Workplace Productivity Assistant
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
          Welcome back — let's make today effortless.
        </h1>
        <p className="mt-3 max-w-2xl text-sm opacity-90 sm:text-base">
          Draft emails, summarise meetings, plan your day and research topics — all powered by AI,
          all in one workspace.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary" className="rounded-xl">
            <Link to="/email-generator">
              <Mail className="size-4" /> Write an email
            </Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-xl">
            <Link to="/meeting-summarizer">
              <NotebookPen className="size-4" /> Summarise notes
            </Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-xl">
            <Link to="/task-planner">
              <CalendarClock className="size-4" /> Plan my day
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="rounded-2xl border-border/70 shadow-card">
            <CardContent className="space-y-3 p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <p className="truncate text-sm text-muted-foreground">{stat.label}</p>
                <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <stat.icon className="size-4" />
                </div>
              </div>
              <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
              <Progress value={stat.pct} className="h-1.5" />
              <p className="truncate text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Quick actions</h2>
          <AiDisclaimer className="hidden sm:flex" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.url}
              className="group rounded-2xl border-border/70 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <CardHeader className="space-y-3">
                <div className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <feature.icon className="size-5" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="px-0 text-primary hover:bg-transparent">
                  <Link to={feature.url}>
                    Open <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <FeatureNav />
    </div>
  );
}
