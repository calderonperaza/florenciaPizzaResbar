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
        uri: ApiRestUrl+'/ordenes'
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
            console.log(ApiRestUrl.toString)
            if (this.ascendente == true) {
                if(this.activos){
                    axios.get(
                        this.uri+'?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22mesa%20ASC%22%20%0A%20%20%5D%0A%7D')
                        .then(response => {
                            this.ordenes = response.data
                        }).catch(e => {console.log(e)})
    
                }else{
                    axios.get(
                        this.uri+'?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22mesa%20ASC%22%0A%20%20%5D%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22estado%22%3A%20%22A%22%0A%20%20%7D%0A%7D')
                        .then(response => {
                            this.lactivos = response.data
                        }).catch(e => {console.log(e)})
                }
                
            } else {
                //ordena de forma descendente las ordenes
                if (this.activos) {
                    axios.get(
                        this.uri+'?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22mesa%20DESC%22%0A%20%20%5D%0A%7D')
                        .then(response => {
                            this.ordenes = response.data
                        }).catch(e => {console.log(e)})
        
                } else {
                    axios.get(
                        this.uri+'?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22mesa%20DESC%22%0A%20%20%5D%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22estado%22%3A%20%22A%22%0A%20%20%7D%0A%7D')
                        .then(response => {
                            this.lactivos = response.data
                        }).catch(e => {console.log(e)})
                        
                }
                
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
        //Muestra el modal Detalle
        mostrarDetalle:function(){
            $('#modalDetalle').modal('show');
           }, 
        //Muestra el modal Eliminar
        mostrarEliminar:function(){
            $('#modalEliminar').modal('show');
        }, 
        //Metodo eliminar Orden
        eliminarOrden:function(){
            let texto = document.getElementById("lblMotivo").value;
            if (texto =="") {
                document.getElementById("lblMotivo").classList.add('is-invalid');
                document.getElementById("alertaMotivo").textContent = "*Campo requerido";
            } else {
                document.getElementById("lblMotivo").classList.remove('is-invalid');
                document.getElementById("lblMotivo").classList.add('is-valid');
                document.getElementById("alertaMotivo").textContent = "";
                //Elimina la orden
		        axios.delete(this.uri+'/'+this.ordenSelected.id)
                .then(function (res) {
                    console.log("DELETE ORDEN");
                    window.location = `./ordenes.html?alert=se elimino la orden satisfactoriamente`                  
                 }).catch(e => {console.log(e)})

                //cierra el modal Eliminar
                $('#modalEliminar').modal('hide');
                //Actualiza la tabla Ordenes
                this.ordenar();
                //Limpia el lblMotivo
                this.limpiarMotivo();
		    }  
        },
        //Limpiar el Motivo por el cual se elimino la orden
        limpiarMotivo:function(){
            $("#modalEliminar").find("input").val("");
            document.getElementById("lblMotivo").classList.remove('is-invalid');
            document.getElementById("alertaMotivo").textContent = "";
            
        }   
    },
    mounted(){
        this.ordenar()
        this.mostrarActivos()
        this.alertLauncher()
    }

})