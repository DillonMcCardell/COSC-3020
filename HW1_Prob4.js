// COSC 3020
// Dillon McCardell and Erin Stanfill
// Homework 1 Problem 4
// Merge Sort Iterative and In-place

/* The merge function sorts all elements from the bottom up
making use of array shifting to achieve in-place functionality */
// This function was outlined in https://www.geeksforgeeks.org/in-place-merge-sort/
// This website describes a recursive version of the in-place merge sort. 
// The function was only mildly modified to account for input of a L2 variable.
// Variable names were also changed to match our mergeSort function below.
// Detailed comments describe our understanding of the processes.
function merge(array,L1,R1,L2,R2){
    // L2 represents the left bound of the rightmost array

if (array[R1] <= array[L2]) {          // If the left element is smaller, do nothing. Elements are sorted
return;
}

/* These two pointers 'L1' and 'L2' allow
us to keep track of the beginning of each segment 
that needs to be merged */
while (L1 <= R1 && L2 <= R2) {          // This will run as long as the array length is > 1
if (array[L1] <= array[L2]) {       // If the first element is smaller, only increment the bounds
L1++;
}
else {
var val = array[L2];            // Otherwise the second element is smaller: Store element at 
                          // L2 in a temporary variable. This allows the position 
                          // at array[L2] to be overwritten.
var i = L2;                     // Update index to L2 value.

/* Shift all elements between element1 and element 2 right by 1 
(including element1 but excluding element2) and then place the element2
in the previous position of element 1 (before shifting right) */
while (i != L1) {               // Iterate through each element between L1 and L2
array[i] = array[i - 1];    // Shift the element right by 1 index spot
i--;                        // decrement index
}
array[L1] = val;                // The element that was stored at array[L2] in the temporary 
                          // variable 'val' can now be added at the new position array[L1] (leftmost position)

// Update Pointers
L1++;
R1++;
L2++;
}
}
}

/* Iterative implementation of merge sort.
Takes 'length' as the length of the array */
function mergeSort(array,length){
var len;            // 'len' represents the current size arrays to be merged
      // 'len' can vary from 1 to n/2, indicating the final two
      // halves of the array are being merged (bottom top approach)
var L1;             // 'L1' represents the left index of the first array to be merged

/* The iterative approach takes the bottom-top method.
First merge arrays of size 1 and move up, doubling the array
size each time until you have two arrays of size n/2 */ 
for (len=1; len<=length-1; len = 2*len){    // Double len size each time through 
for (L1=0; L1<length-1; L1 += 2*len){   // Merging arrays bottom to top
R1 = L1 + len - 1;                  // 'R1' represents the right bound of the leftmost array
                              // Therefore, R1+1 represents the left bound of the rightmost array

R2 = min(L1 + 2*len - 1, length-1); // Use the min utility function to calculate which value is lower:
                              // (L1+2*len-1) or (length-1). This will represent the right bound
                              // of the rightmost array
L2 = R1+1;                          // Calculate the left bound of the rightmost array
merge(array, L1, R1, L2, R2);       // Call the merge function to merge the left and right arrays
}
}
console.log(array);                         // Testing function to print out the resulting array
}

// Utility function to find minimum of two integers
function min(x,y){
if(x<y){
return x;
}
else{
return y;
}
}


var array = [7,2,8,1,9,4,6,3,0];    // Input array
mergeSort(array, array.length);     // Driver code


// Sources:
// Pseudo code at the below link was helpful for the iterative mergeSort function
// https://www.baeldung.com/cs/non-recursive-merge-sort 
// https://stackoverflow.com/questions/58274398/how-merge-sort-works-at-arrays-of-length-n
// Code taken from below website as seen above in the merge function
// https://www.geeksforgeeks.org/in-place-merge-sort/
// https://medium.com/karuna-sehgal/a-simplified-explanation-of-merge-sort-77089fe03bb2