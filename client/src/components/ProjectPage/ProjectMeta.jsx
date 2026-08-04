// src/components/ProjectPage/ProjectMeta.jsx
//
// The facts row that sits under a case-study title: four top-lit cards, each
// a quiet uppercase label over a single value. It reads as a specification
// rather than decoration, which is why it works — every cell carries a real
// fact, so don't pad it to four if there are only three.
//
//   <ProjectMeta items={[{ label: "Client", value: "Tab Studio" }, …]} />

const ProjectMeta = ({ items = [], className = "" }) => {
  if (!items.length) return null;

  return (
    <div
      className={`grid grid-cols-2 gap-3 sm:gap-4 ${
        items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4"
      } ${className}`}
    >
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="card-surface flex flex-col items-center justify-center gap-1.5 px-4 py-6 text-center sm:px-6 sm:py-7"
        >
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/30 sm:text-[11px]">
            {label}
          </span>
          <span className="text-[14px] leading-snug text-white sm:text-[15px]">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProjectMeta;
