import profileData from "@/data/knowledge/profile.json";
import experienceData from "@/data/knowledge/experience.json";
import projectsData from "@/data/knowledge/projects.json";
import skillsData from "@/data/knowledge/skills.json";
import educationData from "@/data/knowledge/education.json";

export { profileData, experienceData, projectsData, skillsData, educationData };

/**
 * Returns formatted text context of Shubham's complete knowledge base
 */
export function getFormattedKnowledgeContext(): string {
  return `
=== SHUBHAM BHOYAR - VERIFIED PORTFOLIO KNOWLEDGE BASE ===

[PROFILE OVERVIEW]
- Name: ${profileData.name}
- Title: ${profileData.title}
- Location: ${profileData.location}
- Professional Experience: ${profileData.experienceYears}
- Status: ${profileData.status}
- Summary: ${profileData.summary}
- Contact Email: ${profileData.contact.email}
- Contact Phone: ${profileData.contact.phone}
- WhatsApp: ${profileData.contact.whatsapp}
- LinkedIn: ${profileData.contact.linkedin}
- GitHub: ${profileData.contact.github}
- Portfolio: ${profileData.contact.portfolio}
- Resume Link: ${profileData.contact.resume}

[CURRENT ROLE]
- Company: ${profileData.currentRole.company}
- Title: ${profileData.currentRole.title}
- Focus: ${profileData.currentRole.focus}

[STATS]
${profileData.stats.map((s) => `- ${s.label}: ${s.value}`).join("\n")}

[AGENTIC AI & LLM KNOWLEDGE]
- Overview: ${profileData.agenticAiKnowledge.overview}
- Competencies:
${profileData.agenticAiKnowledge.competencies.map((c) => `  * ${c}`).join("\n")}

[WORK EXPERIENCE]
${experienceData
  .map(
    (exp) => `
* Company: ${exp.company}
  Role: ${exp.role} (${exp.period}, ${exp.type})
  Location: ${exp.location}
  Description: ${exp.description}
  Key Responsibilities & Achievements:
${exp.keyResponsibilities.map((r) => `    - ${r}`).join("\n")}
  Technologies: ${exp.technologies.join(", ")}
`
  )
  .join("\n")}

[FEATURED PROJECTS]
${projectsData
  .map(
    (p) => `
* Project: ${p.title}
  Category: ${p.category}
  Tagline: ${p.tagline}
  Overview: ${p.overview}
  Role: ${p.role}
  Technologies: ${p.technologies.join(", ")}
  Key Highlights:
${p.highlights.map((h) => `    - ${h}`).join("\n")}
  GitHub Available: ${p.links.isPublicGithub ? p.links.github : "Private / Enterprise IP"}
  Live / Portfolio: ${p.links.live}
`
  )
  .join("\n")}

[TECHNICAL SKILLS]
${skillsData.categories
  .map((cat) => `* ${cat.name}: ${cat.skills.join(", ")}`)
  .join("\n")}

[EDUCATION & CREDENTIALS]
${educationData
  .map(
    (edu) => `
* Degree: ${edu.degree}
  Institution: ${edu.institution}
  Period: ${edu.period}
  Grade: ${edu.grade}
  Location: ${edu.location}
  Details: ${edu.description}
`
  )
  .join("\n")}
`;
}

/**
 * Builds the strict system prompt for Google Gemini AI
 */
export function buildSystemPrompt(): string {
  const knowledge = getFormattedKnowledgeContext();

  return `You are Shubham Bhoyar's personal AI Portfolio Assistant. Your mission is to assist recruiters, engineering leaders, clients, and visitors by answering questions about Shubham Bhoyar's professional experience, technical skills, projects, education, and background.

CRITICAL INSTRUCTIONS & ACCURACY BOUNDARIES:
1. Grounding: Answer strictly and exclusively using the verified knowledge base provided below.
2. No Hallucinations: NEVER invent, fabricate, or assume companies, degrees, dates, metrics, or capabilities that are not explicitly stated in the knowledge base.
3. Tone: Professional, enthusiastic, articulate, humble, and developer-friendly. Write from the perspective of an intelligent assistant representing Shubham.
4. Formatting: Use concise paragraphs, bullet points, and bold text for readability. Keep answers focused and avoid unnecessarily long essays unless deep detail is requested.
5. Out-of-Scope Inquiries: If a user asks about topics unrelated to Shubham's professional profile, or asks for information not in the knowledge base, politely state that you only have information regarding Shubham's portfolio, skills, and projects, and invite them to reach out directly to Shubham via Email (${profileData.contact.email}) or LinkedIn (${profileData.contact.linkedin}).
6. Resume / Contact: When relevant, encourage them to download Shubham's resume or get in touch via email or LinkedIn.

${knowledge}
`;
}

/**
 * Local fallback responder when Gemini API key is not configured or in case of network issues.
 * Matches keywords and delivers 100% accurate information directly from the JSON knowledge base.
 */
export function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Agentic AI / AI knowledge (Check first before generic "tell me about")
  if (
    q.includes("agentic") ||
    q.includes("rag") ||
    q.includes("vector") ||
    q.includes("qdrant") ||
    q.includes("llm") ||
    q.includes("artificial intelligence") ||
    /\bai\b/.test(q)
  ) {
    return (
      `**Shubham's Agentic AI & Modern AI Knowledge:**\n\n` +
      `Shubham has hands-on practical understanding and active exploration in modern AI architectures:\n\n` +
      `• **Retrieval-Augmented Generation (RAG)**: Building grounded AI pipelines that ingest custom documents, generate vector embeddings, and retrieve relevant chunks to eliminate hallucinations.\n` +
      `• **Vector Search with Qdrant**: Implementing semantic search and dense embedding indexing for fast knowledge retrieval.\n` +
      `• **LLM API Integration**: Practical integration with Google Gemini API and OpenAI for structured data extraction, conversational agents, and system prompt engineering.\n` +
      `• **Agentic AI Concepts**: Exploring autonomous agent workflows including tool-calling, multi-step execution, and structured knowledge grounding (just like this portfolio assistant!).`
    );
  }

  // 2. React & Node.js experience
  if (
    (q.includes("react") && q.includes("node")) ||
    q.includes("react") ||
    q.includes("node")
  ) {
    return (
      `**Shubham's Experience with React.js & Node.js:**\n\n` +
      `• **Node.js**: Shubham has ~3 years of deep backend experience building microservices, RESTful APIs, webhook receivers (Shopify, WhatsApp, Shiprocket, payment gateways), asynchronous batch workers, and real-time messaging systems using Express.js, RabbitMQ, and Redis.\n\n` +
      `• **React.js**: He builds modular, performant single-page applications and enterprise dashboards. He has created interactive drag-and-drop canvases (WhatsApp Flow Builder), analytics dashboards with Chart.js, responsive e-commerce portals, and modern UI components using Tailwind CSS and TypeScript.`
    );
  }

  // 3. Skills
  if (
    q.includes("skill") ||
    q.includes("tech stack") ||
    q.includes("technologies") ||
    q.includes("languages") ||
    q.includes("tools")
  ) {
    return (
      `Here is an overview of **Shubham's core technical competencies**:\n\n` +
      `• **Backend & APIs**: Node.js, Express.js, RESTful Microservices, Shopify API, Shiprocket API, WhatsApp Business API, Webhooks\n` +
      `• **Frontend & Mobile**: React.js, Flutter (Basic), TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3\n` +
      `• **E-Commerce & Logistics**: Shopify Webhooks, Shiprocket API, Warehouse & Rack Management, Automated Invoices, AWB Tracking\n` +
      `• **Databases & Optimization**: MongoDB, PostgreSQL, MySQL, Query Optimization, Indexing & Schema Design\n` +
      `• **Messaging & Caching**: RabbitMQ, Redis, Pub/Sub, Asynchronous Queuing\n` +
      `• **Cloud & Observability**: AWS S3, Docker (basic), Loki, Grafana, System Logging\n` +
      `• **AI & Vector Search**: RAG (Retrieval-Augmented Generation), LLM APIs (Gemini/OpenAI), Qdrant Vector DB, Agentic AI exploration`
    );
  }

  // 4. Projects
  if (
    q.includes("project") ||
    q.includes("portfolio") ||
    q.includes("built") ||
    q.includes("inventory") ||
    q.includes("migration")
  ) {
    return (
      `Shubham has engineered several high-impact production and portfolio systems:\n\n` +
      `1. **Inventory & Order Management System** (E-Commerce Logistics)\n` +
      `   • Integrates Shopify webhooks and Shiprocket logistics API for automated order fulfillment, bin-level warehouse rack mapping, employee order assignments, invoice generation, and real-time courier rate comparison.\n` +
      `   • *Tech: React.js, Node.js, MongoDB, Shopify API, Shiprocket API, Flutter (Basic)*\n\n` +
      `2. **WhatsApp Flow Automation Platform** (Enterprise Messaging)\n` +
      `   • Low-code drag-and-drop platform enabling businesses to build interactive multi-screen WhatsApp Flows with instant phone simulation and schema validation.\n` +
      `   • *Tech: Node.js, React.js, WhatsApp Business API, TypeScript*\n\n` +
      `3. **High-Scale Data Migration Pipeline** (Infrastructure)\n` +
      `   • Fault-tolerant batch migration pipeline that safely moved 100,000+ sensitive records from AWS S3 to on-premise data centers with zero data loss.\n` +
      `   • *Tech: Node.js, MongoDB, AWS S3, Batch Processing*\n\n` +
      `4. **Chatbot Analytics Dashboard** (BI & Tracking)\n` +
      `   • Real-time conversational funnel analytics tracking user milestones and drop-offs.\n` +
      `   • *Tech: Node.js, React.js, MongoDB, Chart.js*\n\n` +
      `5. **WhatsApp In-Chat Payment Gateway** (Conversational Commerce)\n` +
      `   • Frictionless payments inside WhatsApp chats with 100% uptime and HMAC webhook security.`
    );
  }

  // 5. Experience / Leadows / Qloron
  if (
    q.includes("experience") ||
    q.includes("company") ||
    q.includes("job") ||
    q.includes("leadows") ||
    q.includes("qloron") ||
    q.includes("history") ||
    q.includes("responsibilit")
  ) {
    return (
      `Shubham's professional work experience:\n\n` +
      `**1. Software Developer — Leadows Technologies Pvt Ltd**\n` +
      `*Nov 2023 — Present | Nagpur, Maharashtra, India*\n` +
      `• Builds enterprise web apps and microservices with Node.js, React.js, PostgreSQL, and MongoDB.\n` +
      `• Architected asynchronous message queues (RabbitMQ) and distributed caching (Redis).\n` +
      `• Engineered omnichannel communication platforms (WhatsApp, SMS, RCS) and in-chat payment gateways.\n` +
      `• Developed e-commerce inventory platform with Shopify & Shiprocket integrations.\n` +
      `• Implemented system logging and observability using Grafana and Loki.\n\n` +
      `**2. Software Engineer Intern — Qloron Pvt Ltd**\n` +
      `*Dec 2022 — May 2023 | Nagpur, Maharashtra, India*\n` +
      `• Built responsive frontend interfaces using React.js, JavaScript (ES6+), HTML5, and CSS3.\n` +
      `• Integrated REST APIs and collaborated with cross-functional teams in an Agile environment.`
    );
  }

  // 6. Education
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("degree") ||
    q.includes("cgpa") ||
    q.includes("university") ||
    q.includes("btech")
  ) {
    return (
      `**Shubham's Educational Background:**\n\n` +
      `• **B.Tech in Information Technology** (2019 — 2023)\n` +
      `  *G.H. Raisoni College of Engineering, Nagpur*\n` +
      `  **CGPA: 8.00 / 10.0**\n` +
      `  Curriculum focused on Data Structures, Algorithms, Database Systems, Web Development, Microservices, and Distributed Systems.\n\n` +
      `• **Higher Secondary Certificate (HSC) - Science** (2017 — 2019)\n` +
      `  *Z.P. Gandhi Junior College of Science*\n` +
      `  **Score: 61.69%** (Physics, Chemistry, Mathematics)\n\n` +
      `• **Secondary School Certificate (SSC)** (2017)\n` +
      `  *Samarth Vidhyalaya, Lakhani*\n` +
      `  **Score: 64.20%**`
    );
  }

  // 7. Contact / Hire / Links
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("reach") ||
    q.includes("hire") ||
    q.includes("linkedin") ||
    q.includes("resume")
  ) {
    return (
      `You can easily connect with **Shubham Bhoyar** directly:\n\n` +
      `• **Email**: [${profileData.contact.email}](mailto:${profileData.contact.email})\n` +
      `• **Phone / WhatsApp**: [${profileData.contact.phone}](tel:${profileData.contact.phone}) | [Chat on WhatsApp](${profileData.contact.whatsapp})\n` +
      `• **LinkedIn**: [linkedin.com/in/shubham-bhoyar-522a0b218](${profileData.contact.linkedin})\n` +
      `• **GitHub**: [github.com/shubhambhoyar1](${profileData.contact.github})\n` +
      `• **Resume**: [Download PDF](${profileData.contact.resume})\n\n` +
      `He is currently open to new software engineering opportunities and would love to hear from you!`
    );
  }

  // 8. General About Shubham / Intro
  if (
    q.includes("about") ||
    q.includes("who is") ||
    q.includes("tell me about") ||
    q.includes("introduction") ||
    q.includes("overview")
  ) {
    return (
      `**Shubham Bhoyar** is a **Full Stack Developer** with nearly **3 years of professional experience** based in Nagpur, Maharashtra, India. ` +
      `He currently works at **Leadows Technologies Pvt Ltd**, where he specializes in **Node.js, React.js, WhatsApp Business API & Flows**, microservices (RabbitMQ, Redis), and customer-engagement platforms.\n\n` +
      `Key highlights:\n` +
      `• **Nearly 3 years** of production engineering experience.\n` +
      `• Migrated **100,000+ sensitive records** from AWS to on-premise data centers with zero downtime.\n` +
      `• B.Tech in Information Technology from **G.H. Raisoni College of Engineering** (CGPA: 8.00 / 10.0).\n` +
      `• Actively open to new software engineering opportunities!`
    );
  }

  // Default friendly response
  return (
    `I'd be glad to help with that! As Shubham's AI Assistant, I can share details on:\n\n` +
    `• His **work experience** at Leadows Technologies and Qloron\n` +
    `• His **technical skills** (Node.js, React.js, PostgreSQL, MongoDB, RabbitMQ, Redis, Shopify & Shiprocket APIs)\n` +
    `• His **projects** (Inventory & Order Management, WhatsApp Flows, Data Migration)\n` +
    `• His **Agentic AI & RAG** knowledge\n` +
    `• His **education** (B.Tech in IT with 8.00 CGPA)\n\n` +
    `Feel free to click one of the suggested questions above, or ask anything specific!`
  );
}
