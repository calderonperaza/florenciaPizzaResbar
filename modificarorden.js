new Vue({
    el: "#appRESBAR",
    data: {
        // Aqui inician las propiedades que vamos a necesitar
        //para almacenar nuestros objetos de trabajo

        ordenSelected: '',
        ordenes: [{
                id: "2345ab54c1111",
                fecha: "2020-10-31",
                mesero: "Juan",
                mesa: "2",
                cliente: "",
                estado: "A",
                total: 21.10,
                observacion: "",

                detalleOrden: [

                    { cantidad: 1, nombre: "Hamburguesa Big", precio: 7.25, categoria: { nombre: "Platos" }, subtotal: 7.25 },

                    { cantidad: 1, nombre: "Pizza Suprema", precio: 6.35, categoria: { nombre: "Platos" }, subtotal: 6.75 },

                    { cantidad: 2, nombre: "Soda Fanta 12 onz", precio: 1.00, categoria: { nombre: "Bebidas" }, subtotal: 2 },

                ]
            },

            {
                id: "2345ab54c2222",
                fecha: "2020-10-31",
                mesero: "Luis",
                mesa: "1",
                cliente: "Don Carlos",
                estado: "C",
                total: 16.00,
                observacion: "Sin Cebolla",

                detalleOrden: [

                    { cantidad: 1, nombre: "Hamburguesa Big", precio: 7.25, categoria: { nombre: "Platos" }, subtotal: 7.25 },

                    { cantidad: 2, nombre: "Ensalada Cesar", precio: 5.55, categoria: { nombre: "Platos" }, subtotal: 11.10 },

                    { cantidad: 1, nombre: "Soda Fanta 12 onz", precio: 1.00, categoria: { nombre: "Bebidas" }, subtotal: 1.00 },

                    { cantidad: 2, nombre: "Refresco de Horchata", precio: 1.75, categoria: { nombre: "Bebidas" }, subtotal: 1.75 }

                ]
            },
            {
                id: "2345ab54c2223",
                fecha: "2020-10-31",
                mesero: "Luis",
                mesa: "5",
                cliente: "Don Carlos",
                estado: "A",
                total: 16.00,
                observacion: "Sin Cebolla",

                detalleOrden: [

                    { cantidad: 1, nombre: "Hamburguesa Big", precio: 7.25, categoria: { nombre: "Platos" }, subtotal: 7.25 },

                    { cantidad: 2, nombre: "Ensalada Cesar", precio: 5.55, categoria: { nombre: "Platos" }, subtotal: 11.10 },

                    { cantidad: 1, nombre: "Soda Fanta 12 onz", precio: 1.00, categoria: { nombre: "Bebidas" }, subtotal: 1.00 },

                    { cantidad: 2, nombre: "Refresco de Horchata", precio: 1.75, categoria: { nombre: "Bebidas" }, subtotal: 1.75 }

                ]
            }, {
                id: "2345ab54c2224",
                fecha: "2020-10-31",
                mesero: "Luis",
                mesa: "10",
                cliente: "Don Carlos",
                estado: "C",
                total: 16.00,
                observacion: "Sin Cebolla",

                detalleOrden: [

                    { cantidad: 1, nombre: "Hamburguesa Big", precio: 7.25, categoria: { nombre: "Platos" }, subtotal: 7.25 },

                    { cantidad: 2, nombre: "Ensalada Cesar", precio: 5.55, categoria: { nombre: "Platos" }, subtotal: 11.10 },

                    { cantidad: 1, nombre: "Soda Fanta 12 onz", precio: 1.00, categoria: { nombre: "Bebidas" }, subtotal: 1.00 },

                    { cantidad: 2, nombre: "Refresco de Horchata", precio: 1.75, categoria: { nombre: "Bebidas" }, subtotal: 1.75 },


                ]
            }
        ],
        ascendente: true,
        activos: true,
        lactivos: null,
        textoBusqueda: ""
    },
    mounted: function() {
        this.obtenerSelected();
    },
    methods: {

        // aqui van los metodos que vamos a necesitar
        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        obtenerSelected() {
            this.ordenSelected = this.ordenes.find(item => {
                return item.id == this.getParameterByName("id");
            })
        },
        redireccionarAOrdenes() {
            window.location = "./ordenes.html?alert=se modifico la orden 12312asc Satisfactoriamente"
        }

    },

})

//recuerda que recibes un parametro: ID el cual corresponde con el id de la orden con la que vas a trabajar