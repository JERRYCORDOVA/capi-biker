// src/admin/PanelAdmin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PanelAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    imagen: null
  });

  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [editando, setEditando] = useState(null); // <<-- nuevo estado

  const cargarProductos = async () => {
    try {
      const res = await axios.get('http://localhost:3001/productos');
      setProductos(res.data);
      const categorias = [...new Set(res.data.map(p => p.categoria))];
      setCategoriasUnicas(categorias);
    } catch (err) {
      console.error('❌ Error al cargar productos', err);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarImagen = (e) => {
    setNuevoProducto(prev => ({
      ...prev,
      imagen: e.target.files[0]
    }));
  };

  // 🔹 Guardar o actualizar según el estado
  const guardarProducto = async () => {
    try {
      const formData = new FormData();
      const categoriaFinal = nuevoProducto.categoria === 'otra'
        ? nuevaCategoria
        : nuevoProducto.categoria;

      formData.append('nombre', nuevoProducto.nombre);
      formData.append('precio', nuevoProducto.precio);
      formData.append('categoria', categoriaFinal);
      if (nuevoProducto.imagen) formData.append('imagen', nuevoProducto.imagen);

      if (editando) {
        // 🔹 Actualizar producto
        await axios.put(`http://localhost:3001/productos/${editando}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setEditando(null);
      } else {
        // 🔹 Nuevo producto
        await axios.post('http://localhost:3001/productos', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setNuevoProducto({ nombre: '', precio: '', categoria: '', imagen: null });
      setNuevaCategoria('');
      cargarProductos();
    } catch (err) {
      console.error('❌ Error al guardar/actualizar producto', err);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/productos/${id}`);
      cargarProductos();
    } catch (err) {
      console.error('❌ Error al eliminar', err);
    }
  };

  // 🔹 Cargar datos de un producto en el formulario
  const editarProducto = (producto) => {
    setNuevoProducto({
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      imagen: null // no cargamos imagen previa, solo si el admin sube otra
    });
    setEditando(producto._id);
  };

  return (
    <div className="container mt-4">
      <h2>🛠️ Panel de Administración - Productos</h2>

      <div className="card p-3 mt-4">
        <h5>{editando ? "✏️ Editar Producto" : "➕ Nuevo Producto"}</h5>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nombre"
          name="nombre"
          value={nuevoProducto.nombre}
          onChange={manejarCambio}
        />

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Precio"
          name="precio"
          value={nuevoProducto.precio}
          onChange={manejarCambio}
        />

        <select
          className="form-control mb-2"
          name="categoria"
          value={nuevoProducto.categoria}
          onChange={manejarCambio}
        >
          <option value="">Selecciona una categoría</option>
          {categoriasUnicas.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
          <option value="otra">Otra categoría</option>
        </select>

        {nuevoProducto.categoria === "otra" && (
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nueva categoría"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
          />
        )}

        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={manejarImagen}
        />

        <button className="btn btn-success me-2" onClick={guardarProducto}>
          {editando ? "Actualizar Producto 🔄" : "Guardar Producto ✅"}
        </button>

        {editando && (
          <button
            className="btn btn-secondary"
            onClick={() => {
              setNuevoProducto({ nombre: '', precio: '', categoria: '', imagen: null });
              setNuevaCategoria('');
              setEditando(null);
            }}
          >
            Cancelar ❌
          </button>
        )}
      </div>

      <hr />

      <h5 className="mt-4">📋 Lista de Productos</h5>
      <table className="table table-bordered mt-2">
        <thead className="table-dark">
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio (S/)</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p._id}>
              <td>
                {p.imagen ? (
                  <img
                    src={`http://localhost:3001/uploads/${p.imagen}`}
                    alt={p.nombre}
                    width="60"
                  />
                ) : (
                  <span className="text-muted">Sin imagen</span>
                )}
              </td>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>{p.categoria}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarProducto(p)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProducto(p._id)}
                >
                  🗑 Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelAdmin;
