window.onload = iniciar;

function iniciar() {
    document.getElementById('verTodas').addEventListener('click', verTodas);
    document.getElementById('crearCookie').addEventListener('click', crearCookie);
    //Modificar cookie
    document.getElementById('modificarCookie').addEventListener('click', modificarCookie);
    document.getElementById('borrarCookie').addEventListener('click', borrarCookie);
    document.getElementById('leerCookie').addEventListener('click', leerCookie);
}

function verTodas() {
    alert(document.cookie);
}

function crearCookie(){
    const clave = prompt("Introduce el nombre de la cookie:");
    const valor = prompt("Introduce el valor de la cookie:");
    const dias = prompt("Introduce el número de días hasta que expire la cookie:");//Lo tengo que convertir a entero
    
    document.cookie = clave + "=" + valor;
}

function modificarCookie() {
    const clave = prompt("Introduce el nombre de la cookie que quieres modificar:");
    const cookies = document.cookie.split('; ');//Dividimos las cookies en un array
    let existe = false;
    for(c of cookies){
        if(c.startsWith(clave + '=')){
            existe = true;
            break;
        }
    }

    if(existe){
        const nuevoValor = prompt("Introduce el nuevo valor de la cookie:");
        document.cookie = clave + "=" + nuevoValor;
        alert("Cookie modificada correctamente.");
    }else{
        alert("La cookie no existe.");
    }
}

function borrarCookie() {
    const clave = prompt("Introduce el nombre de la cookie que quieres borrar:");
    const cookies = document.cookie.split('; ');//Dividimos las cookies en un array
    let existe = false;
    for(c of cookies){
        if(c.startsWith(clave + '=')){
            existe = true;
            break;
        }
    }

    if(existe){
        document.cookie = clave + "=; max-age=0";
        alert("Cookie borrada correctamente.");
    }else{
        alert("La cookie no existe.");
    }
}

function leerCookie() {
    const clave = prompt("Introduce el nombre de la cookie que quieres leer:");
    const cookies = document.cookie.split('; ');//Dividimos las cookies en un array
    let existe = false;
    for(c of cookies){
        if(c.startsWith(clave + '=')){
            existe = true;
            break;
        }
    }

    if(existe){
        alert("La cookie existe.");
    }else{
        alert("La cookie no existe.");
    }
}