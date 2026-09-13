import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Aviso de privacidad · Isaac Calderón Derat",
  description:
    "Aviso de privacidad integral para el tratamiento de datos personales recabados en isaaccalderon.me, conforme a la LFPDPPP.",
};

/**
 * Redactado siguiendo la estructura que pide la Ley Federal de Protección de
 * Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento
 * para un aviso integral. Domicilio y plazo de conservación los aportó Isaac;
 * el plazo corresponde al mínimo de la NOM-004-SSA3-2012.
 *
 * PENDIENTE DE REVISIÓN LEGAL: el texto no ha sido revisado por una persona
 * con criterio legal. Quien lo modifique, que mantenga ese pendiente a la
 * vista hasta que ocurra.
 */

const ACTUALIZADO = "13 de septiembre de 2026";

function Seccion({ n, titulo, children }: { n: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="scroll-mt-24">
      <h2 className="font-display text-xl leading-snug mb-3 flex items-baseline gap-3">
        <span className="text-brand-teal/60 text-sm font-sans">{n}</span>
        {titulo}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-foreground/75">{children}</div>
    </section>
  );
}

export default function PrivacidadPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <nav
        aria-label="Navegación"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-brand-night/90 text-[#EEF2EC] backdrop-blur-md border-b border-white/10"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <Logo size={32} variant="color" />
          <span className="text-sm tracking-widest uppercase text-white/65 group-hover:text-white transition-colors hidden sm:block">
            Isaac Calderón Derat
          </span>
        </Link>
        <ThemeToggle />
      </nav>

      <header className="pt-32 pb-10 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-brand-night via-brand-navy to-brand-night text-[#EEF2EC]">
        <div className="max-w-3xl mx-auto space-y-3">
          <p className="text-xs tracking-widest uppercase text-brand-gold opacity-80">Legal</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">Aviso de privacidad</h1>
          <p className="text-sm opacity-55">Última actualización: {ACTUALIZADO}</p>
        </div>
      </header>

      <main className="px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="border border-brand-gold/30 bg-brand-gold/5 rounded-sm p-5 text-sm leading-relaxed">
            <p className="text-accent-text font-medium mb-1">En corto</p>
            <p className="text-foreground/75">
              Si me envías los resultados de una evaluación, recibo tu nombre, tu correo,
              tu teléfono si lo escribes, y tus respuestas al cuestionario. Los uso
              únicamente para leerlos y ponerme en contacto contigo. No los vendo, no los
              comparto con terceros con fines comerciales y no los uso para publicidad.
              Puedes pedirme en cualquier momento que los borre.
            </p>
          </div>

          <Seccion n="1" titulo="Quién es responsable de tus datos">
            <p>
              <strong className="text-foreground">Isaac Calderón Derat</strong>, psicólogo y
              psicoterapeuta, responsable del tratamiento de los datos personales recabados
              a través de <span className="text-interactive-text">isaaccalderon.me</span>.
            </p>
            <p>
              Correo de contacto para asuntos de privacidad:{" "}
              <a href="mailto:psic@isaaccalderon.me" className="text-interactive-text underline underline-offset-4">
                psic@isaaccalderon.me
              </a>
            </p>
            <p>
              Domicilio para oír y recibir notificaciones: Paseo de las Palmas 765,
              Lomas de Chapultepec, C.P. 11000, Ciudad de México.
            </p>
          </Seccion>

          <Seccion n="2" titulo="Qué datos recabo y cómo">
            <p>Sólo recabo datos que tú me proporcionas de forma directa y voluntaria:</p>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-brand-teal">
              <li>
                <strong className="text-foreground">Datos de identificación y contacto:</strong>{" "}
                nombre, apellido, correo electrónico y, de forma opcional, teléfono.
              </li>
              <li>
                <strong className="text-foreground">Datos personales sensibles:</strong> tus
                respuestas a los instrumentos de tamizaje disponibles en la sección de
                evaluaciones, y la puntuación que resulta de ellas. La ley considera
                sensibles los datos sobre estado de salud, presente o futuro.
              </li>
            </ul>
            <p>
              Las evaluaciones se pueden responder sin identificarte. Los datos de contacto
              sólo se recaban si decides usar el botón para enviarme tus resultados.
            </p>
          </Seccion>

          <Seccion n="3" titulo="Consentimiento expreso para datos sensibles">
            <p>
              Por tratarse de datos personales sensibles, tu consentimiento debe ser{" "}
              <strong className="text-foreground">expreso</strong>. Por eso el formulario de
              envío incluye una casilla que debes marcar de forma activa antes de enviar tus
              resultados. Si no la marcas, no se envía nada.
            </p>
            <p>
              Puedes revocar tu consentimiento en cualquier momento escribiéndome al correo
              de contacto.
            </p>
          </Seccion>

          <Seccion n="4" titulo="Para qué uso tus datos">
            <p>
              <strong className="text-foreground">Finalidades primarias</strong>, necesarias
              para la relación:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-brand-teal">
              <li>Leer y valorar los resultados que me envías.</li>
              <li>Ponerme en contacto contigo para responder o proponer una cita.</li>
              <li>Integrar la información a tu proceso si decides iniciar uno conmigo.</li>
            </ul>
            <p>
              <strong className="text-foreground">No realizo tratamientos con finalidades
              secundarias:</strong> no uso tus datos para mercadotecnia, publicidad,
              prospección comercial ni elaboración de perfiles.
            </p>
          </Seccion>

          <Seccion n="5" titulo="Interpretación asistida por inteligencia artificial">
            <p>
              La sección de evaluaciones ofrece, de forma opcional, una lectura de tus
              resultados generada con un modelo de lenguaje de Anthropic. Si eliges usarla,
              se envían a ese servicio <strong className="text-foreground">únicamente tu
              puntuación y tus respuestas numéricas</strong>: no se envía tu nombre, tu
              correo ni tu teléfono.
            </p>
            <p>
              Esa interpretación es orientativa, no constituye un diagnóstico y no sustituye
              una valoración clínica.
            </p>
          </Seccion>

          <Seccion n="6" titulo="Con quién se comparten">
            <p>
              No transfiero tus datos personales a terceros con fines comerciales ni los
              vendo. Para operar el sitio me apoyo en proveedores que actúan como
              encargados del tratamiento y sólo procesan lo necesario para prestar su
              servicio:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 marker:text-brand-teal">
              <li><strong className="text-foreground">Vercel</strong> — alojamiento del sitio.</li>
              <li><strong className="text-foreground">Resend</strong> — envío del correo con tus resultados.</li>
              <li><strong className="text-foreground">Proton</strong> — el buzón donde recibo y conservo ese correo.</li>
              <li><strong className="text-foreground">Anthropic</strong> — interpretación opcional con IA, en los términos de la sección 5.</li>
              <li><strong className="text-foreground">Calendly</strong> — agendado de citas, si decides usarlo.</li>
            </ul>
            <p>
              Estos proveedores pueden procesar información fuera de México. Al usar el
              sitio consientes ese tratamiento en los términos aquí descritos.
            </p>
            <div className="border border-brand-teal/25 bg-brand-teal/[0.04] rounded-sm p-4 space-y-2">
              <p className="text-xs tracking-widest uppercase text-interactive-text">
                Sobre el buzón donde acaban tus datos
              </p>
              <p>
                Uso <strong className="text-foreground">Proton Mail</strong>, no un correo
                comercial financiado con publicidad. Una vez que el mensaje llega, Proton lo
                guarda con cifrado de acceso cero: queda cifrado con mi clave y ni Proton
                puede leerlo.
              </p>
              <p>
                Para ser preciso y no prometer de más: ese cifrado protege el mensaje{" "}
                <em>una vez almacenado</em>. Como el correo lo envía un servicio externo, el
                trayecto hasta el buzón no va cifrado de extremo a extremo. Si necesitas
                comunicarme algo especialmente delicado, lo conversamos en sesión y no por
                escrito.
              </p>
            </div>
            <p>
              También podría revelar datos cuando una autoridad competente lo requiera
              legalmente, en los supuestos del artículo 37 de la LFPDPPP.
            </p>
          </Seccion>

          <Seccion n="7" titulo="Tus derechos ARCO">
            <p>
              Tienes derecho a <strong className="text-foreground">acceder</strong> a tus
              datos, <strong className="text-foreground">rectificarlos</strong> si son
              inexactos, <strong className="text-foreground">cancelarlos</strong> cuando
              consideres que no son necesarios, y{" "}
              <strong className="text-foreground">oponerte</strong> a su uso para fines
              específicos.
            </p>
            <p>
              Para ejercerlos, escríbeme a{" "}
              <a href="mailto:psic@isaaccalderon.me" className="text-interactive-text underline underline-offset-4">
                psic@isaaccalderon.me
              </a>{" "}
              indicando tu nombre, un medio para responderte, qué derecho quieres ejercer y
              sobre qué datos. Responderé en un plazo máximo de 20 días hábiles; de ser
              procedente, se hará efectivo dentro de los 15 días hábiles siguientes.
            </p>
            <p>
              Si consideras que tu derecho a la protección de datos fue vulnerado, puedes
              acudir ante la autoridad garante en materia de protección de datos personales.
            </p>
          </Seccion>

          <Seccion n="8" titulo="Cuánto tiempo conservo los datos">
            <p>
              Conservo la información el tiempo necesario para las finalidades descritas y,
              cuando corresponde, durante el plazo que la normativa aplicable al expediente
              clínico exige. Concluido ese plazo, los datos se eliminan o se anonimizan.
            </p>
            <p>
              En concreto: conservo la información durante{" "}
              <strong className="text-foreground">cinco años</strong> contados desde la
              última sesión o el último contacto, que es el mínimo que fija la
              NOM-004-SSA3-2012 para el expediente clínico. Si la persona era menor de
              edad, el plazo corre hasta que cumpla la mayoría de edad más cinco años.
            </p>
            <p>
              Si me escribes antes para pedir la eliminación de tus datos, procedo salvo
              que exista una obligación legal de conservarlos durante ese plazo.
            </p>
          </Seccion>

          <Seccion n="9" titulo="Cookies y tecnologías similares">
            <p>
              Este sitio no usa cookies propias de seguimiento ni herramientas de analítica
              que te perfilen. Los servicios embebidos de terceros —el agendado de
              Calendly— pueden usar sus propias cookies conforme a sus políticas.
            </p>
            <p>
              El sitio guarda en tu navegador tu preferencia de tema claro u oscuro. Ese
              dato no sale de tu dispositivo y no llega a mí.
            </p>
          </Seccion>

          <Seccion n="10" titulo="Cambios a este aviso">
            <p>
              Cualquier modificación se publicará en esta misma página, con la fecha de
              actualización visible en el encabezado. Te recomiendo revisarla
              periódicamente.
            </p>
          </Seccion>

          <div className="border-t border-foreground/10 pt-8 flex flex-wrap gap-6 items-center">
            <Link href="/" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">
              ← Inicio
            </Link>
            <Link href="/evaluaciones" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">
              Evaluaciones
            </Link>
            <a href="mailto:psic@isaaccalderon.me" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">
              psic@isaaccalderon.me
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}
