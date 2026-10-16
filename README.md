LA HERRADURA ADMIN — v4.19.54
Mejoras: devoluciones y pedidos extras individuales en Consumo
=============================================================

Base exacta: v4.19.53 Nombres de Meseras por Turno.
Los 23 archivos del paquete están ubicados directamente en la raíz,
preparados para reemplazar los archivos del repositorio GitHub Pages.

CAMBIOS:
- Se agregó la implementación faltante de restoreInventory() para
  poder registrar devoluciones correctamente y reintegrar existencias
  (productos normales y componentes de recetas). Se usa también para
  reducir unidades de una ronda, cuando corresponde.
- Las devoluciones de Consumo se asocian a la ronda guardada y a quien
  paga esa ronda, para reducir su cuenta individual y el saldo general.
- La cuenta y los cobros por persona tienen en cuenta los abonos de
  devoluciones. Evita reconocer devoluciones por encima del saldo de
  esa persona ya cobrado (requiere conciliación administrativa).
- Se corrigió la distribución: 50% de la DIFERENCIA entre precio original
  y valor reconocido al cliente para la mesera y 50% para el negocio.
- Se guarda en auditoría e inventario la mesera/turno actuales y la
  devolución. Los registros antiguos no se borran ni se reasignan.
- Los extras de Consumo se agregan como pedidos identificados con la
  marca «EXTRA personal», facturados a quien los solicita. Se pueden
  crear desde una ronda o desde «Registrar EXTRA para solicitante».
- Los extras aparecen en la lista de rondas/extras, cuentas individuales,
  saldo de la mesa y detalle de cuenta/recibo; cada guardado descuenta
  del inventario únicamente los productos nuevos.
- La interfaz y el service worker llevan versión 4.19.54 para evitar
  que el navegador reutilice JavaScript anterior.

NO MODIFICADOS:
- turnos.js, catálogo, recursos gráficos, productos y servicios.
- Estructura local de datos y claves de almacenamiento de aplicación
  principal y laboratorio: no se ejecuta limpieza ni reinicialización.

PRUEBA RECOMENDADA CON DATOS FICTICIOS:
1. Inicia sesión como mesera y abre turno de prueba.
2. Abre Consumo, guarda una ronda a nombre de Juan, paga Juan.
3. Registra una devolución por un artículo de $4.000: el saldo de Juan
   disminuye $2.000 y una unidad vuelve al inventario. La diferencia
   de $2.000 se reparte $1.000 para mesera y $1.000 para negocio.
4. Pulsa «Extra a Juan» o «Registrar EXTRA para solicitante», agrega
   un artículo, guarda y comprueba que aparezca identificado y sumado
   a Juan (no a otro pagador).
5. Cobra por persona y verifica cantidades, recibo, ventas y arqueo.
6. Comprueba que Billar, turnos, gastos y reportes siguen sin cambios.

IMPORTANTE: Sigue siendo un piloto local; no es todavía seguro para
credenciales, documentos ni operaciones comerciales reales. Guarda
respaldo antes de sustituir archivos de GitHub Pages. NO borres los
datos de Safari ni desinstales la PWA sin respaldo de datos.


## v4.19.55 · Pantallas del cliente (Billar y Consumo)
- Vista de cliente de Consumo: rondas, solicitante, pagador, extras, devoluciones, pagos, cuentas individuales y saldo total. Solo lectura.
- Botón «📺 Cliente» en mesas de Consumo y acceso «📺 Vista cliente» en la comanda.
- Vista previa aislada del Laboratorio: URL `customer.html?table=B1&mode=lab` o `?table=C1&mode=lab` consulta exclusivamente datos ficticios. La versión normal continúa con la clave original.
- No se modificaron cálculos de turnos, ventas, inventario, devoluciones ni las rondas de Consumo.
- **Límite:** la pantalla refleja movimientos solo en pestañas del mismo navegador y origen. No hay sincronización de datos entre dispositivos separados (por ejemplo teléfono y TV) sin backend.
