import type { ProjectId } from "@/lib/types";

/**
 * Repository-grounded portfolio engineering notes. Keep future/target capabilities
 * explicitly distinct from implemented foundations; do not invent production use.
 */
export interface ProjectEngineering {
  status: string;
  outcome: string;
  stack: { label: string; technologies: string; purpose: string }[];
  pipeline: { label: string; description: string }[];
  decisions: { title: string; detail: string }[];
  boundary: string;
}

export const engineering: Record<ProjectId, ProjectEngineering> = {
  data: {
    status: "Multi-tenant SaaS platform · launch still in planning",
    outcome:
      "Unify customer feedback and connected signals so that teams can explore grounded findings rather than reconcile multiple dashboards manually.",
    stack: [
      {
        label: "Interface",
        technologies: "Next.js App Router · TypeScript · Tailwind CSS",
        purpose:
          "Tenant-facing dashboards, customer signals, project navigation and reporting views.",
      },
      {
        label: "API",
        technologies: "Python · FastAPI · asyncpg · SQLAlchemy · Alembic",
        purpose:
          "Tenant-aware business operations, ingestion endpoints, schema management and asynchronous database access.",
      },
      {
        label: "Data",
        technologies: "PostgreSQL · pgvector · row-level security",
        purpose:
          "Relational evidence, tenant separation and semantic retrieval over indexed content.",
      },
      {
        label: "Intelligence",
        technologies: "RAG · grounded AI workflows · source connectors",
        purpose:
          "Retrieve supporting evidence before generating analysis so findings can be traced to input signals.",
      },
      {
        label: "Realtime",
        technologies: "PostgreSQL NOTIFY · server-sent events · event catch-up",
        purpose:
          "Deliver tenant-scoped updates with reconnection and replay semantics.",
      },
      {
        label: "Operations",
        technologies:
          "Docker Compose · JWT/RBAC · n8n boundaries · SQS (production design)",
        purpose:
          "Development reproducibility, scoped permissions and clear boundaries for asynchronous integrations.",
      },
    ],
    pipeline: [
      {
        label: "Collect",
        description:
          "Receive customer feedback and connected source data through bounded ingestion adapters.",
      },
      {
        label: "Isolate & persist",
        description:
          "Validate tenant context, persist the evidence and maintain relational relationships for retrieval.",
      },
      {
        label: "Retrieve & analyze",
        description:
          "Use semantic search and source-aware RAG so generated findings reference supporting signals.",
      },
      {
        label: "Present & stream",
        description:
          "Show results through dashboards, reporting views and tenant-scoped realtime updates.",
      },
    ],
    decisions: [
      {
        title: "Tenant boundaries first",
        detail:
          "Row-level security and role-aware APIs are core architecture decisions, not visual-only workspace separation.",
      },
      {
        title: "Evidence before insight",
        detail:
          "Retrieval is used to give AI analysis relevant context; results should not be presented as verified outcomes without supporting records.",
      },
      {
        title: "Recoverable realtime",
        detail:
          "Event IDs and reconnection support let interfaces catch up after a temporary network interruption.",
      },
    ],
    boundary:
      "The portfolio screenshots and recording demonstrate the interface; launch and commercial adoption are not claimed. SQS is a production-oriented design boundary, not proof of live infrastructure.",
  },
  outreach: {
    status: "Local end-to-end verified MVP · not live bulk sending",
    outcome:
      "Structure commercial real-estate outreach so research, AI drafting, operator approval and deliverability controls remain visible and auditable.",
    stack: [
      {
        label: "Frontend",
        technologies: "Next.js App Router · Clerk authentication",
        purpose:
          "Operator console for contacts, prospects, campaigns, drafts, approvals and outcomes.",
      },
      {
        label: "Backend",
        technologies: "Python 3.12 · FastAPI · REST · server-sent events",
        purpose:
          "Tenant-scoped API authorization, workflow gates, audit trails and operational updates.",
      },
      {
        label: "Persistence",
        technologies: "PostgreSQL 16 · pgvector · forced RLS",
        purpose:
          "Tenant-separated campaigns, research, evidence, statuses and retrieval context.",
      },
      {
        label: "Execution",
        technologies: "PostgreSQL job queue · opt-in worker · Redis 7",
        purpose:
          "Controlled background jobs, rate limiting and delivery state.",
      },
      {
        label: "Automation",
        technologies: "LangGraph · n8n · grounded AI generation",
        purpose:
          "Research, enrichment, draft orchestration and explicit human review checkpoints.",
      },
      {
        label: "Providers",
        technologies: "Signed webhooks · Resend boundary · Stripe test-mode",
        purpose:
          "Fail-closed connections for email and billing; unapproved live provider operations stay disabled.",
      },
    ],
    pipeline: [
      {
        label: "Qualify",
        description:
          "Import or identify prospects, check suppression rules and retain tenant context.",
      },
      {
        label: "Research",
        description:
          "Enrich records, gather relevant supporting material and validate source grounding.",
      },
      {
        label: "Draft & review",
        description:
          "Generate candidate messages, run safeguards and queue them for operator approval.",
      },
      {
        label: "Gate & observe",
        description:
          "Apply compliance and send gates, capture audit evidence and expose delivery/reply signals where configured.",
      },
    ],
    decisions: [
      {
        title: "Human in the loop",
        detail:
          "Draft generation is separated from dispatch; the model does not directly authorize outbound messaging.",
      },
      {
        title: "Provider fail-closed",
        detail:
          "Missing credentials or unapproved integrations cannot silently become real sends.",
      },
      {
        title: "Reproducible local architecture",
        detail:
          "Docker Compose supports database, Redis, API, frontend, optional worker and n8n for verified local workflows.",
      },
    ],
    boundary:
      "Local E2E verification does not imply production deployment, live billing, provider activation, or automated bulk sending. The cover art illustrates workflow intent.",
  },
  support: {
    status: "Phase 0C foundation · not production-ready",
    outcome:
      "Build one governed platform for future cross-channel customer support, with continuity, tenant access controls and audit-ready interactions.",
    stack: [
      {
        label: "Web app",
        technologies: "Next.js 16 · React · pnpm workspaces · Turborepo",
        purpose: "Separate interface package and frontend build pipeline.",
      },
      {
        label: "Service core",
        technologies: "Python 3.12+ · FastAPI · Pydantic v2 · structlog",
        purpose:
          "A modular domain-centric backend for API contracts, structured validation and logs.",
      },
      {
        label: "Persistence",
        technologies:
          "PostgreSQL 16 · pgvector · SQLAlchemy 2 · Alembic · psycopg 3",
        purpose:
          "Tenant-scoped records, migrations and future memory/retrieval foundations.",
      },
      {
        label: "Processes",
        technologies: "API · worker · scheduler · voice gateway",
        purpose:
          "Four deployment entry points sharing one Python image, each with a narrow responsibility.",
      },
      {
        label: "Security",
        technologies:
          "Forced RLS · identity and authorization · CI security gates",
        purpose:
          "Least-privilege data access and auditable boundaries before channel activation.",
      },
      {
        label: "Development",
        technologies: "Docker Compose · health/readiness · contract tests",
        purpose:
          "Consistent local orchestration and verification of service boundaries.",
      },
    ],
    pipeline: [
      {
        label: "Establish identity",
        description:
          "Resolve tenant, workforce authorization and end-customer identifiers without crossing account boundaries.",
      },
      {
        label: "Record interaction",
        description:
          "Accept foundational session and interaction evidence in a controlled domain model.",
      },
      {
        label: "Track opportunities",
        description:
          "Represent non-contacting action opportunities and domain events for later governed automation.",
      },
      {
        label: "Extend safely",
        description:
          "Keep future chat, voice, callback, ticket and email adapters behind explicit guardrail contracts.",
      },
    ],
    decisions: [
      {
        title: "Modular monolith",
        detail:
          "Share one Python package across different service processes to avoid premature network service complexity.",
      },
      {
        title: "Model proposes; guards dispose",
        detail:
          "The future AI boundary makes any outward action subject to authorization and policy enforcement.",
      },
      {
        title: "Foundation before channels",
        detail:
          "Identity, interactions, domain events and forced RLS precede live provider or channel features.",
      },
    ],
    boundary:
      "The nine portfolio UI visuals illustrate intended screens. The repository explicitly says no live channels, model features or external providers are implemented yet.",
  },
  sentinel: {
    status: "Full-stack local vision AI project · screenshots are examples",
    outcome:
      "Turn images, camera input and extracted video frames into reviewable incident evidence, risk trends and context for an operator.",
    stack: [
      {
        label: "Frontend",
        technologies:
          "React 18 · React Router · Vite 5 · Tailwind CSS · Recharts",
        purpose:
          "Incident dashboard, uploads, live monitor, risk trend charts and settings.",
      },
      {
        label: "Backend",
        technologies: "Java 21 · Spring Boot 3.4 · Maven",
        purpose:
          "API orchestration, frame analysis requests, incident records and classification flow.",
      },
      {
        label: "Data",
        technologies: "PostgreSQL · Redis",
        purpose:
          "Persist incident records while caching temporary frames for analysis.",
      },
      {
        label: "Local inference",
        technologies: "LM Studio API · Qwen3-VL-4B",
        purpose:
          "Local vision model inference without depending on a hosted cloud vision endpoint.",
      },
      {
        label: "Media",
        technologies: "FFmpeg",
        purpose:
          "Extract image frames from uploaded video so the inference layer can evaluate them.",
      },
    ],
    pipeline: [
      {
        label: "Capture",
        description: "Accept an image, uploaded video or webcam snapshot.",
      },
      {
        label: "Extract & cache",
        description:
          "Extract frames with FFmpeg and keep temporary frame data in Redis.",
      },
      {
        label: "Analyze",
        description:
          "Send selected frames to the locally hosted vision model and derive risk observations.",
      },
      {
        label: "Review",
        description:
          "Show categorized incidents, supporting frames, dashboard charts and alerts for human review.",
      },
    ],
    decisions: [
      {
        title: "Privacy-oriented inference",
        detail:
          "LM Studio keeps the AI model available locally rather than routing image content through a default public model API.",
      },
      {
        title: "Separate transient media",
        detail:
          "Redis caches frames for short-lived processing; incident evidence and metadata live in persistent storage.",
      },
      {
        title: "Reviewable evidence",
        detail:
          "Operators should be able to inspect incidents and trend context rather than trust a single raw model classification.",
      },
    ],
    boundary:
      "The sample incidents and UI do not establish model accuracy, continuously running production monitoring, or independent validation of detection quality.",
  },
  insurance: {
    status: "Phase 0C / Slice 2 foundation · fixture-only verification",
    outcome:
      "Make future insurance policy workflows verifiable through explicit evidence, jurisdiction and publication controls.",
    stack: [
      {
        label: "API",
        technologies: "Python · FastAPI · modular monolith",
        purpose:
          "Define evidence and configuration domain boundaries without prematurely activating product workflows.",
      },
      {
        label: "Database",
        technologies: "PostgreSQL · SQLAlchemy · Alembic",
        purpose:
          "Schema history for ledger records and fourteen additional product/policy/jurisdiction configuration tables.",
      },
      {
        label: "Verification",
        technologies:
          "Append-only evidence ledger · cryptographic checkpoints · offline verifier",
        purpose:
          "Enable independent, database-free verification of known-value evidence chains.",
      },
      {
        label: "Frontend",
        technologies: "Minimal Next.js foundation",
        purpose:
          "Provides a future interface shell rather than a working insurance product.",
      },
      {
        label: "Local operations",
        technologies: "Local immutable-storage fixture · automated tests",
        purpose:
          "Validate publication and evidence contracts without representing local fixtures as production records.",
      },
    ],
    pipeline: [
      {
        label: "Define configuration",
        description:
          "Model product, policy and jurisdiction settings with bounded publication rules.",
      },
      {
        label: "Anchor evidence",
        description:
          "Record ledger-linked evidence for test publication decisions.",
      },
      {
        label: "Prove integrity",
        description:
          "Use frozen test vectors and an independent verifier to detect evidence chain discrepancies.",
      },
      {
        label: "Defer activation",
        description:
          "Keep insurance workflows, provider actions and production deployment outside the verified baseline.",
      },
    ],
    decisions: [
      {
        title: "Auditable foundations",
        detail:
          "Evidence integrity and configuration governance are established before a UI can execute insurance operations.",
      },
      {
        title: "Independent verification",
        detail:
          "The verifier deliberately works without a live database or network connection.",
      },
    ],
    boundary:
      "No insurance product workflow, contact action, live provider, pilot or production capability is implemented or authorized in the documented baseline.",
  },
  sourcing: {
    status:
      "Phase 0B tenancy and evidence foundation · product flows unimplemented",
    outcome:
      "Support importers with traceable supplier and quality evidence while keeping buyer authorization and money-release authority separate.",
    stack: [
      {
        label: "Backend",
        technologies: "Python · FastAPI · modular monolith",
        purpose:
          "Domain rules for tenancy, quality evidence, and policy-independent persistence.",
      },
      {
        label: "Frontend",
        technologies: "Next.js App Router",
        purpose: "A minimal shell for future evidence review and workflows.",
      },
      {
        label: "Data",
        technologies: "PostgreSQL 16 · Alembic · RLS · outbox and durable jobs",
        purpose:
          "Tenant isolation, append-only evidence and reliable transactional job boundaries.",
      },
      {
        label: "Evidence",
        technologies:
          "S3-compatible storage interface · P-256 signatures · offline verifier",
        purpose:
          "Store evidence, create cryptographic checkpoints and independently verify fixture chains.",
      },
      {
        label: "Development",
        technologies: "Docker Compose · deterministic fixtures",
        purpose:
          "Repeatable local verification without claiming live cloud services.",
      },
    ],
    pipeline: [
      {
        label: "Define standards",
        description:
          "Represent buyer requirements, written quality expectations and counterparties.",
      },
      {
        label: "Preserve evidence",
        description:
          "Store evidence metadata and cryptographically anchored records with tenant context.",
      },
      {
        label: "Verify checkpoints",
        description:
          "Check signed evidence chains independently using the standalone verifier.",
      },
      {
        label: "Reserve buyer control",
        description:
          "Design authorization boundaries that do not empower the platform to release the buyer's balance.",
      },
    ],
    decisions: [
      {
        title: "Tenant separation",
        detail:
          "Forced RLS and scoped repository contexts are part of the foundation for sensitive supplier records.",
      },
      {
        title: "Evidence must outlive workflows",
        detail:
          "Append-only records and independently verifiable checkpoints are treated as foundational properties.",
      },
    ],
    boundary:
      "Default-branch documentation confirms Phase 0B only; supplier product workflows, production adapters and cloud deployment are not demonstrated.",
  },
  divorce: {
    status: "Privacy-first preparation product · Phase 2B work in progress",
    outcome:
      "Offer an organized, educational preparation experience while keeping legal advice, sensitive documents and privacy guarantees inside explicit boundaries.",
    stack: [
      {
        label: "Web experience",
        technologies: "Next.js · React · browser-driven tests",
        purpose:
          "Guided roadmaps, checklists, preparation tools and accessible interactions.",
      },
      {
        label: "Backend",
        technologies: "Python · PostgreSQL",
        purpose:
          "Bounded service and persistence foundation for education and organizational workflows.",
      },
      {
        label: "Verification",
        technologies: "Playwright · Chromium · Firefox · WebKit",
        purpose:
          "Cross-engine automated browser testing and regression evidence.",
      },
      {
        label: "Planned privacy boundary",
        technologies: "Optional client-side encrypted zero-knowledge vault",
        purpose:
          "Design contract for browser encryption and ciphertext-only storage; uploads and vault routes are disabled.",
      },
    ],
    pipeline: [
      {
        label: "Orient",
        description:
          "Help users organize next steps through an educational guided roadmap.",
      },
      {
        label: "Prepare",
        description:
          "Structure checklists, financial tools and attorney questions without making legal decisions for users.",
      },
      {
        label: "Protect",
        description:
          "Minimize data collection and define explicit future vault encryption and deletion responsibilities.",
      },
      {
        label: "Verify",
        description:
          "Run browser-engine checks and governance reviews before expanding product scope.",
      },
    ],
    decisions: [
      {
        title: "No legal-advice boundary crossing",
        detail:
          "Product content must remain organizational and educational, rather than instructing someone about legal strategy.",
      },
      {
        title: "Privacy as an architecture contract",
        detail:
          "The future vault is designed for encryption in the browser and server-side ciphertext storage, but it is not yet implemented.",
      },
    ],
    boundary:
      "Phase 2B remains in progress. No active vault route, document uploads, independent legal/privacy approval or production activation is claimed.",
  },
  aitest: {
    status: "Repository workspace initialized · application scope undecided",
    outcome:
      "A reserved engineering workspace for an application whose requirements and system design have not yet been recorded.",
    stack: [
      {
        label: "Repository",
        technologies: "GitHub · README · repository ownership configuration",
        purpose:
          "Track a project namespace and provide a place for design decisions when work begins.",
      },
    ],
    pipeline: [
      {
        label: "Establish scope",
        description:
          "Define the intended users, problem and measurable product requirements before a stack is selected.",
      },
      {
        label: "Document choices",
        description:
          "Record architecture and development milestones once implementation begins.",
      },
    ],
    decisions: [
      {
        title: "No invented implementation",
        detail:
          "Leaving stack and capabilities unspecified is more accurate than turning an empty workspace into a fictional system.",
      },
    ],
    boundary:
      "No verified application code, runtime technology, deployment or product behavior exists in the accessible README.",
  },
};
