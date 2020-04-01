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

                    { cantidad: 2, nombre: "Soda Fanta 12 onz", precio: 1.00, categoria: { nombre: "Bebidas" }, subtotal: 2 }

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
                id: "2345ab54c2222",
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
                id: "2345ab54c2222",
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

                    { cantidad: 2, nombre: "Refresco de Horchata", precio: 1.75, categoria: { nombre: "Bebidas" }, subtotal: 1.75 }

                ]
            }
        ],
        ascendente: true,
        activos: true,
        lactivos: [],
        textoBusqueda: ""
    },
    methods: {
        //aqui van los metodos que vamos a necesitar
        ordenar: function() {
            this.ascendente = !this.ascendente
            if (this.ascendente == true) {
                this.ordenes.sort((a, b) => { return b.mesa - a.mesa })
                this.lactivos.sort((a, b) => { return b.mesa - a.mesa })
            } else {
                this.ordenes.sort((a, b) => { return a.mesa - b.mesa })
                this.lactivos.sort((a, b) => { return a.mesa - b.mesa })
            }
        },
        mostrarActivos: function() {
            this.lactivos = this.ordenes.filter(orden => orden.estado == "A")
            this.activos = !this.activos
        },
        buscar: function(x) {

            if (this.textoBusqueda == "")
                return true;
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
        },
        alertLauncher: function () {
                let uri = window.location.href.split('?')
                if(uri.length==2){
                    let vars = uri[1].split('&')
                    let getVars ={}
                    let tmp=""
                    vars.forEach(function (v) {
                        tmp=v.split('=')
                        if(tmp.length == 2){
                            getVars[tmp[0]]=tmp[1]
                        }
                    })
                    alert(getVars.alert)
                }
                        
        },

        modificarOrden(){
            window.location = "/modificarorden.html?id=" + this.ordenSelected.id;
        }

    },
    mounted(){
        this.ordenar()
        this.mostrarActivos()
        this.alertLauncher()
    }

})