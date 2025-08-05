import React, { useState } from "react";
import "./NewsCarousel.css";

const newsItems = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=820&q=80&h=260",
    title: "Convocatoria pública 2025",
    description: "Participa en el concurso de méritos para nuevos cargos municipales. Inscripciones abiertas hasta el 15 de agosto."
  },
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=820&q=80&h=260",
    title: "Nuevo reglamento interno",
    description: "La CMP aprueba el nuevo reglamento interno para fortalecer la transparencia institucional."
  },
  {
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=820&q=80&h=260",
    title: "Jornada de capacitación",
    description: "Empleados municipales participaron en la jornada de capacitación sobre ética y gestión pública."
  }
];

const NewsCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % newsItems.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + newsItems.length) % newsItems.length);

  return (
    <div className="carousel-container">
      <button className="carousel-btn left" onClick={prevSlide} aria-label="Anterior">
        &#10094;
      </button>
      <div className="carousel-slide">
        <img src={newsItems[current].image} alt={newsItems[current].title} className="carousel-image" />
        <div className="carousel-caption">
          <h3>{newsItems[current].title}</h3>
          <p>{newsItems[current].description}</p>
          <div className="carousel-indicators">
            {newsItems.map((_, idx) => (
              <span
                key={idx}
                className={"indicator" + (idx === current ? " active" : "")}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </div>
      </div>
      <button className="carousel-btn right" onClick={nextSlide} aria-label="Siguiente">
        &#10095;
      </button>
    </div>
  );
};

export default NewsCarousel;
