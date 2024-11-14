/* eslint-disable react/jsx-key */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Imagen } from "../../components/Imagen/Imagen";
import { InputText } from "../../components/InputText/InputText";
import { Loading } from "../../components/Loading/Loading";
import { ESTADOS_INMUEBLE, TIPO_INMUEBLES } from "../../data/data";
import { API_URL, getData, postData, putData } from "../../service/apiService";
export const InmuebleForm = () => {
  const [propietarios, setPropietarios] = useState();
  const [filtro, setFiltro] = useState();
  const [inmueble, setInmueble] = useState();
  const [imagenes, setImagenes] = useState([null, null, null, null]);
  const [imageID, setImageID] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (inmueble?.id != null) {
        response = putData("inmuebles/" + inmueble.id, inmueble);
      } else {
        response = postData("inmuebles", inmueble);
      }

      toast.promise(response, {
        loading: "Cargando...",
        success: (response) => {
          if (imagenes[0] || imagenes[1] || imagenes[2] || imagenes[3]) {
            const formData = new FormData();
            for (let i = 0; i < imagenes.length; i++) {
              const element = imagenes[i];
              formData.append("imagenes", element);
              console.log(element);
            }

            toast.promise(
              axios.post(
                API_URL + "inmuebles/subir-imagen/" + response?.data?.id,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              ),
              {
                loading: "Subiendo imagenes...",
                success: (response) => {
                  navigate("/inmuebles");
                  return "Subida completada";
                },
                error: "Error al subir imagenes",
              }
            );
          } else {
            navigate("/inmuebles");
          }

          return "Accion exitosa";
        },
        error: (response) => {
          console.error(response);
          return "Error al guardar inmueble";
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(imagenes);
    console.log(imageID);

    // console.log(inmueble?.imagenes);
  }, [imagenes]);
  const fetchInmueble = async () => {
    try {
      const response = await getData("inmuebles/" + id);

      // eslint-disable-next-line no-unused-vars

      response?.data?.imagenes?.map(async (imagen, index) => {
        console.log(imagen?.id);
        imageID[index] = imagen;

        const response = await axios.get(
          API_URL + `inmuebles/imagen/${imagen?.id}`,
          {
            responseType: "blob",
          }
        );

        const file = new File([response?.data], `${imagen?.nombre}`, {
          type: response?.data?.type,
        });

        imagenes[index] = file;

        console.log(imagenes);
      });

      console.log(imagenes);
      setInmueble(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPropietarios = async () => {
    try {
      let parametros = "";
      if (filtro?.nombre) {
        parametros += `&nombre=${filtro.nombre}`;
      }
      const response = await getData("clientes?" + parametros);
      setPropietarios(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInmueble();
    }
    fetchPropietarios();
  }, [id, filtro]);

  if (loading) return <Loading texto={"Cargando..."} />;
  return (
    <>
      <div className="mb-3 col-6">
        <label htmlFor="tipoInmueble">Seleccione el tipo de inmueble</label>
        <select
          value={inmueble?.tipoInmueble}
          onChange={(e) => {
            setInmueble({ ...inmueble, tipoInmueble: e.target.value });
          }}
          defaultValue={""}
          className="form-select"
          name="tipo"
          id="tipo"
          autoFocus
        >
          <option value="" disabled>
            Seleccione...
          </option>
          {TIPO_INMUEBLES.map((tipo) => {
            return <option value={tipo}>{tipo}</option>;
          })}
        </select>
      </div>
      <hr />
      {inmueble?.tipoInmueble && (
        <div className="shadow rounded-3 bg-white p-3">
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <input type="text" name="id" hidden />
            <div className="d-flex gap-2 justify-content-between">
              <div className="mb-0 pb-0 col">
                <h5 className="fw-ligth text-primary">
                  Nuevo Inmueble | {inmueble?.tipoInmueble}
                </h5>
                <p>Debe completar los campos para que el ingreso sea exitoso</p>
              </div>
              <div className="col-3">
                <FormControl fullWidth variant="filled">
                  <InputLabel shrink>Estado del inmueble</InputLabel>
                  <Select
                    value={inmueble?.estado}
                    onChange={(e) => {
                      setInmueble({ ...inmueble, estado: e.target.value });
                    }}
                    fullWidth
                    displayEmpty
                  >
                    <MenuItem disabled>Seleccione...</MenuItem>
                    {ESTADOS_INMUEBLE.map((estado) => {
                      return <MenuItem value={estado}>{estado}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="d-flex gap-3 justify-content-between flex-wrap">
              <div className="col-12 col-md">
                <p className="col-12 border-bottom mb-3 fw-bold">
                  Datos Principales
                </p>
                <section className="d-flex flex-wrap justify-content-start gap-3">
                  <InputText
                    className={"col-12 col-md-5"}
                    helperText={"Ingrese un titulo"}
                    label={"Titulo"}
                    value={inmueble?.titulo}
                    onChange={(e) =>
                      setInmueble({ ...inmueble, titulo: e.target.value })
                    }
                    required={true}
                    type="text"
                    placeholder={"Ingrese un titulo"}
                  />
                  <InputText
                    className={"col-12 col-md-5"}
                    helperText={"Ingrese una dirección"}
                    label={"Dirección"}
                    value={inmueble?.direccion}
                    onChange={(e) =>
                      setInmueble({
                        ...inmueble,
                        direccion: e.target.value,
                      })
                    }
                    required={true}
                    type="text"
                    placeholder={"Ingrese una dirección"}
                  />
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="venta"
                        checked={inmueble?.venta}
                        value={inmueble?.venta}
                        onChange={(e) => {
                          setInmueble({
                            ...inmueble,
                            venta: e.target.checked,
                          });
                        }}
                        id="venta"
                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="venta"
                      >
                        Disponible para venta
                      </label>
                    </div>
                    {inmueble?.venta && (
                      <InputText
                        className={"col-12 col-md-5"}
                        helperText={"Ingrese un precio de venta"}
                        label={"Precio Venta"}
                        value={inmueble?.precioVenta}
                        onChange={(e) =>
                          setInmueble({
                            ...inmueble,
                            precioVenta: e.target.value,
                          })
                        }
                        required={inmueble?.venta}
                        type="number"
                        placeholder={"Ingrese un precio de venta"}
                        min={1}
                      />
                    )}
                  </div>
                  {!inmueble?.venta && (
                    <>
                      <InputText
                        className={"col-12 col-md-5"}
                        helperText={"Ingrese un precio por dia"}
                        label={"Precio Alquiler (Por dia)"}
                        value={inmueble?.precioAlquilerDia}
                        onChange={(e) =>
                          setInmueble({
                            ...inmueble,
                            precioAlquilerDia: e.target.value,
                          })
                        }
                        min={1}
                        required={inmueble?.venta == false}
                        type="number"
                        placeholder={"Ingrese un precio"}
                      />
                      <InputText
                        className={"col-12 col-md-5"}
                        helperText={"Ingrese un precio por mes"}
                        label={"Precio Alquiler (Por mes)"}
                        value={inmueble?.precioAlquilerMes}
                        onChange={(e) =>
                          setInmueble({
                            ...inmueble,
                            precioAlquilerMes: e.target.value,
                          })
                        }
                        min={1}
                        required={inmueble?.venta == false}
                        type="number"
                        placeholder={"Ingrese un precio por mes"}
                      />
                    </>
                  )}
                  <div className="col-12" style={{ gridColumn: "span 2" }}>
                    <InputText
                      fullWidth={true}
                      value={inmueble?.descripcion}
                      onChange={(e) =>
                        setInmueble({
                          ...inmueble,
                          descripcion: e.target.value,
                        })
                      }
                      required={true}
                      multiline={true}
                      rows={3}
                      label={"Descripción"}
                      helperText={"Ingrese una descripción"}
                    />
                  </div>
                </section>

                <p className="border-bottom mb-3 mt-3 fw-bold">Propietario </p>
                <section className="d-flex justify-content-between flex-wrap gap-3">
                  <div className="col">
                    <TextField
                      type="text"
                      label={"Buscar propietario"}
                      variant="filled"
                      fullWidth
                      value={filtro?.nombre}
                      onChange={(e) =>
                        setFiltro({ ...filtro, nombre: e.target.value })
                      }
                    />
                  </div>

                  <div className="col">
                    <FormControl fullWidth variant="filled">
                      <InputLabel>Propietario</InputLabel>
                      <Select
                        required
                        fullWidth
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
                        <MenuItem value="" disabled>
                          Seleccione...
                        </MenuItem>
                        {propietarios?.map((propietario) => {
                          return (
                            <MenuItem value={propietario?.id}>
                              {propietario?.nombre +
                                " " +
                                propietario?.apellido}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </section>
                <p className="border-bottom mb-3 mt-3 fw-bold">Imágenes </p>

                <div className="gap-3 d-flex flex-column">
                  {imagenes?.map((_, index) => {
                    return (
                      <div className="d-flex flex-row gap-2 align-items-end">
                        <Imagen imagen={imageID[index]} width={100} />
                        <input
                          accept="image/*"
                          type="file"
                          onChange={(e) => {
                            const copia = [...imagenes];
                            copia[index] = e.target.files[0];
                            setImagenes(copia);
                          }}
                        />
                      </div>
                    );
                  })}

                  {/* {inmueble?.id
                    ? inmueble?.imagenes?.map((imagen, index) => {
                        return (
                          <div className="d-flex flex-row gap-2 align-items-end">
                            <Imagen imagen={imagen} width={100} />
                            <input
                              accept="image/*"
                              type="file"
                              title={imagen?.id}
                              onChange={(e) => {
                                const copia = [...imagenes];
                                copia[index] = e.target.files[0];
                                setImagenes(copia);
                              }}
                            />
                          </div>
                        );
                      })
                    : imagenes?.map((_, index) => {
                        return (
                          <div className="d-flex flex-row gap-2 align-items-end">
                            <input
                              accept="image/*"
                              type="file"
                              onChange={(e) => {
                                const copia = [...imagenes];
                                copia[index] = e.target.files[0];
                                setImagenes(copia);
                              }}
                            />
                          </div>
                        );
                      })} */}
                  {/* <input
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        const copia = [...imagenes];
                        copia[0] = e.target.files[0];
                        setImagenes(copia);
                      }}
                    />
                  </div>
                  <div className="d-flex flex-row align-items-end gap-3 border-bottom pb-2">
                    <input
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        const copia = [...imagenes];
                        copia[1] = e.target.files[0];
                        setImagenes(copia);
                      }}
                    />
                  </div>
                  <div className="d-flex flex-row align-items-end gap-3 border-bottom pb-2">
                    <input
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        const copia = [...imagenes];
                        copia[2] = e.target.files[0];
                        setImagenes(copia);
                      }}
                    />
                  </div>
                  <div className="d-flex flex-row align-items-end gap-3 border-bottom pb-2">
                    <input
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        const copia = [...imagenes];
                        copia[3] = e.target.files[0];
                        setImagenes(copia);
                      }}
                    />
                  </div> */}
                </div>
              </div>

              <div className="col-12 col-md-3">
                <section className="d-flex gap-3 flex-column">
                  <p className="border-bottom mb-3 fw-bold">Datos Extras</p>
                  {inmueble?.tipoInmueble == "CAMPO" && (
                    <>
                      <div className="form-check">
                        <input
                          value={inmueble?.accesoRuta}
                          onChange={(e) =>
                            setInmueble({
                              ...inmueble,
                              accesoRuta: e.target.checked,
                            })
                          }
                          className="form-check-input"
                          type="checkbox"
                          name="accesoRuta"
                          id="accesoRuta"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="accesoRuta"
                        >
                          Acceso Ruta
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          value={inmueble?.riego}
                          onChange={(e) =>
                            setInmueble({
                              ...inmueble,
                              riego: e.target.checked,
                            })
                          }
                          className="form-check-input"
                          type="checkbox"
                          name="riego"
                          id="riego"
                        />
                        <label className="form-check-label" htmlFor="riego">
                          Riego
                        </label>
                      </div>
                    </>
                  )}

                  {inmueble?.tipoInmueble == "OFICINA" && (
                    <div className="form-check">
                      <input
                        value={inmueble?.vidrieraCalle}
                        onChange={(e) =>
                          setInmueble({
                            ...inmueble,
                            vidrieraCalle: e.target.checked,
                          })
                        }
                        className="form-check-input"
                        type="checkbox"
                        name="vidrieraCalle"
                        id="vidrieraCalle"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="vidrieraCalle"
                      >
                        Vidriera a la calle
                      </label>
                    </div>
                  )}
                  {inmueble?.tipoInmueble != "CAMPO" && (
                    <div className="col">
                      <InputText
                        value={inmueble?.banios}
                        onChange={(e) =>
                          setInmueble({
                            ...inmueble,
                            banios: e.target.value,
                          })
                        }
                        label={"Baños"}
                        type="number"
                        min={0}
                        helperText={"Ingrese cantidad de baños"}
                        fullWidth={true}
                        required={true}
                      />
                    </div>
                  )}
                  <div className="col">
                    <InputText
                      value={inmueble?.impMunicipales}
                      onChange={(e) =>
                        setInmueble({
                          ...inmueble,
                          impMunicipales: e.target.value,
                        })
                      }
                      label={"Impuestos Municipales"}
                      type="number"
                      min={0}
                      helperText={"Ingrese impuestos municipales"}
                      fullWidth={true}
                      required={true}
                    />
                  </div>
                  <div className="col">
                    <InputText
                      value={inmueble?.impInmobiliarios}
                      onChange={(e) =>
                        setInmueble({
                          ...inmueble,
                          impInmobiliarios: e.target.value,
                        })
                      }
                      label={"Impuestos Inmobiliarios"}
                      type="number"
                      min={0}
                      helperText={"Ingrese impuestos inmobiliarios"}
                      fullWidth={true}
                      required={true}
                    />
                  </div>
                  <div className="col">
                    <InputText
                      value={inmueble?.expensas}
                      onChange={(e) =>
                        setInmueble({
                          ...inmueble,
                          expensas: e.target.value,
                        })
                      }
                      label={"Expensas"}
                      type="number"
                      min={0}
                      helperText={"Ingrese expensas"}
                      fullWidth={true}
                      required={true}
                    />
                  </div>
                  {inmueble?.tipoInmueble != "CAMPO" && (
                    <div className="col">
                      <InputText
                        value={inmueble?.mts2}
                        onChange={(e) =>
                          setInmueble({ ...inmueble, mts2: e.target.value })
                        }
                        label={"Metros Cuadrados"}
                        type="number"
                        min={0}
                        helperText={"Ingrese metros cuadrados"}
                        fullWidth={true}
                        required={true}
                      />
                    </div>
                  )}
                  {inmueble?.tipoInmueble == "CAMPO" && (
                    <div className="col">
                      <InputText
                        value={inmueble?.hectareas}
                        onChange={(e) =>
                          setInmueble({
                            ...inmueble,
                            hectareas: e.target.value,
                          })
                        }
                        label={"Hectareas"}
                        type="number"
                        min={0}
                        helperText={"Ingrese hectareas"}
                        fullWidth={true}
                        required={true}
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
  );
};
