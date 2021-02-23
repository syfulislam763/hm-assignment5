


function fetchData(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayData(data.categories);
    })

    
}

fetchData("https://www.themealdb.com/api/json/v1/1/categories.php");

function displayData(data){
    let searchItem = [...data];
    const foodContainer = document.getElementById('food-container');
    const searchBox = document.getElementById('searchBox');
    const contentBody = document.getElementById('content-body');
    
    //foodCard function displays all item
    foodCard(searchItem, foodContainer);

    //search event
    searchBox.addEventListener('keyup', e=> {
        let filterArr = searchItem.filter(obj => obj.strCategory.toLowerCase().includes(e.target.value.toLowerCase()));

        //foodCard function displays onle matched item with search key
        foodCard(filterArr, foodContainer, e.target.value);
    })


    //click event
    foodContainer.addEventListener('click', e=> {
        //foodDetails function used to show details about a single item
        if(e.target.innerText){
            const obj = data.find(obj => obj.strCategory === e.target.innerText);
            foodDetails(obj, contentBody);
        }else{
            const category = e.target.parentElement.nextElementSibling.innerText;
            const obj = data.find(obj => obj.strCategory === category);
            foodDetails(obj, contentBody);
        }
    })



}


function foodCard(dataArr, container, foodName=null){
    container.innerText = '';
    if(dataArr.length === 0){
        container.innerHTML = foodName && `<h1 class="text-info">"${foodName}" food item not found</h1>`;
    }
    dataArr.forEach(d => {
        container.innerHTML += `<div class="food-card">
            <div class="food-card-image">
            <img src=${d.strCategoryThumb} alt="">
            </div>
            <h5>${d.strCategory}</h5>
        </div>`
    });
}


function foodDetails(foodItem, container){
    if(foodItem){
        container.innerHTML = '';
        container.innerHTML = `<div class=" food-details">
            <img src=${foodItem.strCategoryThumb} alt="">
            <h3>${foodItem.strCategory}</h3>
            <h5>Food Details</h5>
            <p>${foodItem.strCategoryDescription}</p>
            <small class="text-info">Click on home button to go back</small>
        </div>`
    }
}

    