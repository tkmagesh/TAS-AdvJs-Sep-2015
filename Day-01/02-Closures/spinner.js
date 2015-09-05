/*
Create an object assign it to a variable "spinner"
var spinner = ...

The object should exhibit the following behaviors

spinner.up() //=> 1
spinner.up() //=> 2
spinner.up() //=> 3
spinner.up() //=> 4

spinner.down() //=> 3
spinner.down() //=> 2
spinner.down() //=> 1
spinner.down() //=> 0
spinner.down() //=> -1

The variable that is used to track the count value should NOT be accessed from outside

*/

//Step - 1
var count = 0;
function up(){
    return ++count;
}
function down(){
    return --count;
}


//Step - 2
function(){
    var count = 0;
    function up(){
        return ++count;
    }
    function down(){
        return --count;
    }
}

//Step-3
function(){
    var count = 0;
    function up(){
        return ++count;
    }
    function down(){
        return --count;
    }

    return {
        up :up,
        down : down
    }
}

//Step - 4
function getSpinner(){
    var count = 0;
    function up(){
        return ++count;
    }
    function down(){
        return --count;
    }

    return {
        up :up,
        down : down
    }
}
var spinner = getSpinner();

