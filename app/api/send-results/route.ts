import { Resend } from "resend";
import { NextRequest } from "next/server";
import { TEST_CONFIGS, getBand, type TestId } from "@/lib/testData";

const THERAPIST_EMAIL = "psic@isaaccalderon.me";
const FROM_EMAIL = "evaluaciones@isaaccalderon.me";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let body: {
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
    testId: string;
    score: number;
    answers: number[];
    aiText?: string;
  };

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { nombre, apellido, telefono, correo, testId, score, answers, aiText } = body;

  if (!nombre || !apellido || !correo || !testId) {
    return Response.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  const config = TEST_CONFIGS[testId as TestId];
  if (!config) {
    return Response.json({ error: "Test no reconocido" }, { status: 400 });
  }

  const band = getBand(testId as TestId, score);

  const itemRows = answers
    .map((a, i) => {
      const scaleLabel = config.scale.find((s) => s.value === a)?.full ?? `${a}`;
      return `<tr style="border-bottom:1px solid #142b52">
        <td style="padding:6px 12px;color:#9bbdc2;font-size:12px">${i + 1}.</td>
        <td style="padding:6px 12px;font-size:13px;color:#eef2ec">${config.questions[i]}</td>
        <td style="padding:6px 12px;font-size:13px;color:#fff;text-align:right;white-space:nowrap">${scaleLabel}</td>
      </tr>`;
    })
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Resultados ${config.name}</title></head>
<body style="margin:0;padding:0;background:#0b1830;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;color:#eef2ec">
  <div style="max-width:640px;margin:0 auto;padding:40px 24px">

    <p style="font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#ead06a;margin:0 0 8px">Evaluación clínica · isaaccalderon.me</p>
    <h1 style="font-size:28px;color:#fff;margin:0 0 32px;font-weight:normal">${config.name} — ${config.subtitle}</h1>

    <!-- Contact -->
    <div style="background:#142b52;border-radius:4px;padding:20px 24px;margin-bottom:24px">
      <p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#bcd3d6;margin:0 0 12px">Datos de contacto</p>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:4px 0;color:#9bbdc2;font-size:13px;width:110px">Nombre</td><td style="padding:4px 0;color:#fff;font-size:13px">${nombre} ${apellido}</td></tr>
        <tr><td style="padding:4px 0;color:#9bbdc2;font-size:13px">Correo</td><td style="padding:4px 0;font-size:13px"><a href="mailto:${correo}" style="color:#256d86">${correo}</a></td></tr>
        ${telefono ? `<tr><td style="padding:4px 0;color:#9bbdc2;font-size:13px">Teléfono</td><td style="padding:4px 0;color:#fff;font-size:13px">${telefono}</td></tr>` : ""}
      </table>
    </div>

    <!-- Score -->
    <div style="background:#142b52;border-radius:4px;padding:20px 24px;margin-bottom:24px;display:flex;align-items:center;gap:24px">
      <p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#bcd3d6;margin:0 0 12px">Resultado</p>
      <div style="display:flex;align-items:baseline;gap:16px">
        <span style="font-size:48px;color:#fff;line-height:1">${score}${testId === "DESII" ? "%" : ""}</span>
        ${testId !== "DESII" ? `<span style="color:#4a72ab;font-size:16px">/ ${config.maxScore}</span>` : ""}
        <span style="font-size:13px;font-weight:bold;color:#ead06a;margin-left:8px">${band.label}</span>
      </div>
    </div>

    <!-- Items -->
    <div style="background:#142b52;border-radius:4px;overflow:hidden;margin-bottom:32px">
      <p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#bcd3d6;margin:0;padding:16px 24px 12px;border-bottom:1px solid #142b52">Respuestas</p>
      <table style="width:100%;border-collapse:collapse">
        ${itemRows}
      </table>
    </div>

    ${aiText ? `
    <!-- Análisis AI -->
    <div style="background:#142b52;border-radius:4px;padding:20px 24px;margin-bottom:24px">
      <p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#bcd3d6;margin:0 0 16px">Interpretación AI</p>
      ${aiText.split("\n\n").filter(Boolean).map(p =>
        `<p style="font-size:13px;color:#eef2ec;line-height:1.7;margin:0 0 12px">${p.trim()}</p>`
      ).join("")}
    </div>` : ""}

    <p style="font-size:11px;color:#4a72ab;text-align:center;margin:0">${config.disclaimer}</p>
  </div>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: THERAPIST_EMAIL,
      replyTo: correo,
      subject: `[${config.name}] Resultados de ${nombre} ${apellido} — ${band.label}`,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return Response.json({ error: "Error al enviar correo" }, { status: 500 });
  }
}
