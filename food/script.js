const menu_Btn = document.querySelector(".menu_Btn"); 
const menu = document.querySelector(".menu"); 
const menu_aTags = document.querySelectorAll(".menu a"); 
const close_Btn = document.querySelector(".close_Btn"); 
const overlay = document.querySelector('.overlay');

menu_Btn.addEventListener("click", function () {
    menu.style.left = "0"; 
    menu.classList.toggle('open'); 
    overlay.classList.toggle('active'); 
})

close_Btn.addEventListener("click", function () {
    close_Menu(); 
})

overlay.addEventListener('click', () => {
    close_Menu(); 
});

menu_aTags.forEach(buttom => {
    buttom.addEventListener("click", function () {
        close_Menu(); 
    })
})

function close_Menu() {
    menu.style.left = "-350px"; 
    menu.classList.remove('open'); 
    overlay.classList.remove('active');
}

const form = document.getElementById("FoodQuiz");

function FormValue(id) {
    const inputs = document.getElementById(id).querySelectorAll("input[type='radio']"); 
    
    for (const input of inputs) {
        if (input.checked) {
            return {
                value: input.value,
                question: id
            };
        }
    }
    return null;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const answers = {
        Curry: FormValue("Curry"),
        CenturyEggTofu: FormValue("CenturyEggTofu"),
        BraisedPorkRice: FormValue("BraisedPorkRice"),
        ShavedIce: FormValue("ShavedIce"),
        ColdNoodles: FormValue("ColdNoodles"),
        Tiramisu: FormValue("Tiramisu"),
        Bibimbap: FormValue("Bibimbap"),
        SesamePasteNoodles: FormValue("SesamePasteNoodles"),
        Donburi: FormValue("Donburi"),
        Cake: FormValue("Cake"),
        Pudding: FormValue("Pudding"),
        BakedRice: FormValue("BakedRice"),
        ShrimpFriedRice: FormValue("ShrimpFriedRice"),
        Pasta: FormValue("Pasta"),
        RiceCake: FormValue("RiceCake"),
        Yogurt: FormValue("Yogurt"),
        MilkCap: FormValue("MilkCap"),
        PuffPastrySoup: FormValue("PuffPastrySoup"),
        ShredChickenRice: FormValue("ShredChickenRice"),
        OreoMcFlurry: FormValue("OreoMcFlurry"),
        PorridgeAndMeatFloss: FormValue("PorridgeAndMeatFloss"),
        Salad: FormValue("Salad"),
        FriedSauceNoodles: FormValue("FriedSauceNoodles"),
        ZongZi: FormValue("ZongZi"),
        SoftTofu: FormValue("SoftTofu")
    };


    const answerCounts = {};

    for (const question in answers) {
        const answer = answers[question].value;
        answerCounts[answer] = (answerCounts[answer] || 0) + 1;
    }

    let maxCount = 0;
    let maxAnswer = '';
    for (const answer in answerCounts) {
        if (answerCounts[answer] > maxCount) {
            maxCount = answerCounts[answer];
            maxAnswer = answer;
        }
    }

    alert(`恭喜！你是 ${maxAnswer}`);
});

const year = new Date().getFullYear(); 
const cc = document.querySelector("footer p"); 

cc.innerText = `Copyright © ${year} Zhang.`
