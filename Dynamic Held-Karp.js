// COSC 3020
//Dillon McCardell -W07516777
//Erin Stanfill – W08752585
// Held-Karp, Dynamic Memoization
// Assignment 3 Problem 1

// Global variable for our memoization Cache               
var cache = [];
// TSP function to recursively solve the shortest path using memoization
function tsp(cities,start,unvisited){
    // Initialize variables
    var tour = Infinity, tempTour;
    // Convert our array of unvisited nodes to a string to use as an index
    var key = JSON.stringify(unvisited);
    // Base case: If we only have 1 node left to visit
    if (unvisited.length == 1){
        // Return the cost to the final node
        return cities[start][unvisited[0]];
    }
    // Create an array position if there is none
    if(cache[key] === undefined) cache[key] = [];
    // If the position in the cache exists, this path has already been calcualted
    if(cache[key][start] !== undefined){
        // return the previously calculated path
        return cache[key][start];
    }
    else{
        // For all cities in the matrix
        for(var i=0; i<cities.length;i++){
            // If the current city is not 'start' or already visited
            if(i!=start && unvisited.includes(i.toString())){
                // Recursive call
                tempTour = tsp(cities,i,unvisited.filter(function(x){return x!=i;}))+cities[start][i];
                // If the new tour is shorter than the old tour 
                if(tour >= tempTour){
                    tour = tempTour;
                }
                // Store this path in the cache at the position of [remaining cities][start city]
                cache[key][start] = tour;      
            }
        }
        // Return the tour from the given start node
        return tour;
    }
}

// Driver function for the Held-Karp function
function tsp_hk(cities){
    // Clear the cache so it can be used for multiple runs
    cache = [];
    var tour = Infinity;
    // If the matrix is empty print an error and return 'undefined'
    if(Object.keys(cities).length == 0){
        console.log("¡Matrix is empty!");
        return;
    }
    // If the matrix is 1 then there is no path, return 0
    if(Object.keys(cities).length == 1){
        return 0;
    }
    // For each city 
    for(var i=0; i<cities.length;i++){
        // Make the recursive call
        // The start city is i, which changes each iteration
        // Filter our the start city from unvisited
        var tempTour = tsp(cities,i,Object.keys(cities).filter(function(x){return x!=i;}));
        // If the new tour is less than the old one:
        if(tempTour <= tour){
            // Save the shortest tour
            tour = tempTour;
        }
    }
    // Return the final shortest tour
    return tour;
}

// Helper function to generate a symmetric matrix of size n
function matrixGenerator(n)
{
    var tempArray = [];
    let initial_array = new Array(n-1);
    for (var i = 0; i < initial_array.length; i++) {
    initial_array[i] = new Array(2);
    }
     
    let final_matrix = new Array(n);
    for (var i = 0; i < final_matrix.length; i++) {
    final_matrix[i] = new Array(2);
    }
   
    for (let i = 0; i < n - 1; ++i)
        initial_array[0][i] = i + 1;
   
    // Form cyclic array of elements 1 to n-1
    for (let i = 1; i < n - 1; ++i)
        for (let j = 0; j < n - 1; ++j)
            initial_array[i][j]
                = initial_array[i - 1][(j + 1) % (n - 1)];
   
    // Store initial array into final array
    for (let i = 0; i < n - 1; ++i)
        for (let j = 0; j < n - 1; ++j)
            final_matrix[i][j] = initial_array[i][j];
   
    // Fill the last row and column with 0's
    for (let i = 0; i < n; ++i)
        final_matrix[i][n - 1] = final_matrix[n - 1][i] = 0;
   
    for (let i = 0; i < n; ++i)
    {
        let t0 = final_matrix[i][i];
        let t1 = final_matrix[i][n - 1];
   
        // Swap 0 and the number present
        // at the current indexed row
        let s = final_matrix[i][i];
        final_matrix[i][i]=final_matrix[i][n - 1];
        final_matrix[i][n - 1]=s;
   
        // Also make changes in the last row
        // with the number we swapped
        final_matrix[n - 1][i] = t0;
    }
   return final_matrix;
}  

console.time("Start Time");
console.log(tsp_hk(matrixGenerator(10)));
console.timeEnd("Start Time");
