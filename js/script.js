$(document).ready(function () {
    $.getJSON('https://pomber.github.io/covid19/timeseries.json', function (data) {
        var countries = [];
        var a = [];
        $.each(data, function (key, val) {
            countries.push(key);
            a.push(val);

        });
      //  console.log(countries[0]);
        console.log(a);
        var d = {
            pays: countries,
            dat: a
        };
        console.log(d["dat"].length);
        var x=char2(d);
        console.log(x[1]);
        graph2(x[0],x[1],x[2],x[3],"chart2");
        console.log(tot_confpctr(d));
        tot_conf(d);
        console.log(tot_deathpctr(d));
        ///
        var mor=char3(d);
        graph3(mor);
        ///WORLD MAP
        geo(mor);

        //////
        console.log(mor[7][0].toString());
        /////MORIS_CHART
        var us_rate=parseFloat((((mor[0][0])*100)/tot_conf(d)).toFixed(1));
        var ch_rate=parseFloat((((mor[1][0])*100)/tot_conf(d)).toFixed(1));
        var sp_rate=parseFloat((((mor[3][0])*100)/tot_conf(d)).toFixed(1));
        var ita_rate=parseFloat((((mor[2][0])*100)/tot_conf(d)).toFixed(1));
        var mar_rate=parseFloat((((mor[7][0])*100)/tot_conf(d)).toFixed(1));
        var ger_rate=parseFloat((((mor[15][0])*100)/tot_conf(d)).toFixed(1));
        var irn_rate=parseFloat((((mor[12][0])*100)/tot_conf(d)).toFixed(1));
        var fr_rate=parseFloat((((mor[5][0])*100)/tot_conf(d)).toFixed(1));
        var other=parseFloat((100-(us_rate+ch_rate+sp_rate+ita_rate+mar_rate+ger_rate+irn_rate+fr_rate)).toFixed(1));
       console.log(us_rate)
        var tab_rate=[us_rate,ch_rate,sp_rate,ita_rate,mar_rate,ger_rate,irn_rate,fr_rate,other];
        console.log(tab_rate);
        graph4(tab_rate);


        var table = {
            countr: d["pays"],
            conf: tot_confpctr(d),
            death: tot_deathpctr(d),
            recov: tot_recpctr(d)

        }
        console.log(d["dat"][0]);
       
     



        /*    if(document.getElementById('select-all').checked==true){
               remplir(table);}
           else {
               document.getElementById('select-all').addEventListener('change',function(){
               remplir(table);})
           }*/

        remplir_ul(countries);

        $('#total_cases').html(' <h2 class="text-white">' + tot_conf(d) + '</h2><p class="text-white mb-0">From Jan 22th - Now</p>');
        $('#total_deaths').html(' <h2 class="text-white">' + tot_deaths(d) + '</h2><p class="text-white mb-0">From Jan 22th - Now</p>');
        $('#total_recover').html(' <h2 class="text-white">' + tot_recover(d) + '</h2><p class="text-white mb-0">From Jan 22th - Now</p>');
        graph1([],[],[],[],"chart1");
        $('#h_tot').html(tot_conf(d));
        ////
        var activ_cases=tot_conf(d)-tot_deaths(d)-tot_recover(d);
        var rate1=((activ_cases*100)/tot_conf(d)).toFixed(2);
        $('#r1').html(rate1+'%');
        $('#activ1').html(activ_cases);
        $('#activ2').html(tot_recover(d));
        $('#activ3').html(tot_deaths(d));
        var str=(rate1+'%').toString();
       // console.log(str);
        $("#probar1").css("width",str);
        ////
        var rate2=((tot_recover(d)*100)/tot_conf(d)).toFixed(2);
        $('#r2').html(rate2+'%');
        var str2=(rate2+'%').toString();
       // console.log(str);
        $("#probar2").css("width",str2);


        ////
      
        ////
        var rate3=((tot_deaths(d)*100)/tot_conf(d)).toFixed(2);
        $('#r3').html(rate3+'%');
        var str3=(rate3+'%').toString();
       // console.log(str);
        $("#probar3").css("width",str3);

        ////
        const selectElement = document.querySelector('#testSelect1');

        selectElement.addEventListener('click', (event) => {
            if ((event.target.value) == 'all') {
                remplir(table);
                
            }

            else if ((event.target.value) == 'null') {
                var contenu = $('tbody');
                var ligne = "";
                ligne += '<tr><td></td></tr>';
                contenu.html(ligne);
            }

            else {
                var contenu = $('tbody');
                var ligne = "";

                ligne += '<tr><td>' + table["countr"][event.target.value] + '</td>';
                ligne += '<td>' + table["conf"][event.target.value] + '</td>';
                ligne += '<td>' + table["death"][event.target.value] + '</td>';
                ligne += '<td>' + table["recov"][event.target.value] + '</td></tr>';

                contenu.html(ligne);
                $('#pcountry').html(table["countr"][event.target.value]);
                e=char1(d,event.target.value);
                console.log(e[1]);
                graph1(e[0],e[1],e[2],e[3],"chart1");


            }

        });

        /////


    })

    //CONFIRMED CASE PER COUNTRY
    function tot_confpctr(a) {
        var s = 0;
        var tab = [];

        for (var i = 0; i < a["dat"].length; i++) {
            s = a["dat"][i][(a["dat"][i].length)-1].confirmed;
            tab[i] = s;
            s = 0;
        }
        //console.log("Totale: " + s);
        return tab;


    }
    //recovred CASE PER COUNTRY
    function tot_recpctr(a) {
        var s = 0;
        var tab = [];
        for (var i = 0; i < a["dat"].length; i++) {
            s = a["dat"][i][(a["dat"][i].length)-1].recovered;
            tab[i] = s;
            s = 0;
        }
        //console.log("Totale: " + s);
        return tab;


    }
    //death PER COUNTRY
    function tot_deathpctr(a) {
        var s = 0;
        var tab = [];

        for (var i = 0; i < a["dat"].length; i++) {
            s = a["dat"][i][(a["dat"][i].length)-1].deaths;
            tab[i] = s;
            s = 0;
        }
        //console.log("Totale: " + s);
        return tab;


    }
    //confirmed case in world
    function tot_conf(a) {
        var s = 0

        for (var i = 0; i < a["dat"].length; i++) {
            s += a["dat"][i][(a["dat"][i].length)-1].confirmed;}
        return s;


    }
    //recovred case in world
    function tot_recover(a) {
        var s = 0

        for (var i = 0; i < a["dat"].length; i++) {
           
            s += a["dat"][i][(a["dat"][i].length)-1].recovered;}
        return s;


    }
    //Death cases in world
    function tot_deaths(a) {
        var s = 0

        for (var i = 0; i < a["dat"].length; i++) {
                s += a["dat"][i][(a["dat"][i].length)-1].deaths;
        }
        return s;


    }

    function remplir(a) {

        var contenu = $('tbody');
        var ligne = "";
        for (i = 0; i < a["countr"].length; i++) {
            ligne += '<tr><td>' + a["countr"][i] + '</td>';
            ligne += '<td>' + a["conf"][i] + '</td>';
            ligne += '<td>' + a["death"][i] + '</td>';
            ligne += '<td>' + a["recov"][i] + '</td></tr>';
        }
        contenu.html(ligne);
    }


    function remplir_ul(a) {
        var contenu = $('#testSelect1');
        var ligne = "";
        for (i = 0; i < a.length; i++) {
            //       <li><a><label><input type="checkbox"><i></i> Blank</label></a></li>
            //   <option value='1'>Item 1</option>
            ligne += '<option value="' + i + '">' + a[i] + '</option>';
        }
        contenu.append(ligne);




    }

    /////////////d["dat"][0][0].confirmed
    function char1(dat, pays) {
        var tab_date = [];
        var tab_deaths = [];
        var tab_conf=[];
        var tab_recov=[];
       
        for (i = 0; i < dat["dat"][pays].length; i=i+10) {
            tab_deaths.push(dat["dat"][pays][i].deaths);
            tab_conf.push(dat["dat"][pays][i].confirmed);
            tab_recov.push(dat["dat"][pays][i].recovered);
            tab_date.push(dat["dat"][pays][i].date);
        }
        
        if(tab_date[tab_date.length-1]!=dat["dat"][pays][(dat["dat"][0].length)-1].date){

            tab_deaths.push(dat["dat"][pays][(dat["dat"][pays].length)-1].deaths);
            tab_conf.push(dat["dat"][pays][(dat["dat"][pays].length)-1].confirmed);
            tab_recov.push(dat["dat"][pays][(dat["dat"][pays].length)-1].recovered);
            tab_date.push(dat["dat"][pays][(dat["dat"][pays].length)-1].date);
        }
 

        return [tab_date,tab_conf,tab_recov,tab_deaths];
    }




    ////////////
    function char2(dat) {
        var tab_date = [];
        var tab_deaths = [];
        var tab_conf=[];
        var tab_recov=[];
        var s=0;
        var r=0;
        var d=0;
        for (i = 0; i < dat["dat"][0].length; i=i+10) {
           
            tab_date.push(dat["dat"][0][i].date);}


        for(k=0;k<dat["dat"][0].length;k=k+10){
            for(j=0;j<dat["dat"].length;j++){

                s+=dat["dat"][j][k].confirmed;
                r+=dat["dat"][j][k].recovered;
                d+=dat["dat"][j][k].deaths;
               
            }
            tab_conf.push(s);

            tab_recov.push(r);
            tab_deaths.push(d);
            s=0;
            r=0;
            d=0;
            
            
          
        }
        if(tab_date[tab_date.length-1]!=dat["dat"][0][(dat["dat"][0].length)-1].date){

            var l1=l2=l3=0;
            for(j=0;j<dat["dat"].length;j++){
                
                l1+=dat["dat"][j][(dat["dat"][0].length)-1].confirmed;
                l2+=dat["dat"][j][(dat["dat"][0].length)-1].recovered;
                l3+=dat["dat"][j][(dat["dat"][0].length)-1].deaths;
               
            }
            tab_conf.push(l1);
            tab_recov.push(l2);
            tab_deaths.push(l3);
            tab_date.push(dat["dat"][0][(dat["dat"][0].length)-1].date);
        }

        
 

        return [tab_date,tab_conf,tab_recov,tab_deaths];
    }


    function char3(dat){
        tab_countr=[];
        tab_USA=[];
        tab_CH=[];
        tab_ITA=[];
        tab_SP=[];
        tab_rus=[];
        tab_fra=[];
        tab_can=[];
        tab_mar=[];
        tab_bang=[];
        tab_sau=[];
        tab_aus=[];
        tab_ind=[];
        tab_irn=[];
        tab_alg=[];
        tab_bra=[];
        tab_all=[];


        //usa//tab_countr[0]

        tab_USA.push(dat["dat"][dat["pays"].indexOf('US')][dat["dat"][0].length-1].confirmed);
        tab_USA.push(dat["dat"][dat["pays"].indexOf('US')][dat["dat"][0].length-1].recovered);
        tab_USA.push(dat["dat"][dat["pays"].indexOf('US')][dat["dat"][0].length-1].deaths);
        tab_countr.push(tab_USA);
         //CHINA//tab_countr[1]

         tab_CH.push(dat["dat"][dat["pays"].indexOf('China')][dat["dat"][0].length-1].confirmed);
         tab_CH.push(dat["dat"][dat["pays"].indexOf('China')][dat["dat"][0].length-1].recovered);
         tab_CH.push(dat["dat"][dat["pays"].indexOf('China')][dat["dat"][0].length-1].deaths);
         tab_countr.push(tab_CH);
         //ita//tab_countr[2]

         tab_ITA.push(dat["dat"][dat["pays"].indexOf('Italy')][dat["dat"][0].length-1].confirmed);
         tab_ITA.push(dat["dat"][dat["pays"].indexOf('Italy')][dat["dat"][0].length-1].recovered);
         tab_ITA.push(dat["dat"][dat["pays"].indexOf('Italy')][dat["dat"][0].length-1].deaths);
         tab_countr.push(tab_ITA);
         //spain//tab_countr[3]

         tab_SP.push(dat["dat"][dat["pays"].indexOf('Spain')][dat["dat"][0].length-1].confirmed);
         tab_SP.push(dat["dat"][dat["pays"].indexOf('Spain')][dat["dat"][0].length-1].recovered);
         tab_SP.push(dat["dat"][dat["pays"].indexOf('Spain')][dat["dat"][0].length-1].deaths);
         tab_countr.push(tab_SP);
         ///////[4]
         tab_rus.push(dat["dat"][dat["pays"].indexOf('Russia')][dat["dat"][0].length-1].confirmed);
         tab_countr.push(tab_rus);
         //////[5]
         tab_fra.push(dat["dat"][dat["pays"].indexOf('France')][dat["dat"][0].length-1].confirmed);
         tab_countr.push(tab_fra);
         //////[6]
         tab_sau.push(dat["dat"][dat["pays"].indexOf('Saudi Arabia')][dat["dat"][0].length-1].confirmed);
         tab_countr.push(tab_sau);

         //////[7]
         tab_mar.push(dat["dat"][dat["pays"].indexOf('Morocco')][dat["dat"][0].length-1].confirmed);
         tab_countr.push(tab_mar);

        //////[8]
        tab_bang.push(dat["dat"][dat["pays"].indexOf('Bangladesh')][dat["dat"][0].length-1].confirmed);
        tab_countr.push(tab_bang);

         //////[9]
         tab_can.push(dat["dat"][dat["pays"].indexOf('Canada')][dat["dat"][0].length-1].confirmed);
         tab_countr.push(tab_can);

         //////[10]
         tab_aus.push(dat["dat"][dat["pays"].indexOf('Australia')][dat["dat"][0].length-1].confirmed);
         tab_countr.push(tab_aus);
         ////[11]
         tab_ind.push(dat["dat"][dat["pays"].indexOf('India')][dat["dat"][0].length-1].confirmed);
         tab_countr.push(tab_ind);
         ////[12]
         tab_irn.push(dat["dat"][dat["pays"].indexOf('Iran')][dat["dat"][0].length-1].confirmed);
         tab_countr.push(tab_irn);
          ////[13]
          tab_alg.push(dat["dat"][dat["pays"].indexOf('Algeria')][dat["dat"][0].length-1].confirmed);
          tab_countr.push(tab_alg);
          ////[14]
          tab_bra.push(dat["dat"][dat["pays"].indexOf('Brazil')][dat["dat"][0].length-1].confirmed);
          tab_countr.push(tab_bra);
           ////[15]
           tab_all.push(dat["dat"][dat["pays"].indexOf('Germany')][dat["dat"][0].length-1].confirmed);
           tab_countr.push(tab_all);
 

         
        
        return tab_countr;
    



    }



    //tab_recov.push(dat["dat"][pays][i].recovered);
  //  tab_deaths.push(dat["dat"][pays][i].deaths);

    /*   document.getElementById('select-all').onclick = function() {
           var checkboxes = document.querySelectorAll('input[type="checkbox"]');
           for (var checkbox of checkboxes) {
             checkbox.checked = this.checked;
           }
         }
       */
    function graph1(l,d1,d2,d3, id) {
        if(window.myChart != undefined){
            window.myChart.destroy();
        }
        var ctx = document.getElementById(id);
        
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: l,
                type: 'line',
                defaultFontFamily: 'Montserrat',
                datasets: [{
                    label: "Confirmed Cases",
                    data: d1,
                    backgroundColor: 'transparent',
                    borderColor: '#ff6f5e',
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: '#ff6f5e',

                }, {
                    label: "Recovered",
                    data: d2,
                    backgroundColor: 'transparent',
                    borderColor: '#40bfc1',
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: '#40bfc1',
                }, {
                    label: "Deaths",
                    data: d3,
                    backgroundColor: 'transparent',
                    borderColor: '#272121',
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: '#272121',
                }]
            },
            options: {
                responsive: true,

                tooltips: {
                    mode: 'index',
                    titleFontSize: 12,
                    titleFontColor: '#000',
                    bodyFontColor: '#000',
                    backgroundColor: '#fff',
                    titleFontFamily: 'Montserrat',
                    bodyFontFamily: 'Montserrat',
                    cornerRadius: 3,
                    intersect: false,
                },
                legend: {
                    labels: {
                        usePointStyle: true,
                        fontFamily: 'Montserrat',
                    },
                },
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: true,
                            drawBorder: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        display: true,
                        gridLines: {
                            display: true,
                            drawBorder: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Number Of Persons'
                        }
                    }]
                },
                title: {
                    display: false,
                    text: 'Normal Legend'
                }
            }
        });







    }

    function graph2(l,d1,d2,d3, id) {
        if(window.myChart1 != undefined){
            window.myChart1.destroy();
        }
        var ctx = document.getElementById(id);
        
        window.myChart1 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: l,
                type: 'line',
                defaultFontFamily: 'Montserrat',
                datasets: [{
                    label: "Confirmed Cases",
                    data: d1,
                    backgroundColor: 'transparent',
                    borderColor: '#ff6f5e',
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: '#ff6f5e',

                }, {
                    label: "Recovered",
                    data: d2,
                    backgroundColor: 'transparent',
                    borderColor: '#40bfc1',
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: '#40bfc1',
                }, {
                    label: "Deaths",
                    data: d3,
                    backgroundColor: 'transparent',
                    borderColor: '#272121',
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: '#272121',
                }]
            },
            options: {
                responsive: true,

                tooltips: {
                    mode: 'index',
                    titleFontSize: 12,
                    titleFontColor: '#000',
                    bodyFontColor: '#000',
                    backgroundColor: '#fff',
                    titleFontFamily: 'Montserrat',
                    bodyFontFamily: 'Montserrat',
                    cornerRadius: 3,
                    intersect: false,
                },
                legend: {
                    labels: {
                        usePointStyle: true,
                        fontFamily: 'Montserrat',
                    },
                },
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: true,
                            drawBorder: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: true,
                            drawBorder: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Number Of Persons'
                        }
                    }]
                },
                title: {
                    display: false,
                    text: 'Normal Legend'
                }
            }
        });







    }



function graph3(ee){


         // LINE CHART
      // Morris bar chart
 Morris.Bar({
    element: 'morris-bar-chart',
    data: [{
        y: 'USA',
        a: ee[0][0],
        b: ee[0][1],
        c: ee[0][2],
        
    }, {
        y: 'China',
        a: ee[1][0],
        b: ee[1][1],
        c: ee[1][2],
        
    }, {
        y: 'Italy',
        a: ee[2][0],
        b: ee[2][1],
        c: ee[2][2],
        
    }, {
        y: 'Spain',
        a: ee[3][0],
        b: ee[3][1],
        c: ee[3][2],
        
    }],
    xkey: 'y',
    ykeys: ['a', 'b', 'c'],
    labels: ['Confirmed', 'Recovered', 'Deaths'],
    barColors: ['#ff6f5e', '#40bfc1','#272121'],
    hideHover: 'auto',
    gridLineColor: 'transparent',
    resize: true
});
}



function geo(c){

    var i = new Datamap( {
        scope: "world", 
        element: document.getElementById("world-map"), 
        responsive: !0, 
        geographyConfig: {
            popupOnHover: !1, 
            highlightOnHover: !1, 
            borderColor: "transparent", 
            borderWidth: 1, 
            highlightBorderWidth: 3, 
            highlightFillColor: "#de2d26", 
            highlightBorderColor: "transparent", 
            borderWidth: 1
        }, 
        bubblesConfig: {
            popupTemplate: function (e, i) {
                return '<div class="datamap-sales-hover-tooltip">' + i.country + ': ' + i.case + " Cases</div>"
            }, 
            borderWidth: 0, 
            highlightBorderWidth: 3, 
            highlightFillColor: "#de2d26", 
            highlightBorderColor: "transparent", 
            fillOpacity: .55
        }, 
        fills: {
            Visited: "#fc9272", 
            neato: "#fc9272", 
            white: "#fc9272", 
            defaultFill: "#636363"
        }
    });
    
    i.bubbles([{
        centered: "USA", fillKey: "white", radius: 40, case:c[0][0].toString() , country: "United States"
    }, {
        centered: "SAU", fillKey: "Visited", radius: 5, case: c[6][0].toString(), country: "Saudia Arabia"
    }, {
        centered: "RUS", fillKey: "neato", radius: 5, case: c[4][0].toString(), country: "Russia"
    }, {
        centered: "CAN", fillKey: "white", radius: 5, case: c[9][0].toString(), country: "Canada"
    }, {
        centered: "IND", fillKey: "Visited", radius: 5, case: c[11][0].toString(), country: "India"
    }, {
        centered: "AUS", fillKey: "white", radius: 5, case: c[10][0].toString(), country: "Australia"
    }, {
        centered: "BGD", fillKey: "Visited", radius: 5, case: c[8][0].toString(), country: "Bangladesh"
    },{
        centered: "ESP", fillKey: "white", radius: 20, case: c[3][0].toString(), country: "Spain"
    },{
        centered: "FRA", fillKey: "Visited", radius: 5, case: c[5][0].toString(), country: "France"
    },{
        centered: "ITA", fillKey: "Visited", radius: 20, case: c[2][0].toString(), country: "Italy"
    },{
        centered: "CHN", fillKey: "Visited", radius: 19, case: c[1][0].toString(), country: "China"
    },{
        centered: "MAR", fillKey: "Visited", radius: 5, case: c[7][0].toString(), country: "Morocco"
    },{
        centered: "IRN", fillKey: "Visited", radius: 5, case: c[12][0].toString(), country: "Iran"
    },{
        centered: "DZA", fillKey: "Visited", radius: 5, case: c[13][0].toString(), country: "Algeria"
    },{
        centered: "BRA", fillKey: "Visited", radius: 5, case: c[14][0].toString(), country: "Brazil"
    },{
        centered: "DEU", fillKey: "Visited", radius: 5, case: c[15][0].toString(), country: "Germany"
    }
    ])

}


// Morris donut chart
function graph4(a){
Morris.Donut({
    element: 'morris-donut-chart',
    data: [{
        label: "United State",
        value: a[0],

    }, {
        label: "China",
        value: a[1]
    }, {
        label: "Spain",
        value: a[2]
    }, {
        label: "Italy",
        value: a[3]
    }, {
        label: "Morocco",
        value: a[4]
    },{
        label: "Germany",
        value: a[5]
    }, {
        label: "Iran",
        value: a[6]
    },{
        label: "France",
        value: a[7]
    },{
        label: "Other",
        value: a[8]
    }],
    resize: true,
    colors: ['#4d7cff', '#7571F9', '#9097c4'],
    formatter: function (value) { return (value) + '%'; }
});
}




});
