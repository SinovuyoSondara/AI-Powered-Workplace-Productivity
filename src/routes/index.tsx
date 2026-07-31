import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  ChevronDown,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import profileImage from "@/assets/profile-placeholder.jpg";
import {
  ABOUT_CARDS,
  CERTIFICATIONS,
  CV_URL,
  EDUCATION,
  EXPERIENCE,
  GITHUB_URL,
  LINKEDIN_URL,
  PROJECTS,
  SKILL_GROUPS,
} from "@/components/portfolio/data";
import { Reveal } from "@/components/portfolio/reveal";
import { BackToTop, Section } from "@/components/portfolio/section";
import { SiteHeader } from "@/components/portfolio/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TITLE = "Sinovuyo Sondara — Software Developer, AI & Data Analytics Portfolio";
const DESCRIPTION =
  "BSc Information Technology graduate specialising in software development, artificial intelligence and data analytics. View projects, skills, certifications and CV.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Portfolio,
});

function Hero() {
  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden bg-gradient-hero">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 lg:px-8 lg:pb-28">
        <Reveal className="min-w-0">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
            Available for graduate opportunities
          </Badge>
          <h1 className="mt-5 text-3xl font-semibold uppercase tracking-tight sm:text-5xl">
            Sinovuyo Sondara
          </h1>
          <p className="mt-4 text-base font-medium text-primary sm:text-lg">
            BSc Information Technology Graduate | Software Developer | AI &amp; Data Analytics
            Enthusiast
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            I am a BSc Information Technology graduate with a passion for software development,
            Artificial Intelligence, and data analytics. I enjoy designing technology solutions that
            solve real-world problems and improve efficiency. Through academic projects, hackathons,
            university leadership, tutoring, and AI application development, I have developed strong
            analytical, problem-solving, communication, and teamwork skills. I am eager to
            contribute to innovative technology solutions while continuously learning and growing as
            a software development professional.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-xl transition-transform hover:-translate-y-0.5">
              <a href={CV_URL} target="_blank" rel="noopener noreferrer">
                <Download className="size-4" /> Download CV
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-xl transition-transform hover:-translate-y-0.5"
            >
              <a href="#projects">
                View Projects <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl transition-transform hover:-translate-y-0.5"
            >
              <a href="#contact">
                <Mail className="size-4" /> Contact Me
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120} className="justify-self-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-primary opacity-10 blur-2xl" />
            <div className="relative size-56 overflow-hidden rounded-full border-4 border-card shadow-elevated sm:size-72">
              <img
                src={profileImage}
                alt="Profile portrait placeholder of Sinovuyo Sondara"
                width={800}
                height={800}
                className="size-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="mx-auto mb-8 flex w-fit flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Scroll
        <ChevronDown className="size-5 animate-bounce" />
      </a>
    </section>
  );
}

function ContactForm() {
  const [sending, setSending] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Message ready to send", {
        description: "Thank you for reaching out — I'll respond as soon as possible.",
      });
    }, 700);
  };

  return (
    <Card className="rounded-2xl border-border/70 shadow-card">
      <CardHeader>
        <CardTitle className="text-base">Send a message</CardTitle>
        <CardDescription>
          Share a role, project or collaboration and I'll get back to you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" required autoComplete="name" placeholder="Your full name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" required placeholder="Graduate developer role" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required rows={5} placeholder="Your message..." />
          </div>
          <Button type="submit" className="rounded-xl" disabled={sending}>
            <Send className="size-4" /> {sending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

const CONTACT_LINKS = [
  { label: "LinkedIn", value: "sinovuyo-sondara", href: LINKEDIN_URL, icon: Linkedin },
  { label: "GitHub", value: "SinovuyoSondara", href: GITHUB_URL, icon: Github },
  { label: "Download CV", value: "Curriculum Vitae (PDF)", href: CV_URL, icon: Download },
];

function Portfolio() {
  return (
    <div className="min-w-0">
      <SiteHeader />

      <Hero />

      <Section
        id="about"
        eyebrow="About me"
        title="Technology that solves real problems"
        description="A graduate developer combining engineering fundamentals, AI fluency and analytical thinking — with leadership experience earned through student governance, tutoring and hackathons."
        tinted
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 60}>
              <Card className="h-full rounded-2xl border-border/70 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <CardHeader className="space-y-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent text-primary">
                    <card.icon className="size-5" />
                  </span>
                  <CardTitle className="text-base">{card.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="skills"
        eyebrow="Skills"
        title="Technical &amp; professional skills"
        description="Languages, AI practice, analytics tooling and the human skills that make delivery work."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => (
            <Reveal key={group.title} delay={index * 50}>
              <Card className="h-full rounded-2xl border-border/70 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <CardHeader className="space-y-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <group.icon className="size-5" />
                  </span>
                  <CardTitle className="text-base">{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Badge variant="secondary" className="rounded-full font-medium">
                          {item}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="projects"
        eyebrow="Portfolio"
        title="Featured projects"
        description="Applied work spanning AI product development, business intelligence and core software engineering."
        tinted
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.title} delay={index * 70}>
              <Card className="flex h-full flex-col rounded-2xl border-border/70 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <CardHeader className="space-y-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <project.icon className="size-5" />
                  </span>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-5">
                  <ul className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li key={tech}>
                        <Badge variant="outline" className="rounded-full font-medium">
                          {tech}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  {project.demo || project.repo ? (
                    <div className="flex flex-wrap gap-3">
                      {project.demo ? (
                        <Button asChild className="rounded-xl">
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="size-4" /> Live Demo
                          </a>
                        </Button>
                      ) : null}
                      {project.repo ? (
                        <Button asChild variant="outline" className="rounded-xl">
                          <a href={project.repo} target="_blank" rel="noopener noreferrer">
                            <Github className="size-4" /> GitHub Repository
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="education"
        eyebrow="Education"
        title="Academic background"
        description="Formal qualifications in information technology and technical secondary schooling."
      >
        <ol className="relative space-y-6 border-l border-border pl-6">
          {EDUCATION.map((item, index) => (
            <Reveal as="li" key={item.institution} delay={index * 80} className="relative">
              <span className="absolute -left-[1.9rem] grid size-8 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-card">
                <GraduationCap className="size-4" />
              </span>
              <Card className="rounded-2xl border-border/70 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <CardHeader className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {item.period}
                  </p>
                  <CardTitle className="text-base">{item.institution}</CardTitle>
                  <CardDescription>{item.qualification}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section
        id="experience"
        eyebrow="Experience"
        title="Experience &amp; leadership"
        description="Student governance, tutoring, judging, volunteering and hackathons — building communication and coordination strength."
        tinted
      >
        <ol className="relative space-y-5 border-l border-border pl-6">
          {EXPERIENCE.map((item, index) => (
            <Reveal as="li" key={item.role} delay={index * 45} className="relative">
              <span className="absolute -left-[1.9rem] grid size-8 place-items-center rounded-full bg-card text-primary shadow-card ring-1 ring-border">
                <Briefcase className="size-4" />
              </span>
              <Card className="rounded-2xl border-border/70 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <CardHeader className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <CardTitle className="text-base leading-snug">{item.role}</CardTitle>
                  <Badge variant="secondary" className="w-fit rounded-full font-medium">
                    {item.period}
                  </Badge>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section
        id="certifications"
        eyebrow="Certifications"
        title="Continuous learning"
        description="AI-focused programmes completed and currently in progress."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, index) => (
            <Reveal key={cert.title} delay={index * 70}>
              <Card className="h-full rounded-2xl border-border/70 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <CardHeader className="space-y-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent text-primary">
                    <Award className="size-5" />
                  </span>
                  <CardTitle className="text-base leading-snug">{cert.title}</CardTitle>
                  <CardDescription>{cert.status}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Let's work together"
        description="Open to graduate roles in software development, AI and data analytics."
        tinted
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal className="space-y-4">
            {CONTACT_LINKS.map((link) => (
              <Card
                key={link.label}
                className="rounded-2xl border-border/70 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <CardContent className="flex items-center gap-4 p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <link.icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{link.label}</p>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      {link.value}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="rounded-2xl border-border/70 shadow-card">
              <CardContent className="flex items-center gap-4 p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                  <MapPin className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Location</p>
                  <p className="text-sm text-muted-foreground">
                    Johannesburg, Gauteng, South Africa
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            Designed &amp; Developed by Sinovuyo Sondara © 2026
          </p>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="icon" className="rounded-xl">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <Github className="size-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="rounded-xl">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="size-5" />
              </a>
            </Button>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
