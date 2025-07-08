const WDInput = document.querySelector(".wordCountInput"); 
const GroupsInput = document.querySelector(".groupsInput"); 

function valueCOW(object, minNum, maxNum) {
        if (Number(object.value) > maxNum || Number(object.value) < minNum) {
            object.style.border = "5px solid rgb(80, 6, 6)"; 
            object.style.backgroundColor = "rgb(120, 16, 16)"; 
            object.style.color = "rgb(255, 196, 188)"; 
            object.style.caretColor = "rgba(227, 135, 127, 0.7)"; 

            return true; 
        }
        else {
            object.style.border = "5px solid rgb(10, 106, 79)"; 
            object.style.backgroundColor = "rgb(35, 164, 121)"; 
            object.style.color = "rgb(188, 255, 234)"; 
            object.style.caretColor = "rgba(127, 227, 197, 0.7)"; 

            return false; 
        }
}

function IsUndefined(object) {
    if (object.value == "") {
        object.style.border = "5px solid rgb(80, 6, 6)"; 
        object.style.backgroundColor = "rgb(120, 16, 16)"; 
        object.style.color = "rgb(255, 196, 188)"; 
        object.style.caretColor = "rgba(227, 135, 127, 0.7)"; 
    }
    else {
        object.style.border = "5px solid rgb(10, 106, 79)"; 
        object.style.backgroundColor = "rgb(35, 164, 121)"; 
        object.style.color = "rgb(188, 255, 234)"; 
        object.style.caretColor = "rgba(127, 227, 197, 0.7)"; 
    }
}

function hasSameString(remark) {
    const seen = new Set();
    for (const str of remark) {
        const words = str.split(/\s+/); 
        for (const word of words) {
            if (seen.has(word)) {
                return true; 
            }
            seen.add(word);
        }
    }
    return false; 
}

WDInput.addEventListener("keyup", function () {valueCOW(WDInput, 5, 20)}); 
GroupsInput.addEventListener("keyup", function () {valueCOW(GroupsInput, 1, 10)}); 

const keyWord = ["習近平", "暗殺 習近平", "小熊維尼", "小學博士", "小粉紅", "平反 天安門", "天安門", "勿忘國恥 8964", "紀念 8964", "8964", "平反 白紙革命", "白紙革命", "紀念 白紙革命", "平反 反送中", "反送中", "紀念 反送中", "獨裁中國", "中共", "新疆 集中營", "新疆 棉花"]
const generatorBtn = document.querySelector(".generatorBtn"); 
let displayFrame = document.getElementsByClassName("displayFrame")
let keyWords = [];  
let remark = "";
let counter = 0;  


generatorBtn.addEventListener("click", function () {
    if (GroupsInput.value == "" || WDInput.value == "") {
        IsUndefined(WDInput); 
        IsUndefined(GroupsInput); 
        alert("請輸入有效的值"); 
    }
    else if (valueCOW(WDInput, 5, 20) || valueCOW(GroupsInput, 1, 10)) {
        alert("數字請輸入於範圍內")
    }
    else {
        displayFrame[0].innerHTML = ""

        for (let i = 0; i < Number(GroupsInput.value); i++) {
            keyWords.splice(0, keyWords.length); 
            remark = ""; 
            counter = 0; 

            while (!(remark.length == Number(WDInput.value)) && counter < 1000) {
                    if (remark.length > Number(WDInput.value)) {
                        keyWords.pop(); 
                        remark = keyWords.join(" ").replace(/\s/g, ''); 
                    }
                    else {
                        keyWords.push(keyWord[Math.floor(Math.random() * keyWord.length)]); 
                        remark = keyWords.join(" ").replace(/\s/g, ''); 
                    }

                    counter++; 
            }
            if (counter < 1000) {
                displayFrame[0].innerHTML += `<p>${remark}</p>`
            }
            else {
                displayFrame[0].innerHTML += `<p style="color: rgb(108, 192, 115);">產生失敗</p>`
            }
        }
    } 
})
