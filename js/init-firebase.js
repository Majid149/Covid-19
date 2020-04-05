$(document).ready(function () {
$.getJSON('https://pomber.github.io/covid19/timeseries.json', function (data) {


   // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB223q-F3gkRvTqB7iX1AKVBZ8mYMeI5FM",
    authDomain: "covid-19-f1d58.firebaseapp.com",
    databaseURL: "https://covid-19-f1d58.firebaseio.com",
    projectId: "covid-19-f1d58",
    storageBucket: "covid-19-f1d58.appspot.com",
    messagingSenderId: "276296148791",
    appId: "1:276296148791:web:910de4fe2ab0eb9a65dcb2"
};
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  var countries = [];
  var a = [];
  $.each(data, function (key, val) {
      countries.push(key);
      a.push(val);

  });
//  console.log(countries[0]);

  var d = {
      pays: countries,
      dat: a
  };
  var activ_cases=tot_conf(d)-tot_deaths(d)-tot_recover(d);
  var rate1=((activ_cases*100)/tot_conf(d)).toFixed(2);
  var rate2=((tot_recover(d)*100)/tot_conf(d)).toFixed(2);
  var rate3=((tot_deaths(d)*100)/tot_conf(d)).toFixed(2);

  db.collection("WorldTotalData").doc("Total").set({
    Total_Confirmed: tot_conf(d),
    Total_Recovered: tot_recover(d),
    Total_Deaths: tot_deaths(d),
    Active_Cases:  activ_cases,
    ActiveCases_Rate: rate1+' %',
    Recovery_Rate: rate2+' %',
    Death_Rate: rate3+' %'

})
.then(function() {
    console.log("Document written success");
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
var table = {
    countr: d["pays"],
    conf: tot_confpctr(d),
    death: tot_deathpctr(d),
    recov: tot_recpctr(d)

}


for(i=0;i<table["countr"].length;i++){
    db.collection("Data Per Country").doc(table["countr"][i]).set({
        confirmed: table["conf"][i],
        recovered: table["recov"][i],
        deaths: table["death"][i]
    })
   
}





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



})
