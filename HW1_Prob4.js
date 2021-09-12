// COSC 3020
// Dillon McCardell and Erin Stanfill
// Homework 1 Problem 4
// Merge Sort Iterative (current NOT in-place)

/* The merge function merges two sorted parts 
and returns the merged sorted array */
function merge(array,L1,R1,L2,R2){
    var temp = [];  // Temp array. Must be removed to become in-place
    var i = 0;      // index to 0          
    while(L1 <= R1 & L2 <= R2){     // While the bounds are correctly positioned.
        if(array[L1]<=array[L2]){   // If the leftmost element of array 1 is smaller.
            temp[i] = array[L1];    // Store lowest value (at L1) in the temp array.        
            i++;
            L1++;                   // Increment 1st array's left bound.
        }
        else{                       // Else the leftmost element of array 2 is smaller.
            temp[i]=array[L2];      // Store lowest value (at L2) in the temp array.
            i++;
            L2++;                   // Increment 2nd array's left bound.
        }
    }
    while(L1 <= R1){                // Add remaining elements from first array to temp.
        temp[i] = array[L1];
        i++;
        L1++;
    }
    while(L2 <= R2){                // Add remaining elements from second array to temp.
        temp[i] = array[L2];
        i++;
        L2++;
    }
    return temp;
}

/* Implementation of the iterative merge sort function */
function mergeSort(array,l){
    var len = 1;                    // len = length of array we will examine.
    var i, j, L1, L2, R1, R2 = 0;   // Instantiate Variables.
    while(len < l){                 // While the length of array we examine 
                                    // is within the bounds of the array we are given.
        i = 0;
        while(i < l){               // Stay within bounds of input array length.
            L1 = i;                 // Left bound of first array = index
            R1 = i + len - 1;       // Right bound of first array.
                                    // As len increases, the size of the array
                                    // increases.
            L2 = i + len;           // Left bound of the second array.
            R2 = i + (2*len) - 1;   // Right bound of the second array.
                                    // Multiply len*2 to match len increase calculation below.
            if(L2 >= l){            // This handles odd length input arrays.
                break;
            }
            if(R2 >= l){            // Adjust size so it doesnt exceed l (remain in bounds).
                R2 = l-1;
            }
            var temp = merge(array,L1,R1,L2,R2);    // Send bounds of arrays to be merged.
            for(j = 0; j <= R2-L1; j++){            // Copy temp into array
                array[i+j]=temp[j];
            }
            i = i + 2*len;          // i increases by 2 for the first time throuhg the outer
                                    // while loop, then 4, then 8. This is due to the fact that
                                    // we merged two parts of length len, so we know that all 
                                    // parts of size 2*len are now sorted.
        }
        len = 2*len;                // Double len each time through the outer while loop.
    }
    return array;
}

array = [6,4,2,7,5,3,1,12,52,13,11];    // input array.

console.log(mergeSort(array,array.length));


// Sources:
// https://www.baeldung.com/cs/non-recursive-merge-sort // Pseudo code was basis for iterative method
// https://www.geeksforgeeks.org/iterative-merge-sort/
// https://stackoverflow.com/questions/58274398/how-merge-sort-works-at-arrays-of-length-n
