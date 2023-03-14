import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try
  {
    let response = await fetch(`${config.backendEndpoint}/reservations/`);
    let apiData = await response.json();
    console.log(apiData)
    return apiData;
  }
  catch
  {
    return null;
  }


  // Place holder for functionality to work in the Stubs
  return null;
}


//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  // reservations.map((ele, idx) => {
  //   console.log(document.getElementById(ele.id).children[0].href)
  // } )

  if( reservations.length==0)//no rservations
  {  

    document.getElementById('no-reservation-banner').style.display = "block";
    document.getElementById('reservation-table-parent').style.display = "none";
  }
  else
  {
    document.getElementById('no-reservation-banner').style.display = "none";
    document.getElementById('reservation-table-parent').style.display = "block";

    let mainTable = document.getElementById('reservation-table');
    for(let x of reservations)
    {
      let rowEle = document.createElement('tr');
      rowEle['id'] = String(x.id)

      let date = new Date(x.date)
      let dateString = date.toLocaleDateString("en-IN");


      let dateTime = new Date(x.time);
      let dateArray = dateTime.toLocaleDateString("en-IN", {day: "numeric", month:"long", year:"numeric"})
      let timeArray = dateTime.toLocaleTimeString("en-IN");
      

      rowEle.innerHTML = `
        <td>${x.id}</td>
        <td>${x.name}</td>
        <td>${x.adventureName}</td>
        <td>${x.person}</td>
        <td>${dateString}</td>
        <td>${x.price}</td>
        <td>${dateArray}, ${timeArray}</td>
        <td><a href="../detail/?adventure=${x.adventure}"><button class="reservation-visit-button">visit Adventure</button></td>
        `;

        console.log(rowEle.children)
        rowEle.children[0].href=`detail/?adventure=${x.adventure}`;
        // let children = rowEle?.children;
        // children[7].innerHTML = `<a class="reservation-visit-button text-white">Visit Adventure</a>`
        // children[7].children[0].href =`../detail/?adventure=${x?.adventure}`;
        // rowEle.children[7].children[0].href = `../detail/?adventure=${x.adventure}`;
        mainTable.appendChild(rowEle);
    }
    // let c = document.getElementById('6b1859a8363be3df').children;
    // console.log(c)
    // console.log(c[0])
    // c[0].href=
    
  }


  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  

}

export { fetchReservations, addReservationToTable };
