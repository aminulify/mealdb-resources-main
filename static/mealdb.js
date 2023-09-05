const loadMealData = async(searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMealData(data.meals);
        // console.log(data.meals);
    } catch (error) {
        console.log(error);
        const mealContainer = document.getElementById('mealContainer');
        mealContainer.innerHTML = `
        <div class="flex items-center justify-center">
        <h1 class="text-3xl text-btnColor font-medium text-center">Wrong Input. Please Try Again and Search Any Food Name...</h1>
        </div>
        `

    }
}

const displayMealData = meal => {
    // console.log(meal);
    const mealContainer = document.getElementById('mealContainer');
    mealContainer.innerHTML = '';
    meal.forEach(eachData => {

        // console.log(eachData);

        const createDiv = document.createElement('div');
        createDiv.classList.add('eachMeal');
        createDiv.innerHTML = `
        <div class="max-w-sm w-full lg:max-w-full lg:flex">
        <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('${eachData.strMealThumb}')" title="Meal">
        </div>
        <div class="border border-rounded-xl bg-white rounded-b p-4 flex flex-col justify-between text-left">
            <div class="mb-8">
                <div class="text-gray-900 font-bold text-2xl mb-2">${eachData.strMeal}</div>
                <p class="text-gray-700 py-2 overflow-hidden">There are many variations of passages of available, but the majority have suffered</p>

                <button type="button" onclick="loadMealDetails(${eachData.idMeal})"  class="showModal underline font-medium text-btnColor">View Details</button>
            </div>
        </div>
    </div>

        
        `;
        mealContainer.appendChild(createDiv);
    });
}
const searchText = () => {
    const searchValue = document.getElementById('meal-search').value;

    // console.log(searchValue);
    loadMealData(searchValue);

}

const loadMealDetails = async(idMeal) => {

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLoadMealDetails(data.meals[0]);
        // console.log(data.meals[0].strMeal);
    } catch (error) {
        console.log(error);
    }

}


const displayLoadMealDetails = meal => {
    // console.log(meal);
    const viewDetails = document.getElementById('view-details');


    viewDetails.innerHTML = ` 
        <div class="append-new bg-white rounded shadow-lg w-2/8 p-4 border-rounded-md">
            <img src="${meal.strMealThumb}" class="rounded-md w-full" alt="">
            <h3 class="pt-4 text-xl font-bold">Name: ${meal.strMeal}</h3>
            <p class="pb-2">There are many variations of passages of available, but the majority have suffered</p>
            <p class="pb-4"><span class="font-medium">Youtube Link: </span>${meal.strYoutube}</p>
            <div class="flex gap-3">
            <a href="${meal.strYoutube}" target="_blank" class="text-center w-1/2 btn text-textColor py-3 px-8 rounded-lg bg-btnColor font-medium hover:bg-btnHoverColor hover:text-white ease-in duration-200">YouTube</a>

            <button class="close-modal w-1/2 btn text-textColor py-3 px-8 rounded-lg bg-btnColor font-medium hover:bg-btnHoverColor hover:text-white ease-in duration-200">Close</button>
            
                </div>
            </div>
            `;

    const modal = document.querySelector('.modal');
    const showModal = document.querySelectorAll('.showModal');
    for (i = 0; i < showModal.length; i++) {
        showModal[i].addEventListener('click', function() {
            modal.classList.remove('hidden');
        })
    }


    const closeModal = document.querySelectorAll('.close-modal');
    for (i = 0; i < closeModal.length; i++) {
        closeModal[i].addEventListener('click', function() {
            modal.classList.add('hidden');
        })
    }

}

// loadMealDetails();
loadMealData('fish');
// displayLoadMealDetails();
