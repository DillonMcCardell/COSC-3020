// COSC 3020 Lab 6
// Dillon McCardell & Erin Stanfill
// Depth First Search

// Utility function to insert edges into a list
function insert(adj, u, vertex)
{ 
    adj[u].push(vertex); // Inserts an edge from u to vertex
    return;
}
console.log("Adjacency List of Graph being Searched:");
var nodes = 9;      // number of nodes
var adjList = Array.from(Array(nodes), ()=>Array().fill(0));    // Empty list of arrays
var depthPath = []; // Array for the final DFS path found

// Insert the edges of our graph into the adjacency list
insert(adjList, 0, 1); 
insert(adjList, 1, 2);
insert(adjList, 2, 3);
insert(adjList, 0, 4);
insert(adjList, 4, 5);
insert(adjList, 5, 6);
insert(adjList, 0, 7);
insert(adjList, 0, 8);

// Utility function to print each row of the adjacency lists (from Lab 5)
function printList(adj, nodes)
{
    for(var i = 0; i < nodes; i++)  // For all nodes, print out their edges
    {
        var adjL = [];              // Initialize array (also clears array each time)
        adjL.push(i);               // Print the initial vertex
 
        for(var j of adj[i])        // For all of the elements in the row
            adjL.push(j);
             
        console.log(adjL);          // Print out the row
    }
}
 
printList(adjList,nodes); // Display the adjacency list representation of the graph

// Recursive function to traverse the graph and print the array.
function DFSRecursion(adj,vertex, visited){
          
    // Mark the current node as visited and push it to the depthPath array
    visited[vertex] = true;
    depthPath.push(vertex);
    // Recursively visit all adjacent nodes
    for(let i of adj[vertex].values())
    {
        let n = i
        if (!visited[n])
            DFSRecursion(adj,n, visited);
    }
}
// Primary function to complete DFS
function depthFirstSearch(adjList,vertex)
{
        
    // Initialize an array of all nodes to false
    // Will be updated to true when visited
    let visited = new Array(vertex);
    for(let i = 0; i < vertex; i++)
        visited[i] = false;

    // Call the recursive DFS function to recursively 
    // find the DFS path and push the nodes to an array
    DFSRecursion(adjList,vertex, visited);
}
var startNode = 0;
depthFirstSearch(adjList,startNode);
console.log("Path of depth first search from node", startNode);
console.log(depthPath);