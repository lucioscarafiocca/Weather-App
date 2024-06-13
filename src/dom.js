export {dialog,dialogForEdit}

function firstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const toDoButton = function (value) {
    
    const parent = value
    const button = document.createElement("button")
    button.classList.toggle("but")
    button.textContent = "Create ToDo"
    parent.appendChild(button)

}

function dialog (value) {
    const parent = value
    const dialog = document.createElement("dialog")
    const form = document.createElement("form")

    const button = document.createElement("button")
    button.textContent = "Close"
    button.classList.toggle("close")
    dialog.appendChild(button)
    
    parent.appendChild(dialog)
    dialog.appendChild(form)
    addToDialogRequired("title","text",form)
    addToDialog("description","text",form)
    addToDialog("date","datetime-local",form)
    addToDialog("priority","color",form)

    toDoButton(value)
    const showButton = parent.lastChild
    dialogButton(dialog,showButton,button)
    submitDialog(form)
    
}

function addToDialog(title,type,form) {
    const div = document.createElement("div")
    const label = document.createElement("label")
    label.setAttribute("for",`${title}`)
    label.textContent = `${firstLetter(title)}:`
    div.appendChild(label)

    const input= document.createElement("input")
    input.setAttribute("class",`${title}`)
    input.setAttribute("id",`${title}`)
    input.setAttribute("name",`${title}`)
    input.setAttribute("type",`${type}`)
    div.appendChild(input)

    form.appendChild(div)
}

function dialogButton (dialog,showButton,closeButton) {
    // "Show the dialog" button opens the dialog modally
    showButton.addEventListener("click", () => {
    dialog.showModal();
    });

    // "Close" button closes the dialog
    closeButton.addEventListener("click", () => {
    dialog.close();
    });
}

function submitDialog(form) {
    const button = document.createElement("button")
    button.classList.toggle("submit")
    button.textContent = "Submit";
   
    form.appendChild(button)
}

const dialogForEdit = function () {

    const a = function (title,desc,date,prio,parent) {
    const dialog = document.createElement("dialog")
    const div = document.createElement("div")
    const form = document.createElement("form")

    parent.appendChild(div)
    div.appendChild(dialog)
    dialog.appendChild(form)
    const titles = addToDialogEdit("title","text",`${title}`)
    const descs = addToDialogEdit("description","text",`${desc}`)
    const dates = addToDialogEdit("date","datetime-local",`${date}`)
    const prios = addToDialogEdit("priority","color",`${prio}`)

    
    form.appendChild(titles)
    form.appendChild(descs)
    form.appendChild(dates)
    form.appendChild(prios)

    dialog.showModal()
    dialogSubmit(parent)
    deleteButton(parent)
    }
   
    const b = function () {
        const a = function (dialog)  {
           dialog.showModal()
        
        }

        const b = (change) => {
            dialog = change
        }
        return {a,b}
    }()


    return {a,b}
   
    
}()

function addToDialogEdit(title,type,value) {
    const div = document.createElement("div")
    const label = document.createElement("label")
    label.setAttribute("for",`${title}`)
    label.textContent = `${firstLetter(title)}:`
    div.appendChild(label)

    const input= document.createElement("input")
    input.setAttribute("class",`${title}`)
    input.setAttribute("id",`${title}`)
    input.setAttribute("name",`${title}`)
    input.setAttribute("type",`${type}`)
    input.setAttribute("value",`${value}`)
    div.appendChild(input)

    return div
}

function dialogSubmit (parent) {
    const button = document.createElement("button")
    const dialog = (parent.lastElementChild).firstChild
    const form = dialog.firstChild
    button.textContent = "Close"
    form.appendChild(button)

    

    button.addEventListener("click", (event) => {
        event.preventDefault()
        const form = dialog.firstChild
        const div = form.firstChild
        const input = div.lastChild
        const title = input.value
         const formChildren = form.children
         const divTime = formChildren.item(2)
         const time = (divTime.lastChild).value
         const titleTodo = parent.firstChild
         const timeTodo = (parent.children).item(1)
         timeTodo.textContent = calcTime(time)
         titleTodo.textContent = title
         dialog.close()
    })
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

function addToDialogRequired(title,type,form) {
    const div = document.createElement("div")
    const label = document.createElement("label")
    label.setAttribute("for",`${title}`)
    label.textContent = `${firstLetter(title)}:`
    div.appendChild(label)

    const input= document.createElement("input")
    input.setAttribute("class",`${title}`)
    input.setAttribute("id",`${title}`)
    input.setAttribute("name",`${title}`)
    input.setAttribute("type",`${type}`)
    input.setAttribute("required", "")
    div.appendChild(input)

    form.appendChild(div)
}

function deleteButton (parent) {
    const button = document.createElement("button")
    const dialog = (parent.lastElementChild).firstChild
    const form = dialog.firstChild
    button.textContent = "Delete ToDo"
    form.appendChild(button)

    button.addEventListener("click",() => {
        parent.remove()
    })
}

