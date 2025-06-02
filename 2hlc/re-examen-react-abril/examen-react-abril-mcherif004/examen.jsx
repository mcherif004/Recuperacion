import { useState } from "react";

export default function GestorElementos() {
    // Estado inicial con nombre y apellidos
    const [items, setItems] = useState([
        { id: 1, texto: "Mostafa", completado: false },
        { id: 2, texto: "Cherif Moauki", completado: false },
        { id: 3, texto: "Almabouada", completado: false },
        { id: 4, texto: "Mostafa Cherif Moauki Almabouada", completado: false }
    ]);

    const [filtro, setFiltro] = useState("todos");
    const [nuevoTexto, setNuevoTexto] = useState("");

    // Filtrar elementos según la selección
    const elementosFiltrados = items.filter(item => {
        if (filtro === "completados") return item.completado;
        if (filtro === "pendientes") return !item.completado;
        return true;
    });

    // Comprobar si todos los elementos están completados
    const todosCompletados = items.length > 0 && items.every(item => item.completado);

    // Manejar cambio de estado de un elemento
    const toggleCompletado = id => {
        setItems(items.map(item =>
        item.id === id ? { ...item, completado: !item.completado } : item
        ));
    };

    // Manejar cambio de estado de todos los elementos
    const toggleTodos = () => {
        const nuevoEstado = !todosCompletados;
        setItems(items.map(item => ({ ...item, completado: nuevoEstado })));
    };

    // Añadir nuevo elemento
    const agregarItem = () => {
        if (nuevoTexto.trim() === "") return;

        const nuevoItem = {
        id: Date.now(),
        texto: nuevoTexto,
        completado: false
        };

        setItems([...items, nuevoItem]);
        setNuevoTexto("");
    };

    // Manejar la tecla Enter en el input
    const handleKeyDown = e => {
        if (e.key === "Enter") {
            agregarItem();
        }
    };

    return (
        <>
        <h1>Gestor de Elementos</h1>

        <div>
            <button
            onClick={() => setFiltro("todos")}>
            Todas
            </button>
            <button
            onClick={() => setFiltro("completados")}>
            Completadas
            </button>
            <button
            onClick={() => setFiltro("pendientes")}>
            Pendientes
            </button>
        </div>

        <div>
            <input
            type="text"
            value={nuevoTexto}
            onChange={e => setNuevoTexto(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nuevo elemento"
            />
            <button onClick={agregarItem}>Añadir</button>
        </div>

        <div>
            <input
            type="checkbox"
            checked={todosCompletados}
            onChange={toggleTodos}
            id="todos"
            />
            <label htmlFor="todos">Marcar/Desmarcar todos</label>
        </div>

        <ul>
            {elementosFiltrados.map(item => (
            <Elemento key={item.id} item={item} onToggle={toggleCompletado} />
            ))}
        </ul>
        </>
    );
}

// Componente para representar un solo elemento
function Elemento({ item, onToggle }) {
    // Recortar texto
    const textoMostrado =
        item.texto.length > 10 ? item.texto.substring(0, 10) + "..." : item.texto;

    return (
        <li>
        <input
            type="checkbox"
            checked={item.completado}
            onChange={() => onToggle(item.id)}
            id={`item-${item.id}`}
        />
        <label htmlFor={`item-${item.id}`}>
            {textoMostrado}
        </label>
        </li>
    );
}
