var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

    // If GEO Location returned an error
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

   // The geolocation API
  navigator.geolocation.getCurrentPosition(success, error, options);


  // Build the query string from the users latitude and longitude to the brewery 
  // latitude and longitude to call the TOM TOM routing API 
  function buildRouteQueryURL() {
    // queryURL is the url we'll use to query the API     Note: Linebreaks are designated by "\".
    var queryURL = 
    // Begin building an object to contain our API call's query parameters
    // Set the API key - most API's require a key or authentication - not the openbrewery so leaving 
    // the API Key defintiion statment here for the key below is for Google mapping API's
      var queryParams = { "api-key": "AIzaSyAiuKrpR8WV9-AFZ4rb_BF8nW4cwc4RQxk" };
    
  
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