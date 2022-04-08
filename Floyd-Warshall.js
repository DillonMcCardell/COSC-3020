// COSC 3020 Lab 9
// Floyd Warshall Algorithm
// Dillon McCardell, Erin Stanfill
 
const varToString = varObj => Object.keys(varObj)[0];

function allPairsShortestPaths(graph) {
    // Dynamically set the vertice # to each inputted graph
    var V = Object.keys(graph).length
    // Initialize |V|x|V| matrix dist to Infinity
    var dist = Array.from(Array(V), () => new Array(V).fill(Infinity));
    var i, j, k;
    // Array for each row of the solution matrix to be printed out
    var rows = [];

    // Initialize dist matrix. Weights are copied from 'graph' and dist[v][v] are set to zero
    for (i = 0; i < V; i++) {
        for (j = 0; j < V; j++) {
            // for each vertex v ∈ V , dist[v][v] = 0
            if(i == j){
                dist[i][j] = 0;
            }
            // for each edge (u,v) = e ∈ E, dist[u][v] = weight((u,v))
            else{
                dist[i][j] = graph[i][j];
            }           
        }
    }
    // for each vertex k ∈ V:
    for (k = 0; k < V; k++) {
        // for each vertex i ∈ V:
        for (i = 0; i < V; i++) {
            // for each vertex j ∈ V:
            for (j = 0; j < V; j++) {
            // If vertex k is on the shortest
            // path from i to j, then update
            // the value of dist[i][j]
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    // Print the shortest distance matrix
    for (var i = 0; i < V; ++i) {
        rows = [];
        for (var j = 0; j < V; ++j) {
            if (dist[i][j] == Infinity) {
                rows.push('I');
            } 
            else{
                rows.push(dist[i][j]);
            }
        }
        console.log(rows);
    }
}
var graph1 = [[0,1,3],
              [20,1,4],
              [20,20,2]];

var graph2 = [[0, 2, 4, 15],
             [13, 0, 3, 2],
             [Infinity, 6, 0, 1],
             [Infinity, Infinity, Infinity, 0]];

var graph3 = [[0,2,6,7,5,3,4,8],
             [1,0,5,7,2,5,9,4],
             [Infinity,4,0,Infinity,4,2,7,5],
             [Infinity,4,6,0,1,2,5,3],
             [Infinity,80,55,Infinity,0,62,42,50],
             [Infinity,8,9,9,8,0,3,2],
             [Infinity,4,3,5,2,6,0,7],
             [Infinity,6,7,Infinity,2,5,3,0]];

console.log("Matrix result for graph1:");
allPairsShortestPaths(graph1);
console.log("Matrix result for graph2:");
allPairsShortestPaths(graph2);
console.log("Matrix result for graph3:");
allPairsShortestPaths(graph3);
 





