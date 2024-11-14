import { API_URL } from "../../service/apiService";

export const LinkPago = ({ id }) => {
  const url = API_URL + "pagos/ticket/" + id;
  return (
    <button
      title={id}
      className="btn btn-sm btn-outline-primary"
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <i className="fa-solid fa-file-pdf"></i>
    </button>
  );
};
