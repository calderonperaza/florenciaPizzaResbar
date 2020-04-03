new Vue({
    el: "#appRESBAR",
    data: {
        cantidad: 0,

        // Aqui inician las propiedades que vamos a necesitar
        //para almacenar nuestros objetos de trabajo
        detalleOrden: [],

        nuevoDetalleOrden: [{
            cantidad: 0,
            nombre: "",
            precio: 0,
            categoria: {
                nombre: ""
            },
            subtotal: 0
        }],

        counter: 0,

        categorias: [
            { idCat: "1", nombre: "Entradas" },
            { idCat: "2", nombre: "Platos" },
            { idCat: "3", nombre: "Bebidas" },
            { idCat: "4", nombre: "Postres" },
        ],
        categoriaSelected: "Entradas",
        
        productos: [
            { id: "2312a1211", nombre: "Papas francesas", precio: 3.25, categoria: { nombre: "Entradas" } },
            { id: "2312a1222", nombre: "Hamburguesa Media Libra", precio: 7.25, categoria: { nombre: "Platos" } },
            { id: "2312a1333", nombre: "Pizza Suprema", precio: 6.35, categoria: { nombre: "Platos" } },
            { id: "2312a1444", nombre: "Ensalada Cesar", precio: 5.55, categoria: { nombre: "Platos" } },
            { id: "2312a5555", nombre: "Refresco de Horchata", precio: 1.75, categoria: { nombre: "Bebidas" } },
            { id: "2312a5555", nombre: "Soda Coca Cola ", precio: 1.00, categoria: { nombre: "Bebidas" } },
            { id: "2312a1211", nombre: "Papas Twister", precio: 3.25, categoria: { nombre: "Entradas" } },
            { id: "2312a1222", nombre: "Hamburguesa Big", precio: 7.25, categoria: { nombre: "Platos" } },
            { id: "2312a1333", nombre: "Pizza Suprema", precio: 6.35, categoria: { nombre: "Platos" } },
            { id: "2312a1444", nombre: "Ensalada Cesar", precio: 5.55, categoria: { nombre: "Platos" } },
            { id: "2312a5555", nombre: "Refresco Fanta", precio: 1.75, categoria: { nombre: "Bebidas" } },
            { id: "2312a5555", nombre: "Hot Cakes", precio: 1.00, categoria: { nombre: "Postres" } },
            { id: "2312a1211", nombre: "Papas Chips", precio: 3.25, categoria: { nombre: "Entradas" } },
            { id: "2312a1222", nombre: "Hamburguesa Cuarto Libra", precio: 7.25, categoria: { nombre: "Platos" } },
            { id: "2312a1333", nombre: "Helado de Vainilla", precio: 6.35, categoria: { nombre: "Postres" } },
            { id: "2312a1444", nombre: "Ensalada Normal", precio: 5.55, categoria: { nombre: "Platos" } },
            { id: "2312a5555", nombre: "Cerveza Corona", precio: 1.75, categoria: { nombre: "Bebidas" } },
            { id: "2312a5555", nombre: "Pastel de Manzana", precio: 1.00, categoria: { nombre: "Postres" } },

        ],
        productoSelected: 0,
        nombre:'',




    },
    methods: {

        //aqui van los metodos que vamos a necesitar
        agregarAdetalle(productoSelected) {
            this.nuevoDetalleOrden.cantidad = cantidad;
            this.nuevoDetalleOrden.nombre = this.productos[this.productoSelected].nombre;
            this.nuevoDetalleOrden.precio = this.productos[this.productoSelected].precio;
            this.nuevoDetalleOrden.categoria.nombre = this.productos[this.productoSelected].categoria.nombre;

            if (cantidad >= 1) {
                detallesDeNuevaOrden.push(this.nuevoDetalleOrden);
            }
            this.nuevoDetalleOrden = [{
                cantidad: 0,
                nombre: "",
                precio: 0,
                categoria: {
                    nombre: ""
                },
                subtotal: 0
            }];
        },

        regresarOrdenes() {
            window.location = "/ordenes.html?alert=Productos%20Agregados%20Correctamente"
        },
        cancelar() {
            window.location = "/ordenes.html"
        }

    },
    computed:{
        searchProductos: function(){
            return this.productos.filter((producto => producto.nombre.includes(this.nombre)));
        }
    }
})

//recuerda que recibes un parametro: ID el cual corresponde con el id de la orden con la que vas a trabajar