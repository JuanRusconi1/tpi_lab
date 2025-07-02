'use client'
import { useState } from "react";
import { Search } from "lucide-react";
import { EventCard } from "./event-card";
import styles from "../styles/events-section.module.css";

export function EventsSection({ events, categories }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // Filtrado combinado por búsqueda y categoría
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "" || event.categoria_id === selectedCategory;
    const matchesSearch =
      searchValue === "" ||
      event.nombre.toLowerCase().includes(searchValue.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="events-section" className={styles.eventsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Próximos Eventos</h2>
          <p className={styles.description}>
            Descubre los mejores eventos y asegura tu lugar con un solo clic
          </p>

          {/* Search & Category Section */}
          <div className={styles.searchSection}>
            {/* Menú desplegable de categorías */}
            <select
              className={styles.categorySelect}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value) || '')}
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>

            {/* Buscador */}
            {!isSearchOpen ? (
              <button
                onClick={() => setIsSearchOpen(true)}
                className={styles.searchButton}
              >
                <Search className={styles.searchIcon} />
              </button>
            ) : (
              <div className={styles.searchContainer}>
                <div className={styles.searchInputContainer}>
                  <Search className={styles.searchIconSmall} />
                  <input
                    placeholder="Buscar eventos por nombre..."
                    className={styles.searchInput}
                    autoFocus
                    value={searchValue}
                    onBlur={() => setIsSearchOpen(false)}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Events Grid */}
        <div className={styles.eventsGrid}>
          {filteredEvents.length > 0
            ? filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            : <p className={styles.noEventsMessage}>No hay eventos para mostrar.</p>}
        </div>
      </div>
    </section>
  );
}