//  5. Componente `AcortaIndividual` que renderiza una lista de 10 elementos de longitud variable (entre 10 y 20 caracteres). Junto a cada elemento de la lista hay un  checkbox  "Acorta..." que acorta el texto  y añade  3 puntos suspensivos.

"use client";

import { useState } from "react";

export default function AcortaIndividual() {

    const generateRandomText = () => {
        const length = Math.floor(Math.random() * 11) + 10;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const initialItems = Array.from({ length: 10 }, generateRandomText);

    const [items, setItems] = useState(initialItems);
    const [checked, setChecked] = useState(Array(10).fill(false));

    const handleCheckboxChange = (index) => {
        const newChecked = [...checked];
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);

        const newItems = [...items];
        if (newChecked[index]) {
        newItems[index] = newItems[index].slice(0, 7) + "...";
        } else {
        newItems[index] = initialItems[index];
        }
        setItems(newItems);
    };

    return (
        <div>
        <h2>AcortaIndividual</h2>
        <ul>
            {items.map((item, index) => (
            <li key={index}>
                {item}
                <label>
                <input
                    type="checkbox"
                    checked={checked[index]}
                    onChange={() => handleCheckboxChange(index)}
                />
                Acorta...
                </label>
            </li>
            ))}
        </ul>
        </div>
    );
}
