//  3. Componente `AMayusculas` que según se escriba en un input se convierta en mayúsculas.

"use client";

import { useState } from "react";

export default function AMayusculas() {
const [texto, setTexto] = useState("");

const handleChange = (e) => {
    setTexto(e.target.value.toUpperCase());
};

return (
    <div>
        <h2>AMayusculas</h2>
        <input
            type="text"
            value={texto}
            onChange={handleChange}
        />
    </div>
);
}