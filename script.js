const tareasElement = document.getElementById("tareas");
const listaTareas = document.getElementById("listaTareas");
const realizadas = document.getElementById("realizadas");
const tareasBtn = document.getElementById("tareasBtn");
const btnVaciarTareas = document.getElementById("btnVaciarTareas");
const btnVaciarRealizadas = document.getElementById("btnVaciarRealizadas");


tareasBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let tarea = tareasElement.value;

    if (tarea.trim() !== "") {

        const li = document.createElement("li");
        const span = document.createElement("span");
        span.innerText = tarea;
        
        //boton tarea realizada
        const agregarBtn = document.createElement("button");
        agregarBtn.innerText = "✅";
        agregarBtn.classList.add("agregar-btn");
        
        agregarBtn.addEventListener("click", () => {
            realizadas.appendChild(li);
            agregarBtn.remove();
            

        });
            
        
       
        // boton eliminar tarea
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.classList.add("delete-btn");
        
        deleteBtn.addEventListener("click", () => {
            if (li.parentElement === listaTareas) {
                listaTareas.removeChild(li);
            } else if (li.parentElement === realizadas) {
                realizadas.removeChild(li);
            }
        });
        

        li.appendChild(span);
        li.appendChild(agregarBtn); 
        li.appendChild(deleteBtn);
        listaTareas.appendChild(li);
        tareasElement.value = "";
    }
});

btnVaciarTareas.addEventListener("click", () => {
    while (listaTareas.firstChild) {
        listaTareas.removeChild(listaTareas.firstChild);
    }
});
    

btnVaciarRealizadas.addEventListener("click", () => {
    while (realizadas.firstChild) {
        realizadas.removeChild(realizadas.firstChild);
    }
});




    