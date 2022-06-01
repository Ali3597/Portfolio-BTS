export function ProjectFilter({ currentFilter, changeFilter, filters, theme }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter">
      {filters.map((f) => (
        <button
          style={{ color: theme.backgroundOdd }}
          className={currentFilter == f ? "active" : ""}
          key={f}
          onClick={() => handleClick(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
