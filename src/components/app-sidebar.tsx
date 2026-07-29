import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  CalendarClock,
  LayoutDashboard,
  Mail,
  NotebookPen,
  Search,
} from "lucide-react";

import logo from "@/assets/workflow-ai-logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Smart Email Generator", url: "/email-generator", icon: Mail },
  { title: "Meeting Notes Summarizer", url: "/meeting-summarizer", icon: NotebookPen },
  { title: "AI Task Planner", url: "/task-planner", icon: CalendarClock },
  { title: "AI Research Assistant", url: "/research-assistant", icon: Search },
  { title: "AI Chatbot", url: "/chat", icon: Bot },
] as const;

export function AppSidebar() {
  const currentPath = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex min-w-0 items-center gap-2.5 px-1 py-2">
          <img
            src={logo}
            alt="WorkFlow AI"
            width={512}
            height={512}
            className="size-9 shrink-0 rounded-xl shadow-card"
          />
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold leading-tight">WorkFlow AI</p>
            <p className="truncate text-xs text-muted-foreground">Productivity Assistant</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={currentPath === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <p className="px-2 py-1 text-[11px] leading-snug text-muted-foreground group-data-[collapsible=icon]:hidden">
          AI-generated content may require human review.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
