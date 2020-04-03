new Vue({
    el: "#appRESBAR",
    data: {
        cantidad: 0,

        // Aqui inician las propiedades que vamos a necesitar
        //para almacenar nuestros objetos de trabajo

        ordenSelected: '',
        counter: 0,
        cantidad: '0',
        categoriaSelected: "Entradas",
        productoSelected: 0,
        nombre: '',

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

        categorias: [{
                idCat: "1",
                nombre: "Entradas"
            },
            {
                idCat: "2",
                nombre: "Platos"
            },
            {
                idCat: "3",
                nombre: "Bebidas"
            },
            {
                idCat: "4",
                nombre: "Postres"
            },
        ],

        productos: [{
                id: "2312a1211",
                nombre: "Papas francesas",
                precio: 3.25,
                categoria: {
                    nombre: "Entradas"
                }
            },
            {
                id: "2312a1222",
                nombre: "Hamburguesa  Media Libra",
                precio: 7.25,
                categoria: {
                    nombre: "Platos"
                }
            },
            {
                id: "2312a1333",
                nombre: "Pizza Suprema",
                precio: 6.35,
                categoria: {
                    nombre: "Platos"
                }
            },
            {
                id: "2312a1444",
                nombre: "Ensalada Cesar",
                precio: 5.55,
                categoria: {
                    nombre: "Platos"
                }
            },
            {
                id: "2312a5555",
                nombre: "Refresco de Horchata",
                precio: 1.75,
                categoria: {
                    nombre: "Bebidas"
                }
            },
            {
                id: "2312a5555",
                nombre: "Soda Coca Cola ",
                precio: 1.00,
                categoria: {
                    nombre: "Bebidas"
                }
            },
            {
                id: "2312a1211",
                nombre: "Papas Twister",
                precio: 3.25,
                categoria: {
                    nombre: "Entradas"
                }
            },
            {
                id: "2312a1222",
                nombre: "Hamburguesa Big",
                precio: 7.25,
                categoria: {
                    nombre: "Platos"
                }
            },
            {
                id: "2312a1333",
                nombre: "Pizza Suprema",
                precio: 6.35,
                categoria: {
                    nombre: "Platos"
                }
            },
            {
                id: "2312a1444",
                nombre: "Ensalada Cesar",
                precio: 5.55,
                categoria: {
                    nombre: "Platos"
                }
            },
            {
                id: "2312a5555",
                nombre: "Refresco Fanta",
                precio: 1.75,
                categoria: {
                    nombre: "Bebidas"
                }
            },
            {
                id: "2312a5555",
                nombre: "Hot Cakes",
                precio: 1.00,
                categoria: {
                    nombre: "Postres"
                }
            },
            {
                id: "2312a1211",
                nombre: "Papas Chips",
                precio: 3.25,
                categoria: {
                    nombre: "Entradas"
                }
            },
            {
                id: "2312a1222",
                nombre: "Hamburguesa Cuarto Libra",
                precio: 7.25,
                categoria: {
                    nombre: "Platos"
                }
            },
            {
                id: "2312a1333",
                nombre: "Helado de Vainilla",
                precio: 6.35,
                categoria: {
                    nombre: "Postres"
                }
            },
            {
                id: "2312a1444",
                nombre: "Ensalada Normal",
                precio: 5.55,
                categoria: {
                    nombre: "Platos"
                }
            },
            {
                id: "2312a5555",
                nombre: "Cerveza Corona",
                precio: 1.75,
                categoria: {
                    nombre: "Bebidas"
                }
            },
            {
                id: "2312a5555",
                nombre: "Pastel de Manzana",
                precio: 1.00,
                categoria: {
                    nombre: "Postres"
                }
            },

        ],
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

                    {
                        cantidad: 1,
                        nombre: "Hamburguesa Big",
                        precio: 7.25,
                        categoria: {
                            nombre: "Platos"
                        },
                        subtotal: 7.25
                    },

                    {
                        cantidad: 1,
                        nombre: "Pizza Suprema",
                        precio: 6.35,
                        categoria: {
                            nombre: "Platos"
                        },
                        subtotal: 6.75
                    },

                    {
                        cantidad: 2,
                        nombre: "Soda Fanta 12 onz",
                        precio: 1.00,
                        categoria: {
                            nombre: "Bebidas"
                        },
                        subtotal: 2
                    }

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

                    {
                        cantidad: 1,
                        nombre: "Hamburguesa Big",
                        precio: 7.25,
                        categoria: {
                            nombre: "Platos"
                        },
                        subtotal: 7.25
                    },

                    {
                        cantidad: 2,
                        nombre: "Ensalada Cesar",
                        precio: 5.55,
                        categoria: {
                            nombre: "Platos"
                        },
                        subtotal: 11.10
                    },

                    {
                        cantidad: 1,
                        nombre: "Soda Fanta 12 onz",
                        precio: 1.00,
                        categoria: {
                            nombre: "Bebidas"
                        },
                        subtotal: 1.00
                    },

                    {
                        cantidad: 2,
                        nombre: "Refresco de Horchata",
                        precio: 1.75,
                        categoria: {
                            nombre: "Bebidas"
                        },
                        subtotal: 1.75
                    }

                ]
            },
            {
                id: "2345ab54c2222",
                fecha: "2020-10-31",
                mesero: "Luis",
                mesa: "5",
                cliente: "Don Carlos",
                estado: "A",
                total: 16.00,
                observacion: "Sin Cebolla",

                detalleOrden: [

                    {
                        cantidad: 1,
                        nombre: "Hamburguesa Big",
                        precio: 7.25,
                        categoria: {
                            nombre: "Platos"
                        },
                        subtotal: 7.25
                    },

                    {
                        cantidad: 2,
                        nombre: "Ensalada Cesar",
                        precio: 5.55,
                        categoria: {
                            nombre: "Platos"
                        },
                        subtotal: 11.10
                    },

                    {
                        cantidad: 1,
                        nombre: "Soda Fanta 12 onz",
                        precio: 1.00,
                        categoria: {
                            nombre: "Bebidas"
                        },
                        subtotal: 1.00
                    },

                    {
                        cantidad: 2,
                        nombre: "Refresco de Horchata",
                        precio: 1.75,
                        categoria: {
                            nombre: "Bebidas"
                        },
                        subtotal: 1.75
                    }

                ]
            }, {
                id: "2345ab54c2222",
                fecha: "2020-10-31",
                mesero: "Luis",
                mesa: "10",
                cliente: "Don Carlos",
                estado: "C",
                total: 16.00,
                observacion: "Sin Cebolla",

                detalleOrden: [

                    {
                        cantidad: 1,
                        nombre: "Hamburguesa Big",
                        precio: 7.25,
                        categoria: {
                            nombre: "Platos"
                        },
                        subtotal: 7.25
                    },

                    {
                        cantidad: 2,
                        nombre: "Ensalada Cesar",
                        precio: 5.55,
                        categoria: {
                            nombre: "Platos"
                        },
                        subtotal: 11.10
                    },

                    {
                        cantidad: 1,
                        nombre: "Soda Fanta 12 onz",
                        precio: 1.00,
                        categoria: {
                            nombre: "Bebidas"
                        },
                        subtotal: 1.00
                    },

                    {
                        cantidad: 2,
                        nombre: "Refresco de Horchata",
                        precio: 1.75,
                        categoria: {
                            nombre: "Bebidas"
                        },
                        subtotal: 1.75
                    }

                ]
            }
        ],

    },
    mounted: function () {
        this.obtenerSelected();
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
            window.location = "./ordenes.html?alert=Productos%20Agregados%20Correctamente"
        },
        cancelar() {
            window.location.href = './ordenes.html'
        },

        getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        obtenerSelected() {
            this.ordenSelected = this.ordenes.find(item => {
                console.log(location.href);
                return item.id == this.getParameterByName("id");
            })
        }
    },
    computed: {
        searchProductos: function () {
            return this.productos.filter((producto => producto.nombre.includes(this.nombre)));
        }
    }
})

//recuerda que recibes un parametro: ID el cual corresponde con el id de la orden con la que vas a trabajar