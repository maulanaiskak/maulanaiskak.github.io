import { Project } from '../types';

export const projects: Project[] = [
  {
    title: "Web3 Trading & Settlement System",
    description: "Owned the multi-chain trading and settlement backend across 4 blockchains (Solana + EVM), with secure transaction execution, automatic failure recovery, sponsored gas covering user fees, and risk screening across 170K+ on-chain tokens.",
    technologies: ["Java", "Spring Boot", "Solana", "EVM", "GCP", "Pub/Sub", "PostgreSQL"],
    image: "wallet.png",
    highlights: [
      "Supports 4 blockchains: Solana, Base, Ethereum, BSC",
      "Sponsored gas covers user transaction fees automatically",
      "Risk screening across 170K+ on-chain tokens",
      "Automatic failure recovery with compensation-based rollback"
    ]
  },
  {
    title: "KYC Async Verification Pipeline",
    description: "Redesigned a synchronous, vendor-coupled KYC flow into an async event-driven pipeline on Pub/Sub with multi-stage fallback logic — eliminating cascading timeout failures from upstream vendor latency spikes and cutting false rejections by ~40%.",
    technologies: ["Java", "Spring Boot", "GCP Pub/Sub", "PostgreSQL"],
    image: "kyc.png",
    highlights: [
      "Reduced KYC false rejections by ~40%",
      "Eliminated cascading timeouts via async Pub/Sub pipeline",
      "Multi-stage fallback prevents single point of failure",
      "Decoupled from vendor latency for high-volume onboarding"
    ]
  },
  {
    title: "Self-Service 2FA Reset Flow",
    description: "Built a self-service 2FA reset flow with layered identity verification — allowing users to recover accounts without login while protecting against account takeover. Reduced 2FA-related support tickets by ~78% and cut manual operational workload.",
    technologies: ["Java", "Spring Boot", "JWT", "PostgreSQL"],
    image: "auth.png",
    highlights: [
      "Reduced 2FA support tickets by ~78%",
      "Layered identity verification blocks account takeover",
      "No login required for account recovery",
      "Comprehensive audit logging for compliance"
    ]
  },
  {
    title: "User Tiering Pipeline (5M Users)",
    description: "Built a daily pipeline that aggregates trading volume across microservices via Pub/Sub, combines it with AUM data, and maintains monthly-reset cumulative totals for ~5M users to drive tiering classifications.",
    technologies: ["Java", "Spring Boot", "GCP Pub/Sub", "PostgreSQL", "Redis"],
    image: "tiering.png",
    highlights: [
      "Processes ~5M users daily across microservices",
      "Aggregates trading volume + AUM via Pub/Sub",
      "Monthly-reset cumulative totals with concurrency tuning",
      "Resolved critical throughput bottlenecks under load"
    ]
  },
  {
    title: "Zero-Downtime NoSQL → SQL Migration",
    description: "Ran a zero-downtime migration from GCP Datastore (NoSQL) to PostgreSQL with foreign-key constraints — using staged backfill, dual-write synchronization, and validation to resolve integrity issues from the schemaless source.",
    technologies: ["Java", "PostgreSQL", "GCP Datastore", "Spring Boot"],
    image: "migration.png",
    highlights: [
      "Zero service downtime throughout the migration",
      "Dual-write pattern with staged backfill",
      "Resolved integrity issues from schemaless Datastore source",
      "Foreign-key constraints enforced post-cutover"
    ]
  },
  {
    title: "Alerta — Incident Management System",
    description: "Built an incident management backend in Go for TechConnect (Sinarmas Group), integrating Slack, Jira, and Confluence with webhook-based alert ingestion, rule-based routing, and time-based escalation workflows with retry handling.",
    technologies: ["Golang", "Kubernetes", "GCP", "Slack API", "Jira API", "Confluence API"],
    image: "alerta.png",
    highlights: [
      "Webhook-based alert ingestion with rule-based routing",
      "Time-based escalation workflows with retry handling",
      "Integrations with Slack, Jira, and Confluence",
      "Deployed on Kubernetes with Helm"
    ]
  },
  {
    title: "Angkat Tani — Agricultural Support",
    description: "Built as part of Bangkit Academy, an app that helps Indonesian farmers predict crop prices and detect plant diseases from leaf photos using machine learning — available as Android and web applications.",
    technologies: ["Python", "Google Cloud Platform", "Machine Learning", "Android"],
    image: "angkat-tani.png",
    highlights: [
      "Crop price prediction from historical data",
      "Plant disease detection from leaf photos via ML",
      "Available on Android and web",
      "Helps farmers plan planting and treatment decisions"
    ]
  }
];
