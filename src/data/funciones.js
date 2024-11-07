export function formatearPrecio(precio) {
  return new Intl.NumberFormat("en-EN", {
    currency: "ARS",
    style: "currency",
    currencyDisplay: "narrowSymbol",
  }).format(precio);
}
