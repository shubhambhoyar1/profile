"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassmorphismPhotoCard } from "@/components/glassmorphism-photo-card";
import { InteractiveName } from "@/components/interactive-name";
import { FloatingBubbles } from "@/components/floating-bubbles";
import { Github, Linkedin, Mail, ExternalLink, Code, User, Briefcase, Moon, Sun, FileText, MessageCircle, Download, MapPin, Calendar, Coffee } from "lucide-react";
import { useTheme } from "next-themes";
import { ContactForm } from "@/components/contact-form";
import { AnimatedCounter } from "@/components/animated-counter";
import { ScrollProgress } from "@/components/scroll-progress";
import { CursorEffects } from "@/components/cursor-effects";
import { FloatingElements } from "@/components/floating-elements";
import { ParallaxBackground } from "@/components/parallax-background";
import { LINKS } from "@/constants/links";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { id: "about", label: "About", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Code },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "contact", label: "Contact", icon: MessageCircle },
  ];

  const projects = [
    {
      title: "Travello: Discover, Book, Explore",
      description: "Budget-friendly travel platform with Django framework and PostgreSQL, featuring a curated selection of 500+ destinations. Boosted user satisfaction by 30% with secure online ticketing and facilitated over 50,000 users with intuitive registration and booking features.",
      image: "/modern-ecommerce-interface.png",
      tech: ["Django", "PostgreSQL", "Python", "HTML", "CSS", "JavaScript"],
      github: LINKS.GITHUB,
      live: "https://travello-demo.vercel.app",
    },
    {
      title: "Vendor Management System",
      description: "Backend system using Python and Django REST to manage 100+ vendor profiles, track purchase orders, and calculate performance metrics. Features token-based authentication and optimized database interactions handling 10,000+ records efficiently.",
      image: "/task-management-dashboard.png",
      tech: ["Python", "Django REST", "SQLite", "Token Auth", "Django ORM"],
      github: LINKS.GITHUB,
      live: "https://vendor-management-demo.vercel.app",
    },
    {
      title: "Connector API Backend",
      description: "Internal tool architected with TypeScript, Express.js, and Adapter design pattern using JSON-driven architecture. Reduced development time by 50% and includes interactive dashboards with real-time insights using React and Chart.js.",
      image: "/preview/project4.png",
      tech: ["TypeScript", "Express.js", "React", "Chart.js", "ShadCN UI", "Tailwind"],
      github: LINKS.GITHUB,
      live: "https://connector-api-demo.vercel.app",
    },
  ];

  const experience = [
    {
      title: "Software Development Engineer",
      company: "Leadows Technologies",
      period: "07/2023 — Present",
      description: "Architected connector API backend application using TypeScript, Express.js, and Adapter design pattern, reducing development time by 50%. Devised interactive dashboards with React, ShadCN UI, and Chart.js, reducing reporting time by 30%. Engineered payment middleware with callback handling and retry mechanisms ensuring 100% availability. Instituted Redis caching reducing database load by 26% and optimized DB indexing improving performance by 10%.",
      skills: ["TypeScript", "Express.js", "React", "Redis", "MongoDB", "NestJS", "Fastify"],
    },
    {
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      period: "2022 — Present",
      description: "Lead full-stack development for enterprise applications serving 100k+ users. Architect scalable microservices, mentor junior developers, and implement modern React patterns with TypeScript. Reduced application load time by 40% through performance optimization.",
      skills: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL"],
    },
    {
      title: "Full Stack Developer",
      company: "InnovateTech",
      period: "2020 — 2022",
      description: "Built and maintained multiple client applications from conception to deployment. Collaborated with cross-functional teams to deliver high-quality software solutions. Implemented CI/CD pipelines and automated testing frameworks.",
      skills: ["JavaScript", "Python", "MongoDB", "Docker", "Jenkins"],
    },
    {
      title: "Frontend Developer",
      company: "Digital Solutions Inc",
      period: "2018 — 2020",
      description: "Developed responsive web applications and interactive user interfaces. Worked closely with UX/UI designers to implement pixel-perfect designs. Optimized applications for maximum speed and scalability.",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Sass"],
    },
  ];

  const skills = ["JavaScript", "React", "Node.js", "Angular", "Python", "Django", "HTML", "CSS", "SQL", "Kubernetes", "Java", "Git", "GitHub", "TypeScript", "Express.js", "MongoDB", "Redis", "NestJS", "Fastify"];

  const blogPosts = [
    {
      title: "Building Scalable React Applications",
      excerpt: "Best practices for architecting large-scale React applications with proper state management and component organization.",
      date: "Dec 15, 2024",
      readTime: "8 min read",
    },
    {
      title: "Modern JavaScript Patterns",
      excerpt: "Exploring advanced JavaScript concepts and patterns that every developer should know in 2024.",
      date: "Nov 28, 2024",
      readTime: "6 min read",
    },
    {
      title: "Optimizing Web Performance",
      excerpt: "Comprehensive guide to improving web application performance through various optimization techniques.",
      date: "Nov 10, 2024",
      readTime: "10 min read",
    },
  ];

  const stats = [
    { label: "Years Experience", value: 2, suffix: "+" },
    { label: "Projects Completed", value: 15, suffix: "+" },
    { label: "TCS CodeVita Rank (Top 1%)", value: 1225, suffix: "" },
    { label: "Code Commits", value: 500, suffix: "+" },
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
        {/* Header */}
        <header className="mb-16 animate-in fade-in duration-1000">
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1 max-w-4xl space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Nagpur, Maharashtra</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Available for work</span>
                </div>
                <div className="flex items-center gap-1">
                  <Coffee className="h-4 w-4" />
                  <span>Coffee enthusiast</span>
                </div>
              </div>

              <div className="overflow-hidden">
                <InteractiveName firstName="Shubham" lastName="Bhoyar" className="mb-2" />
              </div>

              <p className="text-xl md:text-2xl text-muted-foreground mb-4 hover:text-primary transition-colors duration-300 animate-in slide-in-from-left-8 duration-1000 delay-500">Software Engineer</p>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed animate-in slide-in-from-left-4 duration-1000 delay-700">I build scalable, high-performance applications that solve real-world problems. With expertise in full-stack development, I specialize in creating robust backend systems and interactive user interfaces. My work focuses on optimizing performance, implementing secure architectures, and delivering exceptional user experiences.</p>

              <div className="flex flex-wrap gap-4 pt-4 animate-in slide-in-from-left-2 duration-1000 delay-900">
                <Button asChild className="hover:scale-105 transition-transform duration-200">
                  <a href="#contact" onClick={() => setActiveTab("contact")}>
                    Get In Touch
                  </a>
                </Button>
                <Button variant="outline" asChild className="hover:scale-105 transition-transform duration-200 bg-transparent">
                  <a href={LINKS.RESUME} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end gap-4">
              {/* Theme Toggle */}
              <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="shrink-0 hover:scale-110 transition-transform duration-200">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <div className="animate-in slide-in-from-right-12 duration-1000 delay-500">
                <GlassmorphismPhotoCard />
              </div>
            </div>
          </div>

          {/* Current Role */}
          <div className="mb-8">
            <p className="text-muted-foreground mb-2">
              Currently, I'm a Software Development Engineer at
              <span className="text-primary font-medium hover:underline cursor-pointer transition-all duration-200">Leadows Technologies</span>, specializing in backend architecture and full-stack development. I contribute to building scalable applications, optimizing database performance, and implementing secure payment systems that serve thousands of users daily.
            </p>
          </div>

          {/* Navigation */}
          <nav className="border-b border-border">
            <div className="flex flex-wrap gap-8 pb-4">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 transform ${activeTab === tab.id ? "text-foreground border-b-2 border-primary pb-4" : "text-muted-foreground hover:text-foreground"}`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </header>

        {/* Content */}
        <main className="mt-12 relative z-10">
          {activeTab === "about" && (
            <div className="space-y-12 animate-in fade-in duration-700">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <p className="text-muted-foreground mb-4">Good afternoon.</p>
                    <div className="space-y-6 text-foreground leading-relaxed">
                      <p>I'm a passionate software engineer with experience creating digital solutions that make a difference. My journey began with competitive programming achievements, including securing global rank 1,225 in TCS CodeVita Season 10 (top 1% among 100,000+ participants), and has evolved into building production-ready applications.</p>
                      <p>
                        In my current role at <span className="text-primary hover:underline cursor-pointer transition-all duration-200">Leadows Technologies</span>, I architect backend systems, optimize database performance, and build interactive dashboards. I've successfully reduced development time by 50% through innovative API design and improved application performance by implementing Redis caching and database optimizations.
                      </p>
                      <p>My achievements include winning the Computsav Hackathon 2021 and achieving global rank 32 in CodeChef competitions. I hold a Bachelor of Engineering in Computer Engineering from Rashtrasant Tukadoji Maharaj Nagpur University, where I developed a strong foundation in algorithms and system design.</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-8">
                    <div className="mb-6">
                      <span className="text-muted-foreground text-sm">2023 — PRESENT</span>
                      <h3 className="text-xl font-medium">Software Development Engineer • Leadows Technologies</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">Architected connector API backend application using TypeScript, Express.js, and Adapter design pattern, reducing development time by 50%. Devised interactive dashboards with React, ShadCN UI, and Chart.js, reducing reporting time by 30%. Engineered payment middleware with callback handling and retry mechanisms ensuring 100% availability. Instituted Redis caching reducing database load by 26% and optimized DB indexing improving performance by 10%.</p>
                    <div className="flex flex-wrap gap-2">
                      {["TypeScript", "Express.js", "React", "Redis"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs hover:scale-105 transition-transform duration-200 cursor-default">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Skills & Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-200 cursor-default">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Connect</h3>
                    <div className="flex gap-4">
                      <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200 bg-transparent">
                        <a href={LINKS.GITHUB} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200 bg-transparent">
                        <a href={LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200 bg-transparent">
                        <a href={LINKS.EMAIL_MAILTO}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                    <CardContent className="p-0">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-2">Timeline</h2>
                <p className="text-muted-foreground">2+ years of building seamless software solutions and optimizing development processes.</p>
              </div>

              <div className="space-y-12">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-border pl-8 relative hover:border-primary transition-colors duration-300">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full hover:scale-125 transition-transform duration-300"></div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-muted-foreground text-sm">{exp.period}</span>
                        <h3 className="text-xl font-medium hover:text-primary transition-colors duration-200 cursor-default">
                          {exp.title} • {exp.company}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs hover:scale-105 transition-transform duration-200 cursor-default">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-2">Selected work</h2>
                <p className="text-muted-foreground">A collection of projects that showcase my skills and experience.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <Card key={index} className="group overflow-hidden border-0 bg-card/50 hover:bg-card hover:scale-105 transition-all duration-300">
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors duration-200">{project.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs hover:scale-105 transition-transform duration-200 cursor-default">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button variant="outline" size="sm" asChild className="text-xs bg-transparent hover:scale-105 transition-transform duration-200">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3 mr-1" />
                            Code
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="text-xs bg-transparent hover:scale-105 transition-transform duration-200">
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-2">Writing</h2>
                <p className="text-muted-foreground">Infrequent thoughts on design and code.</p>
              </div>

              <div className="space-y-8">
                {blogPosts.map((post, index) => (
                  <article key={index} className="group cursor-pointer hover:scale-105 transition-transform duration-200">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium group-hover:text-primary transition-colors duration-200">{post.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">More articles coming soon...</p>
                <Button variant="outline" className="hover:scale-105 transition-transform duration-200 bg-transparent">
                  Subscribe to Updates
                </Button>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Contact</h2>
                    <p className="text-muted-foreground">If you would like to discuss a project or just say hi, I'm always down to chat.</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Mail</h3>
                      <a href={LINKS.EMAIL_MAILTO} className="text-muted-foreground hover:text-foreground hover:underline transition-all duration-200">
                        {LINKS.EMAIL}
                      </a>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">LinkedIn</h4>
                        <a href={LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground hover:underline transition-all duration-200 text-sm">
                          @shubham-bhoyar-522a0b218
                        </a>
                      </div>
                      <div>
                        <h4 className="font-medium">GitHub</h4>
                        <a href={LINKS.GITHUB} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground hover:underline transition-all duration-200 text-sm">
                          @shubhambhoyar1
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200 bg-transparent">
                        <a href={LINKS.GITHUB} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200 bg-transparent">
                        <a href={LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200 bg-transparent">
                        <a href={LINKS.EMAIL_MAILTO}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-border relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">© 2024. Crafted by Shubham Bhoyar</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors hover:underline">
                Imprint
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
