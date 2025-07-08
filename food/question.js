const FoodQuiz = document.getElementById("FoodQuiz")

function addQuestion(ID_Name, Name, No) {
    FoodQuiz.innerHTML += `    
    <div id=${ID_Name} class="question">
        <h1>${No}. ${Name}拌不拌？</h1>
        <label>
            <input class="radioInput" type="radio" name=${ID_Name} value="拌人"> 一定要拌啦 ！
        </label>
        <label>
            <input class="radioInput" type="radio" name=${ID_Name} value="不拌人"> 到底誰會拌 ？
        </label>
        <label>
            <input class="radioInput" type="radio" name=${ID_Name} value="中壢人" checked="t"> 我保持中立😐
        </label>
    </div>
    <hr>`
}

const Foods = [["Curry", "咖哩"], 
                ["CenturyEggTofu", "皮蛋豆腐"], 
                ["BraisedPorkRice", "滷肉飯"], 
                ["ShavedIce", "挫冰"], 
                ["ColdNoodles", "涼麵"], 
                ["Tiramisu", "提拉米蘇"], 
                ["Bibimbap", "石鍋拌飯"], 
                ["SesamePasteNoodles", "麻醬麵"], 
                ["Donburi", "丼飯"], 
                ["Cake", "蛋糕"], 
                ["Pudding", "布丁"], 
                ["BakedRice", "焗烤飯"], 
                ["ShrimpFriedRice", "蝦仁炒飯"], 
                ["Pasta", "義大利麵"], 
                ["RiceCake", "米糕"], 
                ["Yogurt", "優格"], 
                ["MilkCap", "奶蓋"], 
                ["PuffPastrySoup", "酥皮濃湯"], 
                ["ShredChickenRice", "雞絲飯"], 
                ["OreoMcFlurry", "OREO冰炫風"], 
                ["PorridgeAndMeatFloss", "粥+肉鬆"],
                ["Salad", "沙拉"], 
                ["FriedSauceNoodles", "炸醬麵"], 
                ["ZongZi", "粽子"], 
                ["SoftTofu", "豆花"]]

for (let i = 0; i < 25; i++) {
    let ID_Name = Foods[i][0]; 
    let Name = Foods[i][1]; 

    if ([0, 4, 9, 14, 19, 24].includes(i)) {
        FoodQuiz.innerHTML += `<div id="Q${i + 1}"></div>`
    }

    addQuestion(ID_Name, Name, i + 1); 
}