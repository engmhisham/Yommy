

let RowData = document.getElementById("RowData");
let Search = document.getElementById("Search");

let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
let ageInput = document.getElementById("age");




function OpenNav() {
    $(".side-nav").animate({ left: 0 }, 600)
    $(".links li").animate({ top: 0 }, 600)

    $(".icon-change").removeClass("fa-align-justify");
    $(".icon-change").addClass("fa-x");


}

function CloseNav() {
    let NavWidth = $(".side-nav .total").outerWidth()
    $(".side-nav").animate({ left: -NavWidth }, 600)

    $(".icon-change").addClass("fa-align-justify");
    $(".icon-change").removeClass("fa-x");


    $(".links li").animate({ top: 300 }, 600)
}

CloseNav() // close by default
$(".icon-change").click(function () {
    if ($(".side-nav").css("left") == "0px") {
        CloseNav()
    } else {
        OpenNav()
    }
})













// display <====>
function display(Dis) {
    let cartoona = "";

    for (let i = 0; i < Dis.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${Dis[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 pointer">
                    <img class="w-100" src="${Dis[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${Dis[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    RowData.innerHTML = cartoona
}







/// search section ===>

function SearchInputs() {
    CloseNav();
    Search.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" placeholder="Search By Name" class="form-control bg-transparent text-white " type="text" >
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" type="text" placeholder="Search By First Letter" class="form-control bg-transparent text-white " type="text">
        </div>
    </div>`;

    RowData.innerHTML = "";
}

async function searchByName(term) {
    CloseNav();
    RowData.innerHTML = "";
    $(".loading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();
    display(response.meals);
    $(".loading").fadeOut(300)
}

async function searchByFLetter(term) {
    CloseNav();
    RowData.innerHTML = "";
    $(".loading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json();
    display(response.meals);
    $(".loading").fadeOut(300)
}
searchByName("a")

/// end of search section <===









// category section ===>

async function getCategories() {
    CloseNav();
    RowData.innerHTML = ""
    $(".loading").fadeIn(300)
    Search.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".loading").fadeOut(300)

}

function displayCategories(cate) {
    let cartoona = "";

    for (let i = 0; i < cate.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${cate[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 pointer">
                    <img class="w-100" src="${cate[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${cate[i].strCategory}</h3>
                        <p>${cate[i].strCategoryDescription}</p>
                    </div>
                </div>
        </div>
        `
    }

    RowData.innerHTML = cartoona
}
async function getCategoryMeals(category) {
    RowData.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    display(response.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}


// end of category section <===











//  area section ===>

async function getArea() {
    CloseNav();
    RowData.innerHTML = ""
    $(".loading").fadeIn(300)

    Search.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()


    displayArea(respone.meals)
    $(".loading").fadeOut(300)

}


function displayArea(area) {
    let cartoona = "";

    for (let i = 0; i < area.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area[i].strArea}</h3>
                </div>
        </div>
        `
    }

    RowData.innerHTML = cartoona
}
async function getAreaMeals(area) {
    RowData.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    display(response.meals)
    $(".loading").fadeOut(300)
}

// End of area section <===






// Ingredients section ===>

async function getIngredient() {
    CloseNav();
    RowData.innerHTML = ""
    $(".loading").fadeIn(300)

    Search.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()

    displayIngredients(respone.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}


function displayIngredients(ing) {
    let cartoona = "";

    for (let i = 0; i < ing.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${ing[i].strIngredient}')" class="rounded-2 text-center pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ing[i].strIngredient}</h3>
                        <p>${ing[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }

    RowData.innerHTML = cartoona
}

async function getIngredientsMeals(ingredients) {
    RowData.innerHTML = ""
    $(".loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    display(response.meals.slice(0, 20))
    $(".loading").fadeOut(300)

}

// End Ingredients section <===



//// meals Deatilas

function displayMealDetails(meal) {
   

    Search.innerHTML = "";
    let ingredientsHTML = "";
    let tagsHTML = "";

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsHTML += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
        }
    }

    if (meal.strTags) {
        const tags = meal.strTags.split(",");
        tagsHTML = tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`).join("");
    }

    const cartoona = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredientsHTML}
            </ul>

            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsHTML}
            </ul>

            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>`;

        RowData.innerHTML = cartoona;
}





async function getMealDetails(mealID) {
    CloseNav()
    RowData.innerHTML = ""
    $(".loading").fadeIn(300)

    Search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".loading").fadeOut(300)

}


//// End meals Deatilas





function Contacts() {
    CloseNav()
    RowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
            
                <input id="name" oninput="allValidation(this)"  type="text" class="form-control" placeholder="Enter Your Name">

                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">

                <input id="email" oninput ="allValidation(this)"  type="email" class="form-control " placeholder="Enter Your Email">

                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">

                <input id="phone" oninput ="allValidation(this)"  type="text" class="form-control " placeholder="Enter Your Phone">
                
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">

                <input id="age" oninpu="allValidation(this)"  type="number" class="form-control " placeholder="Enter Your Age">

                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">

                <input  id="password" oninput="allValidation(this)"  type="password" class="form-control " placeholder="Enter Your Password">

                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">

                <input  id="repassword" oninput="allValidation(this)"  type="password" class="form-control " placeholder="Repassword">

                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
}
let submitBtn = document.getElementById("submitBtn");
let passwordInput = document.getElementById("password");
let repasswordInput = document.getElementById("repassword");


function allValidation(element) {
    const regex = {
        name: /^[a-zA-Z ]+$/,
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
        password: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
        repassword: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
    };

    if (regex[element.id].test(element.value)) {
        element.nextElementSibling.classList.replace('d-block', 'd-none');
        submitBtn.removeAttribute("disabled");
    } else {
        element.nextElementSibling.classList.replace('d-none', 'd-block');
        submitBtn.setAttribute("disabled", "disabled");
    }

    if (passwordInput.value == repasswordInput.value) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", "disabled");
    }
}