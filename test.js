console.log('Hello from Test');

//each([1,2,3], function(x){console.log(x)});
//console.log(map([1,2,3], function(x){return 3*x*x;}));
//console.log(reduce([10,2,3,5,94,5,7], function(current,memo){return memo>current?memo:current;},0));
//console.log(reverse([10,2,3,5,94,5,7]));
var valueToCompare=7;
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

console.log(reduceRight([2,3,10,5,94,5,7],firstGreaterThan,0));
console.log(reduce([2,3,10,5,94,5,7],firstGreaterThan,0));