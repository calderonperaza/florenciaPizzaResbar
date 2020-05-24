new Vue({
    el: "#appRESBAR",
    data: {
        urlApi: ApiRestUrl + "/resumenDeVentas",
        resumen: [],
    },
    methods: {

    },

    mounted() {
        // cargando los datos
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var filter = {
            "order": [
                "fecha"
            ],
            "where": {
                "fecha": { "gte": firstDay, "lte": lastDay }
            },
            "fields": {
                "id": true,
                "fecha": true,
                "total": true
            }
        };

        axios.get(this.urlApi + "?filter=" + JSON.stringify(filter)).then(
            response => {
                this.resumen = response.data
            }
        ).catch(ex => { console.log(ex) })


    }
});

function formatFecha(date) {
    var fecha = new Date(date);
    var ms = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return fecha.getDate() + " de " + ms[fecha.getMonth()] + " del " + fecha.getFullYear();
}