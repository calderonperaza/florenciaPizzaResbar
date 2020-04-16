Vue.component('reactive', {
    extends: VueChartJs.Bar,
    mixins: [VueChartJs.mixins.reactiveProp],
    data: function () {
        return {
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        },

                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    mode: 'single',
                    callbacks: {
                        label: function (tooltipItems, data) {
                            return '$' + tooltipItems.yLabel;
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                height: 200,
            }
        };
    },
    mounted() {
        this.renderChart(this.chartData, this.options);
    }
});

//======================================= Fin de vue component que es el chart ==================================

var vm = new Vue({
    el: '#appRESBAR',
    data: {
        datacollection: null,
        ordenesEliminadas: 0,
        numOrdenesFin: 127,
        platoMasVendido: "Carne Asada",
        pmvCantidad: 104,
        ordenesActivas: 30,
        //mejor mesero block a
        meseroOrdenes: "Mesero A",
        mesOrCantidad: 320,
        mesOrFechaIn: "23-01-20",
        mesOrFechaFin: "23-02-20",
        //mejor mesero block b
        meseroTiempo: "Mesero B",
        mesTimIn: "01-01-12",
        //mejor mesero bloc c
        menosFaltas: "Mesero C",
        numeroFaltas: 0,
        //mejor mesero bloc d
        masPuntual: "Mesero D",
        venidasTarde: 0,
        //Comienza char
        chartRange: '',
        rangoInt: 1,
        desde: "",
        hasta: "",
        uri: 'http://localhost:3000',
        topProductos:"",
        ordenesCerradas:"",


    },
    created() {
        this.fillData(0);
    },
    mounted() {
        this.$nextTick(function () {
            window.addEventListener("resize", this.resizeOrOnload);
            //Init
            this.resizeOrOnload();
            this.getFourDivsData();
        })
        this.mesActual();
    },
    methods: {
        fillData(rango) {
            this.chartRange = this.setRange();
            this.datacollection = {
                labels: this.chartRange[rango].labels,
                datasets: [{
                    label: 'Data One',
                    backgroundColor: '#4e73df',
                    data: this.chartRange[rango].datos
                }]
            };
        },
        getRandomInt() {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
        },
        setRange() {
            return [{
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datos: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            },
            {
                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                datos: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            },
            {
                labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                datos: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            },
            {
                labels: ['00:00 a.m.', '04:00 a.m.', '08:00 a.m.', '12:00 m.', '04:00 p.m.', '08:00 p.m.', '12:00 p.m.'],
                datos: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
            ];
        },
        resizeOrOnload() {
            document.getElementById("bar-chart").style.width = (document.getElementById("idPalChar").clientWidth - 10) + "px";
        },
        moment: function () {
            return moment();
        },
        mesActual: function () {
            this.hasta = this.moment(this.moment().calendar()).format('YYYY-MM-DD');
            this.desde = this.moment(this.moment().calendar()).subtract(30, 'days').format('YYYY-MM-DD');
            this.getFourDivsData();
        },
        getFourDivsData: function () {
            this.divDos();
            this.divTres();
            this.divCuatro();
        },
        divDos: function () {
            axios.get(
                this.uri + '/ordenes?filter[where][and][0][fecha][lte]=' + this.hasta + '&filter[where][and][1][fecha][gte]=' + this.desde + '&filter[where][and][2][estado][like]=C').then(response => {
                    this.ordenesCerradas = response.data;
                    this.numOrdenesFin = this.ordenesCerradas.length;
                }).catch(e => { console.log(e) });


        },
        divTres: function () {
            axios.get(
                this.uri + '/resumenDeVentas').then(response => {
                    let producto = response.data;
                    const todosLosProductos = producto.map(producto => producto.productos).flat();
                    this.topProductos = this.ordenarPorClave("cantidad", todosLosProductos);
                    this.pmvCantidad = this.topProductos[0].cantidad;
                    this.platoMasVendido = this.topProductos[0].nombre;
                }).catch(e => { console.log(e) });
        },
        divCuatro: function () {
            axios.get(
                this.uri + '/ordenes?filter[where][and][0][fecha][lte]=' + this.hasta + '&filter[where][and][1][fecha][gte]=' + this.desde + '&filter[where][and][2][estado][like]=A').then(response => {
                    let valor = response.data;
                    this.ordenesActivas = valor.length;
                }).catch(e => { console.log(e) });
        },
        ordenarPorClave: function (clave, arregloObjetos, ordenarMenorAMayor = false){
            return arregloObjetos.sort((a, b) => {
              return ordenarMenorAMayor == false ? b[clave] - a[clave] : a[clave] - b[clave]; 
            });
        },
        getOrdenSelected: function(id){
            console.log(id);
        },

    }
});