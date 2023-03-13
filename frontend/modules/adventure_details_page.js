import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let urlObject = new URLSearchParams(search);
  let advid  = urlObject.get('adventure');
  return advid;
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try
  {
    let response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let apiData = await response.json();
    return apiData;
  }
  catch
  {
    // Place holder for functionality to work in the Stubs
    return null;
  }
}


//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById('adventure-name').innerHTML = adventure.name;

  document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle;

  let photoSection = document.getElementById('photo-gallery');

  for(let imgUrl of adventure.images)
  {
    let imgDiv = document.createElement('div');
    imgDiv.style.backgroundImage = `url("${imgUrl}")`;
    imgDiv.setAttribute("class", "activity-card-image");

    photoSection.appendChild(imgDiv);
  }
  
  document.getElementById('adventure-content').innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let carInner = document.createElement('div');
  carInner.setAttribute("class", "carousel-inner");

  for(let i=0; i<images.length; i++)
  {
    let imgDiv = document.createElement('div');

    if(i==1)
      imgDiv.setAttribute("class", "carousel-item active");
    else
      imgDiv.setAttribute("class", "carousel-item");
    
    imgDiv.innerHTML = `<img src="${images[i]}" class="d-block w-100" alt="...">`;
    
    carInner.appendChild(imgDiv);
  }

  document.getElementById('photo-gallery').appendChild(carInner);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
