"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassmorphismPhotoCard } from "@/components/glassmorphism-photo-card";
import { InteractiveName } from "@/components/interactive-name";
import { FloatingBubbles } from "@/components/floating-bubbles";
import { EffectsControls } from "@/components/effects-controls";
import { RightSideNav } from "@/components/right-side-nav";
import { InteractiveLinkedInCard } from "@/components/interactive-linkedin-card";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  User,
  Briefcase,
  Moon,
  Sun,
  GraduationCap,
  MessageCircle,
  Download,
  MapPin,
  Calendar,
  Coffee,
  Sparkles,
  Cpu,
  Database,
  Layers,
  Terminal,
  CheckCircle2,
  Phone,
  ArrowRight,
  ShieldCheck,
  Check,
  Copy,
  Package,
  Smartphone,
  ChevronDown,
  ArrowUp,
  Filter,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact-form";
import { AnimatedCounter } from "@/components/animated-counter";
import { ScrollProgress } from "@/components/scroll-progress";
import { CursorEffects } from "@/components/cursor-effects";
import { FloatingElements } from "@/components/floating-elements";
import { ParallaxBackground } from "@/components/parallax-background";
import { LINKS } from "@/constants/links";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [projectCategory, setProjectCategory] = useState("all");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const sectionIds = ["about", "experience", "projects", "skills", "education", "contact"];

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const scrollCheckPoint = 200;
      let currentActive = "about";

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= scrollCheckPoint) {
            currentActive = id;
          }
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
        currentActive = "contact";
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -50;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const copyLinkedIn = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.LINKEDIN);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const projects = [
    {
      title: "Inventory & Order Management System",
      category: "E-Commerce Logistics & Fulfillment",
      tagline: "Customized e-commerce inventory and order fulfillment platform integrated with Shopify and Shiprocket.",
      description:
        "A customized inventory management platform that connects Shopify and Shiprocket to automate order processing, warehouse management, employee assignments, invoice generation, and shipping operations.",
      overview:
        "A customized inventory management platform that connects Shopify and Shiprocket to automate order processing, warehouse management, employee assignments, invoice generation, and shipping operations.",
      highlights: [
        "Shopify Webhook Integration: Automated real-time order intake, inventory syncing, and order status updates",
        "Warehouse and Rack Management: Bin-level mapping, stock movement tracking, and physical inventory allocation",
        "Employee-wise Order Assignment: Role-based task delegation for streamlined picking, packing, and quality verification",
        "Mobile Order Processing: Floor mobile app integration built with Flutter (basic knowledge) for on-the-go scanning and dispatch",
        "Automated Invoice Generation: Instant tax & GST compliant invoice creation, printable packing slips, and batch PDF generation",
        "Shipping Management: Direct Shiprocket API integration for real-time courier rate comparison, AWB label generation, and live dispatch tracking",
      ],
      image: "/modern-ecommerce-interface.png",
      tech: ["React.js", "Node.js", "MongoDB", "Shopify API", "Shiprocket API", "Flutter (Basic)", "Webhooks", "REST APIs"],
      github: null,
      isPublicGithub: false,
      live: LINKS.PORTFOLIO,
    },
    {
      title: "WhatsApp Flow Automation Platform",
      category: "Full Stack & Enterprise Messaging",
      description:
        "A low-code platform empowering businesses to create, manage, and deploy interactive WhatsApp Flows for their WhatsApp Business Accounts. Features an intuitive drag-and-drop builder with reusable component primitives and instant schema validation to prevent configuration errors prior to deployment.",
      highlights: [
        "Drag-and-drop flow building canvas with reusable UI components (Heading, Text Body, Conditions, Rich Text, Input Fields)",
        "Automated Flow JSON generation via custom adapters with a single-click build action",
        "Interactive real-time mobile simulator previewing flows on an emulated smartphone screen before deployment",
        "Strict client-side validation preventing WhatsApp Business API configuration errors",
      ],
      image: "/shubham-banner.png",
      tech: ["Node.js", "React.js", "WhatsApp Business API", "Flow JSON", "Adapters", "TypeScript", "Tailwind CSS"],
      github: LINKS.GITHUB,
      isPublicGithub: true,
      live: LINKS.PORTFOLIO,
    },
    {
      title: "Chatbot Analytics Dashboard",
      category: "Data Analytics & Funnel Tracking",
      description:
        "High-visibility conversational analytics dashboard built to monitor user journeys across chatbot touchpoints. Captures milestone events throughout conversations, tracks drop-off stages, and delivers real-time statistical insights so businesses can maximize conversion rates.",
      highlights: [
        "Tracked granular user journeys with milestone checkpoints across conversational sequences",
        "Real-time funnel metrics identifying high-friction drop-offs and overall completion velocity",
        "High-throughput event ingestion backed by efficient MongoDB aggregation pipelines",
        "Actionable business intelligence metrics empowering customer support & sales teams",
      ],
      image: "/task-management-dashboard.png",
      tech: ["Node.js", "React.js", "MongoDB", "REST APIs", "Data Analytics", "Chart.js"],
      github: LINKS.GITHUB,
      isPublicGithub: true,
      live: LINKS.PORTFOLIO,
    },
    {
      title: "High-Scale Data Migration Pipeline (AWS to Data Center)",
      category: "Backend Infrastructure & Migration Scripts",
      description:
        "Resilient, fault-tolerant batch migration pipeline engineered to safely transition 50,000 to 100,000+ sensitive documents from AWS cloud storage to on-premise data centers during infrastructure modernization with zero data loss.",
      highlights: [
        "Automated URL substitution and validation replacing AWS S3 URLs with data-center endpoints",
        "Pre- and post-migration verification counting affected documents to ensure 100% data integrity",
        "Stateful tracking of completed vs. pending documents with pause, audit, and resume capabilities",
        "Chunk-based asynchronous batch processing eliminating database locks and downtime",
      ],
      image: "/mern-banner.png",
      tech: ["Node.js", "MongoDB", "AWS S3", "Data Center Migration", "Batch Processing", "Audit Logging"],
      github: LINKS.GITHUB,
      isPublicGithub: true,
      live: LINKS.GITHUB,
    },
  ];

  const projectFilters = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "ecommerce", label: "E-Commerce & Logistics", count: 1 },
    { id: "messaging", label: "Enterprise Messaging", count: 1 },
    { id: "data", label: "Data & Infrastructure", count: 2 },
  ];

  const filteredProjects = projects.filter((p) => {
    if (projectCategory === "all") return true;
    if (projectCategory === "ecommerce")
      return p.category.toLowerCase().includes("commerce") || p.title.toLowerCase().includes("inventory");
    if (projectCategory === "messaging")
      return p.category.toLowerCase().includes("messaging") || p.title.toLowerCase().includes("flow");
    if (projectCategory === "data")
      return (
        p.category.toLowerCase().includes("data") ||
        p.title.toLowerCase().includes("migration") ||
        p.title.toLowerCase().includes("analytics")
      );
    return true;
  });

  const experience = [
    {
      title: "Software Developer",
      company: "Leadows Technologies Pvt Ltd",
      location: "Nagpur, Maharashtra, India",
      period: "Nov 2023 — Present",
      type: "Full-Time",
      description:
        "Engineering scalable enterprise web applications, microservices, and multi-channel customer-engagement platforms supporting WhatsApp, SMS, and RCS.",
      achievements: [
        "Build full-stack enterprise applications using Node.js, React.js, PostgreSQL and MongoDB.",
        "Designed a microservices architecture using REST APIs, RabbitMQ message queues, and Redis caching.",
        "Built customer communication platforms supporting WhatsApp, SMS and RCS messaging.",
        "Integrated secure payment gateways with WhatsApp Business API for seamless in-chat transactions.",
        "Improved the database pipeline to retrieve large volumes of data efficiently with low latency.",
        "Optimized database queries, schemas, and indexing strategies to achieve peak performance.",
        "Added system observability and monitoring with Loki and Grafana for centralized logs and metrics.",
        "Engineered customized e-commerce inventory and order fulfillment platform integrated with Shopify webhooks and Shiprocket logistics APIs.",
        "Designed database schemas, automated audit logging, and engineered secure third-party integrations.",
      ],
      skills: [
        "Node.js",
        "React.js",
        "PostgreSQL",
        "MongoDB",
        "RabbitMQ",
        "Redis",
        "Shopify API",
        "Shiprocket API",
        "WhatsApp Business API",
        "Flutter (Basic)",
        "Loki",
        "Grafana",
        "Microservices",
        "REST APIs",
      ],
    },
    {
      title: "Software Engineer Intern",
      company: "Qloron Pvt Ltd",
      location: "Nagpur, Maharashtra, India",
      period: "Dec 2022 — May 2023",
      type: "Internship",
      description:
        "Developed responsive frontend interfaces, integrated REST APIs, and gained practical full-stack software development experience.",
      achievements: [
        "Built clean, responsive frontend features using JavaScript, HTML5, CSS3, and React.js.",
        "Assisted with REST API integration and gained comprehensive exposure to full-stack engineering standards.",
        "Collaborated with cross-functional teams in an agile environment and adhered to clean code practices.",
      ],
      skills: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "REST APIs", "Git"],
    },
  ];

  const skillCategories = [
    {
      category: "Backend & APIs",
      icon: Terminal,
      skills: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "Microservices",
        "Shopify API",
        "Shiprocket API",
        "WhatsApp Business API",
        "Webhooks",
        "API Architecture",
      ],
    },
    {
      category: "Frontend & Mobile",
      icon: Code,
      skills: [
        "React.js",
        "Flutter (Basic)",
        "JavaScript (ES6+)",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Responsive UI",
      ],
    },
    {
      category: "E-Commerce & Logistics",
      icon: Package,
      skills: [
        "Shopify Webhook Sync",
        "Shiprocket Logistics API",
        "Warehouse & Rack Management",
        "Employee Order Assignment",
        "Automated Invoice Generation",
        "AWB & Shipping Tracking",
      ],
    },
    {
      category: "Databases & Optimization",
      icon: Database,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Query Optimization", "Schema Design", "Data Pipelines"],
    },
    {
      category: "Messaging & Caching",
      icon: Layers,
      skills: ["RabbitMQ", "Redis", "Message Queuing", "Distributed Caching", "Pub/Sub"],
    },
    {
      category: "Cloud, DevOps & Observability",
      icon: Cpu,
      skills: ["AWS (S3)", "Docker (basic)", "CI/CD", "Grafana", "Loki", "System Logging"],
    },
    {
      category: "AI, RAG & Vector Search",
      icon: Sparkles,
      skills: ["RAG (Retrieval-Augmented Generation)", "LLM Integration", "Embeddings", "Vector Search (Qdrant)"],
    },
    {
      category: "Tools & Testing",
      icon: ShieldCheck,
      skills: ["Git", "GitHub", "Postman", "Linux", "VS Code"],
    },
  ];

  const education = [
    {
      degree: "B.Tech in Information Technology",
      institution: "G.H. Raisoni College of Engineering, Nagpur",
      period: "2019 — 2023",
      grade: "CGPA: 8.00 / 10.0",
      description:
        "Comprehensive curriculum in Data Structures, Algorithms, Database Systems, Web Development, Microservices, and Software Engineering.",
    },
    {
      degree: "Higher Secondary Certificate (HSC) - Science",
      institution: "Z.P. Gandhi Junior College of Science",
      period: "2017 — 2019",
      grade: "Score: 61.69%",
      description: "Focused study in Physics, Chemistry, and Higher Mathematics.",
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Samarth Vidhyalaya, Lakhani",
      period: "Completed 2017",
      grade: "Score: 64.20%",
      description: "Foundational academic curriculum with high distinction in Mathematics and Science.",
    },
  ];

  const stats = [
    { label: "Years Experience", value: 3, suffix: "~" },
    { label: "Records Migrated", value: 100, suffix: "k+" },
    { label: "B.Tech IT CGPA", value: 8, suffix: ".00" },
    { label: "Payment & API Uptime", value: 100, suffix: "%" },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingBubbles />
      <ParallaxBackground />
      <FloatingElements />
      <CursorEffects />
      <ScrollProgress />

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-20">
        {/* Header / Hero */}
        <header className="mb-14 animate-in fade-in duration-1000">
          {/* Mobile Quick Controls Bar */}
          <div className="flex lg:hidden justify-end mb-4">
            <EffectsControls showThemeToggle={true} size="sm" />
          </div>

          <div className="flex justify-between items-start mb-8 gap-8">
            <div className="flex-1 max-w-4xl space-y-4">
              {/* Badges / Chips */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 border border-border/50">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>Nagpur, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Open to Opportunities</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 border border-border/50">
                  <Coffee className="h-3.5 w-3.5 text-amber-500" />
                  <span>WhatsApp Flows & Microservices</span>
                </div>
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 border border-border/50">
                  <Package className="h-3.5 w-3.5 text-sky-500" />
                  <span>Shopify & Shiprocket Logistics</span>
                </div>
              </div>

              {/* Name */}
              <div className="overflow-hidden">
                <InteractiveName firstName="Shubham" lastName="Bhoyar" className="mb-2" />
              </div>

              {/* Role Title */}
              <p className="text-xl md:text-2xl font-medium text-muted-foreground mb-3 hover:text-primary transition-colors duration-300">
                Full Stack Developer{" "}
                <span className="text-primary font-semibold">(Node.js, React.js)</span>
              </p>

              {/* Professional Summary */}
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Full Stack Developer with nearly 3 years of experience building and deploying scalable web
                applications with Node.js, React.js, and microservices. Specialised in{" "}
                <strong className="text-foreground font-semibold">WhatsApp Business API & Flows</strong>,{" "}
                <strong className="text-foreground font-semibold">E-Commerce Logistics (Shopify & Shiprocket)</strong>, and customer-engagement
                platforms. Comfortable owning features end-to-end: API design, database schemas,
                authentication, integrations, and deployment.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Button
                  asChild
                  className="hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-primary/20"
                >
                  <a href="#contact" onClick={() => scrollToSection("contact")}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Get In Touch
                  </a>
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="hover:scale-105 transition-transform duration-200 bg-background/50 backdrop-blur-sm"
                >
                  <a href={LINKS.RESUME} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2 text-primary" />
                    Download Resume (PDF)
                  </a>
                </Button>

                {/* Quick Interactive LinkedIn Button */}
                <Button
                  variant="outline"
                  asChild
                  className="border-[#0A66C2]/40 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300"
                >
                  <a href={LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2 fill-current" />
                    LinkedIn Profile
                  </a>
                </Button>
              </div>
            </div>

            {/* Right side Photo Card & Visual Effects / Theme Controls */}
            <div className="hidden lg:flex flex-col items-end gap-4 shrink-0">
              <EffectsControls showThemeToggle={true} />

              <div className="animate-in slide-in-from-right-12 duration-1000 delay-300">
                <GlassmorphismPhotoCard />
              </div>
            </div>
          </div>

          {/* Interactive LinkedIn Feature Card */}
          <div className="mt-8 mb-10">
            <InteractiveLinkedInCard variant="hero" />
          </div>

          {/* Current Role Callout */}
          <div className="p-4 rounded-xl bg-card/50 border border-border/60 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm sm:text-base text-muted-foreground">
              Currently Software Developer at{" "}
              <strong className="text-primary font-semibold hover:underline cursor-pointer">
                Leadows Technologies Pvt Ltd
              </strong>
              , engineering customer communication platforms, WhatsApp Flow automations, and high-volume data
              pipelines.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("experience")}
              className="text-primary hover:text-primary/80 shrink-0 text-xs sm:text-sm font-medium"
            >
              View Experience <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </header>

        {/* Right-Side Navigation Dock (User requested on right side) */}
        <RightSideNav activeSection={activeSection} onNavigate={scrollToSection} />

        {/* Content Sections */}
        <main className="relative z-10 space-y-16">
          {/* SECTION 1: ABOUT */}
          <section id="about" className="scroll-mt-24 space-y-12 animate-in fade-in duration-500 pb-12 border-b border-border/40">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-primary">01 // OVERVIEW & BIO</span>
                <Badge variant="outline" className="text-[11px] font-mono text-muted-foreground">About Shubham</Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <User className="h-6 w-6 text-primary" />
                      About Shubham Bhoyar
                    </h2>
                    <div className="space-y-4 text-foreground/90 leading-relaxed text-base">
                      <p>
                        I am a results-oriented <strong>Full Stack Developer</strong> with nearly 3 years of hands-on
                        experience architecting and deploying scalable web applications, RESTful microservices, and
                        customer-engagement systems.
                      </p>
                      <p>
                        At <strong>Leadows Technologies</strong>, I spearhead backend and full-stack development
                        for omnichannel communication platforms (WhatsApp, SMS, RCS). My work includes building low-code
                        WhatsApp Flow automation platforms, integrating in-chat payment gateways with WhatsApp Business
                        API, and architecting microservices powered by Node.js, RabbitMQ, and Redis.
                      </p>
                      <p>
                        I also specialize in database query optimization across PostgreSQL and MongoDB, and have
                        engineered mission-critical infrastructure tools, including zero-downtime data migration
                        scripts transferring over 100,000+ sensitive records from AWS to on-premise data centers.
                      </p>
                      <p>
                        Additionally, I actively explore cutting-edge AI architectures, including{" "}
                        <strong className="text-foreground">RAG (Retrieval-Augmented Generation)</strong>, LLM
                        integrations, vector embeddings, and similarity search with Qdrant.
                      </p>
                    </div>
                  </div>

                  {/* Highlights Card */}
                  <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Key Engineering Competencies
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>WhatsApp Business API & Flow Automation</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Microservices (RabbitMQ, Redis, Node.js)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>PostgreSQL & MongoDB Query Optimization</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>In-Chat Payment Gateway Integrations</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Observability with Loki & Grafana</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>RAG & Vector Search (Qdrant)</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  {/* Connect & Socials Card */}
                  <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        Direct Connect
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Interactive LinkedIn Box */}
                      <div
                        onClick={copyLinkedIn}
                        className="p-3 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/30 hover:bg-[#0A66C2]/15 cursor-pointer transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 text-xs font-semibold text-[#0A66C2]">
                            <Linkedin className="h-4 w-4 fill-current" />
                            <span>LinkedIn Profile</span>
                          </div>
                          <span className="text-[11px] text-muted-foreground group-hover:text-foreground flex items-center gap-1 font-mono">
                            {copiedUrl ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-500" />
                                <span className="text-emerald-500">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy Link</span>
                              </>
                            )}
                          </span>
                        </div>
                        <a
                          href={LINKS.LINKEDIN}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-foreground/80 hover:text-primary truncate block font-mono mt-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          linkedin.com/in/shubham-bhoyar-522a0b218
                        </a>
                      </div>

                      {/* Contact items */}
                      <div className="space-y-2.5 text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4 text-primary shrink-0" />
                          <a href={LINKS.EMAIL_MAILTO} className="hover:text-primary truncate transition-colors">
                            {LINKS.EMAIL}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                          <a href={LINKS.PHONE_TEL} className="hover:text-primary transition-colors">
                            {LINKS.PHONE}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Github className="h-4 w-4 text-foreground shrink-0" />
                          <a
                            href={LINKS.GITHUB}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary truncate transition-colors"
                          >
                            github.com/{LINKS.GITHUB_HANDLE}
                          </a>
                        </div>
                      </div>

                      {/* Icon buttons */}
                      <div className="flex gap-2 pt-2 border-t border-border/50">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="h-9 w-9 hover:border-[#0A66C2] hover:text-[#0A66C2] bg-transparent"
                        >
                          <a href={LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <Linkedin className="h-4 w-4 fill-current" />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="h-9 w-9 hover:border-foreground hover:text-foreground bg-transparent"
                        >
                          <a href={LINKS.GITHUB} target="_blank" rel="noopener noreferrer" title="GitHub">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="h-9 w-9 hover:border-primary hover:text-primary bg-transparent"
                        >
                          <a href={LINKS.EMAIL_MAILTO} title="Email">
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="h-9 w-9 hover:border-emerald-500 hover:text-emerald-500 bg-transparent"
                        >
                          <a href={LINKS.WHATSAPP} target="_blank" rel="noopener noreferrer" title="WhatsApp">
                            <MessageCircle className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Education summary chip */}
                  <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <span>Graduated 2023 • CGPA 8.00</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        B.Tech, Information Technology
                      </p>
                      <p className="text-xs text-muted-foreground">
                        G.H. Raisoni College of Engineering, Nagpur
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Animated Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="text-center p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 border-border/60 bg-card/60 backdrop-blur-sm"
                  >
                    <CardContent className="p-0">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

          {/* SECTION 2: EXPERIENCE */}
          <section id="experience" className="scroll-mt-24 space-y-10 animate-in fade-in duration-500 pb-12 border-b border-border/40">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-primary">02 // CAREER HISTORY</span>
                <Badge variant="outline" className="text-[11px] font-mono text-muted-foreground">Production Roles</Badge>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                  Work Experience
                </h2>
                <p className="text-muted-foreground">
                  Proven track record designing scalable enterprise backends, real-time messaging systems, and
                  customer-facing applications.
                </p>
              </div>

              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <Card
                    key={index}
                    className="border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors duration-300 shadow-md"
                  >
                    <div className="p-6 sm:p-8 space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/50">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-xl text-foreground">{exp.title}</span>
                            <Badge variant="outline" className="text-xs border-primary/40 text-primary">
                              {exp.type}
                            </Badge>
                          </div>
                          <h3 className="text-base font-semibold text-primary">{exp.company}</h3>
                        </div>

                        <div className="flex flex-col sm:items-end text-xs sm:text-sm text-muted-foreground">
                          <span className="font-mono font-medium text-foreground">{exp.period}</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {exp.description}
                      </p>

                      {/* Bullets */}
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                          Key Achievements & Responsibilities:
                        </h4>
                        <ul className="grid grid-cols-1 gap-2">
                          {exp.achievements.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech stack badges */}
                      <div className="pt-2">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

          {/* SECTION 3: PROJECTS */}
          <section id="projects" className="scroll-mt-24 space-y-10 animate-in fade-in duration-500 pb-12 border-b border-border/40">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-primary">03 // FEATURED WORK</span>
                <Badge variant="outline" className="text-[11px] font-mono text-muted-foreground">Engineering Portfolio</Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Code className="h-6 w-6 text-primary" />
                    Featured Projects
                  </h2>
                  <p className="text-muted-foreground">
                    Real-world enterprise systems, automation platforms, and data pipelines built and deployed.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {projectFilters.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setProjectCategory(f.id)}
                      className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 cursor-pointer ${
                        projectCategory === f.id
                          ? "bg-primary text-primary-foreground border-primary font-medium shadow-xs"
                          : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/60"
                      }`}
                    >
                      {f.label} ({f.count})
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {filteredProjects.map((project, index) => (
                  <Card
                    key={index}
                    className="border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-md group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
                      {/* Left: Project Details */}
                      <div className="lg:col-span-8 space-y-4">
                        <div>
                          <Badge variant="outline" className="text-xs text-primary border-primary/30 mb-2">
                            {project.category}
                          </Badge>
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                            {project.title}
                          </h3>
                        </div>

                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                          {project.description}
                        </p>

                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Highlights:
                          </h4>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/90">
                            {project.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.tech.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs font-mono"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-3">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => setSelectedProject(project)}
                            className="text-xs hover:scale-105 transition-transform duration-200 cursor-pointer shadow-sm"
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            View Details
                          </Button>
                          {project.github && project.isPublicGithub !== false ? (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="text-xs bg-background/50 hover:scale-105 transition-transform duration-200"
                            >
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-3.5 w-3.5 mr-1.5" />
                                GitHub
                              </a>
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/40 border border-border/50">
                              <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                              Enterprise / Client Project
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Project Image */}
                      <div className="lg:col-span-4 flex items-center justify-center">
                        <div
                          onClick={() => setSelectedProject(project)}
                          className="w-full aspect-video lg:aspect-square rounded-xl overflow-hidden bg-muted border border-border/50 shadow-inner group-hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Project Details Modal */}
              <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
                <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto bg-card/95 backdrop-blur-xl border border-border/80 shadow-2xl p-6 sm:p-8">
                  {selectedProject && (
                    <div className="space-y-6">
                      <DialogHeader className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="text-xs text-primary border-primary/30">
                            {selectedProject.category}
                          </Badge>
                          {selectedProject.isPublicGithub === false ? (
                            <Badge variant="secondary" className="text-xs flex items-center gap-1">
                              <ShieldCheck className="h-3 w-3 text-muted-foreground" />
                              Client / Enterprise Confidential
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs flex items-center gap-1">
                              <Github className="h-3 w-3" />
                              Open Source Repository
                            </Badge>
                          )}
                        </div>
                        <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                          {selectedProject.title}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                          {selectedProject.overview || selectedProject.description}
                        </DialogDescription>
                      </DialogHeader>

                      {/* Project Image */}
                      {selectedProject.image && (
                        <div className="w-full aspect-video rounded-xl overflow-hidden bg-muted border border-border/50 shadow-md">
                          <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Implementation Highlights */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Key Architecture & Modules:
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                          {selectedProject.highlights.map((h: string, i: number) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.tech.map((t: string) => (
                            <Badge key={t} variant="secondary" className="text-xs font-mono">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/60">
                        <div className="flex flex-wrap items-center gap-2.5">
                          {selectedProject.github && selectedProject.isPublicGithub !== false && (
                            <Button variant="outline" size="sm" asChild className="text-xs">
                              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-3.5 w-3.5 mr-1.5" />
                                GitHub
                              </a>
                            </Button>
                          )}
                          <Button
                            variant="default"
                            size="sm"
                            asChild
                            className="text-xs hover:scale-105 transition-transform"
                          >
                            <a
                              href="#contact"
                              onClick={() => {
                                setSelectedProject(null);
                                scrollToSection("contact");
                              }}
                            >
                              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                              Discuss This Project
                            </a>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedProject(null)}
                          className="text-xs text-muted-foreground"
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </section>

          {/* SECTION 4: SKILLS */}
          <section id="skills" className="scroll-mt-24 space-y-10 animate-in fade-in duration-500 pb-12 border-b border-border/40">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-primary">04 // CORE COMPETENCIES</span>
                <Badge variant="outline" className="text-[11px] font-mono text-muted-foreground">Tech Stack</Badge>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Cpu className="h-6 w-6 text-primary" />
                  Technical Skills & Technologies
                </h2>
                <p className="text-muted-foreground">
                  Core competencies, frameworks, databases, and architectural patterns practiced in production.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillCategories.map((cat, index) => {
                  const Icon = cat.icon;
                  return (
                    <Card
                      key={index}
                      className="border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <CardHeader className="pb-3 flex flex-row items-center gap-3 space-y-0">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-base font-bold text-foreground">
                          {cat.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-200 cursor-default"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

          {/* SECTION 5: EDUCATION */}
          <section id="education" className="scroll-mt-24 space-y-10 animate-in fade-in duration-500 pb-12 border-b border-border/40">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-primary">05 // ACADEMICS</span>
                <Badge variant="outline" className="text-[11px] font-mono text-muted-foreground">Degrees & Credentials</Badge>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  Education & Qualifications
                </h2>
                <p className="text-muted-foreground">
                  Academic background and technical education credentials.
                </p>
              </div>

              <div className="space-y-6 max-w-4xl">
                {education.map((edu, index) => (
                  <Card
                    key={index}
                    className="border-border/60 bg-card/60 backdrop-blur-sm p-6 sm:p-8 hover:border-primary/40 transition-colors shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-border/50">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                        <p className="text-base font-semibold text-primary">{edu.institution}</p>
                      </div>
                      <div className="flex flex-col sm:items-end text-xs sm:text-sm text-muted-foreground">
                        <span className="font-mono font-medium text-foreground">{edu.period}</span>
                        <Badge variant="secondary" className="mt-1 text-xs font-mono font-bold text-primary">
                          {edu.grade}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {edu.description}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

          {/* SECTION 6: CONTACT */}
          <section id="contact" className="scroll-mt-24 space-y-10 animate-in fade-in duration-500 pt-2">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-primary">06 // CONNECT</span>
                <Badge variant="outline" className="text-[11px] font-mono text-muted-foreground">Direct Inquiries</Badge>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  Get In Touch
                </h2>
                <p className="text-muted-foreground">
                  Let's connect to discuss software engineering roles, full-stack projects, or WhatsApp API solutions.
                </p>
              </div>

              {/* Prominent Interactive LinkedIn Banner in Contact */}
              <div className="max-w-4xl">
                <InteractiveLinkedInCard variant="hero" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-4xl">
                {/* Contact Info Box */}
                <div className="lg:col-span-5 space-y-6">
                  <Card className="border-border/60 bg-card/60 backdrop-blur-sm p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold mb-1">Contact Information</h3>
                      <p className="text-xs text-muted-foreground">
                        Feel free to reach out directly via LinkedIn, Email, or WhatsApp.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Email */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs text-muted-foreground">Email</p>
                          <a
                            href={LINKS.EMAIL_MAILTO}
                            className="text-sm font-medium hover:text-primary transition-colors block truncate max-w-[220px]"
                          >
                            {LINKS.EMAIL}
                          </a>
                        </div>
                      </div>

                      {/* Phone / WhatsApp */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                          <Phone className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs text-muted-foreground">Phone / WhatsApp</p>
                          <a
                            href={LINKS.WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:text-emerald-500 transition-colors block"
                          >
                            {LINKS.PHONE}
                          </a>
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] shrink-0 mt-0.5">
                          <Linkedin className="h-4 w-4 fill-current" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs text-muted-foreground">LinkedIn</p>
                          <a
                            href={LINKS.LINKEDIN}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:text-[#0A66C2] transition-colors block truncate max-w-[220px]"
                          >
                            in/shubham-bhoyar-522a0b218
                          </a>
                        </div>
                      </div>

                      {/* GitHub */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-muted text-foreground shrink-0 mt-0.5">
                          <Github className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs text-muted-foreground">GitHub</p>
                          <a
                            href={LINKS.GITHUB}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:text-primary transition-colors block"
                          >
                            github.com/{LINKS.GITHUB_HANDLE}
                          </a>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-muted text-primary shrink-0 mt-0.5">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="text-sm font-medium text-foreground">{LINKS.LOCATION}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Form */}
                <div className="lg:col-span-7">
                  <ContactForm />
                </div>
              </div>
            </section>
        </main>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-border relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div>
              <p className="text-sm font-semibold text-foreground">
                © {new Date().getFullYear()} Shubham Bhoyar
              </p>
              <p className="text-xs text-muted-foreground">
                Full Stack Developer (Node.js, React.js) • Nagpur, Maharashtra, India
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-xs text-muted-foreground hover:text-[#0A66C2]"
              >
                <a href={LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-3.5 w-3.5 mr-1 fill-current" />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <a href={LINKS.GITHUB} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3.5 w-3.5 mr-1" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-xs text-muted-foreground hover:text-primary"
              >
                <a href={LINKS.EMAIL_MAILTO}>
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  Email
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-xs text-muted-foreground hover:text-emerald-500"
              >
                <a href={LINKS.WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                  WhatsApp
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-xs text-muted-foreground hover:text-primary"
              >
                <a href={LINKS.RESUME} target="_blank" rel="noopener noreferrer">
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </footer>

        {/* Floating Back to Top Button */}
        {showBackToTop && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-40 h-11 w-11 rounded-full bg-card/90 dark:bg-card/80 backdrop-blur-md border border-border/80 shadow-xl hover:border-primary/50 hover:scale-110 transition-all duration-300 animate-in fade-in zoom-in-90 cursor-pointer"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="h-5 w-5 text-primary" />
          </Button>
        )}
      </div>
    </div>
  );
}
