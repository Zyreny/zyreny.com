const buttons = document.querySelectorAll(".buttons input[type='button']"); 
const answer = document.querySelector("h1[id='Answer']"); 
const nums = ["0"]; 

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const BtnValue = button.value; 

        if (isNum(BtnValue)) {
            if (answer.innerText == "Error") {
                answer.innerText = BtnValue; 
                nums.splice(nums.length - 1, 1, answer.innerText)
            }
            else if (answer.innerText == 0) {
                answer.innerText = BtnValue; 
                nums.splice(nums.length - 1, 1, answer.innerText); 
            }
            else if (isNum(nums[nums.length - 1])) {
                answer.innerText += BtnValue; 
                nums.splice(nums.length - 1, 1, answer.innerText); 
            }
            else {
                answer.innerText = BtnValue; 
                nums.push(answer.innerText); 
            }
        }
        else if (["+", "-", "*", "/"].includes(button.name) && isNum(nums[nums.length - 1])) {
            answer.innerText = BtnValue; 
            nums.push(button.name); 
        }
        else if (BtnValue == "AC") {
            answer.innerText = "0"; 
            nums.splice(0, nums.length); 
            nums.push("0"); 
        }
        else if (BtnValue == "+/-" && isNum(nums[nums.length - 1])) {
            answer.innerText = Number(answer.innerText) * -1; 
            nums.splice(nums.length - 1, 1, answer.innerText); 
        }
        else if (BtnValue == "%" && isNum(nums[nums.length - 1])) {
            answer.innerText = Number(answer.innerText) / 100; 
            nums.splice(nums.length - 1, 1, answer.innerText); 
        }
        else if (BtnValue == "DEL") {
            if (isNum(nums[nums.length - 1]) || answer.innerText.charAt(answer.innerText.length - 1) == ".") {
                answer.innerText = answer.innerText.slice(0, -1); 
                nums.splice(nums.length - 1, 1, answer.innerText); 
            }
            else if (["+", "−", "×", "÷"].includes(answer.innerText)) {
                nums.pop(); 
                answer.innerText = nums[nums.length - 1]; 
            }
        }
        else if (BtnValue == "=") {
            let Ans = ""; 

            while (nums.includes("*") || nums.includes("/")) {    
                let signI = nums.findIndex(sign => sign == "*" || sign == "/"); 
                let num1 = nums[signI - 1]; 
                let num2 = nums[signI + 1]; 

                if (signThan("*", "/") == "*") {
                    if (Number(num2) > 0) {
                        if (Number(num1) > 0) {
                            for (let i = 0; i < Number(num2); i++) {
                                Ans += num1; 
                            }
                            nums.splice(signI - 1, 3, Ans); 

                        }
                        else if (Number(num1) == 0) {
                            nums.splice(signI - 1, 3, "0"); 
                        }
                        else {
                            for (let i = 0; i < Number(num2); i++) {
                                Ans += Math.abs(Number(num1)); 
                            }
                            Ans = "-" + Ans; 
                            nums.splice(signI - 1, 3, Ans); 

                        }
                    }
                    else if (num2 == "0") {
                        nums.splice(signI - 1, 3, "0"); 
                    }
                    else {
                        if (Number(num1) > 0) {
                            for (let i = 0; i < Math.abs(Number(num2)); i++) {
                                Ans += num1; 
                            }
                            Ans = "-" + Ans; 
                            nums.splice(signI - 1, 3, Ans); 

                        }
                        else if (Number(num1) == 0) {
                            nums.splice(signI - 1, 3, "0"); 
                        }
                        else {
                            for (let i = 0; i < Math.abs(Number(num2)); i++) {
                                Ans += Math.abs(Number(num1)); 
                            }
                            nums.splice(signI - 1, 3, Ans); 

                        }
                    }
                }
                else if (signThan("*", "/") == "/") {
                    if (Number(num2) > 0) {
                        if (Number(num1) > 0) {
                            for (let i = 0; i < Number(num1) / Number(num2); i++) {
                                Ans += num2; 
                            }
                            nums.splice(signI - 1, 3, Ans); 
                        }
                        else if(Number(num1) == 0) {
                            nums.splice(signI - 1, 3, "0"); 
                        }
                        else {
                            for (let i = 0; i < Math.abs(Number(num1)) / Number(num2); i++) {
                                Ans += num2; 
                            }
                            Ans = "-" + Ans; 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                    }
                    else if (Number(num2) == 0) {
                        Ans = "Error"; 
                        nums.splice(0, nums.length, Ans); 
                    }
                    else {
                        if (Number(num1) > 0) {
                            for (let i = 0; i < Math.abs(Number(num1) / Number(num2)); i++) {
                                Ans += Math.abs(Number(num2)); 
                            }
                            Ans = "-" + Ans; 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                        else if (Number(num1) == 0) {
                            nums.splice(signI - 1, 3, "0"); 
                        }
                        else {
                            for (let i = 0; i < Math.abs(Number(num1) / Number(num2)); i++) {
                                Ans += Math.abs(Number(num2)); 
                            }
                            nums.splice(signI - 1, 3, Ans); 
                        }
                    }
                }
                answer.innerText = nums.join(""); 
                answer.innerText = answer.innerText.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                Ans = ""; 
            }
            while (nums.includes("+") || nums.includes("-")) {
                let signI = nums.findIndex(sign => sign == "+" || sign == "-"); 
                let num1 = nums[signI - 1]; 
                let num2 = nums[signI + 1]; 

                if (signThan("+", "-") == "+") {
                    if (Number(num2) > 0) {
                        if (Number(num1) > 0) {
                            Ans = num1 + num2; 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                        else if (Number(num1) == 0) {
                            nums.splice(signI - 1, 3, num2); 
                        }
                        else {
                            Ans = num1 + num2; 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                    }
                    else if (Number(num2) == 0) {
                        nums.splice(signI - 1, 3, num1); 
                    }
                    else {
                        if (Number(num1) > 0) {
                            Ans = num2 + num1; 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                        else if (Number(num1) == 0) {
                            nums.splice(signI - 1, 3, num2); 
                        }
                        else {
                            Ans = "-" + num1 + num2; 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                    }
                }
                else if (signThan("+", "-") == "-") {
                    if (Number(num2) > 0) {
                        if (Number(num1) > 0) {
                            Ans = "-" + num2 + num1; 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                        else if (Number(num1) == 0) {
                            Ans = "-" + num2 + num1; 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                        else {
                            Ans = "-" + num1 + num2; 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                    }
                    else if (Number(num2) == 0) {
                        nums.splice(signI - 1, 3, num1); 
                    }
                    else {
                        if (Number(num1) > 0) {
                            Ans = num1 + num2; 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                        else if (Number(num1) == 0) {
                            Ans = Number(num2) * -1; 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                        else {
                            Ans = num1 + (Number(num2) * -1).toString(); 
                            nums.splice(signI - 1, 3, Ans); 
                        }
                    }
                }
                answer.innerText = nums.join(""); 
                answer.innerText = answer.innerText.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                Ans = ""; 
            }
        }
    })
})

function isNum(str) {
    return  /^[-+]?(\d*\.?\d+|\d+\.?\d*)([eE][-+]?\d+)?$/.test(str);
}

function SignOrNum() {
    if (isNum(nums[nums.length - 1])) {
        return "Num"
    }
    else {
        return "Sign"
    }
}

function signThan(sign1, sign2) {
    let FSign = nums[nums.findIndex(sign => sign == sign1 || sign == sign2)]; 

    return FSign; 
}


