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

var vm = new Vue({
    el: '#appRESBAR',
    data() {
        return {
            datacollection: null
        };
    },
    created() {
        this.fillData();
    },
    mounted() {
        this.$nextTick(function () {
            window.addEventListener("resize", this.resizeOrOnload);
            //Init
            this.resizeOrOnload()
        })
    },
    methods: {
        fillData() {
            this.datacollection = {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                    label: 'Data One',
                    backgroundColor: '#4e73df',
                    data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
                }]
            };
        },
        getRandomInt() {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
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
           document.getElementById("bar-chart").style.width=(document.getElementById("idPalChar").clientWidth-10) + "px";

        }
    }
});