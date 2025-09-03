document.addEventListener("DOMContentLoaded", () => {
const toDoList = document.getElementById("todolist");
const addBtn = document.getElementById("addSquareTODO");
const carrer = document.getElementById("squareTODO");
const addSquareScreen = document.getElementById("addSquareScreen");
const input = document.getElementById("thingToDo");
const addThingToDoBtn = document.getElementById("addThingToDo");
const cancelBtn = document.getElementById("cancelBtn");
const toblur = document.querySelectorAll(".toblur");
const checkToDo = document.getElementById("checkToDo");
const listDone = document.getElementById("listDone");
const deleteBtn = document.querySelectorAll(".delete-btn");
const modifyBtn = document.querySelectorAll(".modify-btn");


let menu = true;
let listToDo = [];
let doneList = [];

const addTaskToDOM=(task)=>{
    toDoList.insertAdjacentHTML("beforeend", `<li class="squareTODO">
        <input type="checkbox">
        <span>${task}</span>
        <button class="btn1 modify-btn">MODIFY</button>
        <button class="btn1 delete-btn">DELETE</button>
        </li>`);
};
const addTaskToDOMINGO=(task)=>{
    listDone.insertAdjacentHTML("beforeend",`<li class="squareTODO">
        <input type="checkbox">
        <span class="done">${task}</span>
        <button class="btn1 modify-btn">MODIFY</button>
        <button class="btn1 delete-btn">DELETE</button>
        </li>`);
};
window.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"&&menu){
    addBtn.click();
    menu= false;}
});
window.addEventListener("keydown",(e)=>{
    if(e.key==="Escape"){
    cancelBtn.click();
    }
});
addBtn.addEventListener("click",()=>{
    toblur.forEach(el=>el.style.filter = "blur(5px)")
    addSquareScreen.style.display = "block";
    input.focus();
});
input.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        addThingToDoBtn.click();
    }
})

cancelBtn.addEventListener("click",()=>{
    input.value = "";
    toblur.forEach(el=>el.style.filter = "none");
    addSquareScreen.style.display ="none";
    setTimeout(()=>menu = true ,1000);
});

addThingToDoBtn.addEventListener("click",()=>{
    if(input.value===""){
        alert("please write something before adding");
    }
    else{
        addTaskToDOM(input.value)
        listToDo.push(input.value);
        localStorage.setItem("listToDo",JSON.stringify(listToDo));
        addSquareScreen.style.display ="none";
        toblur.forEach(el=>el.style.filter = "none");
        input.value = "";
        setTimeout(()=>menu = true,1000)
    }
})

toDoList.addEventListener("change",(e)=>{
    if(e.target.matches('input[type="checkbox"]')){
        const li = e.target.parentElement;
        const text = li.querySelector("span").textContent;
        if (e.target.checked){
            li.querySelector("span").classList.add("done");
            listDone.appendChild(li);
            listToDo = listToDo.filter(task => task !== text);
            doneList.push(text);
            localStorage.setItem("listToDo",JSON.stringify(listToDo));
            localStorage.setItem("doneList",JSON.stringify(doneList));
        }
    }
})
listDone.addEventListener("change",(e)=>{
    if(e.target.matches('input[type="checkbox"]')){
        const li = e.target.parentElement;
        const text = li.querySelector("span").textContent;
        if (!e.target.checked){
            li.querySelector("span").classList.remove("done");
            toDoList.appendChild(li);
            doneList = doneList.filter(task => task !== text);
            listToDo.push(text);
            localStorage.setItem("doneList",JSON.stringify(doneList));
            localStorage.setItem("listToDo",JSON.stringify(listToDo));
        }
    }
})

toDoList.addEventListener("click", (e) => {
  const li = e.target.closest("li"); // récupère le li parent
  const text = li.querySelector("span").textContent;
  if (e.target.classList.contains("delete-btn")) {
    li.remove();
    listToDo=listToDo.filter(task => task !== text);
    doneList=doneList.filter(task => task !== text);
    localStorage.setItem("listToDo",JSON.stringify(listToDo));
    localStorage.setItem("doneList",JSON.stringify(doneList));
  }
  if (e.target.classList.contains("modify-btn")) {
    const newText = prompt("Modifier la tâche :", text);
    if (newText) li.querySelector("span").textContent = newText;
        listToDo = listToDo.map(task => task === text ? newText : task);
        localStorage.setItem("listToDo",JSON.stringify(listToDo));
  }
})
listDone.addEventListener("click", (e) => {
  const li = e.target.closest("li"); // récupère le li parent
  const text = li.querySelector("span").textContent;
  if (e.target.classList.contains("delete-btn")) {
    li.remove();
    listToDo=listToDo.filter(task => task !== text);
    doneList=doneList.filter(task => task !== text);
    localStorage.setItem("listToDo",JSON.stringify(listToDo));
    localStorage.setItem("doneList",JSON.stringify(doneList));
  }
  if (e.target.classList.contains("modify-btn")) {
    const newText = prompt("Modifier la tâche :", text);
    if (newText) li.querySelector("span").textContent = newText;
        doneList = doneList.map(task => task === text ? newText : task);
        localStorage.setItem("doneList",JSON.stringify(doneList));
    }
  })

window.onload= function (){
    let savedTasks = localStorage.getItem("listToDo");
    if (savedTasks){
        listToDo = JSON.parse(savedTasks);
        listToDo.forEach(task => addTaskToDOM(task));
    }
    let savedTasksDone = localStorage.getItem("doneList");
    if (savedTasksDone){
        doneList = JSON.parse(savedTasksDone);
        doneList.forEach(task => addTaskToDOMINGO(task));
    }
}
});