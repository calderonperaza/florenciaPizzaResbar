var vm = new Vue({
  el: "#appRESBAR",
  data: {

    uri: 'http://localhost:3000/',
    categorias: [],
    productos: [],
    ordenes: [],

    ordenSelected: {},
    counter: 0,
    categoriaSelected: 'Entradas',
    productoSelected: 0,
    textoBusqueda: '',

    detallesDeNuevaOrden:[],
    arrayAux:[],

    resumen: [],
    categoria: {},
    nuevoDetalleOrden:{},

  },
  mounted: function () {
    this.obtenerCategorias()
    this.obtenerProductos()
    this.obtenerOrdenes()
  },
  methods: {

  /*Esta función agrega las cantidades de productos que deseamos aumentar a la orden que ha sido seleccionada 
  y valida que el producto seleccionado se agregue de forma correcta */
    agregarAdetalle(productoSelected) {
      var cantidad = 0;
        this.nuevoDetalleOrden.cantidad = cantidad;
        this.nuevoDetalleOrden.nombre = this.productos[this.productoSelected].nombre;
        this.nuevoDetalleOrden.precio = this.productos[this.productoSelected].precio;
        this.nuevoDetalleOrden.categoria = this.productos[this.productoSelected].categoria;
            
        if(this.detallesDeNuevaOrden.length === 0){
          this.nuevoDetalleOrden.cantidad = 1;
          this.nuevoDetalleOrden.subtotal = this.nuevoDetalleOrden.cantidad * this.nuevoDetalleOrden.precio;
          this.detallesDeNuevaOrden.push(this.nuevoDetalleOrden);
        }else{
            for (var index = 0; index < this.detallesDeNuevaOrden.length; index++) {
              const element = this.detallesDeNuevaOrden[index];
              if(element.nombre === this.nuevoDetalleOrden.nombre){
                cantidad = element.cantidad;
                cantidad = cantidad + 1;
                this.nuevoDetalleOrden.cantidad = cantidad;                 
                Vue.set(vm.detallesDeNuevaOrden,index,this.nuevoDetalleOrden);
                this.detallesDeNuevaOrden[index].subtotal = this.detallesDeNuevaOrden[index].precio * cantidad;
              }
            }
            
        var producto = this.detallesDeNuevaOrden.find(dno => {
         return dno.nombre === this.nuevoDetalleOrden.nombre;
        });

        if(typeof producto === 'undefined'){
          this.nuevoDetalleOrden.cantidad=1;
          this.nuevoDetalleOrden.subtotal = this.nuevoDetalleOrden.cantidad * this.nuevoDetalleOrden.precio;
          this.detallesDeNuevaOrden.push(this.nuevoDetalleOrden);
        }
       }

        this.nuevoDetalleOrden = {
          "cantidad": 0,
          "nombre": '',
          "precio": 0,
          "categoria": {
            "nombre":''
          },
          "subtotal":''
        }
        console.log(this.detallesDeNuevaOrden);
    },

  /*Esta funcion elimina cantidades del array detallesDeNuevaOrden los productos que quiere disminuir 
    y valida que el producto que se desea disminuir no sea menor a cero*/
    quitarAdetalle(productoSelected) {
      this.nuevoDetalleOrden.nombre = this.productos[this.productoSelected].nombre;
      
      if(this.detallesDeNuevaOrden.length != 0){
        for (var index = 0; index < this.detallesDeNuevaOrden.length; index++) {
          const element = this.detallesDeNuevaOrden[index];
          if(element.nombre === this.nuevoDetalleOrden.nombre){
            cantidad = element.cantidad;
            if(cantidad>0){
              cantidad = cantidad - 1;
              this.detallesDeNuevaOrden[index].cantidad = cantidad;
              this.detallesDeNuevaOrden[index].subtotal = this.detallesDeNuevaOrden[index].precio * cantidad;
            }
            if(cantidad === 0){
              this.detallesDeNuevaOrden.splice(index,1);
            }
          }
        }
      }

    this.nuevoDetalleOrden = {
      "cantidad": 0,
      "nombre": '',
      "precio": 0,
      "categoria": {
        "nombre":''
      },
      "subtotal":''
      }
      console.log(this.detallesDeNuevaOrden);
    },

    /*Verifica si un producto ya esta en la orden Seleccionada y aumenta su cantidad al igual que verfica si algun
    producto no ha sido agregado a la orden para ingresar el nuevo producto */
    addOrdenSelected() {
      this.arrayAux.push.apply(this.arrayAux,this.detallesDeNuevaOrden);
      for (x=0; x<this.ordenSelected.detalleOrden.length; x++) {
        for(y=0; y<this.arrayAux.length; y++ ){
          if(this.ordenSelected.detalleOrden[x].nombre === this.arrayAux[y].nombre){
            this.ordenSelected.detalleOrden[x].cantidad = this.ordenSelected.detalleOrden[x].cantidad+this.arrayAux[y].cantidad;
            this.ordenSelected.detalleOrden[x].subtotal = this.ordenSelected.detalleOrden[x].cantidad*this.ordenSelected.detalleOrden[x].precio;
            this.arrayAux.splice(y,1);
          }
        }
      }
      this.ordenSelected.detalleOrden.push.apply(this.ordenSelected.detalleOrden,this.arrayAux);
      this.nuevoTotal();
      console.log(this.ordenSelected);
    },

    /*Esta función calculara en nuevo total de la orden mediante sumando los subtotales de todos los elementos agregados
    en detalleOrde de ordenSelected en caso de que nuevos productos sean agregados */
    nuevoTotal(){
      var total =0;
      for (const iterator of this.ordenSelected.detalleOrden) {
        total=total+iterator.subtotal;
      }
      this.ordenSelected.total = total;
    },

  /*Busca las cantidades que hay de productos en la orden seleccionada para modificar y mostrar los pruductos que ya
    estan en la orden con la posiblididad de disminuir o aumentar estos mismos */
    findCantidad(prod) {
      producto = this.productos[prod];
      for (const iterator of this.detallesDeNuevaOrden) {
        if (iterator.nombre == producto.nombre){
          return iterator.cantidad;
        }
      }
      return 0;
    },

  /*Esta función envia todos los cambios realizados por medio del metodo put para que los cambios realizados en 
    ordenSelecte sean actualizados*/
    agregarProductosOrden() {
      this.addOrdenSelected();
      axios.put('http://localhost:3000/ordenes/' + this.ordenSelected.id, this.ordenSelected)
        .then(response => {
          console.log("exito");
          if(this.detallesDeNuevaOrden.length==0){
            window.location = `./ordenes.html?alert=No se realizo ningun cambio a la orden ${this.ordenSelected.id.substring(20,24)}`
          }else{
            this.regresarOrdenes();
          }
        })
        .catch(error => {
          console.log("Error:",error)
          this.cancelar();
        });
    },

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

  /*Esta función busca o filtra los productos que se le indican desde el input del buscador textoBusqueda es
    el parametro que se envia para que sea buscado en la base de datos  */
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
    limpiarBusqueda() {
      this.textoBusqueda = '';
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
      if (this.ordenSelected === {} || this.ordenSelected === undefined) {
        window.location = `./ordenes.html?alert=Id de orden no encontrado`
      }
    },

  /*Esta función redirige a la pantalla de Ordenes aplicando los cambios que se hayan realizado a la
    orden que haya sido seleccionada indicando cual es el número de orden*/
    regresarOrdenes() {
      window.location = `./ordenes.html?alert=Productos Agregados a la Orden  ${this.ordenSelected.id.substring(20,24)} Satisfactoriamente`
    },

  /*Esta función redirige a la pantalla de Ordenes sin realizar ninguna acción en la orden seleccionada*/
    cancelar() {
      window.location.href = `./ordenes.html?alert=No se realizo ningun cambio a la orden ${this.ordenSelected.id.substring(20,24)}`
    }
  }
})

//recuerda que recibes un parametro: ID el cual corresponde con el id de la orden con la que vas a trabajar