new Vue({
    el: "#appRESBAR",
    data: {
        // Aqui inician las propiedades que vamos a necesitar
        //para almacenar nuestros objetos de trabajo
        categorias: [
            {id: "1238417", nombre: "Entradas"},
            {id: "5656773", nombre: "Plato"},
            {id: "1445667", nombre: "Postres"},
        ],
        categoria: {
            id: 0,
            nombre: ""
        },
        displayOption: ""


    },
    methods: {
        updateCreate: function() {
            this.categorias.push(this.categoria);
            this.clearData();
        },

        clearData: function () {
            this.categoria = {
                id: 0,
                nombre: ""
            }
        },
        addMode: function(){
            this.clearData();
            this.displayOption='Agregue una nueva Categoria';
        },
        getCategoriaSelected: function(cat){
            this.displayOption="Modifique la Categoria";
            this.categoria=cat;
        }
        //aqui van los metodos que vamos a necesitar
    }

})
