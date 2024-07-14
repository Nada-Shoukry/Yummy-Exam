
let dataRow = document.getElementById("row");
let searchSection = document.getElementById("search");

let nameInput;
let emailInput;
let phoneInput;
let ageInput;
let passwordInput;
let repasswordInput;
let submitBtn;

let nameAlert;
let emailAlert;
let phoneAlert;
let ageAlert;
let passwordAlert;
let repasswordAlert;


// ------- start :

$(document).ready(() => {
    searchByName("").then(() =>{
        $(".loading").fadeOut(1000);
        $("body").css("overflow" , "visible");
    });
});

// ------- Side Bar :

$(".bars-close").click(() => {
    // $(".side-bar").animate({"left": "-290"}, 300);

    let sideContentWidth = $(".side-content").innerWidth();
    // console.log(sideContentWidth);

    if ($(".side-bar").css("left") == `-${sideContentWidth}px`){
        $(".side-bar").animate({"left": `-${0}px`}, 500);
        $(".bars-close").empty();
        $(".bars-close").append(`<i class="fa-solid fa-xmark"></i>`);
        
        for(let i=0; i<5; i++){
            $(".side-links").animate({"marginTop" : "0px"} , 1000);
        }
    }
    else {
        $(".side-bar").animate({"left": `-${sideContentWidth}px`}, 500);
        $(".bars-close").empty();
        $(".bars-close").append(`<i class="fa-solid fa-bars"></i>`);
 
    }
});

// function closeSideBar (){
//     if ($(".side-bar").css("left") == "0px"){
//         $(".side-bar").animate({"left": `-${sideContentWidth}px`}, 300);
//         $(".bars-close").empty();
//         $(".bars-close").append(`<i class="fa-solid fa-bars"></i>`);
//     }
// }


// ------- Display Meals :

function displayMeals(arr){
    let box = "";
    for (let i=0; i< arr.length; i++){
        box += `
        <div class="col-md-6 col-lg-3 p-2">
            <div class="meal" onclick="getMealDetails('${arr[i].idMeal}');">
               <img class="w-100" src="${arr[i].strMealThumb}" alt="meal pic">
               <div class="meal-layer d-flex justify-content-start align-items-center">
                   <p class="fs-3 ps-2">${arr[i].strMeal}</p>
               </div>
            </div>       
        </div>
        `
    }

    dataRow.innerHTML = box;
}

// ------- Search :

function searchMeals(){
    searchSection.innerHTML = `

    <div class="search-inputs row g-4 mx-5 pt-1">
        <div class="col-md-5 ms-5">
            <div>
                <input onkeyup="searchByName(this.value)" type="text" placeholder="Search by Name" class="form-control bg-transparent text-white" id="searchName">
            </div>
        </div>
        <div class="col-md-5 ms-5">
            <div>
                <input onkeyup="searchByFLetter(this.value)" type="text" maxlength="1" placeholder="Search by First Letter" class="form-control bg-transparent text-white" id="searchLetter">
            </div>
        </div>     
    </div>

    `
    dataRow.innerHTML = "";
}

async function searchByName(term){
    dataRow.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();

    response.meals ? displayMeals(response.meals) : displayMeals([]);
}

async function searchByFLetter(term){
    dataRow.innerHTML = "";

    term == "" ? term = "a" : "";
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json();

    response.meals ? displayMeals(response.meals) : displayMeals([]);
} 

// searchMeals();


// ------- Categories :

async function getCategories(){
    dataRow.innerHTML = "";
    
    searchSection.innerHTML = "";

    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    response = await response.json();

    // console.log(response);
    // console.log(response.categories);

    displayCategories(response.categories);

}

// getCategories();

function displayCategories(arr){

    let box = "";

    for (let i=0; i< arr.length; i++){
        box += `
        <div class="col-md-3 p-2">
            <div class="meal text-center" onclick="getCategoryMeals('${arr[i].strCategory}');">
               <img class="w-100" src="${arr[i].strCategoryThumb}" alt="meal pic">
               <div class="meal-layer p-2 d-flex flex-column justify-content-center align-items-center overflow-hidden">
                   <h3>${arr[i].strCategory}</h3>
                   <p class="fs-4">${arr[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}</p>
               </div>
            </div>       
        </div>
        `
    }

    dataRow.innerHTML = box ;
}

async function getCategoryMeals(category){
    dataRow.innerHTML = "";
    
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();

    displayMeals(response.meals.slice(0, 20));
}

// ------- Area :

async function getArea() {

    dataRow.innerHTML = "";
    searchSection.innerHTML = "";

    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    response = await response.json();

    // console.log (response);
    // console.log(response.meals);

    displayArea(response.meals);
}

// getArea();

function displayArea(arr) {
    let box = "";
    for (let i =0; i< arr.length; i++){
        box +=`
        <div class="col-md-3 p-2 text-white">
            <div class="meal py-1 d-flex align-items-center justify-content-center flex-column bg-main" onclick="getAreaMeals('${arr[i].strArea}');">
                <i class="fa-solid fa-house-laptop fa-4x my-2"></i>
                <h3>${arr[i].strArea}</h3>
            </div>  
        </div>
        `
    }

    dataRow.innerHTML = box ;
}

async function getAreaMeals(area) {
    dataRow.innerHTML = "";
     
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();

    displayMeals(response.meals.slice(0, 20));
}

// ------- Ingredients :

async function getIngredients(){
    dataRow.innerHTML = "";
    searchSection.innerHTML = "";

    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    response = await response.json();

    // console.log (response);
    // console.log(response.meals);

    displayIngredients(response.meals.slice(0,10));

}

// getIngredients();

function displayIngredients(arr){
    let box = "";
    for (let i=0; i< arr.length; i++){
        box +=`
        <div class="col-md-3 p-2 text-white text-center">
            <div class="meal p-2 d-flex align-items-center justify-content-center flex-column" onclick="getIngredientsMeals('${arr[i].strIngredient}');">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 class="py-1">${arr[i].strIngredient}</h3>
                <p class="fs-6 py-1">${arr[i].strDescription.split(" ").slice(0,15).join(" ")}</p>
            </div>  
        </div>
        `
    }
    dataRow.innerHTML = box;
}

async function getIngredientsMeals(ingredients) {
    dataRow.innerHTML = "";

    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    response = await response.json();

    displayMeals(response.meals.slice(0,20));
}

// ------- Meal Details :

async function getMealDetails(mealID){

    dataRow.innerHTML = "";
    searchSection.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    response = await response.json();

    displayMealDetails(response.meals[0]);
}

function displayMealDetails(meal) {
    searchSection.innerHTML = "";

    let ingredients = "";

    for (let i=0; i<= 20; i++){
        if (meal[`strIngredients${i}`]){
            ingredients += `
            <li class="alert alert-info m-2 p-1"> ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]} </li>
            `
        }
    }

    let tags = meal.strTags.split(",");
    if(!tags) tags = [];

    let tagsStr = '';
    for (let i=0; i< tags.length; i++){
        tagsStr += `
        <li class="alert alert-danger m-2 p-1"> ${tags[i]} </li>
        `
    }

    let box = `
    <div class="col-md-4 pt-3">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="meal detail img">
        <h2 class="text-white mt-1">${meal.strMeal}</h2>
    </div>
    <div class="col-md-8 pt-2">
        <h2 class="text-white">Instructions</h2>
        <p class="text-white fs-6">${meal.strInstructions}</p>
        <h3 class="text-white"><span>Area : </span>${meal.strArea}</h3>
        <h3 class="text-white"><span>Category : </span>${meal.strCategory}</h3>
        <h3 class="text-white">Recipes : </h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>

        <h3 class="text-white">Tags : </h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>

        <a target="_blank" href="${meal.strSource}" class="btn btn-success mx-1">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
    `

    dataRow.innerHTML = box;

}

// ------- Contact us :

function contacts() {

    dataRow.innerHTML = `
    <section class="contact vh-100" id="contact">
        <div class="container text-center">
            <div class="row g-1 justify-content-center">
                <div class="col-md-5">
                    <div>
                        <input id="name" onkeyup="validateInputs()" class="form-control" type="text" placeholder="Enter your Name">
                    </div>
                    <div class="alert alert-danger mt-1 py-1 d-none" id="nameAlert"> Name must be 3 characters or more</div>
                </div>
                <div class="col-md-5">
                    <div>
                        <input id="email" onkeyup="validateInputs()" class="form-control" type="email" placeholder="Enter your Email">
                    </div>
                    <div class="alert alert-danger mt-1 py-1 d-none" id="emailAlert">Enter valid Email,  *exemple@gmail.com* </div>
                </div>
                <div class="col-md-5">
                    <div>
                        <input id="phone" onkeyup="validateInputs()" class="form-control" type="text" placeholder="Enter your Phone">
                    </div>
                    <div class="alert alert-danger mt-1 py-1 d-none" id="phoneAlert">Enter valid Phone Number</div>
                </div>
                <div class="col-md-5">
                    <div>
                        <input id="age" onkeyup="validateInputs()" class="form-control" type="number" placeholder="Enter your Age">
                    </div>
                    <div class="alert alert-danger mt-1 py-1 d-none" id="ageAlert">Enter valid Age</div>
                </div>
                <div class="col-md-5">
                    <div>
                        <input id="password" onkeyup="validateInputs()" class="form-control" type="password" placeholder="Enter your Password">
                    </div>
                    <div class="alert alert-danger mt-1 py-1 d-none" id="passwordAlert">Password must be 8 chars at least one letter and one number</div>
                </div>
                <div class="col-md-5">
                    <div>
                        <input id="repassword" onkeyup="validateInputs()" class="form-control" type="password" placeholder="Re-enter your Password">
                    </div>
                    <div class="alert alert-danger mt-1 py-1 d-none" id="repasswordAlert"> Re-enter the same Password</div>
                </div>

            </div>
            <button id="submit-btn" class="btn btn-outline-danger px-3 mt-3 disabled">Submit</button>
        </div>
    </section>
    `
    submitBtn = document.getElementById("submit-btn");

    nameInput = document.getElementById("name");
    emailInput = document.getElementById("email");
    phoneInput = document.getElementById("phone");
    ageInput = document.getElementById("age");
    passwordInput = document.getElementById("password");
    repasswordInput = document.getElementById("repassword");

    nameAlert = document.getElementById("nameAlert");
    emailAlert = document.getElementById("emailAlert");
    phoneAlert = document.getElementById("phoneAlert");
    ageAlert = document.getElementById("ageAlert");
    passwordAlert = document.getElementById("passwordAlert");
    repasswordAlert = document.getElementById("repasswordAlert");

  
    nameInput.addEventListener("focus", () => {
        nameInputTouched = true;
    });

    emailInput.addEventListener("focus", () => {
        emailInputTouched = true;
    });

    phoneInput.addEventListener("focus", () => {
        phoneInputTouched = true;
    });

    ageInput.addEventListener("focus", () => {
        ageInputTouched = true;
    });

    passwordInput.addEventListener("focus", () => {
        passwordInputTouched = true;
    });

    repasswordInput.addEventListener("focus", () => {
        repasswordInputTouched = true;
    });

};

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


// contacts();

// ------- Validation :

function validateInputs(){
    if (nameInputTouched) {
        if (nameValidation()){
            nameAlert.classList.replace("d-block", "d-none");
        } else {
            nameAlert.classList.replace ("d-none", "d-block");
        }
    }

    if (emailInputTouched) {
        if (emailValidation()){
            emailAlert.classList.replace("d-block", "d-none");
        } else {
            emailAlert.classList.replace ("d-none", "d-block");
        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()){
            phoneAlert.classList.replace("d-block", "d-none");
        } else {
            phoneAlert.classList.replace ("d-none", "d-block");
        }
    }

    if (ageInputTouched) {
        if (ageValidation()){
            ageAlert.classList.replace("d-block", "d-none");
        } else {
            ageAlert.classList.replace ("d-none", "d-block");
        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()){
            passwordAlert.classList.replace("d-block", "d-none");
        } else {
            passwordAlert.classList.replace ("d-none", "d-block");
        }
    }

    if (repasswordInputTouched) {
        if (repasswordValidation()){
            repasswordAlert.classList.replace("d-block", "d-none");
        } else {
            repasswordAlert.classList.replace ("d-none", "d-block");
        }
    }

    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()){
        console.log("Enabled");
        $("#submit-btn").removeClass("disabled");
    } else {
        $("#submit-btn").addClass("disabled", true);
    }

}

// console.log ("nameinput", nameInput);


// ------ RegExp :

function nameValidation() {
    return (/^[a-zA-Z0-9$_]{3,}$/.test(nameInput.value));
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value));
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value));
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value));
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value));
}

function repasswordValidation() {
    return repasswordInput.value == passwordInput.value ;
}

// ------- 