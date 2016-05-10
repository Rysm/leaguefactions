//Summoner ID by Summoner Name
var sumName = "";

//Variables utilized in functions below
var totals = [0, 0];
//DEMACIA
//garen, galio, fiora, jarvan, kayle, lucian, lux, poppy, quinn, shyv
var demacia = [86, 3, 114, 59, 10, 236, 99, 78, 133, 102, 37, 67, 5];

//Noxus
//cass, darius, drmundo, draven, kat, leblanc, morgana,singed, sion, swain, talon, urgot, vlad, ww
var noxus = [69, 122, 36, 119, 55, 7, 25, 27, 14, 50, 91, 6, 8, 19];

var demaciaTotal = 0;
var noxusTotal = 0;

//Set
localStorage.setItem("lastname", "Smith");
//Get
var lastName = localStorage.getItem("lastname");

//champion id's
var facID = demacia[0];

function summonerLookUp() {
  var SUMMONER_NAME = "";
  SUMMONER_NAME = $("#userName").val();

  $.ajax({
    type: "POST",
    url:"hide.php",
    dataType:'json',
        data: {'url': "api/lol/na/v1.4/summoner/by-name/"+ SUMMONER_NAME +"?"},
    success: function(json){
      var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace(" ", "");
      SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();
      summonerID = json[SUMMONER_NAME_NOSPACES].id;
      document.getElementById("sID").innerHTML = summonerID;

      //Set
      localStorage.setItem("sumID's", summonerID);
      //Get
      var lastName = localStorage.getItem("sumID's");

      getMasteryPt(summonerID);
      return summonerID;
    }
  });
};


/*
function summonerLookUp() {

    var SUMMONER_NAME = "";

    SUMMONER_NAME = $("#userName").val();

    if (SUMMONER_NAME !== "") {

        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + API_KEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace(" ", "");
                SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();
                summonerID = json[SUMMONER_NAME_NOSPACES].id;
                document.getElementById("sID").innerHTML = summonerID;

                //Set
                localStorage.setItem("sumID's", summonerID);
                //Get
                var lastName = localStorage.getItem("sumID's");

                getMasteryPt(summonerID);
                return summonerID;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data!");
            }
        });
    } else {}
};
*/

//Faction
//hardcoded champ ids (oops)
//get mastery points from demacia and noxus
function getMasteryPt(sumID){
  $.ajax({
    type: "POST",
    url:"hide.php",
    dataType:'json',
        data: {'url': "championmastery/location/NA1/player/"+ sumID + "/champion/" + facID + "?"},
    success: function(cpts){
          for (var i=0; i<demacia.length ; i++){
                facID = demacia[i];
                totals[0] += cpts.championPoints;
          }
          for (var j=0; j<noxus.length ; j++){
                facID = noxus[j];
                totals[1] += cpts.championPoints;
         }
    }
  });
          //console.log(facID);
          console.log(totals);
          return totals;
};

/*
function getMasteryPt(sumID){

    $.ajax({
            url: 'http://cors.io/?u=https://na.api.pvp.net/championmastery/location/NA1/player/32491887/champion/' + facID + '/?api_key=' + api,
            type: 'GET',
            dataType: 'json',
            data: {

                },
                success: function (cpts) {
                  for (var i=0; i<demacia.length ; i++){
                        facID = demacia[i];
                        totals[0] += cpts.championPoints;
                        console.log(facID);
                  }
                  for (var j=0; j<noxus.length ; j++){
                        facID = noxus[j];
                        totals[1] += cpts.championPoints;
                        console.log(facID);
                 }

            }
    });

    //console.log(facID);
    console.log(totals);
    return totals;
};
*/
