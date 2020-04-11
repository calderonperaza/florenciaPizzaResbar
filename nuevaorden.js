var app = new Vue({
    el: "#appRESBAR",
    data: {
        nuevaOrden: {
            fecha: null,
            mesero: null,
            mesa: null,
            cliente: null,
            estado: "C",
            total: 0,
            observacion: null,
            // propiedad que se llenara los productos que el usuario agregue
            // se carga atraves de getProductos() y se le agregan los campos cantidad y subtotal
            detalleOrden: [
                //formato--> { cantidad: 1, nombre: "Hamburguesa Big", precio: 7.25, categoria: { nombre: "Platos" }, subtotal: 7.25 }
            ]
        },
        //API model
        categorias: [],
        productos: [],
        //API info
        mensajeApi: '',
        url: "http://localhost:3000/"

    },
    created() {
        this.nuevaOrden.fecha = new Date().toISOString();
        this.getCategorias();
        this.getProductos();
        this.disableFormSubmit();
    },
    watch: {
        //actualiza el array de productos detalle orden
        productos: {
            // Permite detectar cambios dentro del array
            deep: true,
            // Se filtra al detalle orden solo los productos con cantidades positivas
            handler() {
                this.nuevaOrden.detalleOrden = this.productos.filter(prod => prod.cantidad > 0);
            }
        }
    },
    methods: {
        //decrementar cantidad del producto a valores no negativos
        decProducto(produ) {
            if (produ.cantidad > 1) {
                produ.cantidad--;
            } else {
                produ.cantidad = 0;
            }
            this.refreshTotal(produ);
        },
        //incrementar cantidad del producto 
        incProducto(produ) {
            produ.cantidad++;
            this.refreshTotal(produ);
        },
        //calcula subtotal y total
        refreshTotal(produ) {
            let oldVal = produ.subtotal;
            let newVal = produ.cantidad * produ.precio;
            let diff = newVal - oldVal;
            this.nuevaOrden.total = Math.round((this.nuevaOrden.total + diff) * 100) / 100;
            produ.subtotal = Math.round((produ.subtotal + diff) * 100) / 100;
        },

        //API get methods
        getCategorias() {
            this.mensajeApi = "Obteniendo Categorias...";
            axios
                .get(this.url + 'categorias')
                .then(response => {
                    this.categorias = response.data;
                })
            if (this.categorias.length === 0) {
                this.mensajeApi = "Error al cargar datos";
            } else {
                this.mensajeApi = "";
            }
        },
        getProductos() {
            this.mensajeApi = "Obteniendo Productos...";
            axios
                .get(this.url + 'productos')
                .then(response => {
                    //se agregan dos atributos, cantidad y subtotal
                    this.productos = response.data.map(function (obj) {
                        let rObj = { cantidad: 0, nombre: obj.nombre, precio: obj.precio, categoria: obj.categoria, subtotal: 0 };
                        return rObj;
                    });
                })
            if (this.categorias.length === 0) {
                this.mensajeApi = "Error al cargar datos";
            } else {
                this.mensajeApi = "";
            }
        },
        //Event methods
        validateForm() {
            let form = $('.needs-validation')[0];

            if (form.checkValidity() && this.nuevaOrden.detalleOrden.length != 0)
                $('#resumenModal').modal();
            form.classList.add('was-validated');
        },
        disableFormSubmit() {
            window.addEventListener('load', function () {
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                var forms = document.getElementsByClassName('needs-validation');
                // Loop over them and prevent submission
                var validation = Array.prototype.filter.call(forms, function (form) {
                    form.addEventListener('submit', function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);
        }
    }

})