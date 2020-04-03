(function($) {
    "use strict"


    //todo list
    $(".tdl-new").on('keypress', function(e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        if (code == 13) {

            var v = $(this).val();

            var s = v.replace(/ +?/g, '');

            if (s == "") {

                return false;

            } else {

                $(".tdl-content ul").append("<li><label><input type='checkbox'><i></i><span>" + v + "</span><a href='#' class='ti-trash'></a></label></li>");

                $(this).val("");

            }

        }

    });





    $(".tdl-content a").on("click", function() {

        var _li = $(this).parent().parent("li");

        _li.addClass("remove").stop().delay(100).slideUp("fast", function() {

            _li.remove();

        });

        return false;

    });



    // for dynamically created a tags

    $(".tdl-content").on('click', "a", function() {

        var _li = $(this).parent().parent("li");

        _li.addClass("remove").stop().delay(100).slideUp("fast", function() {

            _li.remove();

        });

        return false;

    });








})(jQuery);

/*
(function($) {
    "use strict"

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
                return '<div class="datamap-sales-hover-tooltip">' + i.country +': ' + i.sold + " Cases</div>"
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
        centered: "USA", fillKey: "white", radius: 50, sold: "500", country: "United States"
    }, {
        centered: "SAU", fillKey: "Visited", radius: 5, sold: "$900", country: "Saudia Arabia"
    }, {
        centered: "RUS", fillKey: "neato", radius: 5, sold: "$250", country: "Russia"
    }, {
        centered: "CAN", fillKey: "white", radius: 5, sold: "$1000", country: "Canada"
    }, {
        centered: "IND", fillKey: "Visited", radius: 5, sold: "$50", country: "India"
    }, {
        centered: "AUS", fillKey: "white", radius: 5, sold: "$700", country: "Australia"
    }, {
        centered: "BGD", fillKey: "Visited", radius: 5, sold: "$1500", country: "Bangladesh"
    },{
        centered: "ESP", fillKey: "white", radius: 10, sold: "$1500", country: "Espagne"
    },{
        centered: "FRA", fillKey: "Visited", radius: 5, sold: "$1500", country: "France"
    },{
        centered: "ITA", fillKey: "Visited", radius: 5, sold: "$1500", country: "Italy"
    },{
        centered: "MAR", fillKey: "Visited", radius: 5, sold: "dss", country: "Italy"
    },{
        centered: "CHN", fillKey: "Visited", radius: 5, sold: "dss", country: "CHIN"
    }
    ])





})(jQuery);

(function($) {
    "use strict"


     // LINE CHART
      // Morris bar chart
 Morris.Bar({
    element: 'morris-bar-chart',
    data: [{
        y: '2016',
        a: 100,
        b: 90,
        c:22,
        d:33,
    }, {
        y: '2017',
        a: 75,
        b: 65,
        d:33,
    }, {
        y: '2018',
        a: 50,
        b: 40,
        d:33,
    }, {
        y: '2019',
        a: 75,
        b: 65,
        d:33,
    }, {
        y: '2020',
        a: 50,
        b: 40,
        d:33,
    }, {
        y: '2021',
        a: 75,
        b: 65,
        d:33,
    }, {
        y: '2022',
        a: 100,
        b: 90,
        d:33,
    }],
    xkey: 'y',
    ykeys: ['a', 'b', 'c','d'],
    labels: ['A', 'B', 'Conf'],
    barColors: ['#FC6C8E', '#7571f9'],
    hideHover: 'auto',
    gridLineColor: 'transparent',
    resize: true
});









})(jQuery);*/


(function($) {
    "use strict"


    $('#todo_list').slimscroll({
        position: "right",
        size: "5px",
        height: "250px",
        color: "transparent"
    });

    $('#activity').slimscroll({
        position: "right",
        size: "5px",
        height: "390px",
        color: "transparent"
    });





})(jQuery);

