new Vue({
    el: "#appRESBAR",
    data: {
        urlApi: ApiRestUrl + "/resumenDeVentas",
        resumen: [],
        desde: null,
        hasta: null,
    },
    methods: {
        cargardatos: function() {
            var filter = {
                "order": [
                    "fecha"
                ],
                "where": {
                    "fecha": { "between": [this.desde, this.hasta] }
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
    },

    mounted() {
        // cargando los datos
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.hasta = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10);
        this.desde = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substring(0, 10);


        var filter = {
            "order": [
                "fecha"
            ],
            "where": {
                "fecha": { "between": [firstDay, lastDay] }
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
    var fecha = new Date(date.split("-")[0], date.split("-")[1], date.split("-")[2].split("T")[0], 0, 0, 0, 0);
    var ms = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return fecha.getDate() + " de " + ms[fecha.getMonth()] + " del " + fecha.getFullYear();
}