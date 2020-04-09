new Vue({
    el: "#appRESBAR",
    data: {

        uri:'http://localhost:3000/',
        categorias:{},
        productos:{},
        orden:{},
        idOrden:'5e850837a0dc6233d6e8eb81',
        
        ordenSelected:'',
        counter: 0,
        cantidad: '0',
        categoriaSelected:'Entradas',
        productoSelected: 0,
        textoBusqueda: '',

    },
    
    methods: {

        //Obtiene las Categorias desde la api rest 
        obtenerCategorias(){
            axios.get(this.uri+'categorias').then((result) => {
                this.categorias = result.data
            }).catch((err) => {
                console.log(err)
            });
        },

        //Obtiene los Productos desde la api rest
        obtenerProductos(){
            axios.get(this.uri+'productos').then((result) => {
                this.productos = result.data
            }).catch((err) => {
                console.log(err)
            });
        },
        
        //Obtiene las Ordenes desde la api rest
        obtenerOrden(){
            idOrden='5e850837a0dc6233d6e8eb81'
            axios.get(this.uri+'ordenes/'+idOrden).then((result)=>{
                this.orden = result.data
            }).catch((err)=>{
                console.log(err)
            });
        },

        //Buscador o filtro de productos 
        buscarProductos(x){
            if(this.textoBusqueda=="")
                return true;
                    
            var cad=this.productos[x].id + 
                this.productos[x].nombre +
                this.productos[x].precio;
            cad=cad.toUpperCase();
            
            if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0)
                return true;
            else
                return false;
        },

        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        obtenerSelected() {
            this.ordenSelected = this.ordenes.find(orden => {
                return orden.id == this.getParameterByName("id");
            })
        },

        //Regresa a la pantalla ordenes con el mensaje de productos agregados
        regresarOrdenes() {
            window.location = "./ordenes.html?alert=Productos%20Agregados%20Correctamente"
        },

        //regresa a la pantalla ordenes sin ninguna operacion 
        cancelar() {
            window.location.href = './ordenes.html'
        }
    },

    mounted: function () {
        this.obtenerCategorias()
        this.obtenerProductos()
        this.obtenerOrden()
    },
})

//recuerda que recibes un parametro: ID el cual corresponde con el id de la orden con la que vas a trabajar