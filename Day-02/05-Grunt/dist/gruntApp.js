function doWork(){
    for(var i=0; i<10000; i++){
        for(var j=0; j<10000; j++)
            for(var k=0; k<100; k++){}
        if (i % 100 === 0){
            var percentCompleted = (i / 10000) * 100;
            var response = {
                type : 'progress',
                percentCompleted : percentCompleted
            };
            self.postMessage(response);
        }
    }
}
function triggerWork(){
    doWork();
    console.log("job done");
    var response = {
        type : "completed"
    };
    self.postMessage(response);
}

self.addEventListener("message", function(evtArg){
    var reqData = evtArg.data;
    if (reqData.type === "start"){
        triggerWork();
    } else {
        console.log("unknown message from caller ", evtArg.data);
    }
});
;/*
sortBy
filter
min
max
sum
countBy
some
all
groupBy
*/

var products = [
    {id : 3, name : 'Pen', cost : 50, units : 70, category : 10},
    {id : 6, name : 'Hen', cost : 80, units : 80, category : 20},
    {id : 8, name : 'Ten', cost : 30, units : 40, category : 10},
    {id : 2, name : 'Den', cost : 70, units : 50, category : 20},
    {id : 4, name : 'Zen', cost : 60, units : 20, category : 10}
];

function describe(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

describe("default list", function(){
    console.table(products);
});

describe("sort", function(){
    describe("Default [Products By Id]", function(){
        function sort(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i + 1; j<products.length; j++)
                    if (products[i].id > products[j].id){
                        var temp = products[i];
                        products[i] = products[j];
                        products[j] = temp;
                    }
        }
        sort();
        console.table(products);
    });
    describe("Generic Sort", function(){
        describe("By Attribute", function(){
            function sort(list, attrName){
                for(var i=0; i<list.length-1; i++)
                    for(var j=i + 1; j<list.length; j++)
                        if (list[i][attrName] > list[j][attrName]){
                            var temp = list[i];
                            list[i] = list[j];
                            list[j] = temp;
                        }
            }

            describe("Product By Cost", function(){
                sort(products, "cost");
                console.table(products);
            });
             describe("Product By Units", function(){
                sort(products, "units");
                console.table(products);
            });
        });
    });
    describe("By Any Comparison", function(){
            function sort(list, comparerFn){
                for(var i=0; i<list.length-1; i++)
                    for(var j=i + 1; j<list.length; j++)
                        if (comparerFn(products[i], products[j]) > 0){
                            var temp = list[i];
                            list[i] = list[j];
                            list[j] = temp;
                        }
            }
            var productComparerByValue = function(p1, p2){
                var p1Value = p1.units * p1.cost,
                    p2Value = p2.units * p2.cost;
                if (p1Value < p2Value) return -1;
                if (p1Value === p2Value) return 0;
                return 1;
            };
            describe("Product By Value [units * cost]", function(){
                sort(products, productComparerByValue);
                console.table(products);
            });
    });
});

describe("filter", function(){
    describe("All costly products", function(){
       function filterAllCostlyProducts(){
           var result = [];
           for(var i=0; i<products.length; i++)
               if (products[i].cost > 50)
                   result.push(products[i]);
           return result;
       }
       var costlyProducts = filterAllCostlyProducts();
       console.table(costlyProducts);
    });
    describe("Generic Filter", function(){
       function filter(list, criteriaFn){
           var result = [];
           for(var i=0; i<list.length; i++)
               if (criteriaFn(products[i]))
                   result.push(products[i]);
           return result;
       }
       var costlyProductCriteria = function(product){
           return product.cost > 50;
       };



       describe("Costly Products", function(){
           var costlyProducts = filter(products, costlyProductCriteria);
           console.table(costlyProducts);
       });
       function negate(criteria){
           return function(){
               return !criteria.apply(this, arguments);
           };
       }
       /*var affordableProductCriteria = function(product){
           return !costlyProductCriteria(product);
       };*/
       var affordableProductCriteria = negate(costlyProductCriteria);

       describe("Affordable Products", function(){
           var affordableProducts = filter(products, affordableProductCriteria);
           console.table(affordableProducts);
       });

       var category10ProductCriteria = function(product){
           return product.category === 10;
       };
       describe("Category 10 products", function(){
           var category10Products = filter(products, category10ProductCriteria);
           console.table(category10Products);
       });

       /*var nonCategory1ProductCriteria = function(product){
           return !category1ProductCriteria(product);
       };*/
       var nonCategory10ProductCriteria = negate(category10ProductCriteria);

       describe("Non Category 10 products", function(){
           var nonCategory10Products = filter(products, nonCategory10ProductCriteria);
           console.table(nonCategory10Products);
       });
    });
});

describe("some", function(){
    function some(list, predicate){
        for(var i=0; i<list.length; i++)
            if (predicate(list[i])) return true;
        return false;
    }
    console.log("Are there any costly products ? :", some(products, function(p){
        return p.cost > 50;
    }));
});

describe("all", function(){
    function all(list, predicate){
        for(var i=0; i<list.length; i++)
            if (!predicate(list[i])) return false;
        return true;
    }
    console.log("Are all products costly ? :", all(products, function(p){
        return p.cost > 50;
    }));
});

describe("group by", function(){
    function groupBy(list, keySelectorFn){
        var result = {};
        for(var i=0; i<list.length; i++){
            var key = keySelectorFn(list[i]);
            result[key] = result[key] || [];
            result[key].push(list[i]);
        }
        return result;
    }
    function printGroup(groupedObj){
        var display = function(groupedObj){
            return function(){
                console.table(groupedObj[key]);
            };
        };
        for(var key in groupedObj){
            describe("Key - " + key, display(groupedObj));
        }
    }

    describe("products by category", function(){
        var categoryKeySelector = function(product){
            return product.category;
        };
        var productsByCategory = groupBy(products, categoryKeySelector);
        printGroup(productsByCategory);
    });

    describe("products by cost", function(){
        var keySelectorByCost = function(product){
            return product.cost > 50 ? "costly" : "affordable";
        };
        var productsByCost = groupBy(products, keySelectorByCost);
        printGroup(productsByCost);
    });

});

describe("min", function(){
    function min(list, valueSelector){
        var result = valueSelector(list[0]);
        for(var i=1; i<list.length; i++){
            var value = valueSelector(list[i]);
            if (value < result) result = value;
        }
        return result;
    }
    console.log("Min cost = ", min(products, function(p){ return p.cost; }));
});

var x = 10;

