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
