export function separarEventosPorFecha(inscripciones) {
  const ahora = new Date()
  const pasados = []
  const futuros = []

  for (const inscripcion of inscripciones) {
    const fechaFin = new Date(inscripcion.evento.fecha_fin)
    if (fechaFin < ahora) {
      pasados.push(inscripcion)
    } else {
      futuros.push(inscripcion)
    }
  }
  return { pasados, futuros }
}