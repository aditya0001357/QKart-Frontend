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
  console.log(adventure)
  let soldOut = document.querySelector("#reservation-panel-sold-out");
  let reserve = document.querySelector("#reservation-panel-available");
  if(adventure.available)
  {
    soldOut.style.display = "none";
    reserve.style.display = "block";

    document.querySelector("#reservation-person-cost").innerHTML = String(adventure.costPerHead);
    document.getElementById('reservation-cost').innerHTML = String(adventure.costPerHead);
  }
  else
  {
    soldOut.style.display = "block";
    reserve.style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log(adventure, persons);
  let total = adventure.costPerHead*parseInt(persons);
  document.getElementById('reservation-cost').innerHTML = String(total);

}


//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let formDate = document.getElementById('myForm');
  formDate.addEventListener('submit', async (e)=> {
    e.preventDefault();

    let data = {
      name : document.querySelector("#myForm > input:nth-child(2)").value,
      date : document.querySelector("#myForm > input:nth-child(5)").value,
      person : document.querySelector("#myForm > div:nth-child(7) > div:nth-child(2) > input").value,
      adventure : adventure.id,
    };
    console.log(data)


    let options = {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
      body : JSON.stringify(data)
    }

    let response = await fetch(`${config.backendEndpoint}/reservations/new`, options);
    let respJson = await response.json();
    let status = response.status;
    console.log(status, respJson);

    if(status>=200 && status<=299)
      alert('Success!');
    if(status<=400 && status>=499)
      alert('Failed!');

  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved==true)
    document.getElementById('reserved-banner').style.display = "block";
  else
    document.getElementById('reserved-banner').style.display = "none";


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
