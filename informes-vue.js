Vue.component('reactive', {
    extends: VueChartJs.Bar,
    mixins: [VueChartJs.mixins.reactiveProp],
    data: function() {
        return {
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: value => "$" + (value)
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
                        label: function(tooltipItems, data) {
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
    watch: {
        deep: true,
        'chartData': {
            handler(newOption, oldOption) {
                this.$data._chart.destroy()
                this.renderChart(this.chartData, this.options)
            },
        }
    },
    mounted() {
        // Promise.resolve(vm.fillData()).then(this.renderChart(this.chartData, this.options)).catch(function(reason) { console.log('Manejar promesa rechazada (' + reason + ') aquí.'); });
        this.renderChart(this.chartData, this.options);
    },
    methods: {
        update() {
            this.$data._chart.update()
            return "se actualizó"
        }
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
        uri: ApiRestUrl,
        topProductos: "",
        ordenesCerradas: "",
        alertaBool: false,
        today: 0,
        mesTotal: [],
        selectRange: 0,
        new: 0,
        semanal: false,
        diario: false,
        hora: false,
        anioPicker: 2020,
        mesPicker: [{ "mes": 'En', "id": 0 }, { "mes": 'Feb', "id": 1 }, { "mes": 'Mar', "id": 2 }, { "mes": 'Ab', "id": 3 }, { "mes": 'May', "id": 4 }, { "mes": 'Jun', "id": 5 }, { "mes": 'Jul', "id": 6 }, { "mes": 'Agos', "id": 7 }, { "mes": 'Sep', "id": 8 }, { "mes": 'Oct', "id": 9 }, { "mes": 'Nov', "id": 10 }, { "mes": 'Dic', "id": 11 }],
        mesPicked: { "mes": "", "id": 0 },
        totalPorSemana: [],
        labelsSemanas: "",
        popoverShow: false,

    },
    created() {
        // Promise.resolve(this.getTotalPorMes()).then(this.fillData(0)).catch(function(reason) { console.log('Filling data to chart, razón (' + reason + ') aquí.'); });
        this.fillData(0);

    },
    mounted() {
        this.$nextTick(function() {
            window.addEventListener("resize", this.resizeOrOnload);
            //Init
            this.resizeOrOnload();
        })
        Promise.resolve(this.mesActual()).then(this.getFourDivsData()).catch(function(reason) { console.log('Manejar promesa rechazada (' + reason + ') aquí.'); });
        this.today = this.moment(this.moment().calendar()).format('YYYY-MM-DD');
        this.mesPicked.mes = this.mesPicker[parseInt(this.today.substring(5, 7)) - 1].mes;
        this.mesPicked.id = parseInt(this.today.substring(5, 7)) - 1;
    },
    methods: {
        fillData(rango) {
            if (rango === 0) {
                this.getTotalPorMes(this.anioPicker);
                this.semanal = false;
                this.diario = false;
                this.hora = false;
            } else if (rango === 1) {
                this.getTotalPorSemana(this.anioPicker, this.mesPicked.id < 10 ? this.mesPicked.id : ('0' + this.mesPicked.id));
                this.semanal = true;
                this.diario = false;
                this.hora = false;
            } else if (rango === 2) {
                this.semanal = true;
                this.diario = true;
                this.hora = false;
            } else if (rango === 3) {
                this.semanal = true;
                this.diario = true;
                this.hora = true;
            }
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
                    datos: this.mesTotal
                },
                {
                    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                    datos: this.totalPorSemana
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
        moment: function() {
            return moment();
        },
        mesActual: function() {
            this.hasta = this.moment(this.moment().calendar()).format('YYYY-MM-DD');
            this.desde = this.moment(this.moment().calendar()).subtract(30, 'days').format('YYYY-MM-DD');
        },
        getFourDivsData: function() {
            /*     if (moment.duration(moment(this.hasta, "YYYY-MM-DD").diff(moment(this.desde, "YYYY-MM-DD"))).asDays() > 0) {*/
            if (!moment(this.hasta, "YYYY-MM-DD").isSameOrBefore(moment(this.desde, "YYYY-MM-DD"))) {
                this.divDos();
                this.divTres();
                this.divCuatro();
                this.alertaBool = false;

            } else {
                this.alertaBool = true;
            }
            this.applyCssAlert(this.alertaBool);
        },
        divDos: function() {
            axios.get(
                this.uri + '/ordenes?filter[where][and][0][fecha][lte]=' + this.hasta + '&filter[where][and][1][fecha][gte]=' + this.desde + '&filter[where][and][2][estado][like]=C').then(response => {
                this.ordenesCerradas = response.data;
                this.numOrdenesFin = this.ordenesCerradas.length;
            }).catch(e => { console.log(e) });

        },
        divTres: function() {
            axios.get(
                this.uri + '/resumenDeVentas?filter[where][and][0][fecha][lte]=' + this.hasta + '&filter[where][and][1][fecha][gte]=' + this.desde).then(response => {
                let producto = response.data;
                if (!producto.length == 0) {
                    const todosLosProductos = producto.map(producto => producto.productos).flat();
                    this.topProductos = this.ordenarPorClave("cantidad", todosLosProductos);
                    this.pmvCantidad = this.topProductos[0].cantidad;
                    this.platoMasVendido = this.topProductos[0].nombre;
                } else {
                    this.topProductos = [];
                    this.pmvCantidad = 0;
                    this.platoMasVendido = "Sin datos";
                }
            }).catch(e => { console.log(e) });
        },
        divCuatro: function() {
            axios.get(
                this.uri + '/ordenes?filter[where][and][0][fecha][lte]=' + this.hasta + '&filter[where][and][1][fecha][gte]=' + this.desde + '&filter[where][and][2][estado][like]=A').then(response => {
                let valor = response.data;
                this.ordenesActivas = valor.length;
            }).catch(e => { console.log(e) });
        },
        ordenarPorClave: function(clave, arregloObjetos, ordenarMenorAMayor = false) {
            return arregloObjetos.sort((a, b) => {
                return ordenarMenorAMayor == false ? b[clave] - a[clave] : a[clave] - b[clave];
            });
        },
        getOrdenSelected: function(id) {
            console.log(id);
        },
        applyCssAlert: function(parameter) {
            if (parameter === true) {
                document.querySelectorAll('.div-date').forEach(element => {
                    element.style.backgroundImage = "linear-gradient(to right, #e7da3b, rgb(249, 103, 20), #e74a3bba, #e74a3b)";
                    element.classList.remove('bounceIn');
                    element.classList.add('shake');
                });
                document.querySelectorAll('.date-css').forEach(element => {
                    element.style.boxShadow = "5px 5px 25px -2px #e74a3b70";
                });
            } else {
                document.querySelectorAll('.div-date').forEach(element => {
                    element.style.removeProperty('background-image');
                });
                document.querySelectorAll('.date-css').forEach(element => {
                    element.style.removeProperty('box-shadow');
                });
            }
        },
        getTotalPorMes: function(year = this.moment().format('YYYY')) {
            console.log("Total por mes");
            let i = 0;
            let rangeMonth = [];
            this.mesTotal = [];
            while (i < 12) {
                rangeMonth.push({ inicio: this.moment().set({ 'year': year, 'month': i }).startOf('month').toISOString(), fin: this.moment().set({ 'year': year, 'month': i }).endOf('month').toISOString() })
                i++;
            }
            rangeMonth.forEach((param, index) => {
                axios.get(this.uri + '/ordenes?filter[where][and][0][fecha][lte]=' + param.fin + '&filter[where][and][1][fecha][gte]=' + param.inicio + '&filter[where][and][2][estado][like]=C').
                then(response => {
                    let total = 0;
                    let ordenes = response.data;
                    ordenes.forEach((orden) => {
                        total = orden.total + total;
                    });
                    this.mesTotal[index] = parseFloat(total.toFixed(2));
                    this.$refs.chart.update();
                }).catch(e => { console.log("problemas con semanas " + e) });
            });
            // console.log("para ver cuantas veces me llaman");
        },
        getTotalPorSemana: function(year = this.anioPicker, month = this.moment().format('MM')) {
            let i = 0;
            let dias = ((this.moment().set({ 'year': year, 'month': month }).daysInMonth()) / 4) - 1;
            let rangeWeeks = [];
            this.totalPorSemana = [];
            while (i < 4) {
                const begining = this.moment().set({ 'year': year, 'month': month }).startOf('month').add(i * Math.ceil(dias), 'days').toISOString();
                const end = (i < 3) ? this.moment().set({ 'year': year, 'month': month }).startOf('month').add(((i + 1) * Math.ceil(dias) - 1), 'days').endOf('day').toISOString() : this.moment().set({ 'year': year, 'month': month }).endOf('month').toISOString();
                i++;
                rangeWeeks[i] = { inicio: begining, fin: end };
            }
            rangeWeeks.forEach((param, index) => {
                axios.get(this.uri + '/ordenes?filter[where][and][0][fecha][lte]=' + param.fin + '&filter[where][and][1][fecha][gte]=' + param.inicio + '&filter[where][and][2][estado][like]=C').
                then(response => {
                    let total = 0;
                    let ordenes = response.data;
                    ordenes.forEach((orden) => {
                        total = orden.total + total;
                    });
                    this.totalPorSemana[index - 1] = parseFloat(total.toFixed(2));
                    this.$refs.chart.update();
                }).catch(e => { console.log("problemas con semanas " + e) });
            });
        },
        pruebaDeFechas: function() {
            console.log(this.moment().set({ 'year': 2020, 'month': 01, 'date': 12, 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 999 }).format("YYYY-MM-DD HH:mm:ss.SSS"));
            console.log(this.moment().set({ 'year': 2020, 'month': 01, 'date': 12, 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 999 }).add(1, 'millisecond').format("YYYY-MM-DD HH:mm:ss.SSS"));
            console.log(this.moment().set({ 'year': 2020, 'month': 01, 'date': 12, 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 999 }).toISOString());
            console.log(this.moment().set({ 'year': 2020, 'month': 01, 'date': 12, 'hour': 23, 'minute': 59, 'second': 59, 'millisecond': 999 }).add(1, 'millisecond').toISOString());
        },
        dismissPopover() {
            this.$nextTick(() => {
                this.$refs.mesesito.focus();
                console.log("nextTick")
            });
        }
    },
    watch: {
        anioPicker: function(value) {
            this.totalPorSemana = [];
            this.$refs.anioRef.click()
        },
        mesPicked: function() {
            this.$refs.semanaId.click();
        }
    },
    computed: {
        popoverConfig() {
            let unorderedList = '<ul class="ul-year">';
            this.mesPicker.forEach((value) => {
                unorderedList = unorderedList + '<li class="ul-items" id="' + value.id + '" onclick="popOverMonth(this.id)">' + value.mes + '</li>'
            });
            return {
                html: true,
                title: '<div style = "text-align: center;font-size: 1.5rem;font-weight: 800;"> Mes </div>',
                content: unorderedList + '</ul>',
                placement: "bottom",
                disabled: this.popoverShow,
            }
        },

    }
});