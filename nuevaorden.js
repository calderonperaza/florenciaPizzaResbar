var app = new Vue({
    el: "#appRESBAR",
    data: {
        nuevaOrden:{
            fecha: "2020-10-31", //fecha de sistema
            mesero: null,
            mesa: null,
            cliente: null,
            estado: "C",
            total: null,
            observacion: null,
            // propiedad que contendra los productos que el usuario agregue
            // se carga atraves de getProductos() y se le agregan los campos cantidad y subtotal
            detalleOrden: [
                   //formato--> { cantidad: 1, nombre: "Hamburguesa Big", precio: 7.25, categoria: { nombre: "Platos" }, subtotal: 7.25 }
            ]
        },
        //API model
        categorias:[],
        //API info
        mensajeApi : '',
        url:"http://localhost:3000/"        

    },
    created(){ 
        this.getCategorias();
        this.getProductos();
    },

    methods: {
        //decrementar cantidad del producto a valores no negativos
        decProducto(detalleProducto){
            if(detalleProducto.cantidad >0) {
                detalleProducto.cantidad--;
                detalleProducto.subtotal = detalleProducto.cantidad*detalleProducto.precio;
            }
        },
        //incrementar cantidad del producto 
        incProducto(detalleProducto){
            detalleProducto.cantidad++;
            detalleProducto.subtotal = detalleProducto.cantidad*detalleProducto.precio;
        },
        //API get methods
        getCategorias(){
            this.mensajeApi="Obteniendo Categorias...";
            axios
                .get(this.url+'categorias')
                .then(response => {
                    this.categorias = response.data;
                })
            if(this.categorias.length===0){
                this.mensajeApi="Error al cargar datos";
            }else{
                this.mensajeApi="";
            }
        },
        getProductos(){
            this.mensajeApi="Obteniendo Productos...";
            axios
                .get(this.url+'productos')
                .then(response => {
                    this.productos = response.data;
                    //se agregan dos atributos, cantidad y subtotal
                    this.nuevaOrden.detalleOrden = this.productos.map(function(obj){ 
                        let rObj = { cantidad: 0, nombre: obj.nombre , precio: obj.precio, categoria: obj.categoria, subtotal: 0 };
                        return rObj;
                    });
                })
            if(this.categorias.length===0){
                this.mensajeApi="Error al cargar datos";
            }else{
                this.mensajeApi="";
            }
        }
    }

})