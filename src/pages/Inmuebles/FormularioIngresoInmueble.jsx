export const FormularioIngresoInmueble = () => {
  return (
    <div className="shadow rounded-3 bg-white p-3">
      <p>{/* Aquí puedes manejar el tipo desde props o estado */}</p>

      <form
        id="formularioIngresoInmueble"
        method="post"
        encType="multipart/form-data"
      >
        <input type="text" name="id" hidden />
        <div className="mb-0 pb-0">
          <h5 className="fw-ligth text-primary">
            Nuevo Inmueble | {/* Tipo dinámico aquí */}
          </h5>
          <p>Debe completar los campos para que el ingreso sea exitoso</p>
        </div>
        <div className="d-flex gap-3 justify-content-between flex-wrap">
          <div className="col-12 col-md-8">
            <p className="col-12 border-bottom mb-3 fw-bold">
              Datos Principales
            </p>
            <section
              className="d-flex gap-3 justify-content-between flex-wrap"
              style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              <div className="col-12 col-md-6">
                <label className="form-label mb-1" htmlFor="titulo">
                  Titulo
                </label>
                <input
                  required
                  className="form-control"
                  type="text"
                  id="titulo"
                  name="titulo"
                  placeholder="Ingrese un titulo"
                />
              </div>
              <div className="col-12 col-md-8">
                <label className="form-label mb-1" htmlFor="direccion">
                  Dirección
                </label>
                <input
                  required
                  className="form-control"
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="Ingrese una dirección"
                />
              </div>
              <div className="d-flex gap-3 col-md-8">
                <div className="col">
                  <label className="form-label mb-1" htmlFor="precioAlquiler">
                    Precio Alquiler
                  </label>
                  <input
                    required
                    className="form-control"
                    type="number"
                    min="1"
                    id="precioAlquiler"
                    name="precioAlquiler"
                    placeholder="Ingrese un precio"
                  />
                </div>
                <div className="col">
                  <label className="form-label mb-1" htmlFor="precioVenta">
                    Precio Venta
                  </label>
                  <input
                    required
                    className="form-control"
                    type="number"
                    min="1"
                    id="precioVenta"
                    name="precioVenta"
                    placeholder="Ingrese un precio"
                  />
                </div>
              </div>

              <div className="col-12" style={{ gridColumn: "span 2" }}>
                <label className="form-label" htmlFor="descripcion">
                  Descripción
                </label>
                <textarea
                  required
                  placeholder="Ingrese una breve descripción"
                  name="descripcion"
                  id="descripcion"
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isVenta"
                  value="false"
                  id="isVenta"
                />
                <label className="form-check-label fw-bold" htmlFor="isVenta">
                  Disponible para venta
                </label>
              </div>
            </section>

            <p className="border-bottom mb-3 mt-3 fw-bold">Propietario </p>
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
                >
                  <option value="0" selected disabled>
                    Selecciona un propietario
                  </option>
                  {/* Aquí puedes mapear los propietarios dinámicamente */}
                </select>
              </div>
            </section>
            <p className="border-bottom mb-3 mt-3 fw-bold">Imágenes </p>
            <section>
              <div className="col">
                <label htmlFor="archivos">Máximo de 4 imágenes!</label>
                <input
                  accept="image/*"
                  className="form-control"
                  type="file"
                  multiple
                  name="archivos"
                  id="archivos"
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
              {/* Aquí puedes condicionar los campos según el tipo */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isAccesoRuta"
                  id="isAccesoRuta"
                />
                <label className="form-check-label" htmlFor="isAccesoRuta">
                  Acceso Ruta
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isRiego"
                  id="isRiego"
                />
                <label className="form-check-label" htmlFor="isRiego">
                  Riego
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isVidriera"
                  id="isVidriera"
                />
                <label className="form-check-label" htmlFor="isVidriera">
                  Vidriera a la calle
                </label>
              </div>
              <div className="col">
                <label className="form-label" htmlFor="banios">
                  Baños
                </label>
                <input
                  className="form-control form-control-sm"
                  type="number"
                  name="banios"
                  id="banios"
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="impMunicipales">
                  Imp. Municipales
                </label>
                <input
                  required
                  className="form-control form-control-sm"
                  type="number"
                  min="0"
                  name="impMunicipales"
                  id="impMunicipales"
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="impInmobiliarios">
                  Imp. Inmobiliarios
                </label>
                <input
                  required
                  className="form-control form-control-sm"
                  type="number"
                  min="0"
                  name="impInmobiliarios"
                  id="impInmobiliarios"
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="expensas">
                  Expensas
                </label>
                <input
                  required
                  className="form-control form-control-sm"
                  type="number"
                  min="0"
                  name="expensas"
                  id="expensas"
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="mts2">
                  Metros Cuadrados
                </label>
                <input
                  required
                  className="form-control form-control-sm"
                  type="number"
                  min="0"
                  name="mts2"
                  id="mts2"
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="hectareas">
                  Hectáreas
                </label>
                <input
                  required
                  className="form-control form-control-sm"
                  type="number"
                  min="0"
                  name="hectareas"
                  id="hectareas"
                />
              </div>
            </section>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-3">
          <button type="reset" className="btn btn-secondary">
            Cerrar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
