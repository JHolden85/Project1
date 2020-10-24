/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for the brewery API based on user search parameters
 */
function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.openbrewerydb.org/breweries?";

  // Begin building an object to contain our API call's query parameters
  // Set the API key - most API's require a key or authentication - not the openbrewery so leaving 
  // the defintiion statment here for reference - the key below is for the NYT API 
  // var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
  var queryParams = {};

  var cityEntered = $("#city").val();
if (cityEntered) {
  queryParams.by_city = cityEntered;
}
console.log("Value of Name parameter entered by User: " + cityEntered);
// These search parameters are optional and should only be appended to the search string if the user 
// has entered something on the screen 
var nameEntered =  queryParams.by_name = $("#pubname")
.val();
console.log("Value of Name parameter entered by User: " + nameEntered);

  var stateEntered =   queryParams.by_state = $("#state")
  .val();
  console.log("Value of state parameter entered by User: " + stateEntered);

   var zipEntered =   queryParams.by_postal = $("#zip")
  .val();
  console.log("Value of zip code parameter entered by User: " + zipEntered); 

if (nameEntered > "") {
  queryParams.by_name = $("#pubname")
  .val()
  .trim();
}

if (stateEntered > "") {
  queryParams.by_state = $("#state")
  .val()
  .trim();
}

if (zipEntered > "") {
  queryParams.by_postal = $("#zip")
  .val()
  .trim();
}

  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}

/**
 * takes API data (JSON/object) and turns it into elements on the page
  */
function updatePage(apiResult) {
  // Log the returned data to console, where it will show up as an object
  var brewData = apiResult;
  console.log("-----brewData -------called from the Update page function----------------");
  console.log(brewData);

  // Loop through and build elements for the breweries 

  for (let i = 0; i < brewData.length; i++) {
    var numBreweries = $("#brewery-count").val();
        // Add the newly created element to the DOM
        $("#brewery-count").append(numBreweries);  
    
    // Process each brewery/object returned in the array
    var brewName = brewData[i].name
     
    // Increase the breweryCount (track Brewery # - starting at 1)
    var breweryCount = i + 1;

    // Create the  list group to contain the breweries 
    var $breweryList = $("<ul>");
    $breweryList.addClass("list-group");

    // Add the newly created element to the DOM
    $("#brewery-section").append($breweryList);

    // Append each brewery to the $breweryList
    var $breweryListItem = $("<li class='list-group-item articleHeadline'>");

      $breweryListItem.append(
        "<span class='label label-primary'>" +
        breweryCount +
          "</span>" +
          "<strong> " +
          brewName +
          "</strong>"
      ); 

    // Build the brewery address and append to document if exists
    var brewAddress = "Address: "  + " " + brewData[i].street + " " + brewData[i].city+ ", " + brewData[i].state + " " + brewData[i].postal_code; 
    if (brewAddress) {
      $breweryListItem.append("<p>" + brewAddress + "</p>");
    }

    // Append phone number to the document if not blank
    var brewPhone = "Phone#: "  + " " + brewData[i].phone; 
    if (brewPhone) {
      $breweryListItem.append("<p>" + brewPhone + "</p>");
    }


    // Append and log url
    $breweryListItem.append("<a href='" +  brewData[i].website_url + "'>" + brewData[i].website_url + "</a>");
 
    // Adding a data-attribute
    $breweryListItem.attr("data-longitude", brewData[i].longitude); 
    $breweryListItem.attr("data-latitude", brewData[i].latitude); 

    // Append the article
    $breweryList.append($breweryListItem);

  };

  };


// Function to empty out the list of breweries
function clear() {
  $("#article-section").empty();
};

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#runSearch").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search

  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the brewery list 
  clear();

  // Build the query URL for the ajax request to the Brewery API 
  var queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});


//  .on("click") function associated with the clear button
$("#clear").on("click", clear);