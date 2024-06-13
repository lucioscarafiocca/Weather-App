export {todo}
export {project}
export {headerButton}
export {data}
import { dialogForEdit } from "./dom"
import { dialog } from './dom'

function todo (code,button) {
    button.addEventListener("click", (event) => {
        event.preventDefault()
        const dialog = code.firstChild
        const form = (dialog.lastChild).children
        const title = form.item(0).lastChild.value
        const description = (form.item(1)).lastChild.value
        const date =  form.item(2).lastChild.value
        const priority = form.item(3).lastChild.value
        dialog.close()
        createTodo(code)
        const todo = code.lastChild
        text(title,"hello",todo)
        text(date,"time",todo)
        check(todo)
        editButton(title,description,date,priority,todo)
        data(code).saveData()
    })
}

function createTodo (value) {
    const parent = value
    const div = document.createElement("div")
    div.classList.toggle("todo")
    parent.appendChild(div)
    
}

function text (type,code,parent) {
    if (code == "time") {
    const p = document.createElement("p")
    p.textContent = calcTime(type)
    parent.appendChild(p)
    }
    else {
    const p = document.createElement("p")
    p.textContent = type
    parent.appendChild(p) }
}

function check (parent) {
    const input= document.createElement("input")
    input.setAttribute("type","checkbox")
    input.setAttribute("id","todo-status")
    input.setAttribute("name","todo-status")
    parent.appendChild(input)
}

function editButton (a,b,c,d,parent) {
    const button = document.createElement("button")

    button.addEventListener("click", () => {
        const check = test(parent)
        if (check.dialog.textContent ==  "Edit") {
        dialogForEdit.a(a,b,c,d,parent)
        } else {
            dialogForEdit.b.a(test(parent).dialog)
        }
    
       
    })
    button.textContent = "Edit"
    parent.appendChild(button)
}

const test = function (parent) {
    
        const div = parent.lastElementChild
        const dialog = div.firstChild
        
        return {dialog}
    
}

function calcTime (input) {
    const date1 = new Date(input)
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffHours = Math.round(diffTime /  3600000)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffHours >= 24 & isNaN(diffDays) != true) {
        return (diffDays +  " days left");
    }
    else if (isNaN(diffHours) != true) {
        return (diffHours + " hours left")
    } else {return ""}
    
}

function project () {
    const project = document.querySelector(".project1")
    project.addEventListener("click", () => {
        const div = document.querySelector(".container")
        hideDivs("container")
    })
}

function createProject (value) {
    const header = document.querySelector(".header")
    const div = document.createElement("div")
    const p = document.createElement("p")
    p.textContent = value
    div.appendChild(p)
    header.appendChild(div)
    div.addEventListener("click", () => {
        hideDivs(value)
    })
    
}

function headerButton () {
    const parent = document.querySelector(".header")
    const button = document.createElement("button")
    button.textContent = "Create New Project"
    button.addEventListener("click", () => {
        const value = prompt("Enter Project Name")
        createProject(value)
        changeProjects(value)
    })
    parent.appendChild(button)
}

function changeProjects (value) {
    const parent = document.querySelector(".projects")
    const div = document.createElement("div")
    div.classList.toggle(value)
    parent.appendChild(div)
    dialog(div)
    todo(div,getButton(div))
    hideDivs(value)

}

function hideDivs (value) {
    const projectContainer = document.querySelector(".projects")
    const projects = Array.from(projectContainer.childNodes)
    const ourProject = document.querySelector(`.${value}`)
    const ourProjectIndex = projects.indexOf(ourProject)
    projects.splice(ourProjectIndex,1)
    projects.forEach((element) => {element.style.display = "none"})
    ourProject.style.display = "block"
}

function getButton (div) {
    const dialog = div.firstChild
    const form = dialog.lastChild
    const button = form.lastChild

    return button
}

const data = function (code) {
    const saveData = function () {
    let values = code.outerHTML 
    localStorage.setItem("todos",values)
    }

    const loadData = function () {
   let value = localStorage.getItem("todos")
    code.innerHTML = value

    let children = code.firstChild.children
    let dialog = children.item(0)
    let button = children.item(1)
    let todo =  children.item(2)
    button.addEventListener("click", () => {
        dialog.showModal()
    })
    let submitButton = dialog.lastChild.lastChild
    todo(code.firstChild,submitButton)
}
  return {saveData,loadData}
} 