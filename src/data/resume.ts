// Single source of truth for portfolio copy — mirrors Harshi's resume.

export const profile = {
  name: "Harshi Singh",
  role: "Data Analyst",
  location: "Prayagraj, Uttar Pradesh, India",
  phone: "+91-9161423095",
  email: "harshisingh2609@gmail.com",
  linkedin: "https://www.linkedin.com/in/harshi-singh-9a1713332/",
  github: "https://github.com/harshisingh777",
  summary:
    "Data Science undergraduate skilled in Python, SQL and statistics, with hands-on projects in data cleaning, exploratory data analysis (EDA), hypothesis testing, cohort and retention analysis, KPI dashboards and predictive modeling.",
};

export const headlineStats = [
  { value: 334, prefix: "#", suffix: "", label: "of 27,000+ teams — Amazon ML Challenge 2026" },
  { value: 1.06, prefix: "", suffix: "M+", decimals: 2, label: "transaction rows modeled with dbt" },
  { value: 0.89, prefix: "", suffix: "", decimals: 2, label: "ROC AUC on the DataLens churn model" },
  { value: 97, prefix: "", suffix: "", label: "automated tests · 93% coverage" },
];

export type Shot =
  | { kind: "image"; src: string; label: string; url: string }
  | { kind: "mock"; mock: string; label: string; url: string };

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  stack: string[];
  live?: string;
  code: string;
  metrics: { value: string; label: string }[];
  bullets: string[];
  shots: Shot[];
  mobileShot?: string;
  note?: string;
}

export const projects: Project[] = [
  {
    id: "datalens",
    index: "01",
    title: "DataLens",
    subtitle: "Data analytics & AutoML workbench",
    stack: ["Python", "Pandas", "SciPy", "scikit-learn", "SQL", "Flask", "Chart.js"],
    live: "https://data-analyse-five.vercel.app/",
    code: "https://github.com/harshisingh777/Data-Analyse",
    metrics: [
      { value: "86%", label: "churn accuracy" },
      { value: "0.89", label: "ROC AUC" },
      { value: "0.92", label: "R² house prices" },
      { value: "93%", label: "test coverage" },
    ],
    bullets: [
      "Profiles any CSV/Excel dataset: automated data cleaning, EDA, missing-value and outlier analysis (IQR), correlation analysis and a weighted 0–100 data quality score.",
      "Statistical hypothesis testing (ANOVA, chi-square, Pearson/Spearman) with effect sizes and Benjamini–Hochberg FDR correction to find the significant drivers of a target metric.",
      "Automated predictive modeling: 5 algorithms compared with 5-fold cross-validation, hyperparameter tuning and permutation feature importance.",
      "Read-only SQL editor (CTEs, window functions), interactive visualizations and one-click HTML reports — 97 automated tests and CI/CD via GitHub Actions.",
    ],
    shots: [
      { kind: "image", src: "/projects/datalens-overview.webp", label: "Overview", url: "data-analyse-five.vercel.app/#/overview" },
      { kind: "image", src: "/projects/datalens-statistics.webp", label: "Hypothesis tests", url: "data-analyse-five.vercel.app/#/statistics" },
      { kind: "image", src: "/projects/datalens-model.webp", label: "AutoML", url: "data-analyse-five.vercel.app/#/model" },
      { kind: "image", src: "/projects/datalens-correlations.webp", label: "Correlations", url: "data-analyse-five.vercel.app/#/correlations" },
      { kind: "image", src: "/projects/datalens-sql.webp", label: "SQL editor", url: "data-analyse-five.vercel.app/#/sql" },
    ],
  },
  {
    id: "cohort",
    index: "02",
    title: "Customer Cohort & Retention Analytics",
    subtitle: "ELT pipeline, dbt marts & KPI dashboards",
    stack: ["Python", "SQL", "PostgreSQL", "dbt", "FastAPI", "Next.js"],
    code: "https://github.com/harshisingh777/Customer_Cohort_Retention_Analysis",
    metrics: [
      { value: "1.06M+", label: "transaction rows" },
      { value: "5,852", label: "customers" },
      { value: "24", label: "monthly cohorts" },
      { value: "100%", label: "SQL ↔ Pandas match" },
    ],
    bullets: [
      "ELT pipeline with idempotent ingestion and dbt models turning 1.06M+ transaction rows into cohort marts for 5,852 customers across 24 monthly cohorts.",
      "Validated SQL cohort models against an independent Pandas computation — 100% match across 300 cells — plus dbt data-quality tests and revenue reconciliation before each atomic publish.",
      "KPI dashboards for LTV, CAC, LTV:CAC, payback period and RFM segmentation, served by a cached FastAPI REST API.",
    ],
    shots: [
      { kind: "image", src: "/projects/cohort-overview.webp", label: "Retention heatmap", url: "retention-analytics · /dashboard" },
      { kind: "image", src: "/projects/cohort-curves.webp", label: "Retention curves", url: "retention-analytics · /cohorts" },
      { kind: "image", src: "/projects/cohort-rfm.webp", label: "RFM segments", url: "retention-analytics · /rfm" },
    ],
    mobileShot: "/projects/cohort-mobile.webp",
  },
  {
    id: "amazon-ml",
    index: "03",
    title: "Amazon ML Challenge 2026",
    subtitle: "Entity resolution at 2.2M-entity scale",
    stack: ["Python", "LightGBM", "Transformers", "TF-IDF"],
    code: "https://github.com/Gauravtiwari31/Ship_It_Friday_amazon_MLC_26",
    metrics: [
      { value: "#334", label: "of 27,000+ teams" },
      { value: "2.2M", label: "entities matched" },
      { value: "4.77", label: "pairs per entity" },
      { value: "0.987", label: "final score" },
    ],
    bullets: [
      "Team of 4. Matched noisy business records (India, US, France) to 2.2M entities, cutting candidates to 4.77 pairs per entity without losing recall via TF-IDF blocking, a fine-tuned e5 bi-encoder and a learned LightGBM filter.",
      "Scored pairs with a cross-fitted 3-stage LightGBM cascade and 3 fine-tuned cross-encoders; handled France, which had no labels, with a model chain validated leave-one-country-out.",
    ],
    shots: [
      { kind: "mock", mock: "amazon-pipeline", label: "Pipeline", url: "notebook · candidate_generation.ipynb" },
      { kind: "mock", mock: "amazon-loco", label: "Validation", url: "notebook · leave_one_country_out.ipynb" },
      { kind: "mock", mock: "amazon-rank", label: "Leaderboard", url: "amazon-ml-challenge · final standings" },
    ],
    note: "Visualised from the team's pipeline — no public live demo.",
  },
  {
    id: "acquirekeep",
    index: "04",
    title: "AcquireKeep",
    subtitle: "Resource tracking app",
    stack: ["React", "Next.js", "REST APIs", "Tailwind CSS"],
    code: "https://github.com/harshisingh777/Aquirekeep",
    metrics: [
      { value: "SSR", label: "Next.js rendering" },
      { value: "REST", label: "lean API payloads" },
    ],
    bullets: [
      "Responsive resource tracking application using server-side rendering (SSR) in Next.js, with optimized REST API payloads to reduce data transfer per page load.",
    ],
    shots: [
      { kind: "mock", mock: "ak-dashboard", label: "Dashboard", url: "acquirekeep · /dashboard" },
      { kind: "mock", mock: "ak-resources", label: "Resources", url: "acquirekeep · /resources" },
    ],
    note: "Interface recreated with sample data — no public live demo.",
  },
];

export const journey = [
  {
    id: "school",
    kind: "Education",
    title: "M V Convent Inter College",
    detail: "Higher Secondary (Class XII), Science Stream",
    place: "Prayagraj, Uttar Pradesh",
    start: "2023-03",
    end: "2023-06",
    when: "2023",
  },
  {
    id: "aktu",
    kind: "Education",
    title: "United Institute of Technology (AKTU)",
    detail: "B.Tech. in Computer Science (Data Science)",
    place: "Prayagraj, Uttar Pradesh",
    start: "2024-08",
    end: "2028-05",
    when: "Aug 2024 — May 2028",
  },
  {
    id: "iit",
    kind: "Education",
    title: "Indian Institute of Technology (IIT) Mandi",
    detail: "Minor in Computer Science",
    place: "Online",
    start: "2025-08",
    end: "2026-08",
    when: "Aug 2025 — Aug 2026",
  },
  {
    id: "neeyat",
    kind: "Experience",
    title: "Neeyat AI",
    detail: "Technical Project Manager & Engineering Intern",
    place: "Remote",
    start: "2026-03",
    end: "2026-04",
    when: "Mar 2026 — Apr 2026",
    bullets: [
      "Defined product requirements and prioritized features for a cloud-native MCP (Model Context Protocol) server powering an AI-driven load testing MVP.",
      "Converted the product roadmap into an Agile sprint backlog with acceptance criteria; ran daily stand-ups and tracked delivery across engineering stakeholders.",
    ],
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "SQL", "JavaScript"] },
  {
    group: "Data Analysis",
    items: ["Pandas", "NumPy", "SciPy", "Data Cleaning", "EDA", "Data Modeling", "Data Quality Testing", "ETL/ELT Pipelines"],
  },
  {
    group: "Statistics & ML",
    items: ["Hypothesis Testing", "ANOVA", "Chi-Square", "Regression", "Classification", "scikit-learn", "LightGBM"],
  },
  {
    group: "Business Analytics",
    items: ["Cohort Analysis", "Customer Retention", "RFM Segmentation", "LTV / CAC", "KPI Dashboards", "Data Visualization"],
  },
  {
    group: "Databases & Tools",
    items: ["PostgreSQL", "SQLite", "dbt", "Flask", "FastAPI", "React", "Next.js", "Git", "GitHub Actions (CI/CD)", "Jupyter Notebook"],
  },
];

export const certification = {
  title: "AI and Python Certification",
  issuer: "Udemy",
  href: "https://drive.google.com/file/d/1Mz82DKyW-WreR5UbnUftk2MnK4kbpIuB/view?usp=sharing",
};
