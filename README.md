# La Herradura Admin v4

Actualización práctica del sistema privado de Billares La Herradura Club.

## Cambios principales
- Flujo real de billar por partidas/rondas.
- Los productos se despachan durante la ronda y quedan pendientes de perdedor.
- Terminar partida asigna consumo de la ronda + COP $2.000 al perdedor.
- Duplicar partida anterior copia el pedido, nunca el perdedor, y permite agregar extras.
- Cuentas acumuladas por jugador e historial de partidas.
- Vista pública `customer.html` para monitores de clientes, con actualización por almacenamiento compartido cuando las ventanas están en el mismo navegador/origen.
- Catálogo por categorías y nombres simplificados para operación rápida.
- Bloqueo de cobro/traslado si existe consumo de una ronda aún sin asignar.
- Migración básica desde datos locales de v3.
- Corrección de zona segura de iPhone y mejoras responsive.

## Importante sobre tiempo real
La vista de cliente de v4 sirve para probar transparencia en un mismo navegador/origen. Para sincronizar teléfonos, computador y TVs distintos en tiempo real hace falta una base de datos compartida en la nube o en la red local. Esa será la siguiente etapa.


## v4.1 — navegación segura
- Botón fijo **← Mesas** dentro de las órdenes de Billar y Consumo.
- Botón fijo **🏠 Inicio** como salida alternativa.
- En pantallas secundarias (duplicar, terminar, ver cuenta, trasladar y cobrar), **←** regresa a la orden sin perder información.
- Regresar nunca cierra una cuenta ni elimina una ronda.
