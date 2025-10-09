export interface Quote {
  id?: number;           // opcional: identificador de la cotización
  origin: string;        // ciudad o punto de origen
  destination: string;   // ciudad o punto de destino
  weight: number;        // peso del paquete en kg
  dimensions?: string;   // opcional: dimensiones (ej. "30x20x10 cm")
  type?: string;         // tipo de envío (ej. "express", "standard")
  price?: number;        // precio calculado (lo devuelve la API)
}
