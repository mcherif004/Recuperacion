//  4. Componente `CambioColor` que según un select cambie el color del texto del input.

"use client";

import { useState } from "react";

export default function CambioColor() {
    const [texto,setTexto] = useState("");
    const [color, setColor] = useState("black");

    const handleTextoChange = (e) => {
        setTexto(e.target.value);
    }

    const handleColorChange = (e) => {
        setColor(e.target.value);
    }

    return (
        <div>
            <h2>Cambio Color</h2>
            <input 
            type="text"
            value={texto}
            onChange={handleTextoChange}
            style={{color}}/>

            <select 
            value={color} 
            onChange={handleColorChange}>
                <option value="black">Negro</option>
                <option value="yellow">Amarilo</option>
                <option value="blue">Azul</option>
                <option value="red">Rojo</option>
                <option value="white">Blanco</option>
            </select>
        </div>   
    )
}