export type TestId = "PHQ9" | "GAD7" | "DASS21" | "PCL5" | "DESII" | "ACE" | "SDS" | "SWLS" | "MEQ30";

export interface ScaleOption {
  value: number;
  short: string;
  full: string;
}

export interface Band {
  max: number;
  label: string;
  description: string;
  textClass: string;
  barClass: string;
}

export interface SubScale {
  label: string;
  indices: number[];
  multiplier?: number;
  maxScore: number;
  bands: { max: number; label: string; textClass: string }[];
}

export interface TestConfig {
  name: string;
  subtitle: string;
  cardDescription: string;
  accentClass: string;
  borderClass: string;
  btnSelectedClass: string;
  btnHoverClass: string;
  barClass: string;
  questions: string[];
  shortLabels: string[];
  instructions: string;
  scale: ScaleOption[];
  computeScore: (answers: number[]) => number;
  maxScore: number;
  minScore: number;
  bands: Band[];
  subScales?: SubScale[];
  disclaimer: string;
  note?: string;
}

const B = {
  mint:  { textClass: "text-brand-mint",  barClass: "bg-brand-mint" },
  teal:  { textClass: "text-brand-teal",  barClass: "bg-brand-teal" },
  gold:  { textClass: "text-brand-gold",  barClass: "bg-brand-gold" },
  red:   { textClass: "text-red-400",     barClass: "bg-red-400" },
  mid:   { textClass: "text-brand-mid",   barClass: "bg-brand-mid" },
};

const DASS_SCALE: ScaleOption[] = [
  { value: 0, short: "Nunca", full: "No me ocurrió" },
  { value: 1, short: "Poco",  full: "A veces" },
  { value: 2, short: "Bastante", full: "Bastante veces" },
  { value: 3, short: "Mucho", full: "Casi siempre" },
];

export const TEST_CONFIGS: Record<TestId, TestConfig> = {
  PHQ9: {
    name: "PHQ-9",
    subtitle: "Depresión",
    cardDescription: "9 preguntas · ~2 min · Evalúa la presencia y severidad de síntomas depresivos.",
    accentClass: "text-brand-teal",
    borderClass: "border-brand-teal/40 hover:border-brand-teal",
    btnSelectedClass: "bg-brand-teal border-brand-teal text-white",
    btnHoverClass: "hover:border-brand-teal/50 hover:text-brand-teal",
    barClass: "bg-brand-teal",
    questions: [
      "Poco interés o placer en hacer las cosas",
      "Sentirse decaído/a, deprimido/a o sin esperanzas",
      "Con dificultad para quedarse o permanecer dormido/a, o dormir demasiado",
      "Sentirse cansado/a o con poca energía",
      "Con poco apetito o comiendo en exceso",
      "Sintiéndose mal consigo mismo/a — o sintiéndose un fracaso",
      "Con dificultad para concentrarse en cosas como leer o ver televisión",
      "¿Se ha movido o hablado tan lento que otras personas lo noten? O lo contrario: muy inquieto/a",
      "Pensamientos de que estaría mejor muerto/a o de hacerse daño",
    ],
    shortLabels: [
      "Poco interés o placer", "Ánimo deprimido", "Sueño alterado",
      "Fatiga", "Apetito alterado", "Baja autoestima",
      "Concentración", "Lentitud o agitación", "Pensamientos de daño",
    ],
    instructions: "En las últimas dos semanas, ¿con qué frecuencia te han molestado los siguientes problemas?",
    scale: [
      { value: 0, short: "Nunca", full: "Ningún día" },
      { value: 1, short: "Varios", full: "Varios días" },
      { value: 2, short: "Mitad", full: "Más de la mitad" },
      { value: 3, short: "Siempre", full: "Casi todos los días" },
    ],
    computeScore: (a) => a.reduce((s, x) => s + x, 0),
    maxScore: 27,
    minScore: 0,
    bands: [
      { max: 4,  label: "Mínima",               ...B.mint, description: "Los síntomas depresivos son muy leves o ausentes. El bienestar emocional parece estar mayormente preservado." },
      { max: 9,  label: "Leve",                 ...B.teal, description: "Hay algunas dificultades presentes que merecen atención, aunque son manejables por el momento." },
      { max: 14, label: "Moderada",             ...B.gold, description: "Síntomas de intensidad moderada que probablemente están afectando áreas importantes de tu vida cotidiana." },
      { max: 19, label: "Moderadamente severa", ...B.gold, description: "Los síntomas son significativos. El acompañamiento profesional puede marcar una diferencia real." },
      { max: 27, label: "Severa",               ...B.red,  description: "El nivel de síntomas es alto. Es importante buscar apoyo profesional lo antes posible." },
    ],
    disclaimer: "El PHQ-9 es una herramienta de tamizaje clínico, no un diagnóstico definitivo.",
  },

  GAD7: {
    name: "GAD-7",
    subtitle: "Ansiedad",
    cardDescription: "7 preguntas · ~1 min · Identifica y mide la severidad del trastorno de ansiedad generalizada.",
    accentClass: "text-brand-gold",
    borderClass: "border-brand-gold/40 hover:border-brand-gold",
    btnSelectedClass: "bg-brand-gold border-brand-gold text-brand-night",
    btnHoverClass: "hover:border-brand-gold/50 hover:text-brand-gold",
    barClass: "bg-brand-gold",
    questions: [
      "Sentirse nervioso/a, ansioso/a o muy alterado/a",
      "No poder dejar de preocuparse o no poder controlar la preocupación",
      "Preocuparse demasiado por diferentes cosas",
      "Dificultad para relajarse",
      "Estar tan inquieto/a que es difícil permanecer sentado/a tranquilamente",
      "Enojarse o irritarse fácilmente",
      "Sentir miedo, como si algo terrible fuera a ocurrir",
    ],
    shortLabels: [
      "Nerviosismo o tensión", "Preocupación incontrolable", "Preocupación excesiva",
      "Dificultad para relajarse", "Inquietud o agitación", "Irritabilidad",
      "Miedo anticipatorio",
    ],
    instructions: "En las últimas dos semanas, ¿con qué frecuencia te han molestado los siguientes problemas?",
    scale: [
      { value: 0, short: "Nunca",   full: "Ningún día" },
      { value: 1, short: "Varios",  full: "Varios días" },
      { value: 2, short: "Mitad",   full: "Más de la mitad" },
      { value: 3, short: "Siempre", full: "Casi todos los días" },
    ],
    computeScore: (a) => a.reduce((s, x) => s + x, 0),
    maxScore: 21,
    minScore: 0,
    bands: [
      { max: 4,  label: "Mínima",   ...B.mint, description: "Los síntomas de ansiedad son muy leves o prácticamente ausentes en este momento." },
      { max: 9,  label: "Leve",     ...B.teal, description: "Hay cierto nivel de activación ansiosa presente que merece atención para evitar que se intensifique." },
      { max: 14, label: "Moderada", ...B.gold, description: "Ansiedad de intensidad moderada que probablemente afecta tu descanso, concentración o relaciones." },
      { max: 21, label: "Severa",   ...B.red,  description: "El nivel de ansiedad es alto. Trabajar con el sistema nervioso con apoyo profesional puede traer alivio real." },
    ],
    disclaimer: "El GAD-7 es una herramienta de tamizaje clínico, no un diagnóstico definitivo.",
  },

  DASS21: {
    name: "DASS-21",
    subtitle: "Depresión · Ansiedad · Estrés",
    cardDescription: "21 preguntas · ~5 min · Evalúa simultáneamente depresión, ansiedad y estrés con tres subescalas.",
    accentClass: "text-brand-mint",
    borderClass: "border-brand-mint/40 hover:border-brand-mint",
    btnSelectedClass: "bg-brand-mint border-brand-mint text-brand-night",
    btnHoverClass: "hover:border-brand-mint/50 hover:text-brand-mint",
    barClass: "bg-brand-mint",
    questions: [
      "Me costó mucho relajarme",
      "Me di cuenta que tenía la boca seca",
      "No podía sentir ningún sentimiento positivo",
      "Se me hizo difícil respirar",
      "Se me hizo difícil tomar la iniciativa para hacer cosas",
      "Reaccioné exageradamente en ciertas situaciones",
      "Sentí que mis manos temblaban",
      "Sentí que tenía muchos nervios",
      "Estaba preocupado/a por situaciones en que podía entrar en pánico o hacer el ridículo",
      "Sentí que no tenía nada por qué vivir",
      "Noté que me agitaba",
      "Se me hizo difícil relajarme",
      "Me sentí triste y deprimido/a",
      "No toleré nada que no me dejara continuar con lo que estaba haciendo",
      "Sentí que estaba al punto de pánico",
      "No me pude entusiasmar por nada",
      "Sentí que valía muy poco como persona",
      "Sentí que estaba muy irritable",
      "Sentí los latidos de mi corazón sin haber hecho esfuerzo físico",
      "Tuve miedo sin razón",
      "Sentí que la vida no tenía ningún sentido",
    ],
    shortLabels: [
      "Relajación", "Boca seca", "Sentimientos positivos ausentes", "Dificultad respirar",
      "Iniciativa", "Reacciones exageradas", "Manos temblando", "Nervios",
      "Miedo al ridículo", "Sin razón para vivir", "Agitación", "Relajarse",
      "Tristeza", "Intolerancia", "Pánico", "Entusiasmo", "Autoestima",
      "Irritabilidad", "Palpitaciones", "Miedo sin razón", "Sin sentido de vida",
    ],
    instructions: "Durante la última semana, ¿con qué frecuencia te ocurrieron las siguientes situaciones?",
    scale: DASS_SCALE,
    computeScore: (a) => a.reduce((s, x) => s + x, 0),
    maxScore: 63,
    minScore: 0,
    bands: [
      { max: 20, label: "Rango bajo",    ...B.mint, description: "Los puntajes globales sugieren baja carga sintomática en las tres dimensiones evaluadas." },
      { max: 35, label: "Rango medio",   ...B.teal, description: "Hay síntomas presentes que merecen atención. Las subescalas muestran dónde se concentra la carga." },
      { max: 50, label: "Rango alto",    ...B.gold, description: "Carga sintomática significativa. El acompañamiento profesional puede hacer una diferencia importante." },
      { max: 63, label: "Rango muy alto", ...B.red, description: "Nivel de síntomas elevado en una o más dimensiones. Se recomienda buscar apoyo profesional pronto." },
    ],
    subScales: [
      {
        label: "Depresión",
        indices: [2, 4, 9, 12, 15, 16, 20],
        multiplier: 2,
        maxScore: 42,
        bands: [
          { max: 9,  label: "Normal", textClass: B.mint.textClass },
          { max: 13, label: "Leve",   textClass: B.teal.textClass },
          { max: 20, label: "Moderada", textClass: B.gold.textClass },
          { max: 27, label: "Severa", textClass: B.gold.textClass },
          { max: 42, label: "Ext. severa", textClass: B.red.textClass },
        ],
      },
      {
        label: "Ansiedad",
        indices: [1, 3, 6, 8, 14, 18, 19],
        multiplier: 2,
        maxScore: 42,
        bands: [
          { max: 7,  label: "Normal", textClass: B.mint.textClass },
          { max: 9,  label: "Leve",   textClass: B.teal.textClass },
          { max: 14, label: "Moderada", textClass: B.gold.textClass },
          { max: 19, label: "Severa", textClass: B.gold.textClass },
          { max: 42, label: "Ext. severa", textClass: B.red.textClass },
        ],
      },
      {
        label: "Estrés",
        indices: [0, 5, 7, 10, 11, 13, 17],
        multiplier: 2,
        maxScore: 42,
        bands: [
          { max: 14, label: "Normal", textClass: B.mint.textClass },
          { max: 18, label: "Leve",   textClass: B.teal.textClass },
          { max: 25, label: "Moderado", textClass: B.gold.textClass },
          { max: 33, label: "Severo", textClass: B.gold.textClass },
          { max: 42, label: "Ext. severo", textClass: B.red.textClass },
        ],
      },
    ],
    disclaimer: "El DASS-21 es una herramienta de investigación y tamizaje clínico (UNSW, uso no comercial).",
  },

  PCL5: {
    name: "PCL-5",
    subtitle: "TEPT / Trauma",
    cardDescription: "20 preguntas · ~5 min · Evalúa síntomas de estrés postraumático basado en el DSM-5.",
    accentClass: "text-brand-mid",
    borderClass: "border-brand-mid/40 hover:border-brand-mid",
    btnSelectedClass: "bg-brand-mid border-brand-mid text-white",
    btnHoverClass: "hover:border-brand-mid/50 hover:opacity-100",
    barClass: "bg-brand-mid",
    questions: [
      "Recuerdos repetidos, perturbadores e involuntarios de la experiencia",
      "Sueños perturbadores relacionados con la experiencia",
      "Sentir o actuar de repente como si la experiencia estuviera ocurriendo de nuevo (flashback)",
      "Sentirte muy alterado/a cuando algo te recuerda la experiencia",
      "Reacciones físicas intensas cuando algo te recuerda la experiencia (palpitaciones, sudoración, etc.)",
      "Evitar recuerdos, pensamientos o sentimientos relacionados con la experiencia",
      "Evitar personas, lugares o situaciones que te recuerden la experiencia",
      "Problemas para recordar partes importantes de la experiencia",
      "Creencias negativas fuertes sobre ti mismo/a, los demás o el mundo",
      "Culparte a ti mismo/a o a otros por lo que ocurrió",
      "Sentimientos negativos intensos (miedo, horror, ira, culpa, vergüenza)",
      "Perder el interés en actividades que antes disfrutabas",
      "Sentirte distante o separado/a de las personas a tu alrededor",
      "Dificultad para experimentar sentimientos positivos (alegría, amor)",
      "Conducta irritable o exabruptos de enojo",
      "Asumir riesgos o comportarse de manera que pueda causarte daño",
      "Estar supercalerto/a, vigilante o en guardia constantemente",
      "Sobresaltarte fácilmente con ruidos u otras cosas",
      "Dificultad para concentrarte",
      "Problemas para dormir",
    ],
    shortLabels: [
      "Recuerdos intrusivos", "Sueños perturbadores", "Flashbacks", "Angustia ante recordatorios",
      "Reacciones físicas", "Evitación interna", "Evitación externa", "Amnesia traumática",
      "Creencias negativas", "Autoinculpación", "Emociones negativas", "Pérdida de interés",
      "Distanciamiento", "Embotamiento afectivo", "Irritabilidad", "Conductas de riesgo",
      "Hipervigilancia", "Sobresalto", "Concentración", "Sueño",
    ],
    instructions: "En el último mes, ¿cuánto le han molestado los siguientes problemas relacionados con una experiencia estresante o traumática del pasado?",
    scale: [
      { value: 0, short: "Nada",   full: "En absoluto" },
      { value: 1, short: "Poco",   full: "Un poco" },
      { value: 2, short: "Algo",   full: "Moderadamente" },
      { value: 3, short: "Bastante", full: "Bastante" },
      { value: 4, short: "Mucho",  full: "Extremadamente" },
    ],
    note: "Piensa en una experiencia estresante o perturbadora del pasado mientras respondes estas preguntas.",
    computeScore: (a) => a.reduce((s, x) => s + x, 0),
    maxScore: 80,
    minScore: 0,
    bands: [
      { max: 20, label: "Sin síntomas significativos", ...B.mint, description: "Los síntomas de estrés postraumático son bajos o ausentes en este momento." },
      { max: 32, label: "Síntomas leves",              ...B.teal, description: "Presencia de síntomas leves que pueden beneficiarse de exploración." },
      { max: 49, label: "Síntomas moderados",          ...B.gold, description: "Nivel sintomático moderado. El acompañamiento especializado en trauma puede ser muy útil." },
      { max: 80, label: "Síntomas severos",            ...B.red,  description: "Puntaje ≥33 sugiere TEPT probable. Se recomienda evaluación clínica especializada." },
    ],
    disclaimer: "El PCL-5 es un instrumento de tamizaje del VA (dominio público). No reemplaza una evaluación clínica especializada en trauma.",
  },

  DESII: {
    name: "DES-II",
    subtitle: "Disociación",
    cardDescription: "28 preguntas · ~7 min · Mide experiencias disociativas en la vida cotidiana (porcentaje de tiempo).",
    accentClass: "text-brand-teal",
    borderClass: "border-brand-teal/30 hover:border-brand-teal",
    btnSelectedClass: "bg-brand-teal border-brand-teal text-white",
    btnHoverClass: "hover:border-brand-teal/50 hover:text-brand-teal",
    barClass: "bg-brand-teal",
    questions: [
      "Conducir o viajar y de repente no recordar parte o todo el trayecto",
      "Escuchar a alguien hablar y darse cuenta de que no captaste parte de lo que dijo",
      "Encontrarte en un lugar y no saber cómo llegaste ahí",
      "Encontrarte usando ropa diferente a la que recuerdas haber puesto",
      "Encontrar escritura, dibujos u objetos entre tus cosas que debes haber hecho pero no recuerdas",
      "No reconocer a amigos o familiares",
      "Sentir como si estuvieras parado/a a tu lado mirándote desde fuera de tu cuerpo",
      "Que te digan que a veces no reconoces a personas cercanas",
      "No tener ningún recuerdo de eventos importantes de tu vida (como una boda o graduación)",
      "Ser acusado/a de mentir cuando sientes que estás diciendo la verdad",
      "Sentir que tu cuerpo no te pertenece",
      "Sentir que las personas, objetos y el mundo a tu alrededor no son reales",
      "Sentir que tu cuerpo no parece pertenecer a ti",
      "Recordar un evento pasado con tanta viveza que sientes que lo estás reviviendo",
      "No estar seguro/a si algo que recuerdas realmente ocurrió o solo lo soñaste",
      "Estar tan absorto/a en una fantasía o ensoñación que sientes que realmente está pasando",
      "Hacer algo pero no saber por qué lo estás haciendo",
      "Mirar al vacío, perderte en tus pensamientos sin ser consciente del tiempo que pasa",
      "Hablar en voz alta contigo mismo/a cuando estás solo/a",
      "Comportarte de manera muy diferente en distintas situaciones, como siendo una persona diferente",
      "Sentir que las personas y el mundo a tu alrededor no son reales",
      "Sentir que estás en un lugar pero también en otro al mismo tiempo",
      "Mirar al espejo y no reconocer a la persona que ves",
      "Percibir cosas que ves como si no fueran reales, aunque sabes que sí lo son",
      "No poder recordar si hiciste algo o solo pensaste en hacerlo",
      "Encontrar evidencia de que hiciste cosas de las cuales no tienes recuerdo",
      "Encontrar escritura o dibujos que debes haber hecho pero no puedes recordar haberlos hecho",
      "Escuchar voces en tu cabeza que te dicen que hagas cosas o que comentan lo que estás haciendo",
    ],
    shortLabels: [
      "Amnesia en viaje", "Pérdidas auditivas", "Amnesia de lugar", "Cambio de ropa", "Escritura sin recuerdo",
      "No reconocer personas", "Salir del cuerpo", "Acusado de no reconocer", "Amnesia de eventos importantes",
      "Acusado de mentir", "Cuerpo ajeno", "Mundo irreal", "Cuerpo no propio", "Revivir el pasado",
      "Confusión sueño/realidad", "Absorción en fantasías", "Actos sin motivo", "Pérdida de tiempo",
      "Hablar solo", "Identidad múltiple", "Mundo irreal (dup.)", "Doble presencia", "No reconocerse en espejo",
      "Cosas que no parecen reales", "Duda sobre acciones", "Evidencia de actos sin recuerdo",
      "Escritura/dibujos sin recuerdo", "Voces internas",
    ],
    instructions: "Las siguientes son experiencias que algunas personas tienen en su vida cotidiana. Indica qué porcentaje del tiempo tienes cada experiencia.",
    scale: Array.from({ length: 11 }, (_, i) => ({
      value: i,
      short: `${i * 10}%`,
      full: `${i * 10}%`,
    })),
    computeScore: (a) => Math.round((a.reduce((s, x) => s + x, 0) / a.length) * 10),
    maxScore: 100,
    minScore: 0,
    bands: [
      { max: 15, label: "Dentro de lo normal", ...B.mint, description: "El nivel de experiencias disociativas está dentro del rango esperado para la población general." },
      { max: 29, label: "Leve",                ...B.teal, description: "Algunas experiencias disociativas presentes, lo que puede ser normal o relacionado con estrés." },
      { max: 49, label: "Moderada",            ...B.gold, description: "Nivel moderado de disociación que puede merecer exploración con un especialista en trauma." },
      { max: 100, label: "Significativa",      ...B.red,  description: "Puntaje ≥30 sugiere disociación clínicamente significativa. Se recomienda evaluación especializada." },
    ],
    disclaimer: "El DES-II es de dominio público (Carlson & Putnam). El puntaje es el promedio de tus respuestas expresado en porcentaje.",
  },

  ACE: {
    name: "ACE",
    subtitle: "Experiencias adversas en la infancia",
    cardDescription: "10 preguntas · ~2 min · Evalúa experiencias adversas antes de los 18 años y su impacto potencial en la salud.",
    accentClass: "text-brand-gold",
    borderClass: "border-brand-gold/40 hover:border-brand-gold",
    btnSelectedClass: "bg-brand-gold border-brand-gold text-brand-night",
    btnHoverClass: "hover:border-brand-gold/50 hover:text-brand-gold",
    barClass: "bg-brand-gold",
    questions: [
      "¿Un padre u otra persona en casa te insultaba frecuentemente, te denigraba o te hacía sentir miedo?",
      "¿Un padre u otra persona en casa te empujaba, golpeaba, abofeteaba o lanzaba cosas, dejándote marcas o lastimándote?",
      "¿Un adulto (mayor que tú al menos 5 años) te tocó de manera sexual, o intentó tener relaciones sexuales contigo?",
      "¿Con frecuencia sentías que nadie en tu familia te amaba, o que tu familia no se cuidaba mutuamente?",
      "¿Con frecuencia no tenías suficiente para comer, ropa limpia, o nadie que te protegiera?",
      "¿Alguna vez perdiste a uno de tus padres por divorcio, abandono o alguna otra razón?",
      "¿Tu mamá o madrastra era golpeada, pateada o amenazada físicamente por una pareja?",
      "¿Viviste con alguien que tuviera problemas con el alcohol o usara drogas ilegales?",
      "¿Algún miembro de tu hogar estuvo deprimido, con enfermedad mental, o intentó suicidarse?",
      "¿Algún miembro de tu hogar fue encarcelado?",
    ],
    shortLabels: [
      "Abuso emocional", "Abuso físico", "Abuso sexual", "Negligencia emocional",
      "Negligencia física", "Separación parental", "Violencia doméstica",
      "Alcohol/drogas en casa", "Enfermedad mental en casa", "Encarcelamiento familiar",
    ],
    instructions: "Las siguientes preguntas son sobre experiencias que pueden haber ocurrido durante tu infancia, antes de cumplir los 18 años.",
    note: "Responder estas preguntas puede traer recuerdos difíciles. Tómate el tiempo que necesites y cuídate.",
    scale: [
      { value: 0, short: "No", full: "No" },
      { value: 1, short: "Sí", full: "Sí" },
    ],
    computeScore: (a) => a.reduce((s, x) => s + x, 0),
    maxScore: 10,
    minScore: 0,
    bands: [
      { max: 0,  label: "Sin ACE reportadas",   ...B.mint, description: "No reportas experiencias adversas en la infancia en las categorías evaluadas." },
      { max: 3,  label: "ACE bajas (1-3)",       ...B.teal, description: "Puntajes bajos. Incluso un ACE puede tener impacto; lo importante es el contexto y los factores protectores." },
      { max: 6,  label: "ACE moderadas (4-6)",   ...B.gold, description: "Investigación del CDC muestra que puntajes mayores se asocian a mayor riesgo de problemas de salud física y mental." },
      { max: 10, label: "ACE altas (7+)",         ...B.red,  description: "Puntaje alto. El trauma acumulado en la infancia tiene efectos biológicos reales. El trabajo terapéutico puede marcar diferencia." },
    ],
    disclaimer: "El cuestionario ACE es de dominio público (CDC). Los resultados son orientativos e informativos, no diagnósticos.",
  },

  SDS: {
    name: "SDS",
    subtitle: "Deterioro funcional",
    cardDescription: "3 preguntas · ~1 min · Mide el impacto de los síntomas en el trabajo, la vida social y el hogar.",
    accentClass: "text-brand-teal",
    borderClass: "border-brand-teal/30 hover:border-brand-teal",
    btnSelectedClass: "bg-brand-teal border-brand-teal text-white",
    btnHoverClass: "hover:border-brand-teal/50 hover:text-brand-teal",
    barClass: "bg-brand-teal",
    questions: [
      "Trabajo o estudios",
      "Vida social y de entretenimiento",
      "Vida familiar o responsabilidades domésticas",
    ],
    shortLabels: [
      "Trabajo/estudios", "Vida social", "Vida familiar",
    ],
    instructions: "Usando la escala del 0 al 10, indica qué tanto tus síntomas o dificultades actuales han afectado estas áreas de tu vida:",
    scale: Array.from({ length: 11 }, (_, i) => ({
      value: i,
      short: `${i}`,
      full: i === 0 ? "Sin impacto" : i === 5 ? "Moderado" : i === 10 ? "Extremo" : `${i}`,
    })),
    computeScore: (a) => a.reduce((s, x) => s + x, 0),
    maxScore: 30,
    minScore: 0,
    bands: [
      { max: 4,  label: "Sin deterioro significativo", ...B.mint, description: "Los síntomas tienen poco impacto en las áreas evaluadas." },
      { max: 11, label: "Deterioro leve",              ...B.teal, description: "Algunos síntomas afectan el funcionamiento, aunque de manera manejable." },
      { max: 20, label: "Deterioro moderado",          ...B.gold, description: "Los síntomas están afectando de forma notable el trabajo, la vida social o el hogar." },
      { max: 30, label: "Deterioro severo",            ...B.red,  description: "Impacto significativo en varias áreas de la vida. El apoyo profesional puede ser muy útil." },
    ],
    disclaimer: "La Escala de Deterioro de Sheehan (SDS) es de dominio público (Sheehan). Mide el impacto funcional percibido.",
  },

  SWLS: {
    name: "SWLS",
    subtitle: "Satisfacción con la vida",
    cardDescription: "5 afirmaciones · ~1 min · Evalúa la satisfacción global con la vida según tu propia valoración.",
    accentClass: "text-brand-mint",
    borderClass: "border-brand-mint/40 hover:border-brand-mint",
    btnSelectedClass: "bg-brand-mint border-brand-mint text-brand-night",
    btnHoverClass: "hover:border-brand-mint/50 hover:text-brand-mint",
    barClass: "bg-brand-mint",
    questions: [
      "En la mayoría de los aspectos, mi vida es cercana a mi ideal",
      "Las condiciones de mi vida son excelentes",
      "Estoy satisfecho/a con mi vida",
      "Hasta ahora he obtenido las cosas importantes que quiero en la vida",
      "Si pudiera vivir mi vida de nuevo, no cambiaría casi nada",
    ],
    shortLabels: [
      "Vida cercana al ideal", "Condiciones de vida", "Satisfacción general",
      "Metas alcanzadas", "Vida sin cambios",
    ],
    instructions: "Indica cuánto acuerdo tienes con cada una de las siguientes afirmaciones sobre tu vida en general:",
    scale: [
      { value: 1, short: "1", full: "Muy en desacuerdo" },
      { value: 2, short: "2", full: "En desacuerdo" },
      { value: 3, short: "3", full: "Algo en desacuerdo" },
      { value: 4, short: "4", full: "Ni de acuerdo ni en desacuerdo" },
      { value: 5, short: "5", full: "Algo de acuerdo" },
      { value: 6, short: "6", full: "De acuerdo" },
      { value: 7, short: "7", full: "Muy de acuerdo" },
    ],
    computeScore: (a) => a.reduce((s, x) => s + x, 0),
    maxScore: 35,
    minScore: 5,
    bands: [
      { max: 9,  label: "Muy insatisfecho/a",       ...B.red,  description: "Puntaje muy bajo. La percepción de la vida en este momento es de fuerte insatisfacción." },
      { max: 14, label: "Insatisfecho/a",            ...B.gold, description: "Insatisfacción notable con la vida. Explorar las áreas de mayor peso puede ser muy útil." },
      { max: 19, label: "Ligeramente insatisfecho/a", ...B.gold, description: "Hay aspectos de la vida que no están funcionando del todo bien para ti." },
      { max: 24, label: "Ni satisfecho/a ni insatisfecho/a", ...B.teal, description: "Zona neutra. Ni claramente positivo ni negativo en la valoración global de tu vida." },
      { max: 29, label: "Ligeramente satisfecho/a",  ...B.teal, description: "En general la vida te parece satisfactoria, con áreas de mejora posible." },
      { max: 34, label: "Satisfecho/a",              ...B.mint, description: "Buena satisfacción general con la vida. Las cosas importantes parecen estar funcionando." },
      { max: 35, label: "Muy satisfecho/a",          ...B.mint, description: "Alta satisfacción con la vida en general. Puntaje en el rango más positivo." },
    ],
    disclaimer: "La SWLS es de libre uso no comercial (Diener et al.). Evalúa satisfacción percibida, no bienestar objetivo.",
  },

  MEQ30: {
    name: "MEQ-30",
    subtitle: "Experiencia mística",
    cardDescription: "30 preguntas · ~5 min · Evalúa la profundidad e intensidad de una experiencia no ordinaria de conciencia.",
    accentClass: "text-brand-gold",
    borderClass: "border-brand-gold/40 hover:border-brand-gold",
    btnSelectedClass: "bg-brand-gold border-brand-gold text-brand-night",
    btnHoverClass: "hover:border-brand-gold/50 hover:text-brand-gold",
    barClass: "bg-brand-gold",
    questions: [
      "Perdiste tu sentido habitual del tiempo",
      "Experimentaste una sensación de unidad con los objetos y personas a tu alrededor",
      "Experimentaste una pérdida de tu sentido habitual de ti mismo/a",
      "Obtuviste una comprensión o entendimiento nuevo",
      "Experimentaste una sensación de contacto sagrado o divino",
      "Experimentaste sensaciones de alegría y bienestar",
      "Sentiste que el universo estaba vivo",
      "Tus experiencias no pudieron expresarse completamente con palabras",
      "Sentiste que tocaste un orden de existencia más profundo o fundamental",
      "El tiempo dejó de ser importante",
      "Experimentaste unidad con toda la humanidad",
      "Sentiste profundo asombro y reverencia",
      "Experimentaste una sensación de unidad con todas las cosas",
      "Sentiste que experimentaste algo que no pudo comunicarse completamente con palabras",
      "El tiempo se aceleró o se detuvo",
      "Obtuviste una visión nueva de lo que es la realidad",
      "Sentiste que la experiencia era sagrada",
      "Tu sentido habitual del tiempo cambió drásticamente",
      "Experimentaste la fusión de tu identidad personal con una totalidad mayor",
      "Sentiste que tus experiencias eran absolutamente ciertas en ese momento",
      "Sentiste paz y tranquilidad",
      "Perdiste el sentido de dónde terminabas tú y comenzaba el mundo exterior",
      "Sentiste maravilla y asombro",
      "Experimentaste eternidad o infinidad",
      "Tuviste experiencias difíciles de describir con palabras",
      "La certeza y el significado de la experiencia permanecieron después",
      "Experimentaste sentimientos de amor",
      "Llegaste a darte cuenta de que toda la humanidad es una en algún nivel fundamental",
      "Sentiste que ya no eras el dueño/a de tus propias experiencias",
      "Sentiste que experimentaste algo nuevo e inefable",
    ],
    shortLabels: [
      "Tiempo perdido", "Unidad con el entorno", "Pérdida del yo", "Nuevo entendimiento",
      "Contacto sagrado", "Alegría y bienestar", "Universo vivo", "Inefabilidad",
      "Orden profundo", "Tiempo sin importancia", "Unidad con humanidad", "Asombro y reverencia",
      "Unidad con todo", "Inefabilidad (2)", "Tiempo alterado", "Nueva visión de la realidad",
      "Sacralidad", "Tiempo drásticamente cambiado", "Fusión identitaria", "Certeza",
      "Paz y tranquilidad", "Borrosidad del yo", "Maravilla", "Eternidad/infinidad",
      "Experiencia indescriptible", "Certeza duradera", "Amor", "Unidad humana",
      "Pérdida de agencia", "Novedad inefable",
    ],
    instructions: "Piensa en una experiencia específica de conciencia no ordinaria (meditación profunda, sesión con sustancias, sueño lúcido, etc.) e indica en qué medida cada afirmación describe esa experiencia:",
    note: "Este instrumento fue diseñado para ser aplicado después de una experiencia. Refleja sobre la experiencia que tengas más presente.",
    scale: [
      { value: 0, short: "0", full: "Nada / nunca" },
      { value: 1, short: "1", full: "Levemente" },
      { value: 2, short: "2", full: "Moderadamente" },
      { value: 3, short: "3", full: "Bastante" },
      { value: 4, short: "4", full: "Mucho" },
      { value: 5, short: "5", full: "Extremadamente" },
    ],
    computeScore: (a) => a.reduce((s, x) => s + x, 0),
    maxScore: 150,
    minScore: 0,
    bands: [
      { max: 44,  label: "Mínima o ausente",    ...B.mid,  description: "La experiencia reportada tiene poca o nula carga mística. Puede reflejar experiencias más ordinarias." },
      { max: 89,  label: "Leve a moderada",     ...B.teal, description: "Elementos místicos presentes, aunque sin la intensidad completa de una experiencia mística plena." },
      { max: 119, label: "Significativa",       ...B.gold, description: "Experiencia de alta intensidad con elementos claros de unidad, trascendencia y sacralidad." },
      { max: 150, label: "Intensa / Completa",  ...B.mint, description: "Puntaje en el rango de experiencia mística completa (CME), según criterios de Johns Hopkins." },
    ],
    disclaimer: "El MEQ-30 es de uso libre para investigación y clínica (Johns Hopkins University). No evalúa diagnóstico psicopatológico.",
  },
};

export function getBand(testId: TestId, score: number): TestConfig["bands"][0] {
  const config = TEST_CONFIGS[testId];
  return config.bands.find((b) => score <= b.max) ?? config.bands[config.bands.length - 1];
}

export function getSubScaleScore(sub: SubScale, answers: number[]): number {
  const raw = sub.indices.reduce((s, i) => s + (answers[i] ?? 0), 0);
  return raw * (sub.multiplier ?? 1);
}

export function getSubScaleBand(sub: SubScale, score: number) {
  return sub.bands.find((b) => score <= b.max) ?? sub.bands[sub.bands.length - 1];
}
