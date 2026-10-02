# La Herradura Admin PWA

Esta versión ya está preparada como Progressive Web App (PWA).

## Incluye
- 4 mesas de billar a COP $2.000 por chico.
- 18 mesas de consumo.
- Registro de perdedor y consumos.
- Traslado Billar ↔ Consumo conservando saldo e historial.
- Efectivo, transferencia y pago mixto.
- Recibos numerados e impresión.
- Pantalla de cliente.
- Manifest, iconos y Service Worker para instalación y uso offline básico.

## Importante
Una PWA no se instala correctamente abriendo `index.html` como archivo local. Debe servirse desde HTTPS (o localhost durante desarrollo).

## En iPhone
Una vez publicada en HTTPS:
1. Abrir la dirección en Safari.
2. Pulsar Compartir.
3. Elegir “Añadir a pantalla de inicio”.
4. Abrir La Herradura desde el nuevo icono.

Esta versión aún guarda la información localmente en cada navegador. Para sincronizar teléfonos, computador y monitores en tiempo real necesitaremos una base de datos/sincronización compartida.
