import { verifySession } from "./cookies-service"
import { fetchWithAuth } from "./fetchWithAuth"

const API_URL = process.env.APIURL

export const api = {
  getEvents: async () => {
    const res = await fetchWithAuth(`${API_URL}/eventos/`, { method: 'GET'})
    return await res.json()
  },
  getActiveEvents: async () => {
    const res = await fetchWithAuth(`${API_URL}/eventos/disponibles`, { method: 'GET'})
    return await res.json()
  },
  getEventById: async (id) => {
    const res = await fetchWithAuth(`${API_URL}/eventos/${id}`, { method: 'GET'})
    return await res.json()
  },
  getCategories: async () => {
    const res = await fetchWithAuth(`${API_URL}/categorias_evento/`, { method: 'GET'})
    return await res.json()
  },
  getCategoryById: async (id) => {
    const res = await fetchWithAuth(`${API_URL}/categorias_evento/${id}`, { method: 'GET'})
    return await res.json()
  },
  getActiveUserEvent: async () => {
    const { user_id } = await verifySession()
    const res = await fetchWithAuth(`${API_URL}/inscripciones/usuario/${user_id}/activas`, { method: 'GET' })
    if (res.status !== 200) return null
    return await res.json()
  },
  getUser: async (id) => {
    const { user_id } = await verifySession()
    const res = await fetchWithAuth(`${API_URL}/usuarios/${id || user_id}`, { method: 'GET' })
    if (res.status !== 200) return null
    return await res.json()
  },
  getUserInscripciones: async () => {
    const { user_id } = await verifySession()
    const res = await fetchWithAuth(`${API_URL}/inscripciones/usuario/${user_id}/historial`, { method: 'GET' })
    if (res.status !== 200) return null
    return await res.json()
  },
  getCountAllEvent: async () => {
    const res = await fetchWithAuth(`${API_URL}/eventos/total`, { method: 'GET' })
    return await res.json()
  },
  getInscripcionesActivas: async () => {
    const res = await fetchWithAuth(`${API_URL}/inscripciones/total-activas`, { method: 'GET' })
    return await res.json()
  },
  getPromedioInscripciones: async () => {
    const res = await fetchWithAuth(`${API_URL}/inscripciones/promedio-por-evento`, { method: 'GET' })
    return await res.json()
  },
  getEventoMasInscriptos: async () => {
    const res = await fetchWithAuth(`${API_URL}/inscripciones/evento-mas-inscripciones`, { method: 'GET' })
    return await res.json()
  },
  getUsers: async () => {
    const res = await fetchWithAuth(`${API_URL}/usuarios/`, { method: 'GET' })
    return await res.json()
  }
}