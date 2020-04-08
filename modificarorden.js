new Vue({
    el: "#appRESBAR",
    data: {
        // Aqui inician las propiedades que vamos a necesitar
        //para almacenar nuestros objetos de trabajo
        uri: 'http://localhost:3000/ordenes',
        ordenSelected: {},
        ordenes: [],
        ascendente: true,
        activos: true,
        lactivos: null,
        textoBusqueda: "",
        totalAux: ''
    },

    mounted: function() {
        this.obtenerOrdenes();

    },
    methods: {

        //Obtiene todas las ordenes 
        obtenerOrdenes: function() {
            axios.get(this.uri)
                .then(response => {
                    this.ordenes = response.data;
                    this.obtenerSelected();
                })
                .catch(e => { console.log(e) })

        },

        // captura los parametros pasados por URL
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        //Recalcula el sub-total al sumar producto ademas de recalcular el total de la orden
        sumarORestarProducto() {
            this.ordenSelected.total = this.ordenSelected.detalleOrden.reduce((total, item) => {
                item.subtotal = item.cantidad * item.precio;
                total = total + item.subtotal;
                return total;
            }, 0)
            parseFloat(this.ordenSelected.total).toFixed(2);
        },

        // modificar la orden 
        modificarOrden() {
            axios.put('http://localhost:3000/ordenes/' + this.ordenSelected.id, this.ordenSelected)
                .then(response => {
                    console.log("exito");
                    this.redireccionarAOrdenes();
                })
                .catch(error => {
                    console.log(error)
                });

        },

        obtenerSelected() {
            this.ordenSelected = this.ordenes.find(item => {
                return item.id == this.getParameterByName("id");
            })
        },
        redireccionarAOrdenes() {
            window.location = `./ordenes.html?alert=se modifico la orden ${this.ordenSelected.id} Satisfactoriamente`
        }

    },

})

//recuerda que recibes un parametro: ID el cual corresponde con el id de la orden con la que vas a trabajar