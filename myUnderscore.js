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

function reduceRightFunctional(list,funct,memo){
	var currentIndex=list.length-1;	
	function reduceRight(list,funct,memo){
		if(currentIndex>=0){
			var currentMemo=funct(list[currentIndex],memo);
			--currentIndex;
			return reduceRight(list,funct,currentMemo);
		}
		return memo;
	}
	
	return reduceRight(list,funct,memo);
}

function reduceRight(list,funct,memo){
	return reduce(reverse(list),funct,memo);
}

function some(list,predicate){
	var currentIndex=0;
	
	function some(){
		if(currentIndex<list.length){
			return predicate(list[currentIndex])?list[currentIndex]:(++currentIndex,some());
		}
		return {};
	}
	
	return some();
}

function find(list,elem){
	var currentIndex=0;
	
	
	function findRecursive(list,elem){
		if(currentIndex<list.length){
			return list[currentIndex]==elem?currentIndex:(++currentIndex,findRecursive(list,elem));
		}
		return -1;
	}
	
	return findRecursive(list,elem);
}

function findFunctional(list,elem){
	var index=0;
	
	function testIfCurrentEqualsElement(current,memo){
		if(memo===-1){
			var result=index++;
			return current===elem?result:memo;
		}
		return memo;
	}
	
	return reduce(list,testIfCurrentEqualsElement,-1);
}


function where(list,properties){

	function addObjectToListIfPropertiesPresent(currentObj,memo){
		for(var props in properties){
			if(currentObj[props]===undefined || currentObj[props]!==properties[props]){
				return memo;
			}
		}
		
		return memo.concat(currentObj);
	}
	
	return reduce(list,addObjectToListIfPropertiesPresent,[]);
}


function findWhere(list,properties){

	function testIfObjectHaveAllProperties(currentObj){
		for(var props in properties){
			if(currentObj[props]===undefined || currentObj[props]!==properties[props]){
				return false;
			}
		}
		return true;
	}
	
	return some(list,testIfObjectHaveAllProperties);
}

function filter(list,predicate){
	
	function filter(element,memo){
		if(predicate(element)){
			return memo.concat(element)
		}
		else{
			return memo
		}
	}
	
	return reduce(list,filter,[]);
}

function reject(list,predicate){
	
	function reject(element,memo){
		return predicate(element)?memo:memo.concat(element);
	}

	return reduce(list,reject,[]);
}


function rejectFilterBased(list,predicate){
	
	function inversePredicate(element){
		return !predicate(element);
	}

	return filter(list,inversePredicate);
}


function every(list,predicate){

	function testCurrent(elem,memo){
		return memo && predicate(elem);
	}
	
	return reduce(list,testCurrent,true);
}

function everyBasedOnMap(list,predicate){
	var overAllResult=true;
	
	function testCurrent(elem){
		overAllResult=overAllResult && predicate(elem);
	}
	
	each(list,testCurrent);
	return overAllResult;
}

function invoke(list,methodName){
	var argo=Array.prototype.slice.call(arguments, 2);
	
	function invokeOnCurrent(element){
		element[methodName].apply(element,argo);
	}
	
	each(list,invokeOnCurrent);
}

function pluck(list,propertyName){
	
	function evaluateSingle(element){
		return element[propertyName]();
	}
	
	return map(list,evaluateSingle);
}

