let nums= [2,6,8,10,11,14,21,27];
let result=[];
nums.forEach((num,index)=>{
    if(num%2==0){
        a=num+2;
        result.push(a);
    }
    else{
        b=num+5;
        result.push(b);

    }
    
})
console.log(result);
let finder= result.find((value)=>value==4);
let Indexer= result.indexOf(32);
console.log(finder);
console.log(Indexer);

let filterr= nums.filter((value)=>value%2==0)
console.log(filterr);

//from to get value like [
//   'w', 'e', 'l',
//   'c', 'o', 'm',
//   'e'
// ]
let value="welcome";
let lol= Array.from(value);
console.log(lol)