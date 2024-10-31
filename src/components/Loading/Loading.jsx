import { Spinner } from "react-bootstrap";

export const Loading = ({ texto }) => {
  return (
    <div className="alert alert-info rounded p-3 d-flex flex-row align-items-center justify-content-between">
      <span>{texto}</span>
      <Spinner />
    </div>
  );
};
