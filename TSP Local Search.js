// COSC 3020
//Dillon McCardell -W07516777
//Erin Stanfill – W08752585
// Local Search, 2-opt
// Assignment 3 Problem 2

console.time("Runtime");

// TSP Local Search function. Flips array between two random points
function tsp_ls(matrix){
    var tourCost = Infinity;
    var newTourCost = 0;
    // These are our bounds to flip between
    var i, k;
    // Create a new array with length of n
    var array = Array.from(Array((Object.keys(matrix)).length).keys());
    // If there is only 1 city
    if(Object.keys(matrix).length == 1){
        return 0;
    }
    // If there are only 2 cities
    if(Object.keys(matrix).length == 2){
        return matrix[0][1];
    }
    // Otherwise choose an i between 0 and n/2 and a k between n/2+1 and n
    else{
        i = Math.floor(Math.random()*array.length/2);
        k = Math.floor(Math.random() * ((array.length) - (array.length/2)) + array.length/2);
    }
    // Use the helper function to create a random path intially
    var startingPath = randomPath(array);
    // Our stopping condition is array length * 2
    for(var n = 0; n < (array.length*2); n++){
        // Create a temporary new lower bound (i)
        var i1 = Math.floor(Math.random()*array.length/2);
        // Keep creating a new i1 until it is different than the old i
        while(i1 == i){
            i1 = Math.floor(Math.random()*array.length/2);
        }
        // Once we have a new i1, overwrite i with it
        i = i1;
        // Create a temporary new upper bound (k)
        var k1 = Math.floor(Math.random() * ((array.length) - (array.length/2)) + array.length/2);
        // Keep creating a new k1 until it is different than the old k
        while(k1 == k){
            k1 = Math.floor(Math.random() * ((array.length) - (array.length/2)) + array.length/2);
        }
        // Once we have a new k1, overwrite k with it
        k = k1;
        // Reverse the array between i and k using the helper function
        var newArr = reversePartArray(startingPath, i, k-i+1);
        // For each element in the array add up the cost between nodes
        for(var x = 0; x < array.length-1; x++){
            newTourCost += matrix[newArr[x]][newArr[x+1]];
        }
        // Only take the shortest tourCost so far
        if(tourCost > newTourCost){
            tourCost = newTourCost;
        }
        // Reset the temporary tourCost
        newTourCost = 0;
    }  
    // Return the shortest tour from any node to all other nodes
    return tourCost;
}
// Helper function to randomly reorganize our array to start
function randomPath(array){
    for(var i = array.length-1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    return array;
}
// Helper function to reverse our sections of the array
function reversePartArray(array, begin, length) {
    array = array.slice();
    array.splice(begin, 0, ...array.splice(begin,length).reverse());
    return array;
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

console.log(tsp_ls(matrixGenerator(10)));
console.timeEnd("Runtime");




