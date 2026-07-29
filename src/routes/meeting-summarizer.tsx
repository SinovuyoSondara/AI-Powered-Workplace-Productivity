import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, NotebookPen, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { AiResultCard } from "@/components/ai-output";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { summarizeNotes } from "@/lib/ai.functions";

export const Route = createFileRoute("/meeting-summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — WorkFlow AI" },
      {
        name: "description",
        content:
          "Turn raw meeting notes into an executive summary, key points, decisions, action items and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — WorkFlow AI" },
      {
        property: "og:description",
        content: "Executive summaries, decisions and action items from any meeting notes.",
      },
    ],
  }),
  component: MeetingSummarizer,
});

function MeetingSummarizer() {
  const run = useServerFn(summarizeNotes);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const onSubmit = async () => {
    if (notes.trim().length < 20) {
      toast.error("Paste a bit more of your meeting notes first.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await run({ data: { notes } });
      setResult(res.text);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not summarise the notes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={NotebookPen}
        title="Meeting Notes Summarizer"
        description="Decisions, owners and deadlines extracted automatically."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/70 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Meeting notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Paste your raw notes or transcript</Label>
              <Textarea
                id="notes"
                placeholder="Attendees, discussion points, decisions, follow-ups…"
                className="min-h-[22rem] resize-y"
                value={notes}
                maxLength={20000}
                onChange={(e) => setNotes(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{notes.length} / 20000 characters</p>
            </div>
            <Button onClick={onSubmit} disabled={loading} className="w-full rounded-xl">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Summarising…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Summarise meeting
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <AiResultCard
          isLoading={loading}
          result={result}
          empty="Your executive summary, key points, decisions, action items, deadlines and owners will appear here."
        />
      </div>
    </div>
  );
}
