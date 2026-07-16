import { motion } from "framer-motion";
import ProjectCard, { Project } from "./ProjectCard";

/**
 * [[PLACEHOLDER DATA — DO NOT SHIP AS-IS]]
 * These are structural placeholders only. Replace every field with Harshi's
 * real case studies (real project names, real clients if public, real
 * problem/role/process/outcome copy, real images). Do not invent project
 * names or outcomes to fill this in — add or remove entries to match the
 * number of real case studies she wants to show.
 */
const projects: Project[] = [
  {
    id: "project-1",
    title: "AcquireKeep",
    category: "Full-Stack Resource Tracking App",
    medium: "screen",
    problem: "Users faced slow data retrieval and non-responsive cross-device UI.",
    role: "Full-Stack Developer",
    process: "Architected a full-stack application using React, Next.js server-side rendering, and automated deployment pipelines via Vercel CI/CD.",
    outcome: "Accelerated data retrieval by 30% for 100+ users and achieved 40% improvement in UI responsiveness.",
    hasBeforeAfter: false,
    heroImage: "/acquirekeep main.png",
    codeLink: "https://github.com/harshisingh777/Aquirekeep",
    liveLink: "https://aquirekeep.vercel.app/",
    gallery: [
      "/Acquirekeep dashboard.png",
      "/acquirekeep Analytics.png",
      "/Acquirekeep mobile view.png",
      "/Acquirekeep viewer.png"
    ],
  },
  {
    id: "project-2",
    title: "Data Lenz (Dataset Analyzer)",
    category: "Machine Learning / Data Analysis",
    medium: "screen",
    problem: "Non-technical users spent excessive time on manual data preprocessing.",
    role: "Data Scientist / ML Engineer",
    process: "Engineered a zero-code Python/Flask ML pipeline with automated feature analysis and integrated live training progress visualizations in React.",
    outcome: "Eliminated 10 hours/week of manual data preprocessing and bolstered model transparency by 50%.",
    codeLink: "https://github.com/harshisingh777/Data-Analyse",
    liveLink: "https://data-analyse-five.vercel.app/",
    heroImage: "/dataanalyze main.png",
    gallery: [
      "/dataanalyze img1.png",
      "/dataanalyze img2.png",
      "/dataanalyze img3.png"
    ],
  },
  {
    id: "project-3",
    title: "Portfolio Maker",
    category: "Component Library & Generator",
    medium: "screen",
    problem: "High average build times for generating unique portfolio themes.",
    role: "Front-End Developer",
    process: "Architected a reusable component library with React 18 and Vue.js, implementing responsive layouts and robust state management.",
    outcome: "Reduced average build time by 50% for 45 unique themes and improved user experience quality by 35%.",
    heroImage: "/portfoliomaker main.png",
    codeLink: "https://github.com/Gauravtiwari31/Portfolio-Maker",
    liveLink: "https://gauravtiwari31.github.io/Portfolio-Maker/",
    gallery: [
      "/portfoliomaker img1.png",
      "/portfoliomaker img2.png",
      "/portfoliomaker img3.png"
    ],
  },
];

export default function Work() {
  return (
    <section id="work" className="relative px-6 py-28 md:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex items-end justify-between"
        >
          <div>
            <p className="section-number mb-3">01 — Selected Work</p>
            <h2 className="font-display text-4xl text-ink md:text-5xl">Case studies</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
