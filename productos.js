new Vue({
    el: "#appRESBAR",
    data: {
        // Aqui inician las propiedades que vamos a necesitar
        //para almacenar nuestros objetos de trabajo
        categorias: [],
        productoSelected: {id:"0",nombre:"", precio: 0.00, categoria:{nombre:""}},
        productos: [],
        producto: { 
            id: "0",
            nombre: "",
            precio: "0.00",
            categoria:""
        }, 
        
        displayOption: "",
        txtBuscar: "",
        productomodificado: {id:"0",nombre:"", precio: 0.00, categoria:{nombre:""}},
        
        

        
    }, 
    created: function(){
        this.obtenerProductos();
    },
    methods: {

        obtenerProductos(){
            axios
            .get('http://localhost:3000/productos')
            .then(response => {this.productos=response.data;})


        },
       
        obtenerCategorias(){
            axios
                .get('http://localhost:3000/categorias')
                .then(response => {console.log(response)
                this.categorias=response.data;
                })



        },

        eliminarProducto(){
            axios
            .delete('http://localhost:3000/productos/'+this.productoSelected.id)
            .then(response => {console.log(response)

            this.obtenerProductos();
            })


        },

        modalmodificarProducto(){
            this.obtenerCategorias();
            this.productomodificado=this.productoSelected;
            console.log(this.categorias.nombre);
            
            this.obtenerProductos();
        },

        modificarProducto(){
            this.productomodificado=this.productoSelected;
            let precio=parseFloat(this.productomodificado.precio).toFixed(2);
            this.productomodificado.precio="aaaa";
            let data=JSON.stringify(this.productomodificado);
            data=data.replace('"aaaa"',precio);
            console.log(data);
            axios.patch('http://localhost:3000/productos/'+this.productomodificado.id,
             data,
             { 		 headers: { 			  'content-type': 'application/json', 		 }}
         
             ).then(response => {
                 console.log(response);
              this.clearData();
              alert("Guardado con exito");
              this.obtenerProductos();
             }).catch(ex => {
                 console.log(ex)
             });
 

        },

        crearProducto(){
           let precio=parseFloat(this.producto.precio).toFixed(2);
           this.producto.precio="aaaa";
           delete this.producto.id;
           let data=JSON.stringify(this.producto);
           data=data.replace('"aaaa"',precio);
            console.log(data);
            axios.post('http://localhost:3000/productos',
            data,
            { 		 headers: { 			  'content-type': 'application/json', 		 }}
        
            ).then(response => {
                console.log(response);
             this.clearData();
             alert("Guardado con exito");
             this.obtenerProductos();
            }).catch(ex => {
                console.log(ex)
            });


        },


        imprimirproducto(){
            console.log(this.producto);

        },


        //aqui van los metodos que vamos a necesitar
        modoeditar(){
                     /*this.productx= {nombre:"", precio: 0.00, categoria:{nombre:""}};
                    return  this.productx.nombre=productoSelected.nombre,
                     this.productx.precio=productoSelected.precio,
                     this.productx.categoria.nombre=productoSelected.categoria.nombre,*/
                     this.getProductoSelected();
                    console.log(this.getProductoSelected);



        },

        addMode(){
            this.clearData();
            this.displayOption='Agregue un nuevo Producto';
        },
        clearData() {
            this.producto = {
                id: "0",
                nombre: "",
                precio: "0.00",
                categoria:""
            };
            this.productoSelected = {id:"0",nombre:"", precio: 0.00, categoria:{nombre:""}};
            this.obtenerProductos();
            this.productomodificado;

        },

        getProductoSelected(){
            this.displayOption="Modificar Producto";
            this.producto=productoSelected;
            console.log(producto);
        },
        buscar: function(x) {

            if (this.txtBuscar == "")
                return true;
            var cad = this.productos[x].id +
                this.productos[x].nombre +
                this.productos[x].precio +
                this.productos[x].categoria.nombre ;
                

            cad = cad.toUpperCase();

            if (cad.indexOf(this.txtBuscar.toUpperCase()) >= 0)
                return true;
            else
                return false;
        }
    },


})