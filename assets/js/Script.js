// Funcion que muestra la alerta
function alerta() {
    $("#buttonAlert").show('fade');
    setTimeout(function() {
        $("#buttonAlert").hide('fade');
    }, 5000);

}