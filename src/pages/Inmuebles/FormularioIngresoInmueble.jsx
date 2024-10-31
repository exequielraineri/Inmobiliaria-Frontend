/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { InputText } from "../../components/InputText/InputText";
import { API_URL, getData, postData, putData } from "../../service/apiService";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import { tipo_inmuebles } from "../../data/data";
export const FormularioIngresoInmueble = () => {
  const [tipoInmuele, setTipoInmueble] = useState(null);
  const [isVenta, setIsVenta] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [propietarios, setPropietarios] = useState();
  const [inmueble, setInmueble] = useState({
    titulo: "",
    direccion: "",
    precioAlquiler: "",
    descripcion: "",
    isVenta: false,
    propietario: { id: 1 },
    impMunicipales: "",
    impInmobiliarios: "",
    expensas: "",
    mts2: "",
  });

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      let response;

      if (inmueble?.id != null) {
        response = await putData("inmuebles/" + inmueble.id, inmueble);
      } else {
        response = await postData("inmuebles", inmueble);

        // if (imagenes.length > 0) {
        //   const formData = new FormData();

        //   for (let i = 0; i < imagenes.length; i++) {
        //     const element = imagenes[i];
        //     formData.append("imagenes", element);
        //   }
        //   await axios.post(
        //     API_URL + "inmuebles/subir-imagen/" + response?.data?.id,
        //     formData,
        //     {
        //       headers: {
        //         "Content-Type": "multipart/form-data",
        //       },
        //     }
        //   );
        // }
      }

      if (imagenes.length > 0) {
        const formData = new FormData();

        for (let i = 0; i < imagenes.length; i++) {
          const element = imagenes[i];
          formData.append("imagenes", element);
        }
        console.log(response);

        await axios.post(
          API_URL + "inmuebles/subir-imagen/" + response?.data?.id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      navigate("/inmuebles");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cargarInmueble = async () => {
    setLoading(true);

    const response = await getData("inmuebles/" + id);
    setInmueble(response.data);
    setTipoInmueble(response.data.tipoInmueble);
    setLoading(false);
  };

  const cargarPropietarios = async () => {
    try {
      const response = await getData("clientes?tipoCliente=Propietario");

      setPropietarios(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      cargarInmueble();
    }
    cargarPropietarios();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading texto={"Cargando..."} />
      ) : (
        <>
          <div className="mb-3 col-6">
            <label htmlFor="tipoInmueble">Seleccione el tipo de inmueble</label>
            <select
              value={tipoInmuele}
              onChange={(e) => {
                setTipoInmueble(e.target.value);
                setInmueble({ ...inmueble, tipoInmueble: e.target.value });
              }}
              defaultValue={"0"}
              className="form-select"
              name="tipo"
              id="tipo"
              autoFocus
            >
              <option value="0" disabled>
                Seleccione
              </option>
              {tipo_inmuebles.map((tipo) => {
                return <option value={tipo}>{tipo}</option>;
              })}
            </select>
          </div>
          <hr />
          {tipoInmuele && (
            <div className="shadow rounded-3 bg-white p-3">
              <form onSubmit={onSubmit} encType="multipart/form-data">
                <input type="text" name="id" hidden />
                <div className="mb-0 pb-0">
                  <h5 className="fw-ligth text-primary">
                    Nuevo Inmueble | {tipoInmuele}
                  </h5>
                  <p>
                    Debe completar los campos para que el ingreso sea exitoso
                  </p>
                </div>
                <div className="d-flex gap-3 justify-content-between flex-wrap">
                  <div className="col-12 col-md-8">
                    <p className="col-12 border-bottom mb-3 fw-bold">
                      Datos Principales
                    </p>
                    <section
                      className="d-flex gap-3 justify-content-start flex-wrap"
                      style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                    >
                      <InputText
                        label={"Titulo"}
                        value={inmueble?.titulo}
                        onChanche={(e) =>
                          setInmueble({ ...inmueble, titulo: e.target.value })
                        }
                        required={true}
                        type="text"
                        placeholder={"Ingrese un titulo"}
                      />
                      <InputText
                        label={"Dirección"}
                        value={inmueble?.direccion}
                        onChanche={(e) =>
                          setInmueble({
                            ...inmueble,
                            direccion: e.target.value,
                          })
                        }
                        required={true}
                        type="text"
                        placeholder={"Ingrese una dirección"}
                      />
                      <InputText
                        label={"Precio Alquiler (Por dia)"}
                        value={inmueble?.precioAlquiler}
                        onChanche={(e) =>
                          setInmueble({
                            ...inmueble,
                            precioAlquiler: e.target.value,
                          })
                        }
                        required={true}
                        type="number"
                        placeholder={"Ingrese un precio"}
                      />

                      <div className="col-12" style={{ gridColumn: "span 2" }}>
                        <label className="form-label" htmlFor="descripcion">
                          Descripción
                        </label>
                        <textarea
                          value={inmueble?.descripcion}
                          onChange={(e) =>
                            setInmueble({
                              ...inmueble,
                              descripcion: e.target.value,
                            })
                          }
                          required
                          placeholder="Ingrese una breve descripción"
                          name="descripcion"
                          id="descripcion"
                          className="form-control"
                          rows="3"
                          minLength={100}
                        ></textarea>
                      </div>
                      <div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="isVenta"
                            value={isVenta}
                            onChange={(e) => {
                              setIsVenta(e.target.checked);
                              setInmueble({
                                ...inmueble,
                                isVenta: e.target.checked,
                              });
                            }}
                            id="isVenta"
                          />
                          <label
                            className="form-check-label fw-bold"
                            htmlFor="isVenta"
                          >
                            Disponible para venta
                          </label>
                        </div>
                        {isVenta && (
                          <input
                            value={inmueble?.precioVenta}
                            onChange={(e) =>
                              setInmueble({
                                ...inmueble,
                                precioVenta: e.target.value,
                              })
                            }
                            className="form-control"
                            type="number"
                            min={1}
                            required
                            id="precioVenta"
                            name="precioVenta"
                            placeholder="Ingrese un precio"
                          />
                        )}
                      </div>
                    </section>

                    <p className="border-bottom mb-3 mt-3 fw-bold">
                      Propietario{" "}
                    </p>
                    <section className="d-flex justify-content-between flex-wrap gap-3">
                      <div className="col">
                        <label className="form-label mb-1">Nombre</label>
                        <input
                          required
                          disabled
                          type="text"
                          name="nombre"
                          id="nombre"
                          className="form-control"
                        />
                      </div>
                      <div className="col">
                        <label className="form-label mb-1">
                          Listado de propietarios
                        </label>
                        <select
                          required
                          className="form-select"
                          name="propietario"
                          id="propietario"
                          value={inmueble?.propietario?.id}
                          onChange={(e) =>
                            setInmueble({
                              ...inmueble,
                              propietario: {
                                id: e.target.value,
                              },
                            })
                          }
                        >
                          <option value="0" selected disabled>
                            Selecciona un propietario
                          </option>
                          {propietarios?.map((propietario) => {
                            return (
                              <option value={propietario.id}>
                                {propietario.apellido +
                                  " " +
                                  propietario.nombre}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </section>
                    <p className="border-bottom mb-3 mt-3 fw-bold">Imágenes </p>
                    <section>
                      <div className="col">
                        <label htmlFor="imagenes">Máximo de 4 imágenes!</label>
                        <input
                          onChange={(e) => {
                            if (e.target.files.length > 4) {
                              alert(
                                "Solo puedes subir un máximo de 4 imagenes"
                              );
                              e.target.value = "";
                            } else {
                              setImagenes(e.target.files);
                            }
                          }}
                          accept="image/*"
                          className="form-control"
                          type="file"
                          multiple
                          // required
                          // min={1}
                          name="imagenes"
                          id="imagenes"
                        />
                      </div>
                      <div className="d-flex flex-wrap mt-2 gap-3">
                        {/* Aquí puedes mostrar las imágenes dinámicamente */}
                      </div>
                    </section>
                  </div>

                  <div className="col-12 col-md-3">
                    <section className="d-flex gap-1 flex-column">
                      <p className="border-bottom mb-3 fw-bold">Datos Extras</p>
                      {tipoInmuele == "CAMPO" && (
                        <>
                          <div className="form-check">
                            <input
                              value={inmueble?.isAccesoRuta}
                              onChange={(e) =>
                                setInmueble({
                                  ...inmueble,
                                  isAccesoRuta: e.target.checked,
                                })
                              }
                              className="form-check-input"
                              type="checkbox"
                              name="isAccesoRuta"
                              id="isAccesoRuta"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="isAccesoRuta"
                            >
                              Acceso Ruta
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              value={inmueble?.isRiego}
                              onChange={(e) =>
                                setInmueble({
                                  ...inmueble,
                                  isRiego: e.target.checked,
                                })
                              }
                              className="form-check-input"
                              type="checkbox"
                              name="isRiego"
                              id="isRiego"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="isRiego"
                            >
                              Riego
                            </label>
                          </div>
                        </>
                      )}

                      {tipoInmuele == "OFICINA" && (
                        <div className="form-check">
                          <input
                            value={inmueble?.isVidriera}
                            onChange={(e) =>
                              setInmueble({
                                ...inmueble,
                                isVidriera: e.target.checked,
                              })
                            }
                            className="form-check-input"
                            type="checkbox"
                            name="isVidriera"
                            id="isVidriera"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="isVidriera"
                          >
                            Vidriera a la calle
                          </label>
                        </div>
                      )}
                      {tipoInmuele != "CAMPO" && (
                        <div className="col">
                          <label className="form-label" htmlFor="banios">
                            Baños
                          </label>
                          <input
                            value={inmueble?.banios}
                            onChange={(e) =>
                              setInmueble({
                                ...inmueble,
                                banios: e.target.value,
                              })
                            }
                            className="form-control form-control-sm"
                            type="number"
                            min={0}
                            required
                            name="banios"
                            id="banios"
                          />
                        </div>
                      )}
                      <div className="col">
                        <label className="form-label" htmlFor="impMunicipales">
                          Imp. Municipales
                        </label>
                        <input
                          value={inmueble?.impMunicipales}
                          onChange={(e) =>
                            setInmueble({
                              ...inmueble,
                              impMunicipales: e.target.value,
                            })
                          }
                          required
                          className="form-control form-control-sm"
                          type="number"
                          min={0}
                          name="impMunicipales"
                          id="impMunicipales"
                        />
                      </div>
                      <div className="col">
                        <label
                          className="form-label"
                          htmlFor="impInmobiliarios"
                        >
                          Imp. Inmobiliarios
                        </label>
                        <input
                          value={inmueble?.impInmobiliarios}
                          onChange={(e) =>
                            setInmueble({
                              ...inmueble,
                              impInmobiliarios: e.target.value,
                            })
                          }
                          required
                          className="form-control form-control-sm"
                          type="number"
                          min={0}
                          name="impInmobiliarios"
                          id="impInmobiliarios"
                        />
                      </div>
                      <div className="col">
                        <label className="form-label" htmlFor="expensas">
                          Expensas
                        </label>
                        <input
                          value={inmueble?.expensas}
                          onChange={(e) =>
                            setInmueble({
                              ...inmueble,
                              expensas: e.target.value,
                            })
                          }
                          required
                          className="form-control form-control-sm"
                          type="number"
                          min={0}
                          name="expensas"
                          id="expensas"
                        />
                      </div>
                      {tipoInmuele != "CAMPO" && (
                        <div className="col">
                          <label className="form-label" htmlFor="mts2">
                            Metros Cuadrados
                          </label>
                          <input
                            value={inmueble?.mts2}
                            onChange={(e) =>
                              setInmueble({ ...inmueble, mts2: e.target.value })
                            }
                            required
                            className="form-control form-control-sm"
                            type="number"
                            min={0}
                            name="mts2"
                            id="mts2"
                          />
                        </div>
                      )}
                      {tipoInmuele == "CAMPO" && (
                        <div className="col">
                          <label className="form-label" htmlFor="hectareas">
                            Hectáreas
                          </label>
                          <input
                            value={inmueble?.hectareas}
                            onChange={(e) =>
                              setInmueble({
                                ...inmueble,
                                hectareas: e.target.value,
                              })
                            }
                            required
                            className="form-control form-control-sm"
                            type="number"
                            min={0}
                            name="hectareas"
                            id="hectareas"
                          />
                        </div>
                      )}
                    </section>
                  </div>
                </div>
                <div className="mt-2 d-flex justify-content-end gap-3">
                  <button
                    onClick={() => navigate("/inmuebles")}
                    type="reset"
                    className="btn btn-secondary"
                  >
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};
