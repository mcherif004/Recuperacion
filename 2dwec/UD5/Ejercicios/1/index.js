// Navegacion por el DOM

document.addEventListener("DOMContentLoaded", empezar);

function empezar() {
    const botonResaltar = document.getElementById("resaltar-primera");
    const botonEliminar = document.getElementById("eliminar-ultima");
    const botonAgregar = document.getElementById("agregar-tarea");
    const lista = document.getElementById("lista-pendientes");

    botonResaltar.addEventListener("click", ()=>{
        const primeraLinea = lista.firstElementChild;
        if (primeraLinea) {
            primeraLinea.classList.toggle('destacado');
        } else {
            alert("No hay elementos en la lista");
        }
    });

    botonEliminar.addEventListener("click", () =>{
        const ultimaLinea = lista.lastElementChild;
        if (ultimaLinea){
            lista.removeChild(ultimaLinea);
        } else {
            alert("No hay elementos en la lista para eliminar");
        }
    });

    botonAgregar.addEventListener("click", ()=> {
        const nuevaLinea = document.createElement('li');
        nuevaLinea.textContent = `Nueva Tarea ${lista.children.length + 1}`;
        nuevaLinea.classList.add('tarea');
        lista.appendChild(nuevaLinea);
    });

    lista.addEventListener('click', (e)=> {
        if(e.target.tagName == "LI") {
            alert("Has seleccionado " + e.target.textContent);
            if (e.target.previousElementSibling) {
                alert("El anterior " + e.target.previousElementSibling.textContent);
            }
            if (e.target.nextElementSibling) {
                alert("El posterior " + e.target.nextElementSibling.textContent);
            }
        }
    });
}