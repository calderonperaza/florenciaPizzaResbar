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

//-------------------- Fin de vue component que es el chart ------------------------

var vm = new Vue({
    el: '#appRESBAR',
    data: {
        datacollection: null,
        numPlatosVendidos: 231,
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
        rangoInt:1,

    },
    created() {
        this.fillData(0);
    },
    mounted() {
        this.$nextTick(function () {
            window.addEventListener("resize", this.resizeOrOnload);
            //Init
            this.resizeOrOnload()
        })
    },
    methods: {
        fillData(rango) {
            this.chartRange=this.setRange();
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
                    datos: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(),this.getRandomInt()]
                },
                {
                    labels: ['00:00 a.m.', '04:00 a.m.', '08:00 a.m.', '12:00 m.', '04:00 p.m.', '08:00 p.m.', '12:00 p.m.'],
                    datos: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(),this.getRandomInt()]
                }
            ];
        },
        resizeOrOnload() {
            /*
            Así se hace cuadrado
            //si el ancho es mayor que el alto
            let cuatroDivs = document.getElementById("cuatro-divs");
            let divTamaño = document.getElementById("segundoDiv");
            if (divTamaño.clientWidth > divTamaño.clientHeight) {
                cuatroDivs.style.minHeight = divTamaño.offsetWidth + "px";
                console.log("resize on load, mas grande el ancho");
             //si el alto es mayor que el ancho
            } else {
                cuatroDivs.style.minHeight = divTamaño.offsetWidth + "px";
                // 0, 2, 4, 6
                console.log("resize on load, mas grande el alto");
            }
            let size = (document.getElementById("cuatro-divs").offsetWidth/4)-50;
            document.getElementById("primerDiv").style.minWidth = size + "px";
            divTamaño.style.minWidth = size + "px";
            document.getElementById("tercerDiv").style.minWidth = size + "px";
            document.getElementById("cuartoDiv").style.minWidth = size + "px";
                      

            */
            document.getElementById("bar-chart").style.width = (document.getElementById("idPalChar").clientWidth - 10) + "px";

        }
    }
});