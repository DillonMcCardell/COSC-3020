// COSC 3020
// Dillon McCardell and Erin Stanfill
// Homework 1 Problem 4
// Merge Sort Iterative and In-place
function merge(array,L1,R1,L2,R2){
    var temp = [];
    var i = 0; 
    while(L1 <= R1 & L2 <= R2){
        if(array[L1]<=array[L2]){
            temp[i] = array[L1];
            i++;
            L1++;
        }
        else{
            temp[i]=array[L2];
            i++;
            L2++;
        }
        //console.log(temp);
    }
    while(L1 <= R1){
        temp[i] = array[L1];
        i++;
        L1++;
    }
    while(L2 <= R2){
        temp[i] = array[L2];
        i++;
        L2++;
    }
    return temp;
}

function mergeSort(array,l){
    var len = 1;
    var i, j, L1, L2, R1, R2 = 0;
    while(len < l){
        i = 0;
        while(i < l){
            L1 = i;
            R1 = i + len - 1;
            L2 = i + len;
            R2 = i + (2*len) - 1;
            if(L2 >= l){
                console.log("error");
                break;
            }
            if(R2 >= l){
                R2 = l-1;
            }
            console.log(L1, R1, L2, R2);
            console.log("i: ",i);
            console.log("len: ",len);
            var temp = merge(array,L1,R1,L2,R2);
            for(j = 0; j <= R2-L1; j++){
                array[i+j]=temp[j];
                console.log("new array: ",array);
            }
            i = i + 2*len;
        }
        len = 2*len;
    }
    return array;
}

array = [6,4,2,7,5,3,1,12,52,13,11];

console.log(mergeSort(array,array.length))