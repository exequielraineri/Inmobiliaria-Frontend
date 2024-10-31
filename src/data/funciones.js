export function formatearPrecio(precio) {
  return new Intl.NumberFormat("en-EN", {
    currency: "USD",
    style: "currency",
    currencyDisplay: "narrowSymbol",
  }).format(precio);
}
