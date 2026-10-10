La Herradura Admin v4.19.35

## v4.19.35 — Vista Cliente Premium
- Logo maestro completo con object-fit contain, sin recorte.
- Diseño responsive optimizado para TV horizontal y teléfono.
- Ronda actual protagonista con productos, subtotal, chico y total a asignar.
- Cuentas por jugador con rondas + chicos, extras personales y estado PAGADO.
- Total pendiente general visible.
- Historial de partidas y devoluciones conservados.
- Sin cambios a la lógica operativa estable de v4.19.15.


Corrección: elimina secuencias \n serializadas que podían mostrarse como texto sobre la interfaz; conserva recursos, logos, lienzos y funcionalidad de v4.19.6, e incorpora el pulido visual móvil de v4.19.7.

# La Herradura Admin v4.19.6

Publicación corregida. ZIP con archivos en la raíz para GitHub Pages.

# La Herradura Admin v4.18.1

Corrección quirúrgica de Mesas de Billar.

- Se conserva la lógica POS de v4.18.0.
- Se elimina la dependencia de pseudo-elementos para la foto de las tarjetas.
- La fotografía ahora forma parte del background real de cada tarjeta.
- 4 columnas en escritorio y 2x2 en móvil.
- Mesa activa dorada; disponibles verdes.
- Apariencia existente controla la familia fotográfica; no se agrega un selector duplicado.
- Se neutralizan decoraciones CSS antiguas que podían tapar o reemplazar la imagen.


v4.18.2: Las fotos de las mesas ahora son elementos DOM reales (.tablePhoto), no fondos/pseudo-elementos, para eliminar conflictos CSS heredados.


v4.18.4: Las mesas usan una etiqueta IMG real para garantizar la misma fotografía en las 4 tarjetas, con encuadre uniforme en escritorio y móvil. Se evita que reglas heredadas sobre DIV/background oculten la imagen.


v4.18.5: Mesas Premium. Se conserva la lógica estable de v4.18.4 y se añade una capa visual final: fotografía más protagonista, borde dorado, bola 8, jerarquía reforzada y botones premium responsive 2x2 en móvil.


v4.18.6: Pulido Premium. Bola 8 rediseñada como bola real negra con círculo central blanco discreto; tarjetas móviles compactadas para eliminar espacio vacío sin alterar la lógica POS.


## v4.19.0
Depuración del módulo Billar: eliminado el bloque visual v4.18.8 que reinyectaba billar-hero.jpg como fondo general. El fondo general queda canónico y sin fotografía; las fotos quedan limitadas al hero y a tablePhoto. Cache del service worker renovada.


## v4.19.2
- Perfeccionado el banner de Mesas de billar en escritorio.
- Se evita el zoom/corte excesivo del arte original y se conserva el encuadre móvil.
- Se actualizó el cache del Service Worker y el cache-busting de app.js para evitar versiones visuales antiguas.


## v4.19.6
- Corrige CSS visible de Gestión de billar.
- Fuerza actualización del service worker para evitar versiones antiguas en caché.

## v4.19.15 — Gestión de billar consolidada
- Conserva íntegramente la base visual estable de v4.19.8.
- Gestión de partida activa y comanda por ronda.
- Finalización de partida con asignación obligatoria del perdedor.
- Duplicación del pedido anterior sin copiar el perdedor.
- Extras personales por jugador o acompañante.
- Edición de partidas cerradas con ajuste de inventario.
- Cuentas acumuladas por jugador, historial, vista cliente y cobro.
- Mantiene logos, lienzos, imágenes, temas y adaptación móvil/escritorio.


## v4.19.15 — Extras identificados y guardado explícito
- Los consumos personales posteriores quedan marcados visualmente como EXTRA.
- Al agregar productos a un participante/acompañante, se arma primero un pedido temporal.
- Nuevo botón “Guardar extras”: solo al guardarlo se registra en la cuenta y se descuenta inventario.
- Los extras aparecen separados de las partidas cerradas y también identificados en el recibo.


## Ajuste v4.19.15
- Desde la cuenta de un jugador con ronda cerrada, **Agregar consumo adicional** abre directamente sus EXTRAS personales.
- Los productos nuevos se mantienen en **Pedido por guardar** hasta pulsar **Guardar extras**.
- No se mezclan con los productos de la ronda cerrada.


## v4.19.35 — Vista Cliente TV 16:9
- Modo TV horizontal automático en tres columnas, sin desplazamiento manual para la información esencial.
- Ronda actual, cuentas por jugador y resumen de mesa visibles simultáneamente.
- Listados extensos rotan automáticamente en TV.
- Vista móvil conserva desplazamiento vertical y detalle completo.
- Logo compacto y visible en TV.


## v4.19.35 — Consumo consolidado móvil + PC + TV
- Móvil conserva la geometría aprobada de v4.19.28.
- PC usa 4 columnas compactas con imagen de altura fija.
- TV/pantalla ancha usa 6 columnas y tarjetas compactas.
- Breakpoints aislados para evitar contaminación entre vistas.
- Caché y versión renovados para forzar carga de esta entrega.


## v4.19.36 — Piloto Personal y Turnos
- Se conserva la base v4.19.35 y sus módulos de Billar, Consumo, Inventario, Ventas y Reportes.
- En Inicio > Turnos o Administración > Personal y Turnos: alta local de administradora/meseras, apertura con base variable, cierre con observaciones, recepción de caja y cierre nocturno con administración.
- Las diferencias se calculan contra el esperado y se conservan las cantidades declaradas y recibidas. La base transferida no se registra como venta. Transferencias no son efectivo.
- IMPORTANTE: es un **piloto en almacenamiento local**, no un sistema de autenticación segura. No usar claves personales reales. No sincroniza usuarios ni turnos entre teléfonos/computadores, ni bloquea acceso a otros módulos. Para operación real se requiere servidor y autenticación segura.
- Efectivo esperado provisional: base + ventas en efectivo registradas en la aplicación. Los gastos/retiros todavía requieren conciliación manual; no dar por definitivo el cierre sin verificar.
- Conservar respaldo antes de publicar. No se modifican cuentas ni inventario preexistentes.

## v4.19.37 — Corrección de carga Personal y Turnos
- Se incluye `turnos.js` en `index.html`, que faltaba en v4.19.36.
- Se oculta el aviso antiguo de turnos para evitar confusión con el nuevo módulo.
- Se actualiza versión y caché PWA.
- Sigue siendo un piloto local, no apto para contraseñas reales ni operación multi-dispositivo.


## v4.19.39 — Recuperación de acceso de prueba
- Se puede restablecer **solo la clave** de la administradora del módulo piloto local desde el formulario de inicio de sesión, escribiendo REINICIAR y una nueva clave de prueba.
- No borra ventas, inventario, mesas, personal ni historial de turnos.
- Campos de clave con botón 👁️ Ver y texto de ayuda para evitar contraseñas sugeridas por Safari que no queden guardadas.
- La recuperación sin contraseña anterior es **insegura** y exclusiva de la fase piloto; no debe emplearse para uso comercial real.
- Versión y caché PWA actualizadas a v4.19.39.


## v4.19.39 — Verificación de caja
- El efectivo esperado se calcula automáticamente: base del turno + ventas cobradas en efectivo durante el turno.
- Separación explícita de esperado, declarado por quien entrega y contado por quien recibe.
- Diferencias contra esperado y contra declarado, con observaciones obligatorias.
- El conteo de recepción abre el siguiente turno con el efectivo realmente recibido.
- IMPORTANTE: los gastos y retiros todavía NO se descuentan automáticamente; esta versión sigue siendo piloto local, sin autenticación segura.


## v4.19.40 — primer reporte de cierre
- Pago de turno en efectivo configurable por turno, descontado del efectivo esperado.
- Resumen de cobros por Billar/Consumo, efectivo y transferencias; reporte al cerrar y recibir.
- No incluye todavía login global seguro, detalle fiable por unidad/tiempo, egresos automáticos ni cierre mensual consolidado.
- Se conserva la base de datos local y los módulos comerciales sin cambios.


## v4.19.41 — acceso visible a recepción pendiente
- Botón para cambiar a la sesión de la mesera receptora cuando existe entrega de día pendiente.
- Identificación propia de quien recibe; recepción y apertura de noche conservan las validaciones anteriores.
- Sin modificaciones a app.js ni a los recursos de Billar, Consumo o Inventario.
- Versión piloto local: no usar contraseñas reales ni operar como autenticación segura.

## v4.19.44 — Rondas individuales en mesas de Consumo (piloto)
- Nuevo módulo independiente `consumo-rondas.js`, sin modificar `app.js` ni `turnos.js`.
- Cada pedido nuevo requiere solicitante y responsable del pago. Las rondas guardadas mantienen historial, cantidades y subtotal; se agrupan por pagador.
- Cobro individual por responsable, con efectivo, transferencia o mixto; pago total de la mesa se mantiene.
- El inventario continúa descontándose al seleccionar productos según el comportamiento previo (no se vuelve a descontar al guardar).
- Las cuentas antiguas sin rondas permanecen como consumos anteriores; se cobran mediante Pago total.
- Por seguridad, las cuentas con devoluciones deben conciliarse por Pago total; el prorrateo individual de devoluciones aún está pendiente.
- La edición de rondas ya guardadas y selección de rondas sueltas para pago parcial quedan para una versión posterior.
- Pruebas recomendadas: crear cuenta nueva, Juan solicita/paga dos rondas, Pedro solicita y Juan paga una, verificar tres rondas de Juan, cobrar Juan, comprobar saldo de mesa y cerrar.
