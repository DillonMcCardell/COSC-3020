// Dillon McCardell, Erin Stanfill
// COSC 3020 Assignment 2
// Program to find the augmenting path between two nodes



// Matrix to be searched
var matrix1 = {A: {B:1,A:0,D:1,C:0},
               B: {A:0,B:0,C:0,D:0},
               C: {A:0,B:0,C:4,D:1},
               D: {A:0,B:1,C:1,D:0}};
var matrix2 = {foo: {bar:1,foo:0},
               bar: {foo:0,bar:0}};


// Augmenting path function. Calls DFS algorithm to find Augmenting Path
// Finds a path from startNode to endNode
// Prints an empty array if there is no path
function augmentingPath(matrix,startNode,endNode){
    var augPath = []; // Array for the final DFS path found
    depthFirstSearch(matrix,startNode,endNode,augPath); // Call DFS algorithm on matrix, however, now include endNode
    if(augPath[augPath.length-1]!=endNode){     // If the augmenting path does not end in the endNode, clear it
        augPath = [];                           // Clear it
    }
    return augPath;    // Print out the augmenting path (DFS path terminating at endNode)
}


// Recursive function to traverse the matrix
function DFSRecursion(matrix,start,end, visited,augPath){
    visited[start] = true;      // Mark the current node as visited e.g. ['currentNode':true]
    var x = 0;                  // Used to iterate through keys
    augPath.push(start);        // Push the current vertex to the augmenting path array augPath
    // Recursively visit all adjacent nodes
    for(var i of Object.values(matrix[start])){     // For i of values at 'start' key
        var w = i;
        // if weight>0 and the current node is not visited and the current node is not our endNode
        if(w>0 & !visited[Object.keys(matrix[start])[x]] & start != end){        
            DFSRecursion(matrix,Object.keys(matrix[start])[x],end,visited,augPath); // Recursively call this function
        }
        // If a dead end is found, pop the last value from the augPath
        else if(x==(Object.keys(matrix)).length-1 && augPath[augPath.length-1] != end){
            augPath.pop();
        }
        x++;    // Increment counter
    }
}
// Primary function to complete DFS
function depthFirstSearch(matrix,start,end,augPath)
{        
    // Create an empty array of arrays
    // Will be updated with key and value=true when a node is visited e.g. [['A':true],['B':true]]
    var visited = new Array();

    // Call the recursive DFS function to recursively 
    // find the DFS path and push the nodes to an array
    DFSRecursion(matrix,start,end, visited,augPath);
}

// Call the augmentingPath function with startNode, endNode
console.log(augmentingPath(matrix1,'A','C'));
console.log(augmentingPath(matrix2,'foo','bar'));
