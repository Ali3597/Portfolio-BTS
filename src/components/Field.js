export function Field({
  name,
  children,
  type = "text",
  error,
  value,
  setValue,
  ...props
}) {
  return (
    <>
      {children && <label htmlFor={name}>{children}</label>}
      {type === "textarea" && (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={name}
          id={name}
          className={`form-control ${error ? `is-invalid` : ``}`}
          {...props}
        ></textarea>
      )}
      {type === "checkbox" && (
        <input
          checked={value}
          onChange={() => {
            setValue(!value);
          }}
          type={type}
          name={name}
          id={name}
          className={`form-control ${error ? `is-invalid` : ``}`}
          {...props}
        ></input>
      )}
      {type !== "checkbox" && type !== "textarea" && (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          name={name}
          id={name}
          className={`form-control ${error ? `is-invalid` : ``}`}
          {...props}
        ></input>
      )}
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
}
