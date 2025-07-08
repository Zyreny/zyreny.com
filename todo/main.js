// todos_block
const block = document.getElementsByClassName("todos_block"); 
let doneBtn; 
let resetBtn; 
let deleteBtn; 


// click event listner
block[0].addEventListener("click", (e) => {
    let todo_P = e.target.parentElement.childNodes[1]; 
    doneBtn = document.querySelectorAll("[DoneBtn]"); 
    resetBtn = document.querySelectorAll("[ResetBtn]"); 
    deleteBtn = document.querySelectorAll("[DeleteBtn]"); 

    // DoneBtn
    for (let i = 0; i < doneBtn.length; i++){
        if (e.target == doneBtn[i]) {
            todo_P.style.textDecoration = "line-through"; 
            todo_P.style.color = "rgb(40, 40, 40)"; 
            doneBtn[i].style.display = "none"; 
            resetBtn[i].style.display = "inline-block"; 
        }
    }

    // ResetBtn
    for (let i = 0; i < resetBtn.length; i++) {
        if (e.target == resetBtn[i]) {
            todo_P.style.textDecoration = "none"; 
            todo_P.style.color = "rgb(32, 83, 73)"; 
            doneBtn[i].style.display = "inline-block"; 
            resetBtn[i].style.display = "none"; 
        }
    }

    // DeleteBtn
    for (let i = 0; i < deleteBtn.length; i++) {
        if (e.target == deleteBtn[i]) {
            todoitems--;  
            e.target.parentElement.remove(); 
            todoList.splice(i, 1); 
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
    }

})

