new Vue({
    el: "#appRESBAR",
    data: {
        // Aqui inician las propiedades que vamos a necesitar
        //para almacenar nuestros objetos de trabajo

        ordenSelected: '',
        uri: 'http://localhost:3000/ordenes/'
    },
    mounted: function() {
        this.obtenerSelected();
    },
    methods: {

        /**
         * obtenine el valor de un parametro enviado por url
         * @param String name nombre del parametro
         * @return String  el parametro 
         */
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        obtenerSelected() {
            axios.get(this.uri + this.getParameterByName("id"))
                .then(response => {
                    this.ordenSelected = response.data;
                    let fecha = this.convertDate(this.ordenSelected.fecha);
                    document.getElementById("fecha").textContent += "Fecha: " + fecha;
                    this.checkTotal();
                })
                .catch(e => { console.log(e) });
        },

        updateEstado() {
            let uriId = this.uri + this.getParameterByName("id");
            axios.put(uriId, this.ordenSelected);
            console.log(this.ordenSelected);
        },

        redireccionarAOrdenes() {
            window.location = "/ordenes.html?alert=este%20es%20un%20mensaje"
        },

        convertDate(date) {
            let newDate = new Date(date);
            let formattedDate = newDate.getDay() + "/" + newDate.getMonth() + "/" + newDate.getFullYear();
            return formattedDate;
        },


        //Metodo para verificar que el total sea igual a la sumatoria de los subtotales del detalle de la Orden
        checkTotal() {
            let total1 = this.ordenSelected.total;
            let total2 = 0;
            for (let i = 0; i < this.ordenSelected.detalleOrden.length; i++) {
                total2 += this.ordenSelected.detalleOrden[i].subtotal;
            }
            if (total1 != total2) {
                this.ordenSelected.total = total2;
            }
        },

        cobrar: function() {
            let efectivo = document.getElementById("lblEfectivo").value;
            if (efectivo < this.ordenSelected.total) {
                document.getElementById("lblEfectivo").classList.add('is-invalid');
                document.getElementById("alerta").textContent += "Ingrese suficiente efectivo";
            } else {
                document.getElementById("lblEfectivo").classList.remove('is-invalid');
                document.getElementById("lblEfectivo").classList.add('is-valid');
                document.getElementById("alerta").textContent = "";
                this.ordenSelected.estado = "C";
                this.updateEstado(this.ordenSelected);
                console.log(this.ordenSelected.estado);
                let cambio = efectivo - this.ordenSelected.total;
                window.location = "/ordenes.html?alert=Orden%20cobrada:%20" + this.ordenSelected.id + ",%20con%20un%20total%20de:%20$" + this.ordenSelected.total + ",%20efectivo%20de:%20$" + efectivo + "%20y%20cambio%20de:%20$" + cambio.toFixed(2);
            }
        },

    },

})

//recuerda que recibes un parametro: ID el cual corresponde con el id de la orden con la que vas a trabajar