/*
function name starts with an uppercase
the function is invoked using "new"
this -> new object
/this/ is returned by default
*/

function Employee(id, name, salary){
    this.id = id;
    this.name = name;
    this.salary = salary;

}
Employee.prototype.display = function(){
    console.log(this.id, this.name, this.salary);
}
