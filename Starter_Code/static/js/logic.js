// map
var myMap = L.map("map", {
    center: [45.42, -75.69],
    zoom: 2
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  d3.json(url).then(function(response) {
  
    //console.log(response);
    features = response.features;
  
    //console.log(features);
  
    for (var i = 0; i < features.length; i++) {
  
      var location = features[i].geometry;
      if(location){
        L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
      }
    
    }
  
  });
  