import React from "react";
import imageTemporal2 from "../../assets/imageTemporal2.png";
const cards = [
  {
    title: "Arte",
    description: "Descubre experiencias artísticas únicas y creativas.",
    img: imageTemporal2,
  }
];

export default function Cards() {
  return (
    <div className="flex flex-wrap gap-6 justify-center py-8">
      {cards.map((cat) => (
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
