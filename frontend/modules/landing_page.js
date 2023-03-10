import config from "../conf/index.js";

async function init() {

  
  console.log("init called, the config is : ", config.backendEndpoint);
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log('init function :', cities);

  
  // Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}


//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

    console.log('called');
    try
    {
      let p = await fetch(`${config.backendEndpoint}/cities`);
      let apiData = await p.json();
      console.log('apiData from fetchCitites function : ', apiData);
      return apiData;
    }
    catch(err)
    {
      return null;
    }
    
    
}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let card = document.createElement("div")
  card.className = "col-12 col-md-6 col-xl-3 mt-3"
  card.innerHTML = `
  
  <a href="./pages/adventures/?city=${id}" id="${id}">
  <div class="tile card-body text-white border-0" style="border-radius:2rem;">
   
      <img class="card-img tile-img" src="${image}" alt="" />

      <div class="card-img-overlay d-flex flex-column justify-content-end align-items-center tile-text">
        <div><p class="card-title">${city}</p></div>
        <div > <p class="card-text">${description}</p></div>
      </div>
    
  </div>
  </a>
`

let data = document.getElementById("data")
data.append(card)

  // let contentDiv = document.createElement('div');
  // contentDiv.id = id;
  // contentDiv.classList.add("col-12", "col-md-6", "col-xl-3", "mt-3");


  // contentDiv.innerHTML = `
  // <a href="./pages/adventures/?city=${id}", id="${id}">
  // <div class="tile card text-white border-0">
  //   <div style="border-radius: 3rem;" class="card-body">
  //     <img class="card-img tile-img" src="${image}" alt="" />

  //     <div class="card-img-overlay d-flex flex-column justify-content-end align-items-center" >
  //       <div><p style="font-weight: bold;" class="card-title">${city}</p></div>
  //       <div > <p class="card-text">${description}</p></div>
  //     </div>
  //   </div>
  // </div>
  // </a>`;
  

  // let parent = document.getElementById('data');
  // parent.appendChild(contentDiv);
  

}


export { init, fetchCities, addCityToDOM };