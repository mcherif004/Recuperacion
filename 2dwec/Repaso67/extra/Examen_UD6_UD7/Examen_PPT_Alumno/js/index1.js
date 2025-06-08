$(function(){
    cargarPersonajes();
});

function cargarPersonajes () {
    let conjuntoPlanetas = new Set();
    $.get("php/get_personajes.php").then(function(response){
        let array = response.split(":");
        let contador = 0;
        $.each(array, function(clave, valor){
            if (contador === 3) {
                conjuntoPlanetas.add(valor.split(",")[0])
            } else {
                contador++;
            }
        })
        conjuntoPlanetas.forEach(valor => {
            let value = valor.split('"')[1];
            let option = "<option value='" + value + "'>" + value + "</option>";
            $("#planeta").append(option);
        });
    })

    $("#planeta").on("change", habilitarBoton);
}

