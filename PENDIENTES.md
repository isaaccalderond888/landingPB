# Pendientes de isaaccalderon.me

Documento de traspaso. Escrito el 13 de septiembre de 2026 al cerrar una sesión
larga de trabajo sobre el sitio. Está dirigido a quien continúe — Codex u otra
sesión — y a Isaac.

Lo que sigue no es una lista de deseos: cada punto salió de una revisión del
código real o de una decisión que Isaac ya tomó. Donde hay una decisión suya,
va citada.

---

## 1. Qué es este sitio y cómo está hecho

Sitio personal de **Isaac Calderón Derat**, psicólogo y psicoterapeuta
transpersonal en Ciudad de México. Next.js 14 (App Router) + Tailwind,
desplegado en Vercel (proyecto `landing-pb`), DNS en Cloudflare.

Rutas:

| Ruta | Qué es |
|---|---|
| `/` | Landing: hero, cómo trabajo, el proceso, agendar, footer |
| `/evaluaciones` | Instrumentos de tamizaje. **No se enlaza desde el sitio, a propósito** (ver §3) |
| `/guias` | Guía de preparación e integración, abierta, con PDF a cambio del correo |
| `/formacion` | Credenciales verificables. Sólo enlazada desde el pie |
| `/privacidad` | Aviso de privacidad integral (LFPDPPP) |

Rutas de API: `/api/interpret` (interpretación con IA), `/api/send-results`
(envío de resultados por correo), `/api/available-times` (huecos de Calendly),
`/api/agendar` (lead de cita presencial), `/api/descargar-guia` (PDF por correo).

Servicios: **Vercel** (hosting), **Resend** (correo saliente), **Proton** (buzón
de Isaac), **Anthropic** (interpretación con IA), **Calendly** (agenda en línea),
**AgendaPro** (agenda presencial de Clínica Newman), **Prefrontis/Manitas** (bots
de Isaac en Grok).

---

## 2. Reglas que no hay que romper

**La guía de voz vive en `.claude/brand-voice-guidelines.md`.** Léela antes de
escribir copy. Lo esencial: precisa, humana, sobria; sin promesas
extraordinarias ni postura de gurú; sin lenguaje de cura, garantías ni
superlativos vacíos. Prefiere «proceso terapéutico», «sistema nervioso»,
«acompañamiento», «integración», «estados ampliados de conciencia». Y una regla
que se aplicó todo el día: **pruebas concretas antes que autoelogio abstracto.**

**Paleta «Flores sobre agua»**, en `app/globals.css` y `tailwind.config.ts`:

```
#0B1830 noche   #183463 marino   #256D86 petróleo
#BCD3D6 bruma   #EEF2EC crema    #EAD06A sol
```

El sol nunca va como texto sobre fondo claro; ahí se usa `#8A6B22`.
Tipografía única: Plus Jakarta Sans.

**Verificar sobre lo compilado, no sobre el código.** Dos trampas que costaron
tiempo real esta sesión:

- `/evaluaciones` es componente cliente envuelto en Suspense. Hacerle `curl` y
  grepear el HTML **no prueba nada**: llega casi vacío. Hay que mirar el bundle
  en `.next/static/chunks/app/evaluaciones/page-*.js`.
- En el bundle, **las tildes van escapadas**. «Perfil por dimensión» aparece
  como `Perfil por dimensi\xf3n`. Busca sin el carácter acentuado.

**No compilar con el servidor de desarrollo encendido.** `next build` y
`next dev` escriben en el mismo `.next`; la compilación le pisa los archivos al
servidor y lo deja sirviendo HTML sin estilos. Apaga el dev, compila, vuelve a
levantarlo.

**Las imágenes generadas se hacen con `codex-img`**, no con otras herramientas.
Está en el PATH y usa la sesión de Codex de Isaac. Meter los hex de marca en el
prompt.

---

## 3. Decisiones ya tomadas — no las revisites

**`/evaluaciones` no se enlaza desde el sitio.** No es un olvido. Palabras de
Isaac:

> «este portal de evaluaciones… me gustaría más bien que fuera como una especie
> de micrositio, es decir, un panel para el terapeuta desde donde se puedan
> lanzar cada una de estas evaluaciones… Por ahora, lo podemos dejar así como
> está, pero **suelto, es decir, no integrado dentro de mi sitio web**, pero sí
> pensar en esto.»

Es el germen de un producto aparte. Enlazarlo lo fijaría como sección del sitio
personal, que es lo contrario de a dónde va. Hay tres prototipos convergiendo
hacia ese producto —Enteogénesis, ScreeningTAPS y `/evaluaciones`—, documentados
en la bóveda de Isaac en `05-Sistemas/Plataforma-Evaluacion-Terapeutas.md`.

**AQ-10, AQ-50 y DES-II están fuera del selector público.** Los dos primeros por
licencia del Autism Research Centre (uso investigativo no comercial, sin
adaptación — y la traducción ya lo es). El DES-II porque es una entrevista que
aplica el clínico, no un autoinforme. Siguen en `TEST_CONFIGS` y son alcanzables
por `?test=`, que es el uso clínico de Isaac.

**En `lib/testData.ts` conviven copy y afirmaciones verificadas.** No «mejores»
la redacción de: disclaimers de licencia (CAT-Q es CC-BY 4.0, citar a Hull et
al. 2019), atribución al ARC, la corrección clínica del DES-II, ni las bandas y
puntos de corte. Pulir su prosa puede volverlos falsos. Sí es copy libre:
`subtitle`, la parte descriptiva de `cardDescription`, `instructions` y
`CATEGORY_LABELS`.

**El correo de la descarga de guías sirve sólo para entregar el PDF.** Palabras
de Isaac: «solo para entregar el PDF». No hay finalidad secundaria, y el aviso
de privacidad lo declara explícitamente. Usarlo para otra cosa exigiría pedir
consentimiento de nuevo y reescribir el aviso.

**El agendado presencial es diferido a propósito.** Los consultorios de Clínica
Newman son compartidos con otros terapeutas, así que mostrar horarios en vivo
arriesgaría ofrecer huecos ya ocupados. La interfaz lo dice en vez de
disimularlo.

**La interpretación con IA se declara como tal.** El prompt ya no dice «Eres
Isaac Calderón», el botón dice «Generar interpretación con IA» y hay una
etiqueta fija encima del texto: «Generado con inteligencia artificial. Isaac no
ha leído estos resultados.» **No revertir esto por brevedad.**

---

## 4. Pendientes, en orden de importancia

### 4.1 Webhook de agendado · CERRADO (2026-09-13)
**Estado vigente:** Grok reportó corrección de URL HTTPS y key en Production,
redeploy y POST HTTP 200 con `ok: true`, request_id
`19d1d8ef-cf31-4278-8c90-6f063b4da2f0`, y activación de la rutina de Prefrontis.
Isaac entregó este traspaso a Codex. No repetir el POST ni reabrir C1.
No se necesita túnel Cloudflare según Grok. Conservar APIs y contrato JSON.

**Referencia histórica del diagnóstico previo:**

`/api/agendar` valida bien pero falla al entregar el lead a Prefrontis. Probado
en producción el 13 de septiembre: un POST válido devuelve
`502 No se pudo registrar tu solicitud`.

La ruta hace `POST` a `process.env.GROK_WEBHOOK_URL` con
`Authorization: Bearer ${process.env.GROK_WEBHOOK_KEY}` y `Content-Type:
application/json`, con timeout de 10 s. Ambas variables existen en Vercel
(Production) desde el 13 de septiembre.

**Hipótesis principal, sin confirmar:** que la URL del webhook no sea alcanzable
desde los servidores de Vercel. Prefrontis corre en la máquina de Isaac; si la
URL es local, de una red privada o de un esquema propio (el panel se abre con
`grokbot://`), Vercel no puede llegar. Una URL pública `https://` accesible desde
internet es requisito.

**Cómo diagnosticarlo:**

1. Vercel → proyecto `landing-pb` → Logs → filtrar por `/api/agendar`. El código
   hace `console.error("Webhook de Prefrontis respondió", r.status)` si hay
   respuesta HTTP, y `console.error("Error llamando al webhook:", err)` si falla
   la conexión. **Cuál de los dos aparezca dice qué está pasando**: el primero
   significa que sí llegó y el webhook rechazó (auth o payload); el segundo, que
   no se pudo conectar (URL inalcanzable o timeout).
2. Preguntarle a Prefrontis si la rutina «Lead presencial · webhook» registró
   alguna llamada.
3. Verificar que la URL sea `https://` pública.

**Mientras no funcione**, quien llene el formulario ve «No se pudo registrar tu
solicitud. Escríbeme por WhatsApp.» No está roto de forma silenciosa, pero
tampoco sirve.

### 4.2 «Para quién es esto» · falta en la landing

Nadie se reconoce en «acompaño procesos». La landing describe **cómo** trabaja
Isaac (tres tarjetas: psicotraumatología, neurofeedback, psicodélicos) pero
nunca **a quién** le sirve.

Va entre la sección «Cómo trabajo» (`#enfoque`) y «El proceso» (`#proceso`) en
`app/page.tsx`. La forma que mejor funciona es una lista de situaciones
reconocibles en primera persona, no diagnósticos. Material real para escribirla
está en la bóveda, en `08-Práctica-Clínica/` — EMDR, IFS, TIST, Polivagal,
Danza Primal, neurofeedback informado en trauma.

**Restricciones:** sin prometer resultados, sin lenguaje de cura, y sin
convertirlo en lista de diagnósticos, que asusta y además invade terreno
clínico. Que la persona piense «esto me pasa», no «tengo esto».

### 4.3 Preguntas frecuentes · falta

Las que la gente realmente busca antes de escribirle a un terapeuta de trauma:

- ¿Es presencial u online? (Ambos. Presencial en Clínica Newman, Lomas de
  Chapultepec; en línea por Zoom.)
- ¿Cuánto cuesta? (Presencial $1,500 MXN/hora; en línea $60 USD/55 min; hay
  entrada gratuita en las dos modalidades.)
- ¿Cuánto dura un proceso? — **preguntárselo a Isaac, no inventarlo.**
- ¿Haces terapia con psicodélicos? Esta es delicada: Isaac acompaña
  **preparación e integración**, que es psicoterapia. Su certificación CPAT-I es
  **teórica** y el propio emisor dice que no autoriza práctica clínica con
  psicodélicos. La respuesta debe ser precisa y no prometer lo que la ley
  mexicana no permite.
- ¿Qué pasa en la primera sesión?
- ¿Puedo cambiar de opinión? (Sí. Política de cancelación ya redactada en
  Calendly: 24 h sin costo.)

Va como sección propia en `/` o como página `/preguntas`. Si es página,
enlazarla desde el pie y desde la sección de agendar.

### 4.4 Móvil · el hero pierde lo que más importa

En `app/page.tsx`, el hero tiene dos problemas por debajo de 768 px:

- **La foto de Isaac es `hidden md:flex`.** No aparece. Para un sitio de marca
  personal donde la confianza la carga la cara, eso es caro.
- **Los enlaces del nav son `hidden md:block`** y el nombre es `hidden sm:block`.
  A 375 px el encabezado es un logotipo abstracto y un interruptor de tema:
  **el nombre de Isaac no aparece hasta el pie de página.**

Qué hacer: mostrar la foto en móvil —más chica, quizá circular, encima o debajo
del titular— y resolver la navegación, ya sea con un menú desplegable o dejando
al menos «Agendar» visible. El nombre debería verse desde arriba.

Verificar a 375 px de ancho real, no redimensionando la ventana de escritorio.

### 4.5 Fotografía · falta dirección

Hoy hay una sola foto, `public/isaac.jpg`, usada en el hero. La guía de marca
dice que el retrato aprobado es `_DSC4676_perfil_pecho_amplio.jpg` y que **la
dirección fotográfica completa sigue pendiente** — no inventarla.

Dónde haría falta material nuevo: el «para quién es esto», las preguntas
frecuentes, y el espacio físico de la consulta presencial (que ayuda mucho a
quien nunca ha ido). **Preguntarle a Isaac qué material tiene antes de proponer
sesión de fotos.**

Las imágenes generadas —no fotografía— se hacen con `codex-img`. Las piezas
actuales están en `content/guias/portadas/` y `public/arte/`.

### 4.6 SEO · no existe

No hay `app/sitemap.ts`, no hay `app/robots.ts`, y no hay datos estructurados.
Para un psicoterapeuta en CDMX, un bloque JSON-LD de tipo `Person` +
`MedicalBusiness` —con dirección, especialidades, idioma y enlace a
`/formacion`— es de lo que más rinde por el esfuerzo.

**Cuidado:** `/guias` es `noindex` deliberadamente y `/evaluaciones` no debe
promocionarse. El sitemap debe incluir sólo `/`, `/formacion` y `/privacidad`.

### 4.7 Destello de tema equivocado

En `app/layout.tsx`, `<html className="dark">` está fijo y el tema real se lee en
un `useEffect` dentro de `components/ThemeToggle.tsx`. Quien eligió el modo claro
ve un flashazo oscuro en cada carga. Se arregla con un script inline bloqueante
en `<head>` que lea `localStorage` antes del primer pintado. Cinco líneas.

### 4.8 El badge flotante de Calendly tapa contenido

`components/CalendlyBadge.tsx` monta un botón flotante de Calendly. Verificado:
en escritorio cubre el «© Isaac Calderón Derat» del pie; en móvil se monta sobre
el título de una tarjeta. Además compite con el CTA del hero y con la sección de
agendar — tres caminos para lo mismo. **Recomendación: quitarlo.** Ahora que la
sección de agendar tiene las tres opciones, sobra.

### 4.9 Revisión legal del aviso de privacidad

`app/privacidad/page.tsx` está redactado siguiendo la estructura del artículo 16
de la LFPDPPP y su Reglamento, y cubre evaluaciones, entrega de guías y agendado
presencial —incluida la declaración de que Clínica Newman recibe datos como
responsable propio, que es transferencia y no remisión—. **Nadie con criterio
jurídico lo ha revisado.** El aviso está en el comentario de cabecera del
archivo; mantenerlo hasta que ocurra.

### 4.10 Guías que aún no existen

`/guias` ofrece hoy una sola guía, terminada. Isaac decidió dejar de anunciar
las otras cinco que estaban en gris con «Próximamente» porque no sabe si las va
a escribir. **No volver a anunciarlas antes de que existan.** Si escribe otra,
se añade su sección.

El PDF vive en `public/guias/` y se sirve como estático sin autenticación, así
que **no hereda el `noindex` de la ruta**. Como el contenido está abierto en la
página, es coherente; queda anotado por si algún día importa.

---

## 5. Cómo verificar que algo funciona

Antes de decir que un cambio está listo:

1. `npx tsc --noEmit` y `npx next lint` — ambos limpios.
2. `npx next build` **con el servidor de desarrollo apagado**.
3. Para copy: grepear el HTML o el bundle **compilado**, no el código fuente.
   Un cambio de texto que no aparece en `.next/server/app/*.html` no está hecho.
4. Para producción: esperar el despliegue y comprobar contra
   `https://www.isaaccalderon.me`, no contra localhost. Un error real de esta
   sesión: «transformación real» seguía en vivo después de corregirlo, porque
   también estaba en la `description` de `app/layout.tsx` — invisible al navegar,
   pero es lo que sale en Google y al compartir el enlace.
5. Para rutas de API: probar los caminos de rechazo con `curl`. **No disparar
   envíos exitosos sin avisar a Isaac**: `/api/send-results` le manda un correo
   real y `/api/agendar` le manda un lead real a WhatsApp.

---

## 6. Cosas que NO hay que hacer

- **No enlazar `/evaluaciones`** desde el sitio (§3).
- **No revertir la declaración de IA** en `/evaluaciones` (§3).
- **No reescribir disclaimers ni puntos de corte** en `lib/testData.ts` (§3).
- **No afirmar que Isaac está certificado en neurofeedback.** No lo está:
  cursó dos formaciones de Boston NeuroDynamics y le faltan supervisiones y
  examen. `/formacion` dice «la certificación está en proceso» y así debe quedar.
- **No presentar el CPAT-I como habilitación para práctica clínica** con
  psicodélicos. Es teórico y el emisor lo dice expresamente.
- **No poner precios inventados.** Los reales: presencial $1,500 MXN/hora,
  en línea $60 USD/55 min, entrada gratuita en ambas.
- **No generar imágenes con otra herramienta que no sea `codex-img`.**
- **No commitear** `stitch-skills/` (es un repo git anidado y rompe el árbol),
  ni `.stitch/`, ni `referencias visuales/`, ni los `.jpg` sueltos de la raíz.

---

## 7. Credenciales verificadas de Isaac

Por si hace falta escribir sobre él. Todas comprobadas contra el registro del
emisor el 13 de septiembre de 2026, y visibles en `/formacion`.

**TraumaPro Certifications** (aval externo, verificable en credential.net):
CPT-I, CPT-II, CPT-III y CPAT-I. **Las cuatro caducan** — CPT-I en agosto de
2027, las otras tres en 2028.

**Newman · Instituto de Psicotraumatología de Latinoamérica:** Diplomado en
Psicotraumatología CPT-III (120 h), Diplomado TAPS, TIST-N1 (12 h, con Janina
Fisher) y Taller Finding Solid Ground (16 h, con Bethany Brand y Ruth Lanius).

**Boston NeuroDynamics:** dos cursos de nivel intermedio en neurofeedback y
biofeedback aplicados a psicotrauma, marzo de 2025.

**Escuela de Psicología Transpersonal (EPTI):** Especialización en Psicoterapia
Transpersonal-Integral, Coaching Primordial, y Danza Primal. Fue **director
académico y luego director de la sede México**, unos seis años.

---

## 8. Reparto de tareas entre Grok y Claude

Isaac trabaja con dos sistemas. Este reparto existe para que no se pisen ni se
queden esperando el uno al otro. **La regla de frontera es simple: lo que vive
dentro de este repositorio es de Claude; lo que vive fuera —la máquina de Isaac,
AgendaPro, WhatsApp, el calendario— es de Grok.**

### Le toca a Grok (Prefrontis, Hipocampus, Manitas)

Todo lo que exige operar una interfaz ajena, correr en la máquina de Isaac, o
tener acceso al segundo cerebro.

| # | Tarea | Notas |
|---|---|---|
| G1 | **Resolver su lado del 502** (§4.1) | Confirmar si la rutina «Lead presencial · webhook» registró la llamada del 13 de septiembre, y si la URL es `https://` pública alcanzable desde internet |
| G2 | Exponer el webhook si hace falta | Si Prefrontis corre local, necesita túnel. Isaac ya tiene Cloudflare Tunnel funcionando para `nube.isaaccalderon.me`; el patrón está resuelto |
| G3 | Operar AgendaPro | Consultar huecos, proponer horarios en punto, reservar en `Neurofeedback 2`, espejar al calendario. Ya lo hace |
| G4 | Responder por WhatsApp | Hoy el patrón seguro son borradores al chat de Isaac y él envía. Que el bot escriba directo al paciente **requiere autorización explícita de Isaac** y nunca debe incluir contenido clínico |
| G5 | Averiguar el plan Pro de AgendaPro | Costo y cómo se pide la API Key. **Ojo:** Isaac dijo que quiere salir de AgendaPro, así que quizá no valga la pena pagarlo. Decisión suya |
| G6 | Consultar la bóveda cuando Claude lo pida | Hipocampus tiene el acceso. Útil para §4.2 y §4.3, donde hace falta material clínico real |

### Le toca a Claude o a Codex (dentro del repositorio)

| # | Tarea | Sección | Depende de |
|---|---|---|---|
| C1 | Diagnóstico del 502 desde el lado del sitio | §4.1 | Que Grok confirme G1 |
| C2 | Sección «para quién es esto» | §4.2 | Material de la bóveda (G6) o de Isaac |
| C3 | Preguntas frecuentes | §4.3 | Isaac debe responder «¿cuánto dura un proceso?» |
| C4 | Arreglar el hero en móvil | §4.4 | Nada. **Se puede hacer ya** |
| C5 | SEO: sitemap, robots, JSON-LD | §4.6 | Nada. **Se puede hacer ya** |
| C6 | Quitar el destello de tema | §4.7 | Nada. **Se puede hacer ya** |
| C7 | Quitar el badge flotante de Calendly | §4.8 | Nada. **Se puede hacer ya** |
| C8 | Dirección fotográfica | §4.5 | Isaac debe decir qué material tiene |

**C4, C5, C6 y C7 no dependen de nadie.** Si alguien tiene tiempo y no sabe por
dónde empezar, son esos cuatro.

### Sólo puede hacerlo Isaac

| # | Decisión | Por qué nadie más |
|---|---|---|
| I1 | Revisión legal del aviso (§4.9) | Hace falta criterio jurídico. Ni Claude ni Grok lo tienen |
| I2 | Mirar los logs de Vercel para el 502 | Requiere su sesión en Vercel |
| I3 | ¿Cuánto dura un proceso terapéutico? | Es su criterio clínico. **No inventarlo** |
| I4 | Qué material fotográfico existe | Sólo él sabe |
| I5 | Si se queda en AgendaPro o sale | Afecta a toda la clínica, no sólo a él |
| I6 | Autorizar que el bot escriba directo al paciente | Es su relación clínica |

### El traspaso que desbloquea el 502

Es el único punto donde los dos sistemas tienen que hablarse, así que conviene
que sea explícito.

**Grok le dice a Claude:**

1. Si la rutina recibió la llamada del 13 de septiembre. Sí o no.
2. Si es que no: cuál es la URL pública `https://` correcta, una vez expuesta.
3. Si es que sí, pero la rechazó: qué devolvió y por qué — autenticación,
   formato del cuerpo, campo faltante.

**Claude entonces:**

- Si fue la URL: Isaac actualiza `GROK_WEBHOOK_URL` en Vercel y se relanza la
  prueba. Probablemente no haga falta tocar código.
- Si fue el formato: se ajusta el cuerpo en `app/api/agendar/route.ts`. El
  contrato acordado con Grok está en el commit `2c5592c`; los campos son
  `request_id`, `servicio`, `nombre`, `apellido`, `telefono`, `correo`,
  `dias_preferidos`, `franja`, `nota`, `consentimiento_at`, `origen`,
  `callback_url`.
- Si fue la autenticación: el código manda `Authorization: Bearer <key>`, que es
  lo que Grok especificó. Habría que confirmar el nombre de la cabecera.

**La prueba de que quedó resuelto** es un POST a
`https://www.isaaccalderon.me/api/agendar` con datos válidos que devuelva
`200 {"ok":true,"request_id":"…"}` y que Isaac reciba el lead. Hasta entonces no
está hecho, aunque el código compile.

⚠️ Ese POST manda un lead real al WhatsApp de Isaac. Marcarlo como prueba en el
campo `nota` y avisarle antes.

### Cómo coordinarse

- **Antes de tocar un archivo, decir cuál.** Esta sesión tuvo tres sesiones de
  Claude trabajando en paralelo sin un solo conflicto, y fue por avisar.
- **No publicar el trabajo de otro sin avisarle.** Pasó una vez esta sesión: un
  push arrastró un commit ajeno. No rompió nada porque estaba terminado, pero la
  decisión de publicarlo no era de quien empujó.
- **Verificar antes de reportar.** Y verificar sobre lo compilado o sobre
  producción, no sobre el código fuente (§5).
- **Cuando algo sea decisión de Isaac, citarlo con sus palabras**, no
  parafrasearlo. Una paráfrasis perdió su motivo real para no enlazar
  `/evaluaciones` y costó una ronda entera de trabajo mal dirigido.

## 9. Avance Codex — C4–C7 (2026-09-13)

Preparado en la rama `codex/c4-c7-web`, copia aislada
`C:/Users/isaac/isaaccalderon.me/.worktrees/codex-c4-c7` (NOMADVIVO),
con base `40578a2`. No integrado a main ni publicado en producción.

- C4: nombre y enlace Agendar visibles en móvil; retrato existente compacto.
- C5: sitemap con solo inicio, formación y privacidad; robots; JSON-LD Person y
  MedicalBusiness para la consulta; base www y canonical de inicio. Se conserva
  noindex de guías. No se cambió la indexación de evaluaciones.
- C6: preferencia de tema aplicada antes del body; tolera almacenamiento bloqueado.
- C7: retirado el montaje global del badge; se conserva la sección de agendado.

Verificación: TypeScript, lint y next build exitosos; navegador a 375 px con
retrato y navegación visibles, sin desbordamiento horizontal; tema claro persistente
tras recargar; JSON-LD válido como JSON en HTML compilado; sitemap y robots HTTP 200
local. Script de tema comprobado con claro, oscuro, sin preferencia y almacenamiento
bloqueado. La copia no tiene credenciales de servicios: no valida entrega de leads,
correo ni disponibilidad real de Calendly. No se enviaron formularios.

G1–G4 siguen en Grok. No se cambiaron APIs, variables de Vercel, DNS, AgendaPro ni
WhatsApp. I2 ya pudo comprobarlo Codex mediante el conector Vercel: la ejecución
registrada a las 20:07:30 UTC devolvió 502 con ERR_INVALID_URL antes de contactar
al destino. Esto describe esa ejecución; no prueba la configuración actual.
No copiar valores de configuración de los logs.

## 10. Integración autorizada — 2026-09-13

Isaac autorizó integrar C4–C7 si no cruza el trabajo de Grok. Tras fetch,
origin/main seguía en la base 40578a2; el único commit de implementación por
integrar era a16fbfc. Diff sin cambios en app/api, AgendarPresencial ni
CalendlyAccordion. La implementación pasó TypeScript, lint, build y revisión
local; se integra por avance directo, sin force push. La evidencia del despliegue
se registra en el cierre de Codex y en la nota Dominio-isaaccalderon-me del vault.

Grok confirmó haber leído §9. Sigue con dry-run G3/G4, sin reservas ni WhatsApp
a pacientes. Su configuración de Vercel y contrato JSON quedan intactos.
