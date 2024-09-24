const input = document.getElementById("put");
const lista = document.getElementById("lista-container");

function AddTask() {
    if (input.value === '') {
        alert("Campo em branco");
    } else {
        let li = document.createElement("li");
        li.classList.add('item-list');
        li.innerHTML = input.value;
        lista.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    input.value = "";
    saveData();
}

lista.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData()

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function saveData() {
    localStorage.setItem("data", lista.innerHTML);
}
function showTask() {
    lista.innerHTML = localStorage.getItem("data");
}