# La Herradura Admin v4.12.1

Actualización visual y de proyección.

## Novedades
- Temas prediseñados para mesas de billar y consumo.
- Selector de apariencia en Administración.
- Pantalla de cliente con temas profesionales.
- Acceso a vista previa/proyección desde la apertura de una mesa de billar.
- Se conserva toda la lógica de cuentas, devoluciones, inventario y pagos de v4.10.0.

# La Herradura Admin v4.7.3

Versión de pruebas funcionales.

## Cambios principales
- Navegación fija Mesas / Inicio.
- Vista móvil a pantalla completa y espacio seguro para acciones inferiores.
- Cuenta acumulada independiente por jugador.
- Consumos extra asignables directamente a un jugador.
- Edición de partidas anteriores: cambiar perdedor y ajustar cantidades.
- Cobro individual por jugador con efectivo, transferencia o mixto.
- Los pagos parciales mantienen abierta la mesa para continuar jugando.
- Historial de ajustes para auditoría básica.
- Pantalla de cliente muestra saldos acumulados incluyendo extras y pagos.

> Esta versión aún usa almacenamiento local del dispositivo. Usuarios, contraseñas y sincronización real entre varios dispositivos requieren la siguiente fase con base de datos y autenticación.


## V4.7
- La edición de una partida cerrada permite buscar y agregar productos nuevos, no solo modificar los ya existentes.
- Los productos agregados actualizan inventario e historial.
- El botón de guardado ahora indica Guardar cambios.


## Ajustes v4.7
- Pago total de la mesa desde la pantalla de cobro, además del cobro individual por jugador.
- Botón Guardar cambios de la orden ubicado inmediatamente después de la comanda editada, antes del catálogo de productos.


## V4.8
- Calculadora de cambio/vueltas para efectivo y pagos mixtos.
- El ingreso contable registra solo el valor de la venta, no el efectivo entregado antes de devolver cambio.
- Cigarrillos: 1 medio descuenta 10 unidades del stock base para Mustang y Luki.


## V4.8.1
- Corrección del flujo de cobro: efectivo ya no debe saltar directamente al recibo.
- Campo de efectivo recibido y cálculo visible de cambio antes de confirmar.
- Recibo muestra total, método, efectivo recibido y cambio.
- Cache bust de app.js y service worker para evitar mezclar JavaScript antiguo con la interfaz nueva en iPhone/GitHub Pages.


## v4.9.0 — Inventario inteligente
- Vista de inventario para consulta de meseras.
- Edición protegida por PIN de Administradora.
- Crear productos y modificar precio, categoría, stock mínimo y costo.
- Entradas, devoluciones a stock, mermas y correcciones de conteo.
- Alertas visuales de stock bajo y agotado.
- Historial de movimientos con existencia anterior/nueva y observación.
- Conserva la lógica de cigarrillos: cada venta de 1/2 descuenta 10 unidades del producto base.


## V4.9.2 — Costos y utilidad
- Precio de compra/costo unitario administrable por producto.
- Utilidad unitaria y margen visibles solo en modo Administradora.
- Valor del inventario calculado a costo.
- Cada venta guarda costo de mercancía vendida (COGS) y utilidad bruta histórica para futuros cierres diarios/mensuales.
- Los productos compuestos calculan su costo desde la receta.


## V4.9.3 — Actualización forzada de inventario
- Identificador visual actualizado a v4.9.3.
- Nueva versión de caché del service worker para evitar que iPhone/Safari conserve la interfaz v4.9.0.
- Cache bust de app.js actualizado a 4.9.3.
- Inventario conserva Valor a costo y, en modo Administradora, muestra Venta esperada y Utilidad bruta esperada.

## V4.10.0 — Consumo, devoluciones y pantalla cliente
- Mesas de consumo muestran la comanda activa arriba del catálogo con controles +/−.
- Botón Guardar pedido / dejar pendiente.
- Devoluciones en mesas de billar y consumo: $3.000/$4.000 → $2.000; $5.000 → $3.000.
- Cálculo automático de cantidad, abono al cliente, diferencia, 50% mesera y 50% negocio.
- El producto devuelto regresa al inventario y queda trazabilidad del movimiento.
- Pantalla cliente de cada mesa de billar conserva URL individual y se actualiza en vivo entre pestañas/ventanas del mismo navegador/origen mediante storage/BroadcastChannel.
- Para sincronización entre dispositivos físicos distintos (teléfono → TV/tablet) se requiere una base de datos en tiempo real; esta versión no inventa sincronización remota.
