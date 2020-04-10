new Vue({
    el: "#appRESBAR",
    data: {

        uri: 'http://localhost:3000/',
        categorias: [],
        productos: [],
        ordenes: [],

        ordenSelected: {},
        counter: 0,
        cantidades: [0],
        categoriaSelected: 'Entradas',
        productoSelected: 0,
        textoBusqueda: '',

        detallesDeNuevaOrden: [],
        resumen: [],
        categoria: {},
        nuevoDetalleOrden: {},

    },
    mounted: function () {
        this.obtenerCategorias()
        this.obtenerProductos()
        this.obtenerOrdenes()
    },
    methods: {

    /*Esta función mediante metodo get extrae todas las Categorias por medio del api rest que estan en la base de datos
      categorias: Es el array donde son guardados todas las categorias disponibles */
    obtenerCategorias() {
        axios.get(this.uri + 'categorias').then((result) => {
          this.categorias = result.data
        }).catch((err) => {
          console.log(err)
        });
    },

    /*Esta función mediante metodo get extrae todos los productos por medio del api rest que estan en la base de datos
      ordenes: Es el array donde son guardados todos los productos disponibles */
    obtenerProductos() {
        axios.get(this.uri + 'productos').then((result) => {
          this.productos = result.data
        }).catch((err) => {
          console.log(err)
        });
      },

    /*Esta función mediante metodo get extrae todas las ordenes por medio del api rest que estan en la base de datos
      ordenes: Es el array donde son guardadas todas estas ordenes */
    obtenerOrdenes() {
        axios.get(this.uri + 'ordenes').then(response => {
            this.ordenes = response.data;
            this.obtenerSelected();
        }).catch(e => {
            console.log(e)
        })
    },

    /*Esta función busca o filtra los productos que se le indican desde el input del buscador  */
    buscarProductos(x) {
        if (this.textoBusqueda == "")
          return true;
        var cad = this.productos[x].id +
          this.productos[x].nombre +
          this.productos[x].precio;
        cad = cad.toUpperCase();
  
        if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0)
          return true;
        else
          return false;
      },

    /*Esta función limpia el texto de busqueda cuando selecciona una categoria nueva */
    limpiarBusqueda(){
        this.textoBusqueda ='';
    },

    /*Esta función se encarga de buscar en el URL el parametro que recibe y extraerlo
      name: Es el parametro que se quiere extraer y se le indica a la función  */
    getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    /*Esta función se encarga de recibir el parametro de la orden seleccionada que viene por medio de la URL
      ordenSelected: Es la variable en la cual es guardado el array con los datos de la orden que ha sido seleccionada 
      por medio de su ID
      ordenes: Es el array que contiene todas las ordenes de la base de datos desde el cual se selecciona por medio de id 
      para llenar  en array ordenSelected*/
    obtenerSelected() {
        this.ordenSelected = this.ordenes.find(item => {
          return item.id == this.getParameterByName("id");
        })
    },

    /*Esta función redirige a la pantalla de Ordenes aplicando los cambios que se hayan realizado a la
      orden que haya sido seleccionada indicando cual es el número de orden*/
    regresarOrdenes() {
        window.location = `./ordenes.html?alert=Productos Agregados a la Orden  ${this.ordenSelected.id.substring(20,24)} Satisfactoriamente`
    },

    /*Esta función redirige a la pantalla de Ordenes sin realizar ninguna acción en la orden seleccionada*/
    cancelar() {
        window.location.href = './ordenes.html'
      }
    }
})

//recuerda que recibes un parametro: ID el cual corresponde con el id de la orden con la que vas a trabajar