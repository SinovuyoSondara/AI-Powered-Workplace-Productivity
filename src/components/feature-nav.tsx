import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { navItems } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function useCurrentIndex() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  return navItems.findIndex((item) => item.url === pathname);
}

export function AppBreadcrumb() {
  const index = useCurrentIndex();
  const current = index >= 0 ? navItems[index] : null;
  const isDashboard = index <= 0;

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap">
        <BreadcrumbItem>
          {isDashboard ? (
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link to="/">Dashboard</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isDashboard && current ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate">{current.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function FeatureNav() {
  const index = useCurrentIndex();
  if (index < 0) return null;

  const prev = index > 0 ? navItems[index - 1] : null;
  const next = index < navItems.length - 1 ? navItems[index + 1] : null;

  return (
    <nav
      aria-label="Feature navigation"
      className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4"
    >
      {prev ? (
        <Button asChild variant="outline" className="rounded-xl">
          <Link to={prev.url}>
            <ChevronLeft className="size-4" />
            <span className="truncate">Previous: {prev.title}</span>
          </Link>
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button asChild className="rounded-xl">
          <Link to={next.url}>
            <span className="truncate">Next: {next.title}</span>
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  );
}
