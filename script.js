
let history = document.querySelector(".history");
let result = document.querySelector(".result");

function num(x){
    
    history.innerHTML += x;
     

}   

function decimal(z){

    history.innerHTML += z ;
    if(history.innerHTML == z){
        z = ""
    }

}
   
function operator(y){

    history.innerHTML += y;
    
    if (result.innerHTML > 0) {
        history.innerHTML = result.innerHTML;
        history.innerHTML += y;
        result.innerHTML= "";
    }
}

function remove(){
    
    history.innerHTML = "";
    result.innerHTML = "";
    
    
    
}

function backSpace(){
    
    history.innerHTML = history.innerHTML.substr(0,history.innerHTML.length-1);
}

function calculate(){
    var x = history.innerHTML;
    var x = eval( x );
    result.innerHTML = formattedNumber(x);
    function formattedNumber(x) {
        let n = Number(x);
        let value = n.toLocaleString("en");
        return value = x;
    
    } 

    if(x>0){
        history.innerHTML = "";
    }
}
