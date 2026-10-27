const words = [
  "Data cleaning",
  "Exploratory analysis",
  "Hypothesis testing",
  "Cohort & retention",
  "KPI dashboards",
  "Predictive modeling",
  "SQL",
  "dbt",
];

/** Slow, endless ticker of focus areas between the hero and the profile. */
export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-line bg-night-900 py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {row.map((w, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className={"px-8 font-serif text-3xl md:text-5xl " + (i % 2 ? "italic text-bone-dim" : "text-bone")}>
                  {w}
                </span>
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-signal" fill="currentColor">
                  <path d="M10 0l2.2 7.8L20 10l-7.8 2.2L10 20l-2.2-7.8L0 10l7.8-2.2z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
