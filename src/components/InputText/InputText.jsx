/* eslint-disable react/prop-types */

export const InputText = ({
  label,
  value,
  onChanche,
  required,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="col-12 col-md-5">
      <label className="form-label mb-1" htmlFor="titulo">
        {label}
      </label>
      <input
        value={value}
        onChange={onChanche}
        required={required}
        className="form-control"
        type={type}
        min={1}
        placeholder={placeholder}
      />
    </div>
  );
};
