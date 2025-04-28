//  1. Componente `ClickMayusculas` que al hacer click sobre un botón se convierte el texto de un input en mayúsculas.

/*
- Por qué se usan las props
- Por qué se usa el estado
- Uso de renderizado condicional
- Uso de key en lista
*/

"use client";

import { useState } from "react";

export default function ClickMayusculas () {
    const [texto, setTexto] = useState("");

    const handleInputChange = (e) => {
        setTexto(e.target.value);
    }

    const convertirMayusculas = () => {
        setTexto(texto.toUpperCase());
    }

    return (
        <div>
            <h2>ClickMayusculas</h2>

            <input 
            type="text"
            value={texto}
            onChange={handleInputChange}/>

            <button 
            onClick={convertirMayusculas}>
                Convertir
            </button>
        </div>
    )
}