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
            detalleOrden: [
               // formato--> { cantidad: 1, nombre: "Hamburguesa Big", precio: 7.25, categoria: { nombre: "Platos" }, subtotal: 7.25 }
               //subtotal calculado
            ]
        },
        categorias:[

            {id:"12312312", nombre:"Entradas"},

            {id:"12322222", nombre:"Platos"},

            {id:"12333333", nombre:"Bebidas"}
        ]            

    },
    created(){ 
        this.fetchProductos();
    },

    methods: {
        fetchProductos(){
            let productos = [

                {id:"2312a1211",nombre:"Papas francesas", precio: 3.25, categoria:{nombre:"Entradas"}},
    
                {id:"2312a1222",nombre:"Hamburguesa Big", precio: 7.25, categoria:{nombre:"Platos"}},
    
                {id:"2312a1333",nombre:"Pizza Suprema", precio: 6.35, categoria:{nombre:"Platos"}},
    
                {id:"2312a1444",nombre:"Ensalada Cesar", precio: 5.55, categoria:{nombre:"Platos"}},
    
                {id:"2312a5555",nombre:"Refresco de Horchata", precio: 1.75, categoria:{nombre:"Bebidas"}},
    
                {id:"2312a5555",nombre:"Soda Fanta 12 onz", precio: 1.00, categoria:{nombre:"Bebidas"}}

            ];
     
            //llenar y dar formato al detalle de orden 
            this.nuevaOrden.detalleOrden = productos.map(function(obj){ 
                var rObj = { cantidad: 0, nombre: obj.nombre , precio: obj.precio, categoria: obj.categoria, subtotal: 0 };
                return rObj;
            });
    
        },
        decProducto(detalleProducto){
            if(detalleProducto.cantidad >0) {
                detalleProducto.cantidad--;
                detalleProducto.subtotal = detalleProducto.cantidad*detalleProducto.precio;
            }
        },
        incProducto(detalleProducto){
            detalleProducto.cantidad++;
            detalleProducto.subtotal = detalleProducto.cantidad*detalleProducto.precio;
        }

    }

})