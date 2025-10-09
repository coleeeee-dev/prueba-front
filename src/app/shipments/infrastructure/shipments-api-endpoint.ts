export class ShipmentsApiEndpoint {
  static base = '/shipments';
  static recent(limit = 4) {
    // ordena por fecha descendente y limita resultados
    return `${this.base}?_sort=dateISO&_order=desc&_limit=${limit}`;
  }
}
