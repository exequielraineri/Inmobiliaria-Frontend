/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export const Alerta = ({ mensaje, tipo }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const cerrarAlerta = () => {
    setIsVisible(false);
  };

  if (isVisible == false) {
    return null;
  }
  return (
    <div
      className={`alert alert-${tipo} alert-dismissible fade show`}
      role="alert"
    >
      <strong>{mensaje}</strong>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={cerrarAlerta}
      ></button>
    </div>
  );
};
