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
            id: "0",
            nombre: ""
        },
        displayOption: "",
        searchDisplay: ""
    },
    methods: {
        updateCreate() {
            this.categorias.push(this.categoria);
            this.clearData();
        },

        clearData() {
            this.categoria = {
                id: "0",
                nombre: ""
            }
        },
        addMode(){
            this.clearData();
            this.displayOption='Agregue una nueva Categoria';
        },
        getCategoriaSelected(cat){
            this.displayOption="Modifique la Categoria";
            this.categoria=cat;
        },
        filtro(valor){
            if(this.searchDisplay=="") return true;
            let array=(this.categorias[valor].id+this.categorias[valor].nombre).toUpperCase();
            if(array.indexOf(this.searchDisplay.toUpperCase())>=0) return true; else return false;
        }  
        //aqui van los metodos que vamos a necesitar
    }
})
