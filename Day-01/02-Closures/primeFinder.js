/*function isPrime(n){
    console.log("Processing ", n);
    if (n <= 3) return true;
    for(var i=2; i<=(n/2); i++)
        if (n % 2 === 0) return false;
    return true;
}*/

//Write a function that checks if the given number is a prime number or not.
//The function SHOULD NOT recalculate again and again if the same number is given as input
//If a number is processed once, the function should maintain the resulf of the given number in a cache and return the result from the cache

function checkPrime(){
    function isPrime(n){
        console.log("Processing ", n);
        if (n <= 3) return true;
        for(var i=2; i<=(n/2); i++)
            if (n % 2 === 0) return false;
        return true;
    }
    var cache = {};
    return function(n){
        if (typeof cache[n] === "undefined")
            cache[n] = isPrime(n);
        return cache[n];
    }
}

var primeChecker = checkPrime();


/************************************************************/
function memoize1(fn){
    var cache = {};
    return function(n){
        if (typeof cache[n] === "undefined")
            cache[n] = fn(n);
        return cache[n];
    }
}
function evenFinder = memoize1(function(n){
    console.log("processing ", n);
    return n % 2 === 0;
});



function memoize2(fn){
    var cache = {};
    return function(x,y){
        var key = x + "-" + y;
        if (typeof cache[key] === "undefined")
            cache[key] = fn(x,y);
        return cache[key];
    }
}

var memoizedAdd = memoize2(function(x,y){
    console.log("processing ", x , " and ", y);
    return x + y;
});

function memoize(fn){
    var cache = {};
    return function(){
        var key = JSON.stringify(arguments);
        if (typeof cache[key] === "undefined")
            cache[key] = fn.apply(this,arguments);
        return cache[key];
    }
}

