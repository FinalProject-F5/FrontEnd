import React from "react";
import imageTemporal2 from "../../assets/imageTemporal2.png";
const categories = [
  {
    title: "Arte",
    description: "Descubre experiencias artísticas únicas y creativas.",
    img: imageTemporal2,
  },
  {
    title: "Gastronomía auténtica",
    description: "Saborea la cocina local y recetas tradicionales.",
    img: imageTemporal2,
  },
  {
    title: "Música con alma",
    description: "Vive la música local y conciertos íntimos.",
    img: imageTemporal2,
  },
  {
    title: "Rutas con mirada local",
    description: "Explora caminos y rincones guiados por locales.",
    img: imageTemporal2,
  },
  {
    title: "Historias personales",
    description: "Conoce relatos y vivencias de la comunidad.",
    img: imageTemporal2,
  },
  {
    title: "Proyectos locales con impacto",
    description: "Participa en iniciativas que transforman el entorno.",
    img: imageTemporal2,
  },
];

export default function Categories() {
  return (
    <div className="flex flex-wrap gap-6 justify-center py-8">
      {categories.map((cat) => (
        <div key={cat.title} className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img src={cat.img} alt={cat.title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{cat.title}</h2>
            <p>{cat.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Ver más</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
