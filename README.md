LA HERRADURA ADMIN — v4.19.52 — TRAZABILIDAD Y RONDAS DE CONSUMO
Fecha: 15 de octubre de 2026

CONTENIDO
- ZIP completo de GitHub Pages, con archivos en la raíz.
- Se conservan las operaciones previas de Billar, Consumo, inventario,
  ventas, cobros, turnos, gastos, salarios, entregas y cierres.
- El laboratorio mantiene su prefijo de almacenamiento ficticio separado.

NUEVO: RESTRICCIÓN DE VENTAS POR TURNO
- Los botones de Billar y Consumo quedan inactivos cuando no hay un turno
  ABIERTO y no hay sesión de mesera responsable o administradora.
- Apertura de cuenta, cambios de ronda, venta de productos, devoluciones,
  movimientos entre mesas y pagos validan el turno activo antes de actuar.
- Durante la apertura del turno, la mesera debe estar registrada. La
  administración puede abrir el turno asignando una mesera y operar bajo
  su propia sesión, registrándose ambas identidades.
- Tras cerrar un turno o cerrar sesión, la operación comercial se bloquea
  hasta recibir un nuevo turno o volver a iniciar sesión correctamente.

NUEVO: TRAZABILIDAD
- Los movimientos comerciales NUEVOS en S.audit incorporan identificador
  de turno, mesera responsable, identificador y nombre de quien operó.
- Los nuevos cobros incorporan estos campos y atribuyen la venta a la
  mesera que esté a cargo de la caja al cobrarse, incluso si la mesa fue
  abierta durante un turno anterior.
- El apartado Ventas y movimientos muestra la trazabilidad operativa
  del turno, además de los controles de caja y gastos ya existentes.
- Los movimientos anteriores no reciben identidades retrospectivamente;
  se mantienen sus datos originales para evitar atribuciones inventadas.

NUEVO: DUPLICAR RONDA DE CONSUMO
- Cada ronda guardada presenta «Duplicar esta ronda».
- Copia productos y cantidades a un pedido NUEVO pendiente; NO sobrescribe
  la ronda original. Se pueden editar cantidades, añadir o quitar productos
  y modificar «Quién solicita» y «Quién paga» antes de guardar.
- No permite duplicar si hay un pedido pendiente con productos sin guardar.
- La duplicación consume las existencias correspondientes una sola vez y
  registra un movimiento trazable. Los importes usan el precio actual del
  catálogo, no necesariamente el de la ronda original.
- Se conserva el detalle del identificador de la ronda de origen.

COMPROBACIONES EFECTUADAS EN NAVEGADOR DE PRUEBA
- Bloqueo sin personal/turno, desbloqueo con apertura y sesión correcta.
- Registro de dos meseras, apertura de día, duplicación y pago por persona.
- Existencias descontadas una vez por cada pedido.
- Venta vinculada a turno, mesera responsable y operador administrador.
- Arqueo, cierre de día, bloqueo, entrega a la mesera de noche y apertura
  de noche; bloqueo al cerrar sesión.
- Repetición de los flujos con scripts de app.js y app-lab.js.
- Sin errores JavaScript durante los recorridos comprobados.

INSTALACIÓN
1. Conserva el respaldo ZIP anterior.
2. Descomprime este ZIP completo y reemplaza en la raíz del repositorio
   los archivos de la versión anterior; no borres los datos del iPhone.
3. Espera a que GitHub Pages y el caché PWA reflejen la v4.19.52.
4. Prueba primero con información ficticia en laboratorio.

IMPORTANTE — APLICACIÓN LOCAL DE PRUEBAS, NO SEGURA PARA PRODUCCIÓN
- Los datos se guardan solo en el navegador, sin base de datos central
  ni sincronización entre dispositivos.
- Las contraseñas se guardan localmente sin medidas suficientes para un
  sistema multiusuario real. NO usar claves reales ni documentos reales.
- El bloqueo es de la interfaz local y no ofrece seguridad resistente a
  modificaciones técnicas del navegador.
- No borres caché/datos del sitio ni desinstales la PWA sin respaldo.
