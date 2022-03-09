export function ProjectFilter({ currentFilter, changeFilter, filters }) {
  const handleClick = (newFilter) => {
    console.log(newFilter);
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter">
      {filters.map((f) => (
        <button
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
