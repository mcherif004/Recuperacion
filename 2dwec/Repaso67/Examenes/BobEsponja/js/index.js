function cargarPersonajes() {
    fetch ('index.php?action=listarPersonajes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los personajes');
            }
            return response.json();
        })
        .then(data => {
            const select = document.getElementById('nombrePersonaje');
            select.innerHTML = '';

            // Crear la opcion por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Selecciona un personaje';
            select.appendChild(defaultOption);

            data.forEach(personaje => {
                const option = document.createElement('option');
                option.value = personaje.nombre;
                option.textContent = personaje.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('resultado').textContent = 'Error al cargar personajes';
        });
}

document.addEventListener('DOMContentLoaded', cargarPersonajes);