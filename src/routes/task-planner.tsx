import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarClock, Loader2, Plus, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

import { AiResultCard } from "@/components/ai-output";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { planTasks } from "@/lib/ai.functions";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — WorkFlow AI" },
      {
        name: "description",
        content:
          "Prioritise your tasks and get a suggested daily schedule, time estimates and productivity tips.",
      },
      { property: "og:title", content: "AI Task Planner — WorkFlow AI" },
      {
        property: "og:description",
        content: "Turn a messy task list into a realistic, prioritised day plan.",
      },
    ],
  }),
  component: TaskPlanner,
});

function TaskPlanner() {
  const run = useServerFn(planTasks);
  const [tasks, setTasks] = useState<string[]>(["", "", ""]);
  const [workingHours, setWorkingHours] = useState("09:00 - 17:00");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const update = (index: number, value: string) =>
    setTasks((prev) => prev.map((task, i) => (i === index ? value : task)));

  const onSubmit = async () => {
    const filled = tasks.map((t) => t.trim()).filter(Boolean);
    if (filled.length === 0) {
      toast.error("Add at least one task to plan.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await run({
        data: { tasks: filled.map((t, i) => `${i + 1}. ${t}`).join("\n"), workingHours },
      });
      setResult(res.text);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not build your plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={CalendarClock}
        title="AI Task Planner"
        description="Priorities, schedule and time estimates for your day."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/70 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Your tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-xs font-semibold text-accent-foreground">
                    {index + 1}
                  </span>
                  <Input
                    value={task}
                    placeholder="e.g. Prepare Q3 board deck"
                    maxLength={300}
                    onChange={(e) => update(index, e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remove task ${index + 1}`}
                    disabled={tasks.length <= 1}
                    onClick={() => setTasks((prev) => prev.filter((_, i) => i !== index))}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => setTasks((prev) => [...prev, ""])}
            >
              <Plus className="size-4" /> Add task
            </Button>

            <div className="space-y-2">
              <Label htmlFor="hours">Working hours</Label>
              <Input
                id="hours"
                value={workingHours}
                maxLength={120}
                onChange={(e) => setWorkingHours(e.target.value)}
              />
            </div>

            <Button onClick={onSubmit} disabled={loading} className="w-full rounded-xl">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Planning…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Build my plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <AiResultCard
          isLoading={loading}
          result={result}
          empty="Your priorities, daily schedule, time estimates and productivity recommendations will appear here."
        />
      </div>
    </div>
  );
}
