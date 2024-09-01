const tareasElement = document.getElementById("tareas");
const listaTareas = document.getElementById("listaTareas");
const realizadas = document.getElementById("realizadas");
const tareasBtn = document.getElementById("tareasBtn");
const btnVaciarTareas = document.getElementById("btnVaciarTareas");
const btnVaciarRealizadas = document.getElementById("btnVaciarRealizadas");

// Cargar tareas desde localStorage
document.addEventListener("DOMContentLoaded", () => {
    cargarTareas();
});

tareasBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let tarea = tareasElement.value;

    if (tarea.trim() !== "") {
        const li = crearTareaElemento(tarea, false);
        listaTareas.appendChild(li);
        tareasElement.value = "";
        guardarTareas();
    }
});

btnVaciarTareas.addEventListener("click", () => {
    listaTareas.innerHTML = "";
    guardarTareas();
});

btnVaciarRealizadas.addEventListener("click", () => {
    realizadas.innerHTML = "";
    guardarTareas();
});

function crearTareaElemento(tarea, completada) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = tarea;
    
    // Botón tarea realizada
    if (!completada) {
        const agregarBtn = document.createElement("button");
        agregarBtn.innerText = "✅";
        agregarBtn.classList.add("agregar-btn");
    
        agregarBtn.addEventListener("click", () => {
            realizadas.appendChild(li);
            agregarBtn.remove();
            guardarTareas();
        });
        li.appendChild(agregarBtn); 
    }
    
    // Botón eliminar tarea
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.classList.add("delete-btn");
    
    deleteBtn.addEventListener("click", () => {
        if (li.parentElement === listaTareas) {
            listaTareas.removeChild(li);
        } else if (li.parentElement === realizadas) {
            realizadas.removeChild(li);
        }
        guardarTareas();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

function guardarTareas() {
    const tareas = [];
    listaTareas.querySelectorAll("li").forEach((li) => {
        tareas.push({ text: li.querySelector("span").innerText, completada: false });
    });
    realizadas.querySelectorAll("li").forEach((li) => {
        tareas.push({ text: li.querySelector("span").innerText, completada: true });
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.forEach((tarea) => {
        const li = crearTareaElemento(tarea.text, tarea.completada);
        if (tarea.completada) {
            realizadas.appendChild(li);
        } else {
            listaTareas.appendChild(li);
        }
    });
}
