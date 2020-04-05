new Vue({
    el: "#appRESBAR",
    data: {
        ordenSelected: '',
        ordenes: {},
        ascendente: true,
        activos: true,
        lactivos: {},
        textoBusqueda: "",
        alerta: "",
        alertBool: true,
        uri:'http://localhost:3000/ordenes'
    },
    methods: {
        //Obtiene todas las ordenes 
        obtenerOrdenes: function(){
            axios.get(this.uri)
                .then(response => {
                    this.ordenes = response.data
                })
                .catch(e => {console.log(e)})
        },

        ordenar: function() {
            //ordena de forma ascendente las ordenes
            if (this.ascendente == true) {
                axios.get(
                    this.uri+'?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22mesa%20ASC%22%20%0A%20%20%5D%0A%7D')
                    .then(response => {
                        this.ordenes = response.data
                    }).catch(e => {console.log(e)})

                    axios.get(
                        this.uri+'?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22mesa%20ASC%22%0A%20%20%5D%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22estado%22%3A%20%22A%22%0A%20%20%7D%0A%7D')
                        .then(response => {
                            this.lactivos = response.data
                        }).catch(e => {console.log(e)})
            } else {
                //ordena de forma descendente las ordenes
                axios.get(
                    this.uri+'?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22mesa%20DESC%22%0A%20%20%5D%0A%7D')
                    .then(response => {
                        this.ordenes = response.data
                    }).catch(e => {console.log(e)})

                axios.get(
                    this.uri+'?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22mesa%20DESC%22%0A%20%20%5D%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22estado%22%3A%20%22A%22%0A%20%20%7D%0A%7D')
                    .then(response => {
                        this.lactivos = response.data
                    }).catch(e => {console.log(e)})
            }
            this.ascendente = !this.ascendente
        },
        //Obtiene todas las ordenes con estado activo
        mostrarActivos: function() {
            axios.get(
                this.uri+'?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22estado%22%3A%20%22A%22%0A%20%20%7D%0A%7D')
                .then(response => {
                    this.lactivos = response.data
                }).catch(e => {console.log(e)})
            this.activos = !this.activos
        },
        //Filtra las ordenes que contengan el texto a ingresado
        buscar: function(x) {

            if (this.textoBusqueda == "")
                return true;
            //cuando el toggle esta desactivado    
            if (this.activos) {
                var cad = this.ordenes[x].id +
                this.ordenes[x].cliente +
                this.ordenes[x].mesa +
                this.ordenes[x].mesero +
                this.ordenes[x].observacion +
                this.ordenes[x].total;

            cad = cad.toUpperCase();

            if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0)
                return true;
            else
                return false;
                    
            } else {
                //cuando el toggle esta activado
                var cad = this.lactivos[x].id +
                this.lactivos[x].cliente +
                this.lactivos[x].mesa +
                this.lactivos[x].mesero +
                this.lactivos[x].observacion +
                this.lactivos[x].total;

            cad = cad.toUpperCase();

            if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0)
                return true;
            else
                return false;
            }
            
        },
        /*Busca el mensaje pasado como parametro en la uri 
        para mostrarlo como alert*/
        alertLauncher: function() {
            let uri = window.location.href.split('?')
            if (uri.length == 2) {

                let vars = uri[1].split('=')
                if (vars[0].toUpperCase() == 'ALERT') {

                    this.alerta = vars[1].replace(/%20/g, " ")
                    console.log(this.alerta)
                    this.timer()
                }

            } else {
                this.alertBool = false
            }

        },
        modificarOrden() {
            window.location = "./modificarorden.html?id=" + this.ordenSelected.id;
        },
        //Hace desaparecer el alert
        timer: function() {
            window.setTimeout(function() {
                $(".alert").fadeTo(500, 0).slideUp(500, function() {
                    $(this).remove();

                });
            }, 4000);

        },
        cobrarOrden() {
            window.location = "./cobrarorden.html?id=" + this.ordenSelected.id;
        },
        agregarProductos() {
            window.location = "./addmasproductos.html?id=" + this.ordenSelected.id;
        },
    },
    mounted(){
        this.ordenar()
        this.mostrarActivos()
        this.alertLauncher()
    }

})