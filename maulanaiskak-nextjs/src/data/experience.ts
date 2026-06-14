import { Experience } from '../types';

export const experience: Experience[] = [
  {
    company: "Nanovest",
    location: "Jakarta, Indonesia",
    position: "Senior Backend Engineer",
    period: "Jul 2025 - Present",
    responsibilities: [
      {
        period: "Asset Team",
        description: "Nanovest is a regulated digital asset marketplace providing retail investors in Indonesia with access to US equities, cryptocurrencies, gold, and blockchain-based staking products."
      }
    ],
    projectsAndAchievements: [
      "Owned the Web3 trading and settlement system across 4 blockchains on Solana and EVM, with secure transaction execution, automatic failure recovery, and sponsored gas covering user transaction fees, plus risk screening across 170K+ on-chain tokens",
      "Reduced market data subscription costs by ~30% by batching on-demand refreshes for stale symbols into consolidated API calls, cutting redundant per-symbol requests to the data provider",
      "Built the reporting service for a regulatory migration, reconciling filings against the prior regulator's system to confirm accuracy before cutover, with idempotent controls guarding against duplicate submissions",
      "Mentored engineering interns through production code reviews and backend system design discussions, supporting their ramp-up into independently delivering production features"
    ],
    tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "GCP", "Pub/Sub", "Solana", "EVM", "Datadog"]
  },
  {
    company: "Nanovest",
    location: "Jakarta, Indonesia",
    position: "Backend Engineer",
    period: "May 2023 - Jun 2025",
    responsibilities: [
      {
        period: "Account Security Team",
        description: "Focused on the account and identity domain, handling authentication, KYC, fraud detection, and risk management."
      }
    ],
    projectsAndAchievements: [
      "Cut KYC false rejections by ~40% by redesigning a synchronous vendor-coupled verification flow into an async, event-driven pipeline on Pub/Sub with multi-stage fallback logic, removing cascading timeout failures caused by upstream vendor latency spikes",
      "Reduced 2FA-related support tickets by ~78% by building a self-service 2FA reset flow with layered identity verification, cutting manual operational workload while protecting against account takeover",
      "Built a daily user tiering pipeline that aggregates trading volume across microservices via Pub/Sub, combines it with AUM data, and maintains monthly-reset cumulative totals for ~5M users",
      "Ran a zero-downtime migration from Datastore (NoSQL) to PostgreSQL with foreign-key constraints using staged backfill, dual-write synchronization, and validation to resolve integrity issues from the schemaless source"
    ],
    tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "GCP", "Pub/Sub", "Datastore"]
  },
  {
    company: "TechConnect (Sinarmas Group)",
    location: "Jakarta, Indonesia",
    position: "IT Development Program — Software Engineer",
    period: "May 2022 - Apr 2023",
    responsibilities: [
      {
        period: "Software Engineer",
        description: "TechConnect is the enterprise technology arm of Sinarmas Mining, one of Indonesia's largest conglomerates, operating across financial services, agribusiness, and infrastructure."
      }
    ],
    projectsAndAchievements: [
      "Built an incident management backend in Go, integrating Slack, Jira, and Confluence, with webhook-based alert ingestion, rule-based routing, and time-based escalation workflows with retry handling",
      "Contributed to account microservices covering user authentication, profile management, and access control — delivered new features, fixed production issues, and participated in code reviews within a cross-functional team"
    ],
    tech: ["Golang", "Kubernetes", "GCP", "Docker", "Slack API", "Jira API", "Confluence API"]
  },
  {
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    location: "Remote",
    position: "Cloud Computing Learning Path",
    period: "Feb 2021 - Jul 2021",
    responsibilities: [
      {
        period: "2021",
        description: "Selected cohort program co-organized by Google, Tokopedia, Gojek, and Traveloka — completed the Cloud Computing learning path focusing on GCP-based application deployment and operations."
      }
    ],
    projectsAndAchievements: [
      "Built Angkat Tani, an agricultural support app for Indonesian farmers with ML-based crop price prediction and plant disease detection from leaf photos",
      "Gained hands-on experience with GCP services, cloud architecture, and Python-based automation"
    ],
    tech: ["Python", "Google Cloud Platform", "Machine Learning"]
  }
];
