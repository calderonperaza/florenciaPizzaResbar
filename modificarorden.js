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

        eliminarProducto(index) {
            if (index != undefined) {
                console.log(index);
                this.ordenSelected.detalleOrden.splice(index, 1);
                this.sumarORestarProducto();
            }

        },

        // captura los parametros pasados por URL
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            if (results === null) {
                window.location = `./ordenes.html` //redireciona a ordenes si no se encuentra el id 
            } else {
                return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
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
            //Se comprueba si la orden tiene productos si la orden no tiene productos se elimina 
            if (this.ordenSelected.detalleOrden.length > 0) {
                axios.put(this.uri + '/' + this.ordenSelected.id, this.ordenSelected)
                    .then(response => {
                        this.redireccionarAOrdenes();
                    })
                    .catch(error => {
                        console.log(error)
                    });
            } else {
                this.eliminarOrden();
            }

        },

        //Elimina la orden completa
        eliminarOrden() {
            let idTemporal = this.ordenSelected.id;
            axios.delete(this.uri + '/' + this.ordenSelected.id)
                .then(function(res) {
                    window.location = `./ordenes.html?alert=se elimino la orden ${idTemporal} Satisfactoriamente`
                })
                .catch(function(error) {
                    console.log(error);
                });
        },


        obtenerSelected() {
            this.ordenSelected = this.ordenes.find(item => {
                return item.id == this.getParameterByName("id");
            })

            if (this.ordenSelected === undefined || this.ordenSelected === {}) {
                window.location = `./ordenes.html`
            }

        },
        redireccionarAOrdenes() {
            window.location = `./ordenes.html?alert=se modifico la orden ${this.ordenSelected.id} Satisfactoriamente`
        }

    },

})

//recuerda que recibes un parametro: ID el cual corresponde con el id de la orden con la que vas a trabajar