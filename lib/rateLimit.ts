/**
 * Limitador de peticiones en memoria — ventana deslizante por IP.
 *
 * Nota sobre el alcance real: Vercel puede levantar varias instancias del
 * servidor, y cada una lleva su propio contador. El tope efectivo es, por
 * tanto, más flojo que el número configurado. Frena el abuso casual y los
 * bucles accidentales; no es un candado exacto. Para un tope duro haría
 * falta un contador externo compartido (Upstash Redis o similar).
 *
 * Los contadores viven en memoria del proceso: se pierden en cada arranque
 * en frío, lo cual es aceptable para este propósito.
 */

interface Bucket {
  /** Marcas de tiempo (ms) de las peticiones dentro de la ventana. */
  hits: number[];
}

interface Limit {
  /** Peticiones permitidas por ventana. */
  max: number;
  /** Duración de la ventana en milisegundos. */
  windowMs: number;
}

const buckets = new Map<string, Bucket>();

/** Evita que el mapa crezca sin límite si llegan muchas IPs distintas. */
const MAX_BUCKETS = 10_000;

/**
 * Obtiene la IP del cliente. En Vercel el proxy la pone en `x-forwarded-for`
 * (el primer valor de la lista es el cliente original).
 */
export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "desconocida";
}

/**
 * Registra una petición y dice si excede el límite.
 * Devuelve `retryAfter` en segundos cuando toca esperar.
 */
export function rateLimit(
  key: string,
  { max, windowMs }: Limit
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const cutoff = now - windowMs;

  let bucket = buckets.get(key);
  if (!bucket) {
    if (buckets.size >= MAX_BUCKETS) sweep(now);
    bucket = { hits: [] };
    buckets.set(key, bucket);
  }

  // Descarta las marcas que ya salieron de la ventana.
  bucket.hits = bucket.hits.filter((t) => t > cutoff);

  if (bucket.hits.length >= max) {
    const oldest = bucket.hits[0];
    const retryAfter = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    return { ok: false, retryAfter };
  }

  bucket.hits.push(now);
  return { ok: true };
}

/** Elimina los buckets que ya no tienen marcas vigentes. */
function sweep(now: number) {
  const caducos: string[] = [];
  buckets.forEach((bucket, key) => {
    // Un día cubre la ventana más larga que usamos (el tope global).
    if (bucket.hits.every((t) => t <= now - 24 * 60 * 60 * 1000)) {
      caducos.push(key);
    }
  });
  caducos.forEach((key) => buckets.delete(key));
  // Si aún así sigue lleno, vacía todo antes que crecer sin control.
  if (buckets.size >= MAX_BUCKETS) buckets.clear();
}

/** Respuesta estándar 429 con la cabecera `Retry-After`. */
export function tooManyRequests(retryAfter: number, mensaje: string): Response {
  return Response.json(
    { error: mensaje },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}
