import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { TEST_CONFIGS, getBand, type TestId } from "@/lib/testData";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";

const HORA = 60 * 60 * 1000;
const DIA = 24 * HORA;

/** Interpretaciones permitidas por IP y por hora. */
const POR_IP = { max: 5, windowMs: HORA };
/** Tope global diario — protege el presupuesto de API ante un abuso distribuido. */
const GLOBAL = { max: 100, windowMs: DIA };

export async function POST(req: NextRequest) {
  const porIp = rateLimit(`interpret:${clientIp(req)}`, POR_IP);
  if (!porIp.ok) {
    return tooManyRequests(
      porIp.retryAfter,
      "Has pedido varias interpretaciones seguidas. Espera un momento antes de volver a intentarlo."
    );
  }

  const global = rateLimit("interpret:global", GLOBAL);
  if (!global.ok) {
    return tooManyRequests(
      global.retryAfter,
      "La interpretación con IA no está disponible en este momento. Puedes enviar tus resultados a Isaac directamente."
    );
  }

  const client = new Anthropic();
  let score: number;
  let answers: number[];
  let test: string;

  try {
    ({ score, answers, test } = await req.json());
    const config = TEST_CONFIGS[test as TestId];
    if (
      !config ||
      typeof score !== "number" ||
      !Array.isArray(answers) ||
      answers.length !== config.questions.length ||
      answers.some((a) => typeof a !== "number")
    ) {
      return new Response("Datos inválidos", { status: 400 });
    }
  } catch {
    return new Response("JSON inválido", { status: 400 });
  }

  const config = TEST_CONFIGS[test as TestId];
  const band = getBand(test as TestId, score);
  const maxScore = config.maxScore;

  const itemList = answers
    .map((a, i) => {
      const scaleLabel = config.scale.find((s) => s.value === a)?.full ?? `${a}`;
      return `  ${i + 1}. ${config.questions[i]}: ${scaleLabel}`;
    })
    .join("\n");

  const prompt = `Eres Isaac Calderón, psicoterapeuta transpersonal con formación en psicotraumatología somática, neurofeedback y perspectiva transpersonal. Una persona ha completado el ${config.name} (${config.subtitle}) con los siguientes resultados:

Puntuación total: ${score}/${maxScore} — ${band.label}

Respuestas ítem por ítem:
${itemList}

Escribe una interpretación personalizada en 3-4 párrafos. Debe:
- Hablar en segunda persona ("tú"), de forma directa y cálida
- Validar la experiencia sin dramatizar ni minimizar
- Contextualizar el puntaje con perspectiva transpersonal y somática
- Destacar con cuidado los ítems de mayor puntuación como áreas de atención
- Cerrar con una invitación honesta a profundizar si el proceso lo requiere, sin presionar

Tono: humano, clínico con alma. No emitir diagnóstico definitivo. En español.`;

  const stream = client.messages.stream({
    model: "claude-opus-4-8",
    max_tokens: 2048,
    thinking: { type: "adaptive" },
    messages: [{ role: "user", content: prompt }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
