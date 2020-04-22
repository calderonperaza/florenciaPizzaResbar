new Vue({
    el: "#appRESBAR",
    data: {
        // Aqui inician las propiedades que vamos a necesitar
        //para almacenar nuestros objetos de trabajo

        ordenSelected: '',
        nuevoResumen: {
            fecha: null,
            total: null,
            productos: []
        },
        uri: ApiRestUrl + '/ordenes/',
        uriVentas: ApiRestUrl + '/resumenDeVentas',
        resumenDeVenta: [],
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

        //Obtener orden seleccionada
        obtenerSelected() {
            axios.get(this.uri + this.getParameterByName("id"))
                .then(response => {
                    this.ordenSelected = response.data;
                    this.productosOrden = this.ordenSelected.detalleOrden;
                    let fecha = this.convertDate(this.ordenSelected.fecha);
                    document.getElementById("fecha").textContent = "Fecha: " + fecha;
                    document.getElementById("total").textContent = "Total: $" + this.ordenSelected.total.toFixed(2);
                    this.checkTotal();
                    this.checkEstado();
                })
                .catch(e => { console.log(e) });
        },

        //Cambiamos el estado de la orden a cobrada
        updateEstado() {
            let uriId = this.uri + this.getParameterByName("id");
            this.ordenSelected.total = parseFloat(this.ordenSelected.total.toFixed(2));
            this.ordenSelected.estado = "C";
            axios.put(uriId, this.ordenSelected)
                .then(response => {
                    console.log(response);
                })
                .catch(e => { console.log(e) });
        },

        redireccionarAOrdenes(alert) {
            window.location = "./ordenes.html" + alert;
        },

        //Metodo para cambiar la fecha a formato YYYY-MM-DD
        convertDate() {
            let newDate = new Date(this.ordenSelected.fecha);
            let anio = newDate.getFullYear();
            let mes;
            if ((newDate.getMonth() + 1) < 10) {
                mes = "0" + (newDate.getMonth() + 1);
            } else {
                mes = newDate.getMonth() + 1;
            }
            let dia;
            if (newDate.getDate() < 10) {
                dia = "0" + newDate.getDate();
            } else {
                dia = newDate.getDate();
            }
            let formattedDate = anio + "-" + mes + "-" + dia;
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

        //Metodo para que no se pueda acceder a una orden invalida por url directa
        checkEstado() {
            if (this.ordenSelected.estado == "C") {
                window.location = "./ordenes.html?alert=Invalido:%20Esta%20Orden%20ya%20fue%20cobrada."
            } else if (this.ordenSelected.estado != "A") {
                this.redireccionarAOrdenes();
            }
        },

        //Obtener el resumen de Ventas
        getResumenVentas() {
            let efectivo = document.getElementById("lblEfectivo").value;
            let cambio = efectivo - this.ordenSelected.total;
            let fechaOrden = this.convertDate();
            let filter = {
                where: {
                    fecha: fechaOrden
                }
            };
            axios.get(this.uriVentas + "?filter=" + JSON.stringify(filter))
                .then(response => {
                    this.resumenDeVenta = response.data;
                    if (this.resumenDeVenta.length == 0) {
                        console.log('vacio');
                        this.createResumenDeVentas();
                        window.location = "./ordenes.html?alert=Orden%20cobrada:%20" + this.ordenSelected.id + ",%20con%20un%20total%20de:%20$" + this.ordenSelected.total + ",%20efectivo%20de:%20$" + efectivo + "%20y%20cambio%20de:%20$" + cambio.toFixed(2);
                    } else {
                        this.updateResumenDeVentas();
                        window.location = "./ordenes.html?alert=Orden%20cobrada:%20" + this.ordenSelected.id + ",%20con%20un%20total%20de:%20$" + this.ordenSelected.total + ",%20efectivo%20de:%20$" + efectivo + "%20y%20cambio%20de:%20$" + cambio.toFixed(2);
                    }
                })
                .catch(e => { console.log(e) });
        },

        //Si aun no hay un resumen de ventas creamos uno nuevo.
        createResumenDeVentas() {
            let fechaResumen = this.convertDate();
            let productosOrden = this.ordenSelected.detalleOrden;
            let totalOrden = parseFloat((this.ordenSelected.total).toFixed(2));
            let obj = [];
            for (let i = 0; i < productosOrden.length; i++) {
                let array = { "nombre": productosOrden[i].nombre, "cantidad": productosOrden[i].cantidad };
                obj.unshift(array);
            }
            this.nuevoResumen.fecha = fechaResumen;
            this.nuevoResumen.total = totalOrden;
            this.nuevoResumen.productos = obj;
            axios.post(this.uriVentas, this.nuevoResumen)
                .then(response => {
                    this.resumenDeVenta = response.data;
                })
                .catch(e => { console.log(e) });
        },

        //Si ya hay un resumen solo lo actualizamos
        updateResumenDeVentas() {
            let obj = [];
            for (let i = 0; i < this.ordenSelected.detalleOrden.length; i++) {
                let array = { "nombre": this.ordenSelected.detalleOrden[i].nombre, "cantidad": this.ordenSelected.detalleOrden[i].cantidad };
                obj.unshift(array);
            }
            let objResumen = [];

            for (let i = 0; i < obj.length; i++) {
                let flag = 0;
                for (let j = 0; j < this.resumenDeVenta[0].productos.length; j++) {
                    if (obj[i].nombre == this.resumenDeVenta[0].productos[j].nombre) {
                        flag = 1;
                        let cantidad = this.resumenDeVenta[0].productos[j].cantidad;
                        cantidad += obj[i].cantidad;
                        this.resumenDeVenta[0].productos[j].cantidad = cantidad;
                    } else if (j == (this.resumenDeVenta[0].productos.length) - 1 && flag == 0) {
                        console.log(obj[i].nombre);
                        objResumen.unshift(obj[i]);
                    }
                }
            }
            for (let i = 0; i < objResumen.length; i++) {
                this.resumenDeVenta[0].productos.push(objResumen[i]);
            }
            console.log(this.resumenDeVenta[0].productos);
            let fechaAux = this.convertDate(this.resumenDeVenta[0].fecha);
            let totalAux = parseFloat((this.resumenDeVenta[0].total + this.ordenSelected.total).toFixed(2));
            let datos = {
                fecha: fechaAux,
                total: totalAux,
                productos: this.resumenDeVenta[0].productos
            };
            let uriId = this.uriVentas + "/" + this.resumenDeVenta[0].id;
            console.log(JSON.stringify(datos));
            axios.put(uriId, datos)
                .then(response => {
                    console.log(response);
                })
                .catch(e => { console.log(e) });
        },

        //Aqui esta la funcionalidad al dar click en cobrar
        cobrar: function() {
            this.checkEstado();
            let efectivo = document.getElementById("lblEfectivo").value;
            if (efectivo < this.ordenSelected.total) {
                document.getElementById("lblEfectivo").classList.add('is-invalid');
                document.getElementById("alerta").textContent = "Ingrese suficiente efectivo";
            } else {
                document.getElementById("lblEfectivo").classList.remove('is-invalid');
                document.getElementById("lblEfectivo").classList.add('is-valid');
                document.getElementById("alerta").textContent = "";
                this.updateEstado();
                this.getResumenVentas();
                console.log(this.resumenDeVenta);
            }
        },

    },

})

//recuerda que recibes un parametro: ID el cual corresponde con el id de la orden con la que vas a trabajar