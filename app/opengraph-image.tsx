import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Isaac Calderón Derat — Psicoterapeuta Transpersonal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* ── Logo geometry (mismo PATH que Logo.tsx, sin filtros SVG) ── */
const PATH =
  "M 250,378 C 317,377 373,344 392,297 C 405,261 402,213 386,177 " +
  "C 370,143 345,128 316,125 C 296,123 273,135 263,154 C 257,164 253,172 250,170 " +
  "C 247,172 243,164 237,154 C 227,135 204,123 184,125 C 155,128 130,143 114,177 " +
  "C 98,213 95,261 108,297 C 127,344 183,377 250,378 Z";

const RING_SCALES = [1.0, 0.72, 0.518, 0.373, 0.268];
const GAP_SCALES  = [0.86, 0.618, 0.445, 0.320];
const PALETTE     = ["#0f2140", "#183463", "#256D86", "#BCD3D6", "#EAD06A"];
const BG          = "#0B1830";

function tx(s: number) {
  return `translate(250,253) scale(${s}) translate(-250,-253)`;
}

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 100px",
          gap: 48,
        }}
      >
        {/* ── Línea decorativa izquierda ── */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 4,
            height: "100%",
            background: "linear-gradient(180deg, #0f2140 0%, #256D86 50%, #EAD06A 100%)",
          }}
        />

        {/* ── Texto ── */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Categoría */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 28,
            }}
          >
            <div style={{ width: 32, height: 2, backgroundColor: "#EAD06A", opacity: 0.8 }} />
            <span
              style={{
                color: "#EAD06A",
                fontSize: 15,
                letterSpacing: 4,
                textTransform: "uppercase",
                opacity: 0.85,
                fontFamily: "sans-serif",
              }}
            >
              Psicólogo · Psicoterapeuta Transpersonal
            </span>
          </div>

          {/* Nombre */}
          <div
            style={{
              color: "#eef2ec",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              fontFamily: "serif",
              marginBottom: 24,
            }}
          >
            Isaac Calderón Derat
          </div>

          {/* Tagline */}
          <div
            style={{
              color: "#eef2ec",
              fontSize: 26,
              lineHeight: 1.45,
              opacity: 0.52,
              fontFamily: "serif",
              marginBottom: 36,
            }}
          >
            Psicoterapia informada en trauma,{"\n"}
            somática y transpersonal.
          </div>

          {/* Dot + ciudad */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#256D86",
              }}
            />
            <span
              style={{
                color: "#256D86",
                fontSize: 17,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontFamily: "sans-serif",
              }}
            >
              CDMX · Online para hispanohablantes
            </span>
          </div>

          {/* URL */}
          <div
            style={{
              color: "#eef2ec",
              opacity: 0.22,
              fontSize: 15,
              letterSpacing: 3,
              marginTop: 32,
              fontFamily: "sans-serif",
            }}
          >
            isaaccalderon.me
          </div>
        </div>

        {/* ── Logo SVG ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 500 500" width={230} height={230}>
            {RING_SCALES.map((s, i) => (
              <g key={i}>
                <path fill={PALETTE[i]} transform={tx(s)} d={PATH} />
                {i < GAP_SCALES.length && (
                  <path fill={BG} transform={tx(GAP_SCALES[i])} d={PATH} />
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
