new Vue({
    el: "#appRESBAR",
    data: {
        // Aqui inician las propiedades que vamos a necesitar
        //para almacenar nuestros objetos de trabajo
        productoSelected: {id:"0",nombre:"", precio: 0.00, categoria:{nombre:""}},
        productos: [
            {id:"2312a1211",nombre:"Papas francesas", precio: 3.25, categoria:{nombre:"Entradas"}},

            {id:"2312a1222",nombre:"Hamburguesa Big", precio: 7.25, categoria:{nombre:"Platos"}},
            
            {id:"2312a1333",nombre:"Pizza Suprema", precio: 6.35, categoria:{nombre:"Platos"}},
            
            {id:"2312a1444",nombre:"Ensalada Cesar", precio: 5.55, categoria:{nombre:"Platos"}},
            
            {id:"2312a5555",nombre:"Refresco de Horchata", precio: 1.75, categoria:{nombre:"Bebidas"}},
            
            {id:"2312a5555",nombre:"Soda Fanta 12 onz", precio: 1.00, categoria:{nombre:"Bebidas"}},
            
        ],
        producto: { 
            id: "0",
            nombre: "",
            precio: "0.00",
            Categoria:""
        },
        displayOption: "",
        txtBuscar: "",
        
        

        
    }, 
    methods: {
        //aqui van los metodos que vamos a necesitar

        addMode(){
            this.clearData();
            this.displayOption='Agregue un nuevo Producto';
        },
        clearData() {
            this.producto = {
                id: "0",
                nombre: "",
                precio: "0.00",
                Categoria:""
            };
            this.productoSelected = {id:"0",nombre:"", precio: 0.00, categoria:{nombre:""}};
        },

        getProductoSelected(){
            this.displayOption="Modificar Producto";
            this.producto=producto;
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