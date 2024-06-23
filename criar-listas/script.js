const minus = document.querySelector(".minus")
const max = document.querySelector(".max")
const n = document.querySelector(".n")

minus.addEventListener("click", function(){
    if(n.value>1){
        n.value -= 1
    }
    total()
})
max.addEventListener("click", function(){
    (n.value) ++ 
    total()
})

const valor = document.querySelector(".valor")
function total(){
    valor.innerHTML =120*  n.value
}

const remove = document.querySelector(".remove")
