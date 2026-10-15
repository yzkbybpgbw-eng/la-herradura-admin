LA HERRADURA ADMIN — v4.19.53 — NOMBRES DE MESERAS POR TURNO
Fecha: 15 de octubre de 2026

AJUSTE PUNTUAL
- En Abrir cuenta (Billar y Consumo), el campo Mesera responsable muestra
  automáticamente el nombre registrado de quien tiene a cargo la caja.
- El campo indica Turno 1 · Día o Turno 2 · Noche, y es de solo lectura
  para evitar atribuciones equivocadas.
- Corregido también en laboratorio.html / app-lab.js, que todavía mostraba
  el selector obsoleto «Mesera turno 1» / «Mesera turno 2».
- Los nuevos datos arrancan sin meseras ficticias precargadas. Los datos
  guardados de instalaciones anteriores NO se migran ni se borran.
- Si se edita un nombre en Personal, las aperturas futuras muestran el
  nombre actualizado. Las cuentas ya creadas mantienen la identificación
  histórica de apertura; las ventas se atribuyen a quien opera el cobro.

SIN CAMBIOS
- La estructura de turnos, apertura, arqueos, salarios, gastos y pagos.
- La lógica financiera, facturación, rondas, inventario y devoluciones.
- Separación total del almacenamiento ficticio del laboratorio.

COMPROBAR ANTES DE USO REAL
- Crea meseras ficticias Adriana y Jimena; abre Turno 1 con Adriana.
- Abrir Billar/Consumo debe mostrar «Adriana» y «Turno 1 · Día».
- Haz el relevo a Turno 2 con Jimena y comprueba que las nuevas cuentas
  muestran «Jimena» y «Turno 2 · Noche».
- No debe haber opciones genéricas «Mesera turno 1 / 2» en Abrir cuenta.
- Al cerrar el turno, se debe bloquear la operación comercial.

INSTALACIÓN EN GITHUB PAGES
- Descarga y conserva el ZIP de respaldo v4.19.52.
- Descomprime el nuevo ZIP y reemplaza los archivos en la RAÍZ del repositorio.
- Confirma que la aplicación muestra v4.19.53 y prueba con datos ficticios.
- NO borres la información de Safari ni desinstales la PWA sin tener una
  copia de tus datos: están guardados localmente y no se sincronizan.

ADVERTENCIA
Piloto con contraseñas y documentos almacenados localmente; no es un
sistema de autenticación seguro para datos personales reales.
