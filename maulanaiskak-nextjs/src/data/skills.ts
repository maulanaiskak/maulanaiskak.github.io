import { Skill } from '../types';

export const skills: Skill[] = [
  {
    category: "Core Competencies",
    items: [
      { name: "Distributed Systems", level: 90 },
      { name: "Event-Driven Architecture", level: 90 },
      { name: "Microservices", level: 88 },
      { name: "Idempotency & Saga Patterns", level: 85 },
      { name: "Distributed Transaction Patterns", level: 85 },
      { name: "Multi-chain Integration", level: 80 },
    ]
  },
  {
    category: "Programming Languages",
    items: [
      { name: "Java", level: 90 },
      { name: "Go", level: 75 },
      { name: "SQL", level: 85 },
      { name: "Python", level: 65 },
    ]
  },
  {
    category: "Frameworks",
    items: [
      { name: "Spring Boot", level: 90 },
      { name: "Spring Data JPA / Hibernate", level: 85 },
      { name: "Gin", level: 75 },
    ]
  },
  {
    category: "Data & Messaging",
    items: [
      { name: "PostgreSQL", level: 88 },
      { name: "Redis", level: 82 },
      { name: "Pub/Sub", level: 85 },
      { name: "GCP Datastore", level: 70 },
    ]
  },
  {
    category: "Infrastructure & Tools",
    items: [
      { name: "Google Cloud Platform", level: 85 },
      { name: "Kubernetes", level: 72 },
      { name: "Docker", level: 78 },
      { name: "Datadog", level: 72 },
      { name: "Git", level: 90 },
    ]
  },
  {
    category: "Languages",
    items: [
      { name: "Indonesian", level: 100, note: "Native" },
      { name: "English", level: 85, note: "Professional" },
      { name: "Japanese", level: 35, note: "JLPT N4" },
    ]
  },
  {
    category: "Certifications",
    items: [
      {
        name: "Google Cloud Certified Professional Cloud Architect",
        level: 100,
        link: "https://www.credly.com/badges/ff058f44-ec1e-4757-89a7-e6337e249e6c/linked_in_profile"
      }
    ]
  }
];
