// Add Todo 
let todoList = []; 
const addTodoBtn = document.querySelector("[addTodoBtn]"); 
let addTodoInput = document.querySelector("[addTodoInput]"); 
let todoitems = 0; 
let todoText; 
let todoText_trim; 

document.addEventListener("DOMContentLoaded", function() {
    const storedTodos = JSON.parse(localStorage.getItem("todoList"));
    if (storedTodos) {
        todoList = storedTodos;
        todoList.forEach(todo => {
            document.querySelector(".todos_block").innerHTML += `
            <div todos>
                <p TodoText>${todo}</p>
                <img src="File/Done_icon.png" type="button" DoneBtn>
                <img src="File/Reset_icon.png" type="button" ResetBtn>
                <img src="File/Delete_icon.png" type="button" DeleteBtn>
            </div>
            `;
        });
    }
});

function chardetect(lang, maxCahr) {
    if (langdetect(todoText) == lang && todoText.length > maxCahr) {
        return true; 
    }
    else {
        return false; 
    }; 
}; 

addTodoBtn.addEventListener("click", function () {
    todoText = addTodoInput.value; 
    todoText_trim = todoText.trim(); 

    if (todoText_trim == "") {
        alert("Please Enter a Value"); 
    }
    else if (todoList.indexOf(todoText) != -1) {
        alert(`"${todoText}" Already Exist in the List`); 
        addTodoInput.value = ""; 
    }
    else if (chardetect("eng", 60)) {
        console.log("eng"); 
        alert("The maximum length of the todo is 60 characters"); 
    }
    else if (chardetect("cmn", 35)) {
        console.log("cmn"); 
        alert("最大字數限制為35個字"); 
    }
    else if (chardetect("bop", 35)) {
        console.log("bop"); 
        alert("最大字數限制為35個字"); 
    }
    else if (chardetect("jpn", 35)) {
        console.log("jpn"); 
        alert("最大文字数制限は35文字です"); 
 
    }
    else if (chardetect("krn", 35)) {
        console.log("krn"); 
        alert("최대 글자 수 제한은 35자입니다"); 
    }
    else if (chardetect("unknow", 35)) {
        alert("The maximum length of the todo is 35 characters"); 
    }
    else {
        todoitems++; 
        todoList.push(addTodoInput.value); 
        localStorage.setItem("todoList", JSON.stringify(todoList)); 
        addTodoInput.value = ""; 
        document.querySelector(".todos_block").innerHTML += `
        <div todos>
            <p TodoText>${todoText}</p>
            <img src="File/Done_icon.png" type="button" DoneBtn>
            <img src="File/Reset_icon.png" type="button" ResetBtn>
            <img src="File/Delete_icon.png" type="button" DeleteBtn>
        </div> 
        `
    }; 
});

function langdetect(text) {
    if (/[\u4e00-\u9fff]/.test(text)) { 
        return "cmn"; 
    }
    else if (/[\u3100-\u312F]/.test(text)) { 
        return "bop"
    }
    else if (/[\u3040-\u30ff]/.test(text)) { 
        return "jpn"; 
    }
    else if (/[\uAC00-\uD7FF]/.test(text)) { 
        return "krn"; 
    }
    else if (/[a-zA-Z]/.test(text)) { 
        return "eng"; 
    }
    else { 
        return "unknow"; 
    }
}
