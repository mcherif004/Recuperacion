// $.each === jQuery.each
$(inicio);
function inicio(){
    // RECORRER Y MANIPULAR ELEMENTOS DE UN ARRAY
    // $.each -> iterar sobre el array sin modificar el contenido original. Devuelve un array
    // RECORRER UN OBJETO
    // let obj = {
    //     "nombre": "Raúl",
    //     "apellido": "Bermúdez"
    // } 

    // $.each(obj, function(clave, valor){
    //     alert("Clave: " + clave + " - Valor: " + valor);
    // })

    // rECORRER UN Array
    // let array = [1, 3, 5, 7];
    // $.each(array, function(indice, valor){
    //     alert("Indice: " + indice + " - Valor: " + valor);
    // })
    // alert("Número de elementos del array: " + array.length);

    // BUSCAR UN VALOR EN UN ARRAY
    // if ($.inArray(3, array) !== -1){
    //     alert("El valor se encuentra en el array, en la posicion: " + $.inArray(3, array));
    // } else{
    //     alert("El valor NO se encuentra en el array");
    // }; // Devuelve el índice del valor buscado. Si no lo encuentra devuelve -1

    // UNIR DOS ARRAYS
    // let nuevoArray = $.merge([1, 2, 3], [4, 5, 6]);

    // RECORRRER UN ARRAY DE ELEMENTOS DE UN SELECTOR
    // $("#recorrer").click(function(){
    //     $("li").each(function(){
    //         alert($(this).text());
    //     })
    // })

    // CONTAR LOS ELEMENTOS
    // alert("Nº de elementos Li: " + $("li").length);

    // RECORRER UN ELEMENTO ESPECIFICO DE UNA ARRAY DE JQUERY
    // let elemento = $("li")[2];
    // alert("El tercer elemento es de tipo " + elemento.nodeName + " y su contenido es: " + elemento.innerHTML);

    // OBTENER EL INDICE DE UN ELEMENTO RESPECTO A SUS HERMANOS
    // $("li").click(function(){
    //     alert("Has pulsado sobre el elemento " + $(this).index());
    // })

    // FILTRAR ELEMENTOS SEGÚN UNA CONDICIÓN
    // $.grep(array, function(elem, indice){ return condicion})
    // let filtrado = $.grep($("li"), function(elemento, indice){
    //     return indice > 1;
    // })

    // $.each(filtrado, function(i, e){
    //     alert(i + " - " + $(e).text());
    // })

    // CONVERTIR UN ARRAY A UN ARRAY JS
    // let arrayJS = $.makeArray($("li"));
    // arrayJS.reverse();
    // Recorremos el arrayJS
    // for (let i = 0; i < arrayJS.length; i++){
    //     alert(arrayJS[i].innerHTML);
    // }
}