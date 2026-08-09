"use client";

interface LogoProps {
  size?: number;
  variant?: "color" | "mono" | "dark";
  className?: string;
}

// Paleta Sea from Space — exterior (oscuro) → interior (oro)
const PALETTE_COLOR = ["#0f2140", "#183463", "#256D86", "#BCD3D6", "#EAD06A"];
const PALETTE_MONO  = ["#1a1a18", "#1a1a18", "#1a1a18", "#1a1a18", "#1a1a18"];

// Silueta del cerebro visto desde arriba, bilobal, surco central sutil
// Escala logarítmica basada en φ ≈ 1.618 para efecto nautilus / galaxia
const RING_SCALES = [1.0,  0.72, 0.518, 0.373, 0.268];
const GAP_SCALES  = [0.86, 0.618, 0.445, 0.320];
const SEEDS       = [3, 11, 19, 27, 35];
const DISP        = [4.0, 3.5, 3.0, 2.5, 2.0];

const PATH = [
  "M 250,378",
  "C 317,377 373,344 392,297",
  "C 405,261 402,213 386,177",
  "C 370,143 345,128 316,125",
  "C 296,123 273,135 263,154",
  "C 257,164 253,172 250,170",
  "C 247,172 243,164 237,154",
  "C 227,135 204,123 184,125",
  "C 155,128 130,143 114,177",
  "C 98,213 95,261 108,297",
  "C 127,344 183,377 250,378 Z",
].join(" ");

function tx(s: number) {
  return `translate(250,253) scale(${s}) translate(-250,-253)`;
}

export default function Logo({
  size = 48,
  variant = "color",
  className = "",
}: LogoProps) {
  const colors   = variant === "mono" ? PALETTE_MONO : PALETTE_COLOR;
  const gapColor = variant === "dark"  ? "#0B1830" : "white";

  // ID único por instancia para evitar colisiones de filtros en el DOM
  const uid = `logo-${variant}-${size}`;

  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={className}
      aria-label="Isaac Calderón Derat — símbolo de marca"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {SEEDS.map((seed, i) => (
          <filter
            key={i}
            id={`${uid}-f${i}`}
            x="-7%"
            y="-7%"
            width="114%"
            height="114%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves={4}
              seed={seed}
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale={DISP[i]}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}
      </defs>

      {RING_SCALES.map((s, i) => (
        <g key={i}>
          {/* Capa de color */}
          <path
            fill={colors[i]}
            filter={`url(#${uid}-f${i})`}
            transform={tx(s)}
            d={PATH}
          />
          {/* Espacio entre capas (máscara de fondo) */}
          {i < GAP_SCALES.length && (
            <path
              fill={gapColor}
              transform={tx(GAP_SCALES[i])}
              d={PATH}
            />
          )}
        </g>
      ))}
    </svg>
  );
}
