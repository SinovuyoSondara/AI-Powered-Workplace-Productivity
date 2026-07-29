import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { AiResultCard } from "@/components/ai-output";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { researchTopic } from "@/lib/ai.functions";

const examples = [
  "Adoption of AI copilots in mid-market finance teams",
  "Best practices for hybrid meeting culture",
  "Trends in employee productivity measurement 2026",
];

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — WorkFlow AI" },
      {
        name: "description",
        content:
          "Research any workplace topic and get a summary, key insights, recommendations and suggested references.",
      },
      { property: "og:title", content: "AI Research Assistant — WorkFlow AI" },
      {
        property: "og:description",
        content: "Fast professional briefings with insights and recommendations.",
      },
    ],
  }),
  component: ResearchAssistant,
});

function ResearchAssistant() {
  const run = useServerFn(researchTopic);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const onSubmit = async (value = topic) => {
    if (!value.trim()) {
      toast.error("Enter a research topic first.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await run({ data: { topic: value } });
      setResult(res.text);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not complete the research.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={Search}
        title="AI Research Assistant"
        description="Briefings with insights, recommendations and references."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/70 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Research topic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">What would you like to research?</Label>
              <Textarea
                id="topic"
                placeholder="e.g. How are professional services firms using AI to reduce admin time?"
                className="min-h-36 resize-y"
                value={topic}
                maxLength={1000}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Try an example
              </p>
              <div className="flex flex-wrap gap-2">
                {examples.map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setTopic(example);
                      void onSubmit(example);
                    }}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => void onSubmit()}
              disabled={loading}
              className="w-full rounded-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Researching…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Run research
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <AiResultCard
          isLoading={loading}
          result={result}
          empty="Your summary, key insights, recommendations and suggested references will appear here."
        />
      </div>
    </div>
  );
}
