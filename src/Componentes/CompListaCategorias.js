import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompListaCategorias = ({ cambiarCategoria }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await axios.get('http://localhost:3001/productos');
        const categoriasUnicas = [...new Set(res.data.map(p => p.categoria))];
        setCategorias(categoriasUnicas);
      } catch (err) {
        console.error("❌ Error al cargar categorías", err);
      }
    };

    obtenerCategorias();
  }, []);

  return (
    <div className="col-3">
      <p className="h5 text-secondary">Categorías</p>

      <div className="card">
        <ul className="list-group list-group-flush">

          {/* Opción: Todos */}
          <li className="list-group-item">
            <a href="#" onClick={() => cambiarCategoria("todos")} className="text-secondary">
              Todos
            </a>
          </li>

          {/* Otras categorías desde el backend */}
          {categorias.map((cat, idx) => (
            <li className="list-group-item" key={idx}>
              <a href="#" onClick={() => cambiarCategoria(cat)} className="text-secondary text-capitalize">
                {cat}
              </a>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default CompListaCategorias;
