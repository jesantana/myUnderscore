console.log('Hello from Test');

//each([1,2,3], function(x){console.log(x)});
//console.log(map([1,2,3], function(x){return 3*x*x;}));
//console.log(reduce([10,2,3,5,94,5,7], function(current,memo){return memo>current?memo:current;},0));
//console.log(reverse([10,2,3,5,94,5,7]));
var valueToCompare=7;
/*
function firstGreaterThan(current,memo){
	var result=0;
	
	if(memo>valueToCompare){
		result= memo;
	}
	else if(current>valueToCompare){
		result=current;
	}
	
	return result;
}
*/
//console.log(reduceRight([2,3,10,5,94,5,7],firstGreaterThan,0));
//console.log(reduceRightFunctional([2,3,10,5,94,5,7],firstGreaterThan,0));

/*console.log(findRecursive([2,3,10,5,94,5,7],5));
console.log(findFunctional([2,3,10,5,94,5,7],5));

console.log(some([2,3,10,5,94,5,7],function(element){return element>6}))*/

/*var objArray=[{a:'a',b:'b',c:'c'},
					{x:'a',y:'b',c:'c'},
					{a:'a',y:'b',c:'c'},
					{y:'a',b:'b',c:'c'}
					];
var comparingObje={c:'c',y:'a'};

console.log(where(objArray,comparingObje));
console.log(findWhere(objArray,comparingObje));
*/
console.log(filter([1,5,6,2,9,3],function(element){return element%2==0;}));
console.log(reject([1,5,6,2,9,3],function(element){return element%2==0;}));
console.log(rejectFilterBased([1,5,6,2,9,3],function(element){return element%2==0;}));
