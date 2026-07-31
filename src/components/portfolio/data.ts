import {
  BarChart3,
  BrainCircuit,
  Braces,
  Code2,
  Database,
  GraduationCap,
  Globe,
  Handshake,
  Lightbulb,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const CV_URL =
  "https://drive.google.com/file/d/1T9IWAbvI8usvL_jgpu4KnwYBh_xeIMP_/view?usp=drive_link";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sinovuyo-sondara-261a95234/";
export const GITHUB_URL = "https://github.com/SinovuyoSondara";

export const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const;

export const ABOUT_CARDS: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Software Development",
    description:
      "Building clean, maintainable applications across Java, C#, C++ and Python with a focus on real-world usefulness.",
    icon: Code2,
  },
  {
    title: "Artificial Intelligence",
    description:
      "Designing AI-assisted products with structured prompt engineering and generative AI workflows.",
    icon: BrainCircuit,
  },
  {
    title: "Data Analytics",
    description:
      "Turning raw data into decisions using SQL, Power BI and Excel modelling and visualisation.",
    icon: BarChart3,
  },
  {
    title: "Continuous Learning",
    description:
      "Actively completing AI and cloud-era certifications to stay ahead of fast-moving technology.",
    icon: GraduationCap,
  },
  {
    title: "Problem Solving",
    description:
      "Breaking complex problems into structured, testable steps — from academic projects to hackathons.",
    icon: Lightbulb,
  },
  {
    title: "Leadership",
    description:
      "Served as Faculty Academic Chapter Secretary, coordinating plans, people and student initiatives.",
    icon: Users,
  },
  {
    title: "Teamwork",
    description:
      "Collaborating across cultures and disciplines through tutoring, committees and hackathon teams.",
    icon: Handshake,
  },
];

export const SKILL_GROUPS: { title: string; icon: LucideIcon; items: string[] }[] = [
  { title: "Programming Languages", icon: Braces, items: ["Java", "Python", "C#", "C++", "SQL"] },
  {
    title: "Artificial Intelligence",
    icon: BrainCircuit,
    items: [
      "Prompt Engineering",
      "Generative AI",
      "AI Productivity Applications",
      "AI Solution Design",
    ],
  },
  {
    title: "Data Analytics",
    icon: BarChart3,
    items: ["SQL", "Power BI", "Microsoft Excel (Data Analysis & Visualisation)"],
  },
  { title: "Web Technologies", icon: Globe, items: ["HTML", "CSS"] },
  {
    title: "Development Tools",
    icon: Wrench,
    items: [
      "GitHub",
      "Lovable",
      "Visual Studio",
      "Visual Studio Code",
      "ChatGPT",
      "Microsoft Office",
    ],
  },
  {
    title: "Leadership & Collaboration",
    icon: Users,
    items: [
      "Strategic Planning",
      "Team Leadership",
      "Team Collaboration",
      "Project Coordination",
      "Public Speaking",
      "Cross-Cultural Communication",
      "Conflict Resolution",
    ],
  },
  {
    title: "Professional Skills",
    icon: Sparkles,
    items: [
      "Analytical Thinking",
      "Problem Solving",
      "Critical Thinking",
      "Adaptability",
      "Initiative",
      "Time Management",
      "Attention to Detail",
      "Active Listening",
      "Emotional Intelligence",
    ],
  },
];

export const PROJECTS: {
  title: string;
  description: string;
  tech: string[];
  icon: LucideIcon;
  demo?: string;
  repo?: string;
}[] = [
  {
    title: "AI Workplace Productivity Assistant",
    description:
      "Developed an AI-powered workplace productivity web application that automates email generation, meeting summarisation, task planning, research assistance, and chatbot interaction.",
    tech: ["Lovable", "Prompt Engineering", "Artificial Intelligence", "GitHub"],
    icon: BrainCircuit,
    demo: "https://workpulse-ai-suite.lovable.app",
    repo: "https://github.com/SinovuyoSondara/AI-Powered-Workplace-Productivity",
  },
  {
    title: "ClearVue Business Intelligence System",
    description:
      "Developed a business intelligence solution for data analysis and reporting using SQL and Power BI.",
    tech: ["SQL", "Power BI", "Business Intelligence"],
    icon: BarChart3,
  },
  {
    title: "ReCode Learning Platform",
    description:
      "Contributed to the design of an AI-assisted learning platform to enhance coding education.",
    tech: ["Artificial Intelligence", "Software Development"],
    icon: GraduationCap,
  },
  {
    title: "Software Development Projects",
    description:
      "Developed multiple software development and database projects using Java, C#, C++, and SQL.",
    tech: ["Java", "C#", "C++", "SQL"],
    icon: Database,
  },
];

export const EDUCATION = [
  {
    institution: "North-West University",
    qualification: "Bachelor of Science in Information Technology",
    period: "2023 – 2025",
  },
  {
    institution: "John Orr Technical School",
    qualification: "National Senior Certificate",
    period: "2021",
  },
];

export const EXPERIENCE = [
  {
    role: "Secretary – Faculty of Natural & Agricultural Sciences Student Academic Chapter",
    period: "2024 – 2025",
  },
  { role: "Sub-Committee Member – Sports Officer", period: "2023" },
  { role: "Engineering Graphics & Design Tutor – BTS Tutorial Services", period: "2022" },
  { role: "Private Tutor", period: "2020" },
  { role: "Retail Assistant – Black Friday & Festive Season", period: "2022" },
  { role: "Gym Instructor – Neighbourhood Gym", period: "2021" },
  { role: "Judge – GeeXpo Grade 10 & 11 PAT Project Evaluation", period: "2024" },
  { role: "Volunteer – Vosloorus Old Age Home", period: "Community" },
  { role: "Hackathon Participant (2 Events)", period: "Extracurricular" },
];

export const CERTIFICATIONS = [
  { title: "CAPACITI AI Skills Accelerator", status: "Completed" },
  { title: "Coursera Artificial Intelligence Courses", status: "Completed" },
  { title: "MTN Academy", status: "Currently Completing" },
];
