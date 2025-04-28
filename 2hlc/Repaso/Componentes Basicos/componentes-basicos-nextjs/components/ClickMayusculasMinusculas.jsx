//  2. Componente `ClickMayusculasMinusculas` que al hacer click sobre un botón se convierte el texto de un input en mayúsculas o en minúsculas, según la acción anterior.

"use client";

import { useState } from "react";

export default function ClickMayusculasMinusculas() {
    const [texto, setTexto] = useState("");
    const [esMayuscula, setEsMayuscula] = useState(true);

    const handleInputChange = (e) => {
        setTexto(e.target.value);
    };

    const alternarMayusMinus = () => {
        setTexto(esMayuscula ? texto.toLowerCase() : texto.toUpperCase());
        setEsMayuscula(!esMayuscula);
    };

    return (
        <div>
            <h2>ClickMayusculasMinusculas</h2>

            <input
                type="text"
                value={texto}
                onChange={handleInputChange}
            />

            <button onClick={alternarMayusMinus}>
                Convertir
            </button>
        </div>
    );
}