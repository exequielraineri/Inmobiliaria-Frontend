/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteData, getData } from "../../service/apiService";
import { Imagen } from "../../components/Imagen/Imagen";
import { Loading } from "../../components/Loading/Loading";

export const Inmuebles = () => {
  const [listInmuebles, setListInmuebles] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarInmuebles = async () => {
    setLoading(true);
    try {
      const response = await getData("inmuebles");

      setListInmuebles(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const actualizarTabla = () => {
    cargarInmuebles();
  };

  useEffect(() => {
    cargarInmuebles();
  }, []);

  const eliminarInmueble = (id) => {
    if (confirm("Seguro desea eliminar el inmueble?")) {
      deleteData("inmuebles/" + id).then(() => actualizarTabla());
    }
  };

  if (loading) {
    return <Loading texto={"Cargando inmuebles..."} />;
  }

  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Inmuebles</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <form action="/" method="get" className="d-flex flex-wrap gap-3 col-12">
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="tipo">
              Tipo Inmumeble
            </label>
            <select className="form-select" id="tipo" name="tipo">
              <option value="Todos">Todos</option>
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
              <option value="Campo">Campo</option>
              <option value="Oficina">Oficina</option>
            </select>
          </div>
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="ubicacion">
              Ubicación
            </label>
            <input
              className="form-control"
              type="text"
              id="ubicacion"
              name="ubicacion"
              placeholder="Ubicacion"
            />
          </div>
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Estado
            </label>
            <select className="form-select" id="estado" name="estado">
              <option value="Todos">Todos</option>
              <option value="Alquilado">Alquilado</option>
              <option value="Vendido">Vendido</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="col d-flex align-items-end">
            <button className="btn btn-outline-secondary" type="submit">
              Filtrar
            </button>
          </div>
        </form>

        <div className="d-flex justify-content-end">
          <div className="dropdown">
            <Link
              to={"/inmuebles/nuevo"}
              className="btn btn-primary"
              type="button"
            >
              Nuevo
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4 bloque">
        <h3>Listado </h3>
        <p className="pb-0 mb-0 fw-ligth">Encontrados {listInmuebles.length}</p>
        <div className="table-responsive">
          <table className="table table-hover table-ligth table-striped table-sm ">
            <thead>
              <tr>
                <th className="col-auto">#</th>
                <th className="col">Imagen</th>
                <th className="col">Titulo</th>
                <th className="col">Propietario</th>
                <th className="col">Tipo de Inmueble</th>
                <th className="col">Dirección</th>
                <th className="col">Prec. Venta</th>
                <th className="col">Prec. Alquiler</th>
                <th className="col">Estado</th>
                <th className="col-auto"></th>
              </tr>
            </thead>

            <tbody>
              {listInmuebles?.map((inmueble, index) => {
                return (
                  <tr
                    style={{
                      fontSize: ".9em",
                    }}
                    className="text-capitalize"
                  >
                    <td>{++index}</td>
                    <td>
                      {inmueble.imagenes[0] && (
                        <Imagen imagen={inmueble?.imagenes[0]} width={100} />
                      )}
                    </td>
                    <td>{inmueble?.titulo}</td>
                    <td>
                      {inmueble.propietario?.apellido +
                        " " +
                        inmueble.propietario?.nombre}
                    </td>
                    <td>{inmueble.tipoInmueble}</td>
                    <td>{inmueble.direccion}</td>
                    <td>
                      {inmueble.isVenta
                        ? new Intl.NumberFormat("en-ES", {
                            currency: "ARS",
                            style: "currency",
                            currencyDisplay: "narrowSymbol",
                          }).format(inmueble.precioVenta)
                        : "-"}
                    </td>
                    <td>
                      {new Intl.NumberFormat("en-ES", {
                        currency: "ARS",
                        style: "currency",
                        currencyDisplay: "narrowSymbol",
                      }).format(inmueble.precioAlquiler)}
                    </td>
                    <td>{inmueble?.estado}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <Link className="btn btn-sm btn-outline-info">
                          <i className="fa-solid fa-search"></i>
                        </Link>
                        <button
                          onClick={() => {
                            eliminarInmueble(inmueble.id);
                          }}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        <Link
                          className="btn btn-sm btn-outline-warning"
                          to={"/inmuebles/editar/" + inmueble.id}
                        >
                          <i className="fa-solid fa-edit"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
