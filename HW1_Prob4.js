// COSC 3020
// Dillon McCardell and Erin Stanfill
// Homework 1 Problem 4
// Merge Sort Iterative and In-place

/* The merge function sorts all elements from the bottom up
making use of array shifting to achieve in-place functionality */
function merge(array,L1,mid,R){
    L2 = mid + 1;                           // L2 represents the left bound of the rightmost array
        
    if (array[mid] <= array[L2]) {              // If the left element is smaller, do nothing
        return;
    }
        
    /* These two pointers 'L1' and 'L2' allow
    us to keep track of the beginning of each segment 
    that needs to be merged */
    while (L1 <= mid && L2 <= R) {
            
        if (array[L1] <= array[L2]) {        // If the first element is smaller, only increment the bounds
            L1++;
        }
        else {
            var val = array[L2];              // Otherwise the second element is smaller: Store element at 
                                            // L2 in a temporary variable. This allows the position 
                                            // at array[L2] to be overwritten.
            var i = L2;                     // Update index to L2 value.
        
            /* Shift all elements between element1 and element 2 right by 1 
            (including element1 but excluding element2) and then place the element2
            in the previous position of element 1 (before shifting right) */
            // The following section of code was taken from: https://www.geeksforgeeks.org/in-place-merge-sort/
            // This website describes a recursive implementation for an in-place merge sort.
            // -----------------------------------------
            while (i != L1) {               // Iterate through each element
                array[i] = array[i - 1];        // Shift the element right by 1 index spot
                i--;                        // decrement index
            }
            array[L1] = val;                  // The element that was stored at array[L2] in the temporary 
                                            // variable 'val' can now be added at the new position array[L1] (leftmost position)
        
            // Update Pointers
            L1++;
            mid++;
            L2++;
            // -----------------------------------------
        }
    }
}
  
/* Iterative implementation of merge sort.
Takes 'length' as the length of the array */
function mergeSort(array,length){
    var len;            // 'len' represents the current size arrays to be merged
                        // 'len' can vary from 1 to n/2, indicating the final two
                        // halves of the array are being merged (bottom top approach)
    var L;              // 'L' represents the left index of the first array to be merged
  
    /* The iterative approach takes the bottom-top method.
    First merge arrays of size 1 and move up, doubling the array
    size each time until you have two arrays of size n/2 */ 
    for (len=1; len<=length-1; len = 2*len){    // Double len size each time through 
        // Pick starting point of different subarrays of current size
        for (L=0; L<length-1; L += 2*len){      // Merging arrays bottom to top
            // Find ending point of left subarray. mid+1 is starting
            // point of right
            mid = L + len - 1;                  // 'mid' represents the right bound of the leftmost array
                                                // Therefore, mid+1 represents the left bound of the rightmost array
            
            R = min(L + 2*len - 1, length-1);   // Use the min utility function to calculate which value is lower:
                                                // (L+2*len-1) or (length-1). This will represent the right bound
                                                // of the rightmost array
            merge(array, L, mid, R);            // Call the merge function to merge the left and right arrays
        }
    }
    console.log(array);                         // Testing function to print out the resulting array
}

// Utility function to find minimum of two integers without branching
// Taken from https://www.geeksforgeeks.org/compute-the-minimum-or-maximum-max-of-two-integers-without-branching/
function min(x,y){
  return y ^ ((x ^ y) & -(x < y));
}


var array = [7,2,8,1,9,4,6,3,0];    // Input array
mergeSort(array, array.length);     // Driver code
  

