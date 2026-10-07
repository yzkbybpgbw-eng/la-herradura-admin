La Herradura Admin v4.19.29

PC/TV Consumo optimizado; móvil <=699px protegido desde v4.19.28.


## v4.19.29 — Vista Cliente Premium
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


## v4.19.29 — Vista Cliente TV 16:9
- Modo TV horizontal automático en tres columnas, sin desplazamiento manual para la información esencial.
- Ronda actual, cuentas por jugador y resumen de mesa visibles simultáneamente.
- Listados extensos rotan automáticamente en TV.
- Vista móvil conserva desplazamiento vertical y detalle completo.
- Logo compacto y visible en TV.