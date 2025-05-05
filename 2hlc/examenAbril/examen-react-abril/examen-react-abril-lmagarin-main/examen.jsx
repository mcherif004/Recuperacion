import { useState } from "react";

const Elemento = ({ elemento, onToggle }) => {
    const textoMostrado =
        elemento.texto.length > 10
        ? `${elemento.texto.substring(0, 10)}...`
        : elemento.texto;

    return (
        <div>
        <input
            type="checkbox"
            checked={elemento.completado}
            onChange={() => onToggle(elemento.id)}
        />
        {elemento.completado ? (
            <s>{textoMostrado}</s>
        ) : (
            <span>{textoMostrado}</span>
        )}
        </div>
    );
};

export default function GestorElementos() {
    const [elementos, setElementos] = useState([
        { id: 1, texto: "Mostafa", completado: false },
        { id: 2, texto: "Cherif Mouaki", completado: false },
        { id: 3, texto: "Almabouada", completado: false },
        { id: 4, texto: "Mostafa Cherif Mouaki Almabouada", completado: false },
    ]);

    const [nuevoTexto, setNuevoTexto] = useState("");
    const [filtro, setFiltro] = useState("todos");

    const agregarElemento = (e) => {
        e.preventDefault();
        if (nuevoTexto.trim()) {
        setElementos([
            ...elementos,
            {
            id: Date.now(),
            texto: nuevoTexto.trim(),
            completado: false,
            },
        ]);
        setNuevoTexto("");
        }
    };

    const toggleElemento = (id) => {
        setElementos(
        elementos.map((el) =>
            el.id === id ? { ...el, completado: !el.completado } : el
        )
        );
    };

    const toggleTodos = () => {
        const todosCompletados = elementos.every((el) => el.completado);
        setElementos(
        elementos.map((el) => ({
            ...el,
            completado: !todosCompletados,
        }))
        );
    };

    const elementosFiltrados = elementos.filter((el) => {
        if (filtro === "completados") return el.completado;
        if (filtro === "pendientes") return !el.completado;
        return true;
    });

    return (
        <div>
        <h1>Gestor de Elementos</h1>

        <div>
            <button onClick={() => setFiltro("todos")}>Todos</button>
            <button onClick={() => setFiltro("completados")}>Completados</button>
            <button onClick={() => setFiltro("pendientes")}>Pendientes</button>
        </div>

        <form onSubmit={agregarElemento}>
            <input
            type="text"
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
            placeholder="Nuevo elemento"
            />
            <button type="submit">Añadir</button>
        </form>

        <div>
            <input
            type="checkbox"
            checked={
                elementos.length > 0 && elementos.every((el) => el.completado)
            }
            onChange={toggleTodos}
            disabled={elementos.length === 0}
            />
            <label>Marcar/Desmarcar todos</label>
        </div>

        <div>
            {elementosFiltrados.length === 0 ? (
            <p>No hay elementos para mostrar</p>
            ) : (
            elementosFiltrados.map((el) => (
                <Elemento key={el.id} elemento={el} onToggle={toggleElemento} />
            ))
            )}
        </div>
        </div>
    );
}
