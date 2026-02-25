# SE2 Fullstack Design Decisions

Welcome to the design decisions documentation for the **SE2 Fullstack** project — an Invoice Tracker SaaS platform with a management portal.

This site documents the key architectural and technical decisions made throughout the project, organized by domain.

## 📖 Pages

- **Architecture** — System-level design decisions: monorepo structure, event-driven architecture (Kafka), identity management (Keycloak), database (PostgreSQL), object storage (MinIO), and containerized infrastructure
- **Frontends** — Frontend application decisions: Vue 3, TypeScript, Vite, Tailwind CSS, component libraries, state management (Pinia), routing, auto-generated API clients (NSwag), and authentication flows
- **Invoice Tracker API** — Backend API decisions: layered architecture, dependency injection, controller design, exception handling, JWT authentication, validation, repository pattern, and Kafka event production
- **Management API** — Admin API decisions: Minimal APIs, FluentValidation, rate limiting, endpoint organization, testing strategy, and direct DbContext access
- **Microservices** — Microservice decisions: PdfGeneratorService, EmailNotificationService, Kafka consumer patterns, HTML template-based PDF generation, MinIO storage, and shared design patterns

---

Use the **dropdown navigation** above to explore each section.
