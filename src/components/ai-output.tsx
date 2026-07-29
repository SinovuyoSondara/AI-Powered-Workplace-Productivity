import { Info, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function AiDisclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-1.5 text-xs italic text-muted-foreground",
        className,
      )}
    >
      <Info className="size-3.5 shrink-0" />
      AI-generated content may require human review.
    </p>
  );
}

export function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-foreground">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h3 className="text-base font-semibold text-foreground">{children}</h3>
          ),
          h2: ({ children }) => (
            <h3 className="border-b border-border pb-1 pt-2 text-sm font-semibold uppercase tracking-wide text-primary">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-sm font-semibold text-foreground">{children}</h4>
          ),
          p: ({ children }) => <p className="text-sm leading-relaxed">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc space-y-1 pl-5 text-sm">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-1 pl-5 text-sm">{children}</ol>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          a: ({ children, href }) => (
            <a href={href} className="text-primary underline underline-offset-2">
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{children}</code>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-left text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-border bg-muted/60 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border px-3 py-2 align-top">{children}</td>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export function AiResultCard({
  isLoading,
  result,
  empty,
}: {
  isLoading: boolean;
  result?: string | null;
  empty: ReactNode;
}) {
  return (
    <Card className="rounded-2xl border-border/70 shadow-card">
      <CardContent className="p-5 sm:p-6">
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Loader2 className="size-4 animate-spin" />
              Generating with AI…
            </div>
            <div className="space-y-2">
              {[92, 78, 85, 60, 88, 45].map((w, i) => (
                <Skeleton
                  key={i}
                  className="h-3.5 rounded-full"
                  style={{ width: `${w}%`, animationDelay: `${i * 90}ms` }}
                />
              ))}
            </div>
          </div>
        ) : result ? (
          <div className="space-y-5">
            <Markdown>{result}</Markdown>
            <AiDisclaimer className="border-t border-border pt-3" />
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-muted-foreground">{empty}</div>
        )}
      </CardContent>
    </Card>
  );
}
