import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic();

const SEVERITY = [
  { max: 4,  label: "mínima" },
  { max: 9,  label: "leve" },
  { max: 14, label: "moderada" },
  { max: 19, label: "moderadamente severa" },
  { max: 27, label: "severa" },
];

const QUESTION_LABELS: Record<string, string[]> = {
  PHQ9: [
    "Poco interés o placer en hacer cosas",
    "Sentirse deprimido/a o sin esperanzas",
    "Dificultad para dormir o dormir demasiado",
    "Sentirse cansado/a o con poca energía",
    "Poco apetito o comer en exceso",
    "Sentirse mal consigo mismo/a o sentirse un fracaso",
    "Dificultad para concentrarse",
    "Moverse/hablar muy lento, o estar muy inquieto/a",
    "Pensamientos de hacerse daño o de estar mejor muerto/a",
  ],
  GAD7: [
    "Sentirse nervioso/a, ansioso/a o muy alterado/a",
    "No poder dejar de preocuparse o no poder controlar la preocupación",
    "Preocuparse demasiado por diferentes cosas",
    "Dificultad para relajarse",
    "Estar tan inquieto/a que es difícil permanecer sentado/a tranquilamente",
    "Enojarse o irritarse fácilmente",
    "Sentir miedo, como si algo terrible fuera a ocurrir",
  ],
};

const SCALE = ["Ningún día", "Varios días", "Más de la mitad de los días", "Casi todos los días"];

function getSeverity(score: number): string {
  return SEVERITY.find((s) => score <= s.max)?.label ?? "severa";
}

export async function POST(req: NextRequest) {
  let score: number;
  let answers: number[];
  let test: string;

  try {
    ({ score, answers, test } = await req.json());
    const expectedLength = test === "GAD7" ? 7 : 9;
    if (
      typeof score !== "number" ||
      !Array.isArray(answers) ||
      answers.length !== expectedLength ||
      answers.some((a) => typeof a !== "number" || a < 0 || a > 3) ||
      !["PHQ9", "GAD7"].includes(test)
    ) {
      return new Response("Datos inválidos", { status: 400 });
    }
  } catch {
    return new Response("JSON inválido", { status: 400 });
  }

  const severity = getSeverity(score);
  const labels = QUESTION_LABELS[test] ?? QUESTION_LABELS["PHQ9"];
  const maxScore = test === "GAD7" ? 21 : 27;
  const testName = test === "GAD7" ? "GAD-7" : "PHQ-9";
  const domain = test === "GAD7" ? "ansiedad" : "depresión";

  const itemList = answers
    .map((a, i) => `  ${i + 1}. ${labels[i]}: ${SCALE[a]}`)
    .join("\n");

  const prompt = `Eres Isaac Calderón, psicoterapeuta transpersonal con formación en psicotraumatología somática, neurofeedback y perspectiva transpersonal. Una persona ha completado el ${testName} con los siguientes resultados:

Puntuación total: ${score}/${maxScore} — ${domain} ${severity}

Respuestas ítem por ítem:
${itemList}

Escribe una interpretación personalizada en 3-4 párrafos. Debe:
- Hablar en segunda persona ("tú"), de forma directa y cálida
- Validar la experiencia sin dramatizar ni minimizar
- Contextualizar el puntaje con perspectiva transpersonal y somática: el sufrimiento como señal, no como condena
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
