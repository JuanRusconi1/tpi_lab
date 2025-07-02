import { Navbar } from "@/components/navbar"
import { EventDetail } from "@/components/event-detail"
import { api } from "@/app/utils/api"

export const dynamic = 'force-dynamic'

export default async function EventDetailPage({ params }) {
  const event = await api.getEventById(params.id)
  const userInscripciones = await api.getUserInscripciones()
  const hasInscripcion = Boolean(userInscripciones.find(ins => ins.evento_id === event.id))
  return (
    <div>
      <Navbar />
      <EventDetail event={event} hasInscripcion={hasInscripcion} />
    </div>
  )
}
