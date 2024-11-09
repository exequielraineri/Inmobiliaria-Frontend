/* eslint-disable react/prop-types */

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

// export const InputText = ({
//   label,
//   value,
//   onChanche,
//   required,
//   type = "text",
//   placeholder,
// }) => {
//   return (
//     <div className="col-12 col-md-5">
//       <label className="form-label mb-1" htmlFor="titulo">
//         {label}
//       </label>
//       <input
//         value={value}
//         onChange={onChanche}
//         required={required}
//         className="form-control"
//         type={type}
//         min={1}
//         placeholder={placeholder}
//       />
//     </div>
//   );
// };

export const InputText = ({
  className,
  label,
  value,
  onChange,
  required,
  type,
  placeholder,
  multiline,
  helperText,
  rows,
  fullWidth,
  min,
}) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Limita el valor mínimo
    if (type === "number" && min !== undefined && inputValue < min) {
      e.target.value = min;
    }
    onChange(e);
  };

  return (
    <TextField
      className={className}
      fullWidth={fullWidth}
      variant="filled"
      type={type}
      label={label}
      value={value}
      multiline={multiline}
      rows={rows}
      onChange={handleChange}
      required={required}
      placeholder={placeholder}
      error={!value}
      helperText={helperText}
      slotProps={{
        input: {
          min: min,
        },
      }}
    />
  );
};
