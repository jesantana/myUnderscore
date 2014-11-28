//ALmost all of the functional version of this functions use tail recursion. Thanks to this and to the closure functionality it is possible to declare the internal vars (counters and accumulators) as local variables instead of needing to pass them in each function call as we did in imperative programming

function each(list,funct){
	var currentIndex=0;
	
	function each(list,funct){
		
		if(currentIndex<list.length){
			funct(list[currentIndex]);
			++currentIndex;
			each(list,funct);
		}
	}
	
	each(list,funct);
}



function map(list, funct){
	
	var resultList=[];
	
	function addToList(elem){
		resultList.push(funct(elem));
	}
	
	each(list,addToList);
	return resultList;
}

function reduceFunctional(list,funct,memo){
	var currentIndex=0;	
	function reduce(list,funct,memo){
		if(currentIndex<list.length){
			var currentMemo=funct(list[currentIndex],memo);
			++currentIndex;
			return reduce(list,funct,currentMemo);
		}
		return memo;
	}
	
	return reduce(list,funct,memo);
}

function reduce(list,funct,memo){
		
	var internalMemo=memo;
	
	function applyReduceToSingleElement(element){
		internalMemo=funct(element,internalMemo);
	}
	
	each(list,applyReduceToSingleElement);
	return internalMemo;	
}


function reverseFunctional(list){
	var currentIndex=0;
	var currentArray=[];
	
	function reverse(list){
		if(currentIndex<list.length){
			currentArray=[list[currentIndex]].concat(currentArray);
			currentIndex++;
			reverse(list);
		}
	}
	
	reverse(list);
	return currentArray;
}


function reverse(list){

	function reverseSingleElement(currentElement,memo){
		return [currentElement].concat(memo);
	}
	
	return reduce(list,reverseSingleElement,[]);;
}

function reduceRight(list,funct,memo){
	return reduce(reverse(list),funct,memo);
}


//Pensar en otro reduce