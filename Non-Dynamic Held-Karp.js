// cities is the set of cities not visited so far, including start
/*
heldKarp(cities, start)
if |cities| == 2
return length of tour that starts at start, goes directly
to other city in cities
else
return the minimum of
for each city in cities, unless the city is start
// reduce the set of cities that are unvisited by one
(the old start), set the new start, add on the
distance from old start to new start
heldKarp(cities - start, city) + distance from start to
city
*/
console.time("Start Time");

var cities =   [[0,1,2],
                [1,0,2],
                [2,2,0]];

var cities2 =  [[0,1],
                [1,0]];
                
var cities3 = [];

var cities4 = [[0,2,5,4],
               [2,0,3,2],
               [5,3,0,9],
               [4,2,9,0]];

var cities5 = [[0,2,5,4,7,8],
               [2,0,3,2,8,9],
               [5,3,0,9,2,1],
               [4,2,9,0,4,3],
               [7,8,2,4,0,2],
               [8,9,1,3,2,0]];

var cities8 = [[0,2,5,4,7,8,4,1],
               [2,0,3,2,8,9,3,2],
               [5,3,0,9,2,1,7,6],
               [4,2,9,0,4,3,5,4],
               [7,8,2,4,0,2,1,3],
               [8,9,1,3,2,0,2,2],
               [4,3,7,5,1,2,0,8],
               [1,2,6,4,3,2,8,0]];


var cities11 = [[0,2,5,4,7,8,4,1,3,6,4],
               [2,0,3,2,8,9,3,2,6,7,2],
               [5,3,0,9,2,1,7,6,9,4,2],
               [4,2,9,0,4,3,5,4,8,2,2],
               [7,8,2,4,0,2,1,3,1,3,2],
               [8,9,1,3,2,0,2,2,7,9,2],
               [4,3,7,5,1,2,0,8,2,1,2],
               [1,2,6,4,3,2,8,0,2,5,7],
               [3,6,9,8,1,7,2,2,0,8,8],
               [6,7,4,2,3,9,1,5,8,0,9],
               [4,2,2,2,2,2,2,7,8,9,0]];


var cities12 = [[0,2,5,4,7,8,4,1,3,6,4,3],
               [2,0,3,2,8,9,3,2,6,7,2,4],
               [5,3,0,9,2,1,7,6,9,4,2,5],
               [4,2,9,0,4,3,5,4,8,2,2,6],
               [7,8,2,4,0,2,1,3,1,3,2,7],
               [8,9,1,3,2,0,2,2,7,9,2,1],
               [4,3,7,5,1,2,0,8,2,1,2,3],
               [1,2,6,4,3,2,8,0,2,5,7,5],
               [3,6,9,8,1,7,2,2,0,8,8,7],
               [6,7,4,2,3,9,1,5,8,0,9,9],
               [4,2,2,2,2,2,2,7,8,9,0,2],
               [3,4,5,6,7,1,3,5,7,9,2,0]];
function tsp(cities,start,unvisited){
    var tourLength, tour = Infinity, tempTour;
    //console.log('unvisited',unvisited);
    if (unvisited.length == 1){
        tourLength = cities[start][unvisited[0]];
        return tourLength;
    }
    else{
        for(var i=0; i<cities.length;i++){
            //console.log(unvisited);
            if(i!=start && unvisited.includes(i.toString())){
                tempTour = tsp(cities,i,unvisited.filter(function(x){return x!=i;}))+cities[start][i];
                if(tour >= tempTour){
                    tour = tempTour;
                }    
            }
        }
        return tour;
    }
}


function tsp_hk(cities){
    cache = [];
    var tour = Infinity;
    if(Object.keys(cities).length == 0){
        console.log("¡Matrix is empty!");
        return;
    }
    if(Object.keys(cities).length == 1){
        return 0;
    }
    for(var i=0; i<cities.length;i++){
        var startingCity = i;
        var tempTour = tsp(cities,startingCity,Object.keys(cities).filter(function(x){return x!=startingCity;}));
        if(tempTour <= tour){
            tour = tempTour;
        }
    }
    return tour;
}

console.log(tsp_hk(cities11));
console.timeEnd("Start Time");